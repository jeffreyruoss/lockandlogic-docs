# Forms System

Your website has two built-in forms that handle everything automatically — no manual work needed on your end.

## How It Works

### Contact Form (`/contact`)

When a visitor fills out the contact form, you'll receive an email notification at **info@lockandlogic.com** (and your personal email) with their name, email, phone, and message. You can reply directly to the notification email and it will go straight to the customer.

### Newsletter Signup (Homepage + Coming Soon Page)

When someone subscribes, their email is automatically added to your **Mailchimp** mailing list ("Lock & Logic, LLC"). No email notification is sent for subscriptions — they just show up in your Mailchimp audience. Both the main website and the coming-soon page feed into the same mailing list.

Each signup is also automatically labeled in Mailchimp with a tag showing where it came from — `coming-soon-signup` from the coming-soon page and `website-signup` from the main site. These tags let you target the right people when you send campaigns, and they keep your website opt-ins cleanly separated from any contacts you import yourself. See the [Email Opt-In Campaign](/email-opt-in-campaign) guide for how this is used.

## Where to Find Submissions

All form submissions are permanently stored in a database, regardless of whether the email notification succeeds. You can view them anytime at:

**[Supabase Dashboard](https://supabase.com/dashboard/project/yfsnhellrgjpjjkgoqry)** > Table Editor > `form_submissions`

Each entry shows:
- **Form type** — contact or newsletter
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

