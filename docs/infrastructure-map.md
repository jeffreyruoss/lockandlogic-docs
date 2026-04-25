# Infrastructure Map

> How every service, platform, and tool connects across the Lock & Logic project

---

## High-Level Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                          DOMAIN & DNS                               │
│                                                                     │
│  GoDaddy ─── lockandlogic.com ─── DNS records ──┐                  │
│                    │                              │                  │
│              (A / CNAME)                    (SPF, DKIM, MX)         │
│                    │                              │                  │
│                    ▼                              ▼                  │
│               Vercel CDN                    Resend (email)          │
│            (SSL via Let's Encrypt)                                   │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Three Websites, Three Repos, Two Hosts

```
┌──────────────────────┐  ┌──────────────────────┐  ┌──────────────────────┐
│   MAIN WEBSITE       │  │   COMING SOON PAGE   │  │   DOCS SITE          │
│                      │  │                      │  │                      │
│  Framework: Astro    │  │  Static HTML/CSS/JS  │  │  Framework: VitePress │
│  Rendering: SSR      │  │  + 1 serverless fn   │  │  Rendering: Static   │
│  Repo: lockandlogic  │  │  Repo: lockandlogic  │  │  Repo: lockandlogic  │
│        (main repo)   │  │        /coming-soon   │  │        -docs         │
│                      │  │        (separate repo)│  │        (separate repo)│
│  Host: Vercel        │  │  Host: Vercel        │  │  Host: GitHub Pages  │
│  Deploy: git push    │  │  Deploy: git push    │  │  Deploy: GitHub      │
│          → auto      │  │          → auto      │  │    Actions → auto    │
└──────────┬───────────┘  └──────────┬───────────┘  └──────────┬───────────┘
           │                         │                          │
           ▼                         ▼                          ▼
┌──────────────────────┐  ┌──────────────────────┐  ┌──────────────────────┐
│  GitHub              │  │  GitHub              │  │  GitHub              │
│  jeffreyruoss/       │  │  jeffreyruoss/       │  │  jeffreyruoss/       │
│  lockandlogic        │  │  lockandlogic        │  │  lockandlogic-docs   │
│  (private)           │  │  /coming-soon (pvt)  │  │  (private)           │
└──────────────────────┘  └──────────────────────┘  └──────────────────────┘
```

---

## Deployment Pipelines

### Main Site

```
Developer pushes code
        │
        ▼
GitHub repo (lockandlogic)
        │
        ▼ (webhook)
Vercel detects push
        │
        ▼
npm run build (Astro + @astrojs/vercel adapter)
        │
        ├── Static assets → Vercel Edge Network (CDN)
        ├── Pages → Serverless Functions (SSR)
        └── API routes → Serverless Functions
                │
                ├── /api/contact
                ├── /api/newsletter
                └── /api/keepalive  (daily Vercel cron → Supabase ping)
```

### Docs Site

```
Developer pushes code
        │
        ▼
GitHub repo (lockandlogic-docs)
        │
        ▼ (trigger)
GitHub Actions workflow (.github/workflows/deploy.yml)
        │
        ▼
npm run docs:build (VitePress)
        │
        ▼
Deploy to gh-pages branch
        │
        ▼
GitHub Pages serves static files
```

### Coming Soon Page

```
Developer pushes code
        │
        ▼
GitHub repo (coming-soon)
        │
        ▼ (webhook)
Vercel detects push
        │
        ├── index.html → Static (CDN)
        └── api/newsletter.js → Serverless Function
```

---

## Form Submission Flow

Both forms follow the same pipeline:

```
Visitor fills out form
        │
        ▼
Client-side validation (browser)
        │
        ▼
Cloudflare Turnstile ←──── Cloudflare servers
(bot verification)          (verify token)
        │
        ▼
POST to Vercel Serverless Function
        │
        ▼
┌─────────────────────────────────┐
│  SERVER-SIDE PIPELINE           │
│                                 │
│  1. Honeypot check              │
│  2. Turnstile server verify ───────→ Cloudflare API
│  3. Rate limit check ─────────────→ Supabase (count recent submissions)
│  4. Input validation & sanitize │
│  5. Log to database ──────────────→ Supabase (form_submissions table)
│  6. Action (varies by form)     │
│         │                       │
└─────────┼───────────────────────┘
          │
          ├── Contact:
          │         │
          │         ▼
          │    Resend API ──→ Email to info@lockandlogic.com
          │                   (from noreply@lockandlogic.com)
          │
          └── Newsletter:
                    │
                    ▼
               Mailchimp API ──→ Add to "Lock & Logic, LLC" audience
                    │
                    ▼ (on failure)
               Resend API ──→ Alert email to admin
```

---

## Service Connections

```
┌─────────────────────────────────────────────────────────────────┐
│                        VERCEL                                    │
│                                                                  │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐ │
│  │ Main Site   │  │ Coming Soon │  │ Environment Variables   │ │
│  │ (Astro SSR) │  │ (Static)    │  │                         │ │
│  │             │  │             │  │ SUPABASE_URL            │ │
│  │ Pages (SSR) │  │ index.html  │  │ SUPABASE_SERVICE_ROLE_  │ │
│  │ Static files│  │ newsletter  │  │ RESEND_API_KEY          │ │
│  │ API routes  │  │   function  │  │ TURNSTILE_SECRET_KEY    │ │
│  │             │  │             │  │ MAILCHIMP_API_KEY       │ │
│  └──────┬──────┘  └──────┬──────┘  │ MAILCHIMP_SERVER_PREFIX │ │
│         │                │         │ MAILCHIMP_LIST_ID       │ │
│         └────────┬───────┘         │ NOTIFICATION_EMAIL      │ │
│                  │                 │ ADMIN_EMAIL              │ │
│                  │                 └─────────────────────────┘ │
│         (SSL via Let's Encrypt)                                 │
└──────────────────┼──────────────────────────────────────────────┘
                   │
      ┌────────────┼─────────────┬──────────────┐
      │            │             │              │
      ▼            ▼             ▼              ▼
┌──────────┐ ┌──────────┐ ┌──────────┐  ┌───────────┐
│ Supabase │ │  Resend  │ │Cloudflare│  │ Mailchimp │
│          │ │          │ │ Turnstile│  │           │
│ Postgres │ │ Email    │ │          │  │ Newsletter│
│ database │ │ delivery │ │ Bot      │  │ audience  │
│          │ │          │ │ verify   │  │ mgmt      │
│ form_    │ │ noreply@ │ │          │  │           │
│ submis-  │ │ lock...  │ │ Widget + │  │ "Lock &   │
│ sions    │ │ .com     │ │ server   │  │  Logic,   │
│ table    │ │          │ │ API      │  │  LLC"     │
└──────────┘ └──────────┘ └──────────┘  └───────────┘
```

---

## DNS & Email Authentication

```
GoDaddy DNS Records for lockandlogic.com
        │
        ├── A / CNAME ──→ Vercel (website hosting)
        │
        ├── SPF (TXT) ──→ Authorizes Resend to send email
        │
        ├── DKIM (CNAME) ──→ Cryptographic email signing (Resend)
        │
        └── MX ──→ Mail routing for bounce handling (Resend)
```

---

## Full Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Domain** | GoDaddy | Domain registration + DNS |
| **CDN / Hosting** | Vercel | Main site + coming soon hosting, SSL, CDN |
| **Hosting** | GitHub Pages | Docs site hosting |
| **CI/CD** | Vercel (auto) | Main site + coming soon deploys |
| **CI/CD** | GitHub Actions | Docs site deploys |
| **Version Control** | Git + GitHub | 3 private repos |
| **Framework** | Astro (SSR) | Main site |
| **Framework** | VitePress | Docs site |
| **Adapter** | @astrojs/vercel | Astro → Vercel serverless |
| **Runtime** | Vercel Serverless Functions | API routes (Node.js) |
| **Database** | Supabase (Postgres) | Form submission logging + rate limiting |
| **Email** | Resend | Transactional notifications |
| **Newsletter** | Mailchimp | Subscriber list management |
| **Bot Protection** | Cloudflare Turnstile | Form spam prevention |
| **SSL** | Let's Encrypt (via Vercel) | HTTPS certificates (auto-renewed) |

---

## Account Access

| Service | Dashboard URL |
|---------|--------------|
| Vercel | [vercel.com/dashboard](https://vercel.com/dashboard) |
| GitHub | [github.com/jeffreyruoss](https://github.com/jeffreyruoss) |
| Supabase | [supabase.com/dashboard/project/yfsnhellrgjpjjkgoqry](https://supabase.com/dashboard/project/yfsnhellrgjpjjkgoqry) |
| Resend | [resend.com](https://resend.com) |
| Cloudflare Turnstile | [dash.cloudflare.com/turnstile](https://dash.cloudflare.com/turnstile) |
| Mailchimp | [mailchimp.com](https://mailchimp.com) |
| GoDaddy | [godaddy.com](https://godaddy.com) |
