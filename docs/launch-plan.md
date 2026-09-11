# 🚀 Launch Plan

How we'll transition from the coming-soon page to the live website, and what needs to be ready ahead of opening day.

---

## Target Opening

::: tip Grand opening: Friday, September 19, 2026 (confirmed 2026-09-08)
**Three rooms open on day one:** Grandma Betty's Secret Recipe, The Initiation, and the seasonal Holiday Room (Blackwell's Sacrifice). **The Forgotten God and Nikola Tesla's Workshop open after the grand opening** — the website marks both "Coming Soon" until they have their own date.

The website now names the date everywhere (homepage, footer, contact, booking page, structured data), and the Google Business Profile was updated to September 19 on 2026-09-08 (change pending on Google's side).

**Booking went live (privately) on September 10**, when the Bookeo closing period was deleted, and **fully public on September 11** on the owners' go-ahead: every "Book" button is back on the website, and anyone can now book Grandma Betty's, The Initiation, or Blackwell's Sacrifice for September 19 and beyond. The Forgotten God and Tesla stay hidden from the booking page (and marked "Coming Soon" on the site) until their opening date is set.

**Official store hours confirmed September 11:** Monday–Friday 4:30 PM–10:00 PM, Saturday–Sunday 12:00 PM–10:00 PM. Now on the website (contact page, search-engine structured data, llms.txt); the owners are updating the Google Business Profile to match.

**Still to do before opening day:** promotion, and the attorney's sign-off on the waiver setup (being chased — see below).
:::

**Date history**, for the record: construction started the week of June 1, 2026. The date moved repeatedly — August 8 → postponed → August 15 → publicly postponed August 9 → indefinite as of August 17 — and landed on **September 19** on September 8. The website deliberately said "Opening Soon" with no date through all of it, so none of those slips ever cost anything publicly. September 19 is the first date the site has ever shown.

---

## Soft Launch — ✅ done 2026-07-25

::: tip The soft launch has happened
`lockandlogic.com` and `www.lockandlogic.com` now serve the main website instead of the coming-soon page. Checked and working: SSL on both addresses, the contact form end-to-end, mobile, and the sitemap. No booking links are live anywhere on the site, as planned.

Still to do: get the uptime monitor running again (see [Monitoring](/monitoring)) and switch Bookeo from its test payment mode to live. The coming-soon project is being kept for now as a rollback option. The real waiver is now in Bookeo (2026-09-04) — attorney sign-off on the setup is a hard-launch gate, see below.

Google Search Console is set up and the sitemap was resubmitted on 2026-07-29 — the `lockandlogic.com` property lives on the `admin@lockandlogic.com` account and covers both `www` and non-`www`. See [SEO Strategy → Google Search Console](/seo-strategy#google-search-console).
:::

The plan below is kept as the record of what the soft launch involved.

As soon as the site is ready, we'll quietly switch `lockandlogic.com` from the coming-soon page to the main Astro website. **This is a soft launch — not a public announcement.** The goals: give **room testers** a private way to book and play the rooms for free, and give Google time to index the site ahead of the public launch. During this phase the site has no public "Book" buttons and the `/book` page shows a "booking opens soon" state, so the public can't reach booking — testers book through a direct Bookeo link we share with them privately. See [Booking Access Phases](#booking-access-phases).

### Why a soft launch?

- **Room testers can book privately.** Testers (friends, family, invited guests) book a limited set of tester slots for free using one-time codes. The public site has no "Book" links, so only the testers we've shared the direct Bookeo link with can reach the day/time picker. See [Booking Access Phases](#booking-access-phases).
- **Google indexing takes time.** Search engines need to crawl and index new pages before they start showing up in search results. Flipping the switch early gives Google a head start so the site is discoverable when real customers begin searching.
- **Shakedown period.** A quiet launch surfaces last-minute issues (broken links, slow pages, form errors) before any real traffic arrives.
- **GBP alignment.** The Google Business Profile link needs to point at the live site, not the coming-soon page.

### What happens at soft launch

- [x] Flip the `lockandlogic.com` and `www.lockandlogic.com` domains from the coming-soon Vercel project to the Astro project (commands below)
- [x] Remove all "Book" buttons/links from the public site (and the Bookeo link from `/book`) so the public can't reach booking yet
- [ ] Confirm the limited tester slots are live in Bookeo and the ~25 one-time free tester codes work — *waiting on the client for the tester list*
- [ ] Send each tester the direct Bookeo booking link + their one-time code out of band (email/text) — *waiting on the client for the tester list*
- [x] Submit the updated sitemap (`https://www.lockandlogic.com/sitemap-index.xml`) to Google Search Console — resubmitted 2026-07-29
- [ ] Request indexing of key pages (rooms, each room page, contact, FAQ) — the homepage is already indexed
- [x] Verify the contact form works end-to-end on the live domain (2026-07-25); newsletter form still to re-test
- [x] Confirm the newsletter success message reads correctly after the switch — the coming-soon page's "We'll let you know when we open" retired automatically with the domain flip, and the Astro site says "Watch your inbox for updates"
- [x] Spot-check on mobile, tablet, and desktop
- [x] **Do not post on social media or send newsletters yet**

### How to flip the domain (coming-soon → Astro)

Both domains live on Vercel. Two projects exist — `lockandlogic-coming-soon` (currently live) and `lockandlogic` (the Astro site). The switch is done by re-assigning the domain aliases to a fresh Astro production deploy.

```bash
# From the repo root (Astro project)
vercel --prod
# Copy the deployment URL printed at the end, e.g.
# lockandlogic-abc123xyz-jeff-ruoss.vercel.app

vercel alias set <deploy-url> lockandlogic.com
vercel alias set <deploy-url> www.lockandlogic.com
```

`vercel alias set` will transfer the alias even if it's currently assigned to the coming-soon project. After running, verify:

```bash
vercel alias ls | grep lockandlogic.com
curl -sI https://www.lockandlogic.com | head -5
```

### How to roll back (Astro → coming-soon)

If something goes wrong and the site needs to go back to coming-soon quickly:

```bash
# From coming-soon/
vercel --prod
vercel alias set <deploy-url> lockandlogic.com
vercel alias set <deploy-url> www.lockandlogic.com
```

---

## Google Business Profile Readiness (by hard launch — ~2 weeks before grand opening)

The GBP should be **fully set up, verified, and live** by the hard launch (~2 weeks before the grand opening, when public booking opens). Google allows profile creation up to 90 days before opening, so this can start well in advance — but the goal is for everything to be done and verified before the public can book.

### GBP readiness checklist

- [ ] Business name, categories, address, phone, and hours filled in
- [ ] Opening date kept current — September 15, 2026 is a placeholder and must be pushed out if the real date slips (see the warning at the top of this page)
- [ ] Service area set (Pottstown + surrounding townships — see [SEO Strategy](/seo-strategy) for full list)
- [ ] Services listed (each room with description and pricing)
- [ ] Booking link pointing to the live booking page
- [ ] 10+ high-quality photos uploaded (rooms, lobby, exterior, team)
- [ ] Business description written (keyword-rich, natural)
- [ ] Pre-seeded Q&A (game length, ages, private bookings, parking)
- [ ] Video verification complete — see [Google Business Verification](/google-business-verification)
- [ ] First GBP post scheduled for opening week

---

## Booking Access Phases

Booking rolls out in two phases, kept apart by **date**: room testers play the pre-grand-opening dates (blocked from the public), and the public books grand-opening dates onward. The physical rooms open at the grand opening.

The key idea: **we never run tester booking and public booking on the same dates at the same time.** During the tester phase the site has no public "Book" links, so only testers with the direct Bookeo link get in; once booking goes public, the pre-grand-opening dates are blocked from the public and testers reach them only by private link. That separation is what keeps this manageable.

### 1. Tester booking (soft launch — ASAP, next few days)

The site is live but unannounced, and there are no public "Book" links anywhere on it. Testers book a limited set of sessions for free through a direct Bookeo link:

- **Limited tester slots** are set up in Bookeo on the pre-grand-opening dates.
- **~25 one-time free codes** (`Test01`, `Test02`, …) — one 100%-off Bookeo promotion with a list of single-use coupon codes. Each code makes the room free and ties the booking to a tester for tracking. Full setup and tracking details: [Booking Flow → Room Tester Free Codes](/booking-flow#room-tester-free-codes).
- Testers get the **direct Bookeo link + their code** privately (email/text) and self-serve a day/time. Nothing on the public site links to booking, so regular visitors never reach the picker.
- No public announcement, ads, or newsletter yet.

Because the site isn't promoted and has no public "Book" links, the only people booking are the testers we've shared the direct Bookeo link with. (Low-risk edge case: if a stranger finds the Bookeo URL on their own and books a tester slot at full price, just cancel/refund it.)

### 2. Hard launch (public booking — ~2 weeks before grand opening)

The site goes fully public and promotion begins:

- [ ] **Waiver: attorney sign-off on the Bookeo setup.** The attorney's waiver text is already live in Bookeo (set up 2026-09-04, the recommended Bookeo way). Before the public can book, the attorney needs to confirm two mechanical differences from the paper form — how a minor is identified and the 100-character acknowledgment box. Details: [Booking Flow → Waiver Setup](/booking-flow#waiver-setup).
- [ ] Load the **full public schedule** in Bookeo, but **block every date before the grand opening** so the public can only book grand-opening dates and beyond
- [ ] Restore the "Book" buttons/links on the site (and the Bookeo link on `/book`) so booking is publicly accessible again
- [ ] Start promotion — social, ads, newsletter (see [Public Launch](#public-launch-grand-opening-august-15-2026) below)
- [ ] Verify the full booking → payment → confirmation flow with a real transaction
- [ ] GBP live and verified (see checklist above)

**Testers who still need to book after this point:** the pre-grand-opening dates are now blocked from the public, so a straggler tester can only be booked via a **Bookeo hidden-slot special link** — set up manually, one slot at a time (tick the *Hidden* checkbox on the date/time and share the secret link). Get the bulk of testers booked during the soft-launch phase to keep these to a minimum.

### 3. Grand opening (September 19, 2026 — loud launch)

The physical rooms open and we go loud. See [Public Launch](#public-launch-grand-opening-september-19-2026) below — press, social, newsletter, and ads. **Three rooms on day one** (Grandma Betty's, The Initiation, the Holiday Room); Forgotten God and Tesla follow after. Booking stays closed by the Bookeo closing period until the pre-opening checklist at the top of this page is done.

### Verified in Bookeo (2026-08-17)

- [x] A **100%-off booking completes without hitting the payment gateway** — confirmed at $0, and again with a full room of eight people ($280 down to $0)
- [x] The **Coupons report shows the tester's name** and which code they used, links straight to the booking, and records which room was played
- [x] A redeemed code **cannot be reused** — retried and Bookeo reported it already used
- [ ] A **hidden/private slot can exist on a date that's otherwise closed to the public** — this is the linchpin of the hard-launch phase (testers reach blocked dates by link while the public can't). Still to test.

Two things that turned up while testing, worth knowing before you hand out any free codes:

- **Cancelling a booking burns the code.** It does not become available again — the guest needs a new one.
- **Codes only work on the public booking page**, not from the Bookeo dashboard. A comped guest has to book their own day and time. See [Free Room Codes](/free-room-codes).

---

## Public Launch (Grand Opening — September 19, 2026)

This is the loud one. Once the rooms are ready for paying customers:

- [ ] Send press release to Pottstown Mercury and local media
- [ ] Publish "We're Open" announcement on Facebook and Instagram
- [ ] Send opening-day email to the newsletter list
- [ ] Launch Google Ads and Meta Ads grand opening campaigns — see [Google Ads Strategy](/google-ads-strategy) and [Facebook & Instagram Ads Strategy](/facebook-instagram-ads-strategy)
- [ ] Begin systematic review collection from day one

---

## Timeline Summary

| When | What |
|------|------|
| **✅ 2026-07-25 (done)** | Soft launch: domain switched to Astro site, quiet indexing period begins. No public "Book" links on the site. Room testers book a limited set of slots for free via a direct Bookeo link + one-time codes. No public announcement. |
| **✅ 2026-08-17 (done)** | Opening delayed again with no new date. Booking closed in Bookeo via a closing period running through the end of 2027 — schedules kept intact underneath, so restoring is a one-step change. |
| **✅ 2026-08-18 (done)** | Google Business Profile given a September 15 placeholder opening date (Google requires one). The holiday room's own September 5 date dropped — it now opens with the four core rooms and the site says "Coming Soon". |
| **✅ 2026-09-08 (done)** | **Grand opening confirmed: September 19**, with three rooms (Grandma Betty's, The Initiation, Holiday Room); Forgotten God and Tesla to follow. Website updated site-wide with the date, the two later rooms marked "Coming Soon", and the Google Business Profile changed to September 19. |
| **✅ 2026-09-10 (done)** | Closing period deleted — **booking is live for September 19+ via the direct Bookeo link** (three rooms; Tesla and Forgotten God hidden until their date). The website has no Book buttons yet, so this is effectively a private testing window. |
| **✅ 2026-09-11 (done)** | **Hard launch — booking is public.** Book buttons restored site-wide on the owners' go-ahead (skipping the private testing window). Official store hours confirmed and published on the site. |
| **Before September 19** | Promotion begins; attorney sign-off on the waiver setup. |
| **2026-09-19 — Grand opening** | Three rooms open: press, social announcement, newsletter, ads go live. |
| **After grand opening** | Growth phase: ongoing content, review collection, seasonal campaigns |
