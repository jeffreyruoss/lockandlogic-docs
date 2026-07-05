# Admin Dashboard

Your website has a private control panel where you can manage parts of the site yourself — no developer needed. It lives at **lockandlogic.com/admin** and is protected by a password.

It includes tools for **promo pop-ups**, a **top announcement bar**, a **form submissions viewer**, and **FAQ management**, plus an at-a-glance **dashboard**. It's built to grow, so more tools can be added over time. This page walks through every screen with screenshots so you always know where things are.

> The screenshots below use example content, and customer details in the Submissions screenshot have been replaced with placeholders for privacy. Click any image to enlarge it.

## 1. Signing In

Go to **lockandlogic.com/admin** and enter your admin password.

[![The admin sign-in screen](/screenshots/admin/01-login.png)](/screenshots/admin/01-login.png)

- This is a **separate password** from the one for this documentation site.
- Once you're in, you stay signed in on that device for about a week.
- There's a **Log out** button in the top-right corner of every admin screen.

## 2. The Dashboard

After signing in you land on the dashboard. The menu across the top — **Dashboard, Announcement, Modals, Submissions, FAQs** — gets you to every tool.

[![The admin dashboard home screen with quick stats and tool cards](/screenshots/admin/02-dashboard.png)](/screenshots/admin/02-dashboard.png)

The four cards at the top are an at-a-glance summary:

- **Submissions** — total form submissions, and how many came in this month
- **Active modals** — how many pop-ups are currently switched on
- **FAQs** — how many questions are live on your public FAQ page
- **Announcement bar** — whether the top banner is currently on or off

Below the stats, each tool has its own card — click one, or use the top menu.

## 3. Announcement Bar

The announcement bar is a thin strip across the **very top of every page** — great for short, timely messages like *"Now open!"* or holiday hours. Only **one** announcement shows on the site at a time (turning one on automatically turns the others off).

[![The announcement bar list, showing one active and one inactive announcement](/screenshots/admin/03-announcements-list.png)](/screenshots/admin/03-announcements-list.png)

Click **+ New announcement** (or any existing one) to open the editor.

[![The new-announcement form with all of its options](/screenshots/admin/04-announcement-form.png)](/screenshots/admin/04-announcement-form.png)

Fill in:

- **Message** — the text shown in the bar
- **Link label & Link URL** *(optional)* — adds a clickable link, e.g. "Book now" → `/book`
- **Open link in a new tab** — handy for links to other websites
- **Style** — the color/tone: **Info** (gold), **Alert** (red), or **Success** (teal)
- **Start & End** *(optional)* — schedule when it appears and disappears. Leave blank to show it right away with no end date.
- **Let visitors dismiss it** — shows an ✕ so visitors can close the bar. When dismissible, choose what happens next:
  - *Comes back next visit* — reappears the next time they come to the site
  - *Stays gone on that device* — once they close it, it stays closed
- **Active** — the on/off switch. It's on by default; only the active announcement shows on the site.

Click **Create announcement** to save.

**Preview & Duplicate.** The **Preview** button shows exactly how the bar will look on your site — color, link, and dismiss ✕ — without saving or publishing anything. On an existing announcement, **Duplicate** opens a ready-made copy as a starting point: every field is carried over, but the copy starts switched **off** with a cleared schedule, so you can tweak the wording and turn it on when you're ready.

## 4. Promo Pop-Ups (Modals)

A promo pop-up is a small message box that appears over the page for visitors — for example a grand-opening notice, a limited-time discount, or an event. The list shows all of your pop-ups and which one is active.

[![The promo modals list](/screenshots/admin/05-modals-list.png)](/screenshots/admin/05-modals-list.png)

Click **+ New modal** to create one.

[![The new-modal form with all of its options](/screenshots/admin/06-modal-form.png)](/screenshots/admin/06-modal-form.png)

Fill in:

- **Title** — the headline (e.g. "Grand Opening Weekend!")
- **Body** — the message text (line breaks are kept)
- **Button label & Button link** *(optional)* — adds a button, e.g. "Book now" → `/book`
- **Start & End** *(optional)* — schedule when it appears and disappears
- **Show on pages** *(optional)* — limit it to certain pages (e.g. `/`, `/rooms`). Leave blank to show it everywhere.
- **Frequency** — how often a visitor sees it:
  - *Once per session* — once per visit (resets when they close the browser)
  - *Once ever* — shows a single time on that device
  - *Every visit* — every time
- **Active** — the on/off switch (on by default)

Click **Create modal** to save.

**Preview & Duplicate.** The **Preview** button shows the pop-up exactly as visitors will see it — title, message, and button — without saving it or showing it to anyone. On an existing pop-up, **Duplicate** creates a copy as a starting point: every field is carried over, but the copy starts switched **off** with a cleared schedule, so it won't go live until you're ready.

> **Editing re-shows it.** If you change a pop-up or announcement, anyone who already dismissed the old version will see the updated one — so a new message reaches everyone.

## 5. Form Submissions

Every message sent through your website — **contact form, group inquiry, and newsletter signup** — is saved here, even if a notification email ever fails to arrive.

[![The form submissions viewer with the monthly breakdown and submission cards](/screenshots/admin/07-submissions.png)](/screenshots/admin/07-submissions.png)

From this screen you can:

- See all submissions, **newest first**
- **Filter** by type — All, Contact, Group Inquiry, Newsletter
- **Search** by name or email
- Set how many to show **per page**, and click **Prev / Next** to page through them
- Open the **Monthly breakdown** to see how many came in each month

This is your easy day-to-day view — no need to dig into the database.

## 6. FAQs

The FAQs screen controls the questions and answers on your public **FAQ page**. Everything here is grouped by category.

[![The FAQ management screen with drag handles and numbering](/screenshots/admin/08-faqs.png)](/screenshots/admin/08-faqs.png)

- Click **+ New FAQ** to add a question, or click any question to edit it.
- **Reorder** questions by dragging the **⠿ handle** on the left — the order you set is the order visitors see.
- Switching a FAQ to inactive **hides it** from the public page without deleting it.

Click any question to open its editor, where you can change the **category**, **question**, or **answer** (simple links are allowed), turn it on or off, or delete it.

[![The FAQ edit screen](/screenshots/admin/09-faq-edit.png)](/screenshots/admin/09-faq-edit.png)

## Good to Know

- **You can always undo by switching things off.** Untick *Active* (or delete) to take a pop-up or announcement down at any time.
- **Nothing here can break the website.** These tools only change content — pop-ups, the banner, FAQs, and the submissions you view.
- **It's private.** The dashboard is password-protected and hidden from Google.
- **It's built to grow** — more tools can be added over time without disturbing what's already there.

---

## Technical Notes

*For reference — you don't need any of this to use the dashboard.*

- **Where it lives:** built into the main website (Astro), under `/admin`. Pages are server-rendered and protected by middleware, so they can't be reached without signing in. The dashboard is hidden from Google (no-index and excluded from the sitemap).
- **Sign-in:** a single shared password (no individual user accounts). Signing in sets a secure, signed, browser-only session cookie that lasts about a week.
- **Data storage (Supabase):**
  - Promo pop-ups (`site_modals`), the announcement bar (`announcements`), and FAQs (`faqs`) each have their own table. The public site reads only the active pop-up and announcement through small behind-the-scenes endpoints, and the FAQ page reads the live questions when it loads.
  - Form submissions use the existing `form_submissions` table.
  - Everything is server-side only — visitors' browsers never touch the database directly.
