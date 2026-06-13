# Admin Dashboard

Your website has a private control panel where you can manage parts of the site yourself — no developer needed. It lives at **lockandlogic.com/admin** and is protected by a password.

Right now it has two tools: **promo pop-ups** and a **form submissions viewer**. It's built to grow, so more tools can be added over time.

## Signing In

1. Go to **lockandlogic.com/admin**
2. Enter your admin password

This is a separate password from the one for this documentation site. Once you're in, you'll stay signed in on that device for about a week. There's a **Log out** button in the top-right corner whenever you want to sign out.

## Promo Pop-Ups

A promo pop-up is a small message that appears to visitors on your website — for example *"Now Open!"*, a limited-time discount, a holiday closure notice, or a special event announcement.

### Creating one

Go to **Dashboard → Modals → New modal** and fill in:

- **Title** — the headline (e.g. "Now Open!")
- **Body** — the message text
- **Button label & link** *(optional)* — adds a button, e.g. "Book now" linking to your booking page
- **Start & End** *(optional)* — schedule when the pop-up should appear and disappear. Leave blank to show it right away with no end date.
- **Show on pages** *(optional)* — limit it to certain pages. Leave blank to show it across the whole site.
- **Frequency** — *Once per session* (shows once per visit, the most common choice) or *Every visit*
- **Active** — the on/off switch. Only **active** pop-ups appear on the site.

### Turning it on and off

- Untick **Active** (or delete it) to take a pop-up down at any time.
- Editing a pop-up will show it again to people who already saw it, so an updated message reaches everyone.
- If more than one is active, the most recently created matching one is shown.

## Form Submissions

Every message sent through your website — contact form, group inquiry, and newsletter signup — is saved and viewable here, even if the notification email ever fails to arrive.

Go to **Dashboard → Submissions** to:

- See all submissions, **newest first**
- **Filter** by type (All, Contact, Group Inquiry, Newsletter)
- Choose how many to show **per page** and click **Prev / Next** to page through them

This is the easy day-to-day view. The same data also lives in your Supabase database if you ever need it there.

## Adding More Later

The dashboard is designed to expand. Future tools could include things like a leaderboard entry screen for game results, or managing your FAQ content directly — each added as a new section without rebuilding what's there.

---

## Technical Notes

*For reference — you don't need any of this to use the dashboard.*

- **Where it lives:** built into the main website (Astro), under `/admin`. Pages are server-rendered and protected by middleware, so they can't be reached without signing in. The dashboard is hidden from Google (no-index and excluded from the sitemap).
- **Sign-in:** a single shared password (no individual user accounts). Signing in sets a secure, signed, browser-only session cookie that lasts about a week.
- **Data storage (Supabase):**
  - Promo pop-ups are stored in a `site_modals` table. The public website reads only the currently-active pop-up through a small behind-the-scenes endpoint.
  - Form submissions use the existing `form_submissions` table.
  - Both are server-side only — visitors' browsers never touch the database directly.
