# Monitoring & Alerting — Technical Reference

> Uptime monitoring, synthetic form testing, and alert routing for the production site

::: warning Monitor was misconfigured from day one — fixed 2026-07-29
The monitor (`4326514`) had its check **inverted** for three months. It was created with type `keyword_absence`, which means *"raise an incident when this keyword IS present"* — so it treated the healthy response `"ok":true` as the failure condition. Every incident it ever raised said `Keyword found (looked for "ok":true)`, and one of those had been sitting **active since 2026-04-30**.

That also explains the pausing that looked unexplainable: with the check inverted, the monitor was permanently "down" while the site was perfectly fine, so it got paused to stop the false alerts — and unpausing it just restarted the false alerts.

**Fix:** monitor type changed to `keyword` (assert the keyword is *present*) — matching the Feeding Matters monitor, which was always configured correctly. The two earlier theories are both dead ends: it was never a DNS/404 problem and never a plan or region limit.

**Consequence worth being honest about:** uptime, SSL expiry, and the database/form checks were effectively **unmonitored from 2026-04-25 to 2026-07-29**. Nothing bad appears to have come of it, but the coverage described on this page did not exist during that window.
:::

---

## What gets monitored

| What | How | Frequency |
|---|---|---|
| Site reachability + SSL + DNS | Better Stack pings `/api/health` from 4 regions | Every 3 min |
| Supabase database | `/api/health` runs `SELECT id FROM form_submissions LIMIT 1` | Every 3 min (via Better Stack) |
| Contact form pipeline (end-to-end) | `/api/health` POSTs to `/api/contact` with a synthetic-bypass header | Every 3 min (via Better Stack) |
| Supabase pause prevention | GitHub Actions hits `/api/keepalive` | Daily at 12:00 UTC |

A single failure of any of those checks turns the Better Stack monitor red and sends an email + phone-call alert after a 60s confirmation period.

---

## Stack

