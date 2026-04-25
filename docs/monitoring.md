# Monitoring & Alerting — Technical Reference

> Uptime monitoring, synthetic form testing, and alert routing for the production site

---

## What gets monitored

| What | How | Frequency |
|---|---|---|
| Site reachability + SSL + DNS | Better Stack pings `/api/health` from 4 regions | Every 3 min |
| Supabase database | `/api/health` runs `SELECT id FROM form_submissions LIMIT 1` | Every 3 min (via Better Stack) |
| Contact form pipeline (end-to-end) | `/api/health` POSTs to `/api/contact` with a synthetic-bypass header | Every 3 min (via Better Stack) |
| Supabase pause prevention | Vercel cron hits `/api/keepalive` | Daily at 00:00 UTC |

A single failure of any of those checks turns the Better Stack monitor red and sends an email + phone-call alert after a 60s confirmation period.

---

## Stack

| Service | Purpose | Dashboard |
|---|---|---|
| **Better Stack** | Uptime monitoring, alert routing, on-call | [uptime.betterstack.com](https://uptime.betterstack.com/team/t532372/monitors) |
| **Vercel Cron** | Triggers `/api/keepalive` daily | [Vercel project](https://vercel.com/jeff-ruoss/lockandlogic) → Settings → Cron Jobs |
| **Supabase** | Backend being monitored | [Supabase project](https://supabase.com/dashboard/project/yfsnhellrgjpjjkgoqry) |

---

## `/api/health` endpoint

Public GET endpoint at `https://lockandlogic.vercel.app/api/health`. Runs two checks in parallel and returns a JSON summary:

```json
{
  "ok": true,
  "checks": {
    "supabase": { "ok": true, "ms": 110 },
    "contact":  { "ok": true, "ms": 91 }
  },
  "ts": "2026-04-25T16:34:49.834Z"
}
```

- **HTTP 200** — both checks passed
- **HTTP 503** — at least one check failed; `checks.<name>.detail` contains the error
- Always `Cache-Control: no-store`

### Supabase check

Runs a single `SELECT id FROM form_submissions LIMIT 1`. Fails on connection error, auth error, or paused project.

### Contact check (synthetic test)

Performs a real HTTP `POST` from `/api/health` to its own `/api/contact` endpoint with:

- `x-synthetic-secret: $SYNTHETIC_SECRET` header — gates the bypass
- A test payload (`name=synthetic-health`, `email=synthetic@health.test`, `message=…`)
- `Origin` header matching the deployment, so Astro's CSRF check passes

`/api/contact` recognizes the header (verifies it matches the env-only `SYNTHETIC_SECRET` value) and:

1. Runs the same validation/sanitization a real submission would
2. **Skips** Turnstile, the Supabase write, and the Resend email send
3. Returns `{ "success": true, "synthetic": true }`

That means the synthetic test exercises Astro routing, the CSRF guard, body parsing, and the validation library end-to-end — but never sends email, writes a row, or burns Turnstile/Resend quota.

The `SYNTHETIC_SECRET` env var is set in:
- Vercel → Project → Settings → Environment Variables (production)
- Local `.env`

If the secret is missing on the server, `/api/health` reports `contact: { ok: false, detail: "SYNTHETIC_SECRET not set" }` and returns 503. **Never expose this secret to the client.**

---

## Better Stack monitor

Single monitor protects everything. Configured via the Better Stack MCP server.

| Setting | Value |
|---|---|
| Monitor ID | `4326514` |
| URL | `https://lockandlogic.vercel.app/api/health` |
| Type | `keyword_absence` |
| Required keyword | `"ok":true` |
| Check frequency | 180s (3 min) |
| Confirmation period | 60s (avoids paging on a single transient blip) |
| Recovery period | 180s |
| Regions | eu, us, as, au |
| Request timeout | 30s |

The keyword check catches three failure modes with one rule:

- **HTTP 503** (one of the checks failed) → no `"ok":true` in body → alert
- **HTTP 200 with `"ok":false`** (defense-in-depth, shouldn't happen but covered) → alert
- **Connection error / timeout / cert / DNS failure** → no body to match → alert

[Monitor in Better Stack](https://uptime.betterstack.com/team/t532372/monitors/4326514)

### Alert delivery

- Email + phone-call to the account owner
- No escalation policy configured — Better Stack default is "alert once, notify on recovery"
- Save the Better Stack calling number(s) as a contact (`Better Stack alerts`) so the call doesn't get spam-filtered

### Testing the alert path

1. **Without breaking anything** — open the monitor → "Send test incident" button. You should get an email and (if voice is enabled) a phone call within seconds.
2. **End-to-end** — temporarily change `SUPABASE_URL` in Vercel env vars to an invalid value, redeploy, wait 3-6 min for the alert, then revert and redeploy.

---

## Supabase keepalive cron

Independent of Better Stack, in case Better Stack is ever unreachable.

- Vercel cron in `vercel.json`: `{ "path": "/api/keepalive", "schedule": "0 0 * * *" }` (daily at 00:00 UTC)
- `/api/keepalive` runs the same Supabase SELECT and logs `[keepalive] ok` or `[keepalive] supabase error` to Vercel runtime logs
- Supabase free-tier projects auto-pause after 7 days of inactivity. Daily pings give a 7× safety margin.

Verify firings: Vercel dashboard → `lockandlogic` → Logs → filter to `/api/keepalive`.

---

## Post-launch checklist

When `www.lockandlogic.com` flips from `lockandlogic-coming-soon` to the Astro project (per [Launch Plan](/launch-plan)):

- [ ] Either edit monitor `4326514` URL to `https://www.lockandlogic.com/api/health`, or add a second monitor for the canonical domain (free tier has 10 slots)
- [ ] Confirm the new URL returns 200 with `"ok":true` before cutting over
- [ ] After cutover, watch Better Stack for 30 minutes to make sure no regional check fails

---

## Future improvements (not done yet)

- **Sentry** browser SDK — catches client-side errors users hit (the kind of issue the recent "Network error" symptom would have surfaced). Free tier covers small sites; ~3 lines to wire up. Defer until after launch to keep the bundle slim during ad-driven traffic ramp-up.
- **Resend health probe** — current synthetic test skips the email send, so a broken Resend domain wouldn't surface here. Risk is low (Resend domain doesn't randomly break once verified) but a once-daily cron that calls `resend.domains.get(...)` would close the gap.

---

## Files & env vars

**Endpoints**
- `src/pages/api/health.ts` — health endpoint
- `src/pages/api/contact.ts` — contact endpoint (synthetic bypass branch at top of POST)
- `src/pages/api/keepalive.ts` — Supabase ping for daily cron

**Config**
- `vercel.json` — daily keepalive cron schedule
- `astro.config.mjs` — `security.checkOrigin` + `allowedDomains` (CSRF guard relies on these)

**Env vars (production + .env)**
- `SYNTHETIC_SECRET` — gates the contact-form synthetic bypass
- All other env vars are documented in [Forms System](/forms-system-technical) and [Hosting](/hosting-technical)
