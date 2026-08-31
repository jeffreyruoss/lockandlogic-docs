# Hosting — Technical Reference

> Infrastructure, deployment pipelines, and configuration details

---

## Main Website (lockandlogic.com)

### Platform

- **Vercel** — SSR deployment with the `@astrojs/vercel` adapter
- **Framework:** Astro (server-side rendered, not static)
- **Repo:** `jeffreyruoss/lockandlogic` (private GitHub repo)
- **Vercel Project:** Linked via `vercel link`. **Auto-deploy on push is disabled** — production deploys are run manually via `vercel --prod`.

### Deployment Pipeline

```
vercel --prod  (run from repo root)
  → Vercel uploads source, runs `npm run build`
  → Deploys to production (~30-60 seconds)
  → Previous deployment available for instant rollback
```

- **Preview deployments:** `vercel` (no `--prod`) produces a unique preview URL
- **Rollback:** Any previous deployment can be promoted to production instantly from the Vercel dashboard, or via `vercel alias set <previous-deploy-url> lockandlogic.com`

### Runtime

- **Serverless Functions:** API routes (`/api/contact/`, `/api/newsletter/`, `/api/keepalive/`) run as Vercel Serverless Functions (Node.js). The site enforces trailing-slash URLs — non-slash requests get a 308 redirect.
- **Cron:** A daily GitHub Actions workflow (`.github/workflows/supabase-keepalive.yml`, 12:41 UTC) hits `/api/keepalive/` to prevent the Supabase free-tier project from auto-pausing. This was a Vercel cron originally; `vercel.json` was removed and GitHub Actions is now the source of truth.
- **Static assets:** Served from Vercel's Edge Network (global CDN)
- **SSR pages:** Rendered per-request via serverless functions

### Domain & DNS

- **Registrar:** GoDaddy
- **DNS:** Managed via GoDaddy, pointing to Vercel
- **SSL:** Auto-provisioned by Vercel (Let's Encrypt), auto-renews
- **Email DNS records** (SPF, DKIM, MX): Configured for Resend — see [Forms System](/forms-system) technical reference

### Environment Variables

Managed in Vercel dashboard (Settings → Environment Variables). See [Forms System](/forms-system) for the full list. Key variables:

| Variable | Scope |
|----------|-------|
| `PUBLIC_TURNSTILE_SITE_KEY` | Production + Preview |
| `TURNSTILE_SECRET_KEY` | Production + Preview |
| `SUPABASE_URL` | Production + Preview |
| `SUPABASE_SERVICE_ROLE_KEY` | Production + Preview |
| `RESEND_API_KEY` | Production + Preview |
| `MAILCHIMP_API_KEY` | Production + Preview |
| `MAILCHIMP_SERVER_PREFIX` | Production + Preview |
| `MAILCHIMP_LIST_ID` | Production + Preview |
| `NOTIFICATION_EMAIL` | Production + Preview |
| `ADMIN_EMAIL` | Production + Preview |

Local development uses `.env` with Turnstile test keys (always pass).

### Vercel Dashboard

- **URL:** [vercel.com/dashboard](https://vercel.com/dashboard)
- **Account:** Logged in via GitHub (`jeffreyruoss`)
- **Plan:** Hobby (free) — sufficient for current traffic

---

## Documentation Site (This Site)

### Platform

- **GitHub Pages** — static hosting, free
- **Framework:** VitePress
- **Repo:** `jeffreyruoss/lockandlogic-docs` (separate from main site)
- **Base path:** `/lockandlogic-docs/`

### Deployment Pipeline

```
git push to main
  → GitHub Actions workflow (.github/workflows/deploy.yml) triggers
  → Runs npm run docs:build (VitePress build)
  → Deploys built output to gh-pages branch
  → GitHub Pages serves from gh-pages branch
```

### Configuration

- **VitePress config:** `.vitepress/config.mts`
- **Source directory:** `docs/` (`srcDir: 'docs'`)
- **Base path:** `/lockandlogic-docs/` (required for GitHub Pages project sites)
- **Custom theme:** `.vitepress/theme/` (password gate, admin sidebar, countdown bar)

### Access Control

- **Password gate:** Client-side (`PasswordGate.vue`), stored in `localStorage` as `ll-docs-auth`
- **Admin sidebar:** IP-based detection via `api.ipify.org`, admin IP: `45.11.81.248`, cached in `localStorage` as `ll-docs-admin`
- **Auth bypass:** `?pw=` query parameter for sharing direct links

---

## Coming Soon Page

### Platform

- **Vercel** — separate Vercel project (`lockandlogic-coming-soon`) from the main site
- **Repo:** `coming-soon/` directory inside the main repo, but its own git repo
- **Type:** Static HTML + one Vercel serverless function (`api/newsletter.js`) that writes to the same Supabase + Mailchimp pipeline as the Astro site

### Domain Routing

Currently, `lockandlogic.com` and `www.lockandlogic.com` point to the coming-soon Vercel project. At soft launch the aliases get reassigned to the Astro project — see [Launch Plan](/launch-plan) for the exact `vercel alias set` commands. DNS records (GoDaddy) stay the same; Vercel handles the project routing change. ~5-minute switchover with zero downtime.

---

## Infrastructure Diagram

```
                    GoDaddy (DNS)
                        │
                  lockandlogic.com
                        │
                    ┌────┴────┐
                    │  Vercel │
                    │  (CDN)  │
                    └────┬────┘
                         │
              ┌──────────┼──────────┐
              │          │          │
         Static      Serverless   SSR
         Assets      Functions    Pages
              │          │          │
              │     ┌────┼────┐    │
              │     │    │    │    │
              │  Supabase │ Resend │
              │     │  Turnstile  │
              │     │  Mailchimp  │
              │     └────┴────┘   │
              └──────────┴────────┘

  Docs Site:  GitHub Pages ← GitHub Actions ← lockandlogic-docs repo
```

---

## Monitoring & Logs

- **Vercel Logs:** Real-time function logs available in Vercel dashboard → Logs tab
- **Deployment History:** Full history with instant rollback in Vercel dashboard → Deployments tab
- **GitHub Actions:** Docs site build logs in the lockandlogic-docs repo → Actions tab
- **Supabase:** Database and API logs in Supabase dashboard

---

## Cost Summary

| Service | Cost | Notes |
|---------|------|-------|
| Vercel (main site) | Free (Hobby) | 100GB bandwidth, 100hr serverless |
| Vercel (coming soon) | Free (Hobby) | Will be retired at launch |
| GitHub Pages (docs) | Free | Included with GitHub |
| GoDaddy (domain) | ~$20/year | Domain renewal |
| Supabase | Free tier | 500MB database, 50K API requests/month |
| Resend | Free tier | 3,000 emails/month |
| Cloudflare Turnstile | Free | Unlimited verifications |
| Mailchimp | Free tier | Up to 500 subscribers |

**Total ongoing cost: ~$20/year** (domain only) until traffic exceeds free tier limits.