| Service | Purpose | Dashboard |
|---|---|---|
| **Better Stack** | Uptime monitoring, alert routing, on-call | [uptime.betterstack.com](https://uptime.betterstack.com/team/t532372/monitors) |
| **GitHub Actions** | Triggers `/api/keepalive` daily; also runs the daily backup | [Actions tab](https://github.com/jeffreyruoss/lockandlogic/actions) |
| **Supabase** | Backend being monitored | [Supabase project](https://supabase.com/dashboard/project/yfsnhellrgjpjjkgoqry) |

---

## `/api/health` endpoint

Public GET endpoint at `https://www.lockandlogic.com/api/health` (also reachable at `https://lockandlogic.vercel.app/api/health`). Runs two checks in parallel and returns a JSON summary:

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
| URL | `https://www.lockandlogic.com/api/health` (changed from the vercel.app URL at the 2026-07-25 cutover) |
| Type | `keyword` — alert when the keyword is **missing**. Do **not** use `keyword_absence`; that inverts the check and alerts when the site is healthy (see the note at the top of this page). |
| Required keyword | `"ok":true` |
| Check frequency | 180s (3 min) |
| Confirmation period | 180s (requires two consecutive failed checks before alerting) |
| Recovery period | 180s |
| Regions | eu, us, as, au |
| Request timeout | 30s |

The keyword check catches three failure modes with one rule:

- **HTTP 503** (one of the checks failed) → no `"ok":true` in body → alert
- **HTTP 200 with `"ok":false`** (defense-in-depth, shouldn't happen but covered) → alert
- **Connection error / timeout / cert / DNS failure** → no body to match → alert

**Why a 180s confirmation period?** Vercel's per-region edge propagation can briefly trail a fresh deployment, and individual regions occasionally have transient hiccups. Both produce a single failed check that resolves on the next cycle. Requiring two consecutive failures (~6 min total) absorbs those without losing the ability to catch real outages.

[Monitor in Better Stack](https://uptime.betterstack.com/team/t532372/monitors/4326514)

### Alert delivery

- Email + phone-call to the account owner
- No escalation policy configured — Better Stack default is "alert once, notify on recovery"
- Save the Better Stack calling number(s) as a contact (`Better Stack alerts`) so the call doesn't get spam-filtered

### Testing the alert path

1. **Without breaking anything** — open the monitor → "Send test incident" button. You should get an email and (if voice is enabled) a phone call within seconds.
2. **End-to-end** — temporarily change `SUPABASE_URL` in Vercel env vars to an invalid value, redeploy, wait 3-6 min for the alert, then revert and redeploy.

---

## Deploying without spurious alerts

Use `npm run deploy` instead of bare `vercel --prod`. The wrapper at `scripts/deploy.mjs`:

1. Pauses monitor `4326514` via the Better Stack REST API
2. Runs `vercel --prod`
3. Polls `/api/health` until it returns 200 + `"ok":true` (max 120s)
4. Settles 60s for global edge propagation across non-US regions
5. Unpauses the monitor — always, even on build failure or polling timeout (in a `finally` block)

If unpause itself fails, the script exits with code 2 and prints `UNPAUSE MANUALLY` so it's noticed. Without `BETTERSTACK_API_TOKEN` set in `.env`, the script warns and falls back to a plain `vercel --prod` so it stays usable.

The Better Stack API token is created at `Better Stack → Settings → API tokens` (scope: Uptime → write) and stored in `.env` (already gitignored).

---

## Supabase keepalive

Independent of Better Stack, in case Better Stack is ever unreachable.

- GitHub Actions workflow `.github/workflows/supabase-keepalive.yml`, `cron: '0 12 * * *'` (daily at 12:00 UTC), plus a manual "Run workflow" button
- It `curl`s `https://lockandlogic.vercel.app/api/keepalive` and fails the job unless the response contains `"ok":true` — so a broken keepalive turns the workflow red instead of failing silently
- It deliberately uses the `vercel.app` URL rather than the custom domain: the job's only purpose is keeping Supabase awake, and that should still work even if the domain alias or DNS breaks
- `/api/keepalive` runs the same Supabase SELECT and logs `[keepalive] ok` or `[keepalive] supabase error` to Vercel runtime logs
- Supabase free-tier projects auto-pause after 7 days of inactivity. Daily pings give a 7× safety margin.

This used to be a Vercel cron defined in `vercel.json`; that file was removed and GitHub Actions is now the single source of truth.

Verify firings: [Actions tab](https://github.com/jeffreyruoss/lockandlogic/actions) → "Supabase keepalive". Failures also arrive by email via GitHub's default workflow-failure notifications.

---

## Post-launch checklist

The domain flip from `lockandlogic-coming-soon` to the Astro project happened **2026-07-25** (per [Launch Plan](/launch-plan)).

- [x] Monitor `4326514` URL changed to `https://www.lockandlogic.com/api/health` (name → `lockandlogic.com/api/health`)
- [x] Confirmed the new URL returns 200 with `"ok":true`
- [x] **Monitor `4326514` fixed 2026-07-29** — inverted check type corrected (`keyword_absence` → `keyword`) and unpaused. See the note at the top of this page.
- [ ] Watch Better Stack for 30 minutes to confirm no regional check fails
- [ ] Re-run `npm run deploy` once and confirm the pause/unpause wrapper leaves the monitor **running** afterwards. The 2026-07-25 deploy appeared to leave it paused, but that was the inverted check re-triggering — worth one clean confirmation now that the underlying bug is gone.
- [x] **End-to-end alert test passed 2026-07-30.** Rather than the UI's "test incident" (which only exercises notification delivery), the check itself was made to fail for real by temporarily pointing `required_keyword` at a string that couldn't match. Full cycle, exactly as designed:

  | Time (UTC) | Event |
  |---|---|
  | 00:28:59 | Sentinel keyword set |
  | 00:29:00 | Failure detected → status `pending` |
  | 00:32:11 | Incident `995334411` raised — `Keyword not found` |
  | 00:36:29 | Keyword reverted to `"ok":true` |
  | 00:40:28 | Incident auto-resolved |
  | 00:41:47 | Monitor 🟢 Up |

  Detection, the 180s confirmation delay, incident creation, recovery, and auto-resolve all work. Note the cause reads **"Keyword not found"** — every pre-fix incident said *"Keyword found"*, which is the clearest confirmation the type change was correct.

---

## Future improvements (not done yet)

- **Sentry** browser SDK — catches client-side errors users hit (the kind of issue the recent "Network error" symptom would have surfaced). Free tier covers small sites; ~3 lines to wire up. Defer until after launch to keep the bundle slim during ad-driven traffic ramp-up.
- **Resend health probe** — current synthetic test skips the email send, so a broken Resend domain wouldn't surface here. Risk is low (Resend domain doesn't randomly break once verified) but a once-daily cron that calls `resend.domains.get(...)` would close the gap.

---

## Files & env vars

**Endpoints**
- `src/pages/api/health.ts` — health endpoint
- `src/pages/api/contact.ts` — contact endpoint (synthetic bypass branch at top of POST)
- `src/pages/api/keepalive.ts` — Supabase ping hit by the daily GitHub Action

**Config**
- `.github/workflows/supabase-keepalive.yml` — daily keepalive schedule
- `.github/workflows/backup.yml` — daily Supabase table backup
- `astro.config.mjs` — `security.checkOrigin` + `allowedDomains` (CSRF guard relies on these)

**Deploy script**
- `scripts/deploy.mjs` — pause/deploy/settle/unpause wrapper, run via `npm run deploy`

**Env vars (production + .env)**
- `SYNTHETIC_SECRET` — gates the contact-form synthetic bypass (set in Vercel + local `.env`)
- `BETTERSTACK_API_TOKEN` — used by `scripts/deploy.mjs` to pause/unpause monitor `4326514` (local `.env` only — not needed in Vercel)
- All other env vars are documented in [Forms System](/forms-system-technical) and [Hosting](/hosting-technical)
