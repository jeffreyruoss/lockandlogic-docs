# Website Hosting

> Where your websites live and how they stay online

---

## Main Website (lockandlogic.com)

Your main website is hosted on **[Vercel](https://vercel.com)** — the same platform used by companies like McDonald's, Under Armour, and The Washington Post.

**What this means for you:**

- **Always online** — Vercel serves your site from a global network of servers, so visitors get fast load times regardless of location
- **One-command deploys** — code updates go live within about a minute by running `vercel --prod` from the project (auto-deploy from GitHub is intentionally disabled so changes are deployed deliberately)
- **Free SSL** — your site is served over HTTPS (the padlock icon in the browser), which is important for trust, SEO, and security
- **No server maintenance** — there's no server to patch, restart, or monitor. Vercel handles all of that

**Domain:** Your domain (`lockandlogic.com`) is registered through **GoDaddy** and points to Vercel's servers via DNS settings.

---

## Documentation Site (This Site)

This documentation site is hosted on **GitHub Pages** — a free hosting service from GitHub.

- Lives at a separate URL from your main site
- Automatically rebuilds via GitHub Actions when documentation is updated
- Password-protected so only you can access it

---

## Coming Soon Page

The temporary "coming soon" page was a separate project also hosted on **Vercel**. **As of 2026-07-25 the soft launch is done** — `lockandlogic.com` and `www.lockandlogic.com` now serve the main website, not the coming-soon page. The coming-soon project is being kept around for now as a quick rollback option. See [Launch Plan](/launch-plan).

---

## Cost

| Service | Monthly Cost |
|---------|-------------|
| Vercel (main site hosting) | Free (Pro plan available if needed) |
| GitHub Pages (docs site) | Free |
| GoDaddy (domain registration) | ~$20/year |

There are no ongoing hosting fees beyond your domain renewal.

---

## Uptime & Reliability

Vercel has a strong track record of reliability. In the rare event of an outage, their status page is at [vercel.com/status](https://www.vercel.com/status). You wouldn't need to do anything — service restores automatically.
