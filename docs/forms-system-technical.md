# Forms System — Technical Reference

> Developer reference for the forms pipeline, stack, and configuration

---

## Architecture

Both forms use the same server-side pipeline:

```
Honeypot check → Turnstile verify → Rate limit → Validate → Log to Supabase → Action
```

- **Contact** action: send email via Resend
- **Newsletter** action: subscribe via Mailchimp API

## Stack

| Service | Purpose | Dashboard |
|---------|---------|-----------|
| **Supabase** | Postgres database for form logging | [Dashboard](https://supabase.com/dashboard/project/yfsnhellrgjpjjkgoqry) |
| **Resend** | Transactional email (notifications) | [Dashboard](https://resend.com) |
| **Cloudflare Turnstile** | Bot protection widget | [Dashboard](https://dash.cloudflare.com/turnstile) |
| **Mailchimp** | Newsletter list management | [Dashboard](https://mailchimp.com) |

## Key Files

**Server utilities** (`src/lib/`):
- `supabase.ts` — Supabase client
- `resend.ts` — Resend client
- `turnstile.ts` — Turnstile server-side verification
- `rate-limit.ts` — IP-based rate limiting (queries Supabase)
- `validate.ts` — sanitization, HTML encoding, email validation, honeypot, length limits
- `mailchimp.ts` — Mailchimp Marketing API subscription
- `email-templates.ts` — HTML email templates for notifications

**API routes** (`src/pages/api/`):
- `contact.ts` — POST `/api/contact/`
- `newsletter.ts` — POST `/api/newsletter/`
- `keepalive.ts` — GET, hit by daily cron to prevent Supabase free-tier project pause

**Components** (`src/components/`):
- `ContactForm.astro` — contact form with client-side validation
- `Newsletter.astro` — newsletter signup (homepage)

**Coming-soon page** (separate repo):
- `api/newsletter.js` — Vercel serverless function (same logic, vanilla JS)

## Database Schema

Single table `form_submissions`:

```sql
id          UUID        (auto-generated)
form_type   TEXT        ('contact' | 'newsletter')
data        JSONB       (all form fields as JSON)
ip_address  INET        (submitter's IP)
created_at  TIMESTAMPTZ (auto-timestamped)
```

## Environment Variables

| Variable | Used By |
|----------|---------|
| `PUBLIC_TURNSTILE_SITE_KEY` | Client-side Turnstile widget |
| `TURNSTILE_SECRET_KEY` | Server-side Turnstile verification |
| `SUPABASE_URL` | Supabase client |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase client (JWT format, labeled "Legacy" in dashboard) |
| `RESEND_API_KEY` | Resend email sending (sending-only permission) |
| `MAILCHIMP_API_KEY` | Mailchimp API |
| `MAILCHIMP_SERVER_PREFIX` | Mailchimp API (e.g. `us20`) |
| `MAILCHIMP_LIST_ID` | Mailchimp audience ID |
| `NOTIFICATION_EMAIL` | Comma-separated recipients for form notifications |
| `ADMIN_EMAIL` | Recipient for error alerts (Mailchimp failures) |

## Security

- **CSRF**: Astro's `checkOrigin: true` blocks cross-origin POST requests
- **XSS**: All user input is HTML-entity-encoded before embedding in email templates
- **Input limits**: Server-side max lengths (name: 200, email: 320, message: 5000 chars)
- **Rate limiting fails closed**: if Supabase is unreachable, submissions are denied
- **Turnstile fails closed**: if Cloudflare is unreachable, submissions are denied

## DNS Records (Email)

Managed via GoDaddy, auto-configured by Resend:
- **SPF** (TXT) — authorizes Resend to send from lockandlogic.com
- **DKIM** (CNAME) — cryptographic email signing
- **MX** — mail routing for bounce handling
