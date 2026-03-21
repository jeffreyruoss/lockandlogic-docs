# Forms System

Your website has three built-in forms that handle everything automatically — no manual work needed on your end.

## How It Works

### Contact Form (`/contact`)

When a visitor fills out the contact form, you'll receive an email notification at **info@lockandlogic.com** (and your personal email) with their name, email, phone, and message. You can reply directly to the notification email and it will go straight to the customer.

### Group Inquiry Form (`/groups`)

Same as the contact form, but designed for corporate events and group bookings. Includes fields for company name, group size, event type, and preferred date. You'll receive the same email notification with all the details.

### Newsletter Signup (Homepage + Coming Soon Page)

When someone subscribes, their email is automatically added to your **Mailchimp** mailing list ("Lock & Logic, LLC"). No email notification is sent for subscriptions — they just show up in your Mailchimp audience. Both the main website and the coming-soon page feed into the same mailing list.

## Where to Find Submissions

All form submissions are permanently stored in a database, regardless of whether the email notification succeeds. You can view them anytime at:

**[Supabase Dashboard](https://supabase.com/dashboard/project/yfsnhellrgjpjjkgoqry)** > Table Editor > `form_submissions`

Each entry shows:
- **Form type** — contact, group_inquiry, or newsletter
- **Data** — all the fields the visitor submitted
- **IP address** — the visitor's IP (used for spam protection)
- **Timestamp** — when it was submitted

## Spam Protection

Three layers of protection prevent fake submissions:

1. **Cloudflare Turnstile** — an invisible check that verifies the visitor is human (similar to reCAPTCHA but less intrusive)
2. **Hidden trap field** — a field invisible to real users that catches automated bots
3. **Rate limiting** — blocks more than 5 submissions per hour from the same IP address

## Email Deliverability

Notification emails come from `noreply@lockandlogic.com` and are authenticated with proper DNS records (SPF, DKIM, DMARC) so they land in your inbox, not spam. If you ever find notifications in spam, mark them as "not spam" and they should route correctly going forward.

## Failure Alerts

If a Mailchimp subscription fails for any reason, you'll receive an email alert at your personal email with the subscriber's address so you can add them manually. The submission is still saved in the database either way.

---

## Technical Reference

::: info
This section is for developer reference only.
:::

### Architecture

All three forms use the same server-side pipeline:

```
Honeypot check → Turnstile verify → Rate limit → Validate → Log to Supabase → Action
```

- **Contact & Group Inquiry** action: send email via Resend
- **Newsletter** action: subscribe via Mailchimp API

### Stack

| Service | Purpose | Dashboard |
|---------|---------|-----------|
| **Supabase** | Postgres database for form logging | [Dashboard](https://supabase.com/dashboard/project/yfsnhellrgjpjjkgoqry) |
| **Resend** | Transactional email (notifications) | [Dashboard](https://resend.com) |
| **Cloudflare Turnstile** | Bot protection widget | [Dashboard](https://dash.cloudflare.com/turnstile) |
| **Mailchimp** | Newsletter list management | [Dashboard](https://mailchimp.com) |

### Key Files

**Server utilities** (`src/lib/`):
- `supabase.ts` — Supabase client
- `resend.ts` — Resend client
- `turnstile.ts` — Turnstile server-side verification
- `rate-limit.ts` — IP-based rate limiting (queries Supabase)
- `validate.ts` — sanitization, HTML encoding, email validation, honeypot, length limits
- `mailchimp.ts` — Mailchimp Marketing API subscription
- `email-templates.ts` — HTML email templates for notifications

**API routes** (`src/pages/api/`):
- `contact.ts` — POST `/api/contact`
- `group-inquiry.ts` — POST `/api/group-inquiry`
- `newsletter.ts` — POST `/api/newsletter`

**Components** (`src/components/`):
- `ContactForm.astro` — contact form with client-side validation
- `InquiryForm.astro` — group inquiry form
- `Newsletter.astro` — newsletter signup (homepage)

**Coming-soon page** (separate repo):
- `api/newsletter.js` — Vercel serverless function (same logic, vanilla JS)

### Database Schema

Single table `form_submissions`:

```sql
id          UUID        (auto-generated)
form_type   TEXT        ('contact' | 'group_inquiry' | 'newsletter')
data        JSONB       (all form fields as JSON)
ip_address  INET        (submitter's IP)
created_at  TIMESTAMPTZ (auto-timestamped)
```

### Environment Variables

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

### Security

- **CSRF**: Astro's `checkOrigin: true` blocks cross-origin POST requests
- **XSS**: All user input is HTML-entity-encoded before embedding in email templates
- **Input limits**: Server-side max lengths (name: 200, email: 320, message: 5000 chars)
- **Rate limiting fails closed**: if Supabase is unreachable, submissions are denied
- **Turnstile fails closed**: if Cloudflare is unreachable, submissions are denied

### DNS Records (Email)

Managed via GoDaddy, auto-configured by Resend:
- **SPF** (TXT) — authorizes Resend to send from lockandlogic.com
- **DKIM** (CNAME) — cryptographic email signing
- **MX** — mail routing for bounce handling
