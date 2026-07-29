# 🚀 Launch Plan

How we'll transition from the coming-soon page to the live website, and what needs to be ready ahead of opening day.

---

## Target Opening

::: tip Grand opening confirmed — August 15, 2026
The client has set the grand opening for **August 15, 2026**. The **soft launch (done 2026-07-25) is complete**; the **hard launch** (public booking opens) lands ~2 weeks before opening. This date was originally August 8, then briefly postponed, and is now firm at **August 15, 2026**.
:::

**Grand opening:** August 15, 2026 (confirmed by client; construction started the week of June 1, 2026). Originally targeted August 8 and briefly postponed before the client confirmed August 15.

---

## Soft Launch — ✅ done 2026-07-25

::: tip The soft launch has happened
`lockandlogic.com` and `www.lockandlogic.com` now serve the main website instead of the coming-soon page. Checked and working: SSL on both addresses, the contact form end-to-end, mobile, and the sitemap. No booking links are live anywhere on the site, as planned.

Still to do: get the uptime monitor running again (see [Monitoring](/monitoring)), submit the new sitemap in Google Search Console, and switch Bookeo from its test payment mode to live. The coming-soon project is being kept for now as a rollback option.

Google Search Console is already set up — the `lockandlogic.com` property lives on the `admin@lockandlogic.com` account and covers both `www` and non-`www`. See [SEO Strategy → Google Search Console](/seo-strategy#google-search-console).
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
- [ ] Submit the updated sitemap (`https://www.lockandlogic.com/sitemap-index.xml`) to Google Search Console
- [ ] Request indexing of key pages (home, rooms, each room page, contact, FAQ)
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

- [ ] Load the **full public schedule** in Bookeo, but **block every date before the grand opening** so the public can only book grand-opening dates and beyond
- [ ] Restore the "Book" buttons/links on the site (and the Bookeo link on `/book`) so booking is publicly accessible again
- [ ] Start promotion — social, ads, newsletter (see [Public Launch](#public-launch-grand-opening-august-15-2026) below)
- [ ] Verify the full booking → payment → confirmation flow with a real transaction
- [ ] GBP live and verified (see checklist above)

**Testers who still need to book after this point:** the pre-grand-opening dates are now blocked from the public, so a straggler tester can only be booked via a **Bookeo hidden-slot special link** — set up manually, one slot at a time (tick the *Hidden* checkbox on the date/time and share the secret link). Get the bulk of testers booked during the soft-launch phase to keep these to a minimum.

### 3. Grand opening (August 15, 2026 — loud launch)

The physical rooms open and we go loud. See [Public Launch](#public-launch-grand-opening-august-15-2026) below — press, social, newsletter, and ads. **Grand opening: August 15, 2026.**

### Verify in Bookeo before committing (do now, in Demo gateway mode)

- [ ] A **100%-off booking completes without hitting the payment gateway** (skips payment entirely at $0)
- [ ] The **Coupons report shows the tester's name** and which code they used, and a redeemed code **cannot be reused**
- [ ] A **hidden/private slot can exist on a date that's otherwise closed to the public** — this is the linchpin of the hard-launch phase (testers reach blocked dates by link while the public can't)

---

## Public Launch (Grand Opening — August 15, 2026)

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
| **~2 weeks before grand opening** | Hard launch: full public schedule loaded with pre-grand-opening dates blocked, Book button live, promotion begins, GBP live. Straggler testers via Bookeo hidden-slot links (set up manually). |
| **2026-08-15 (grand opening)** | Rooms open, press, social announcement, newsletter, ads go live. |
| **After grand opening** | Growth phase: ongoing content, review collection, seasonal campaigns |
