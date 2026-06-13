# 🚀 Launch Plan

How we'll transition from the coming-soon page to the live website, and what needs to be ready ahead of opening day.

---

## Target Opening

**August 8, 2026** — confirmed by client 2026-06-01. Construction started the week of June 1, 2026.

---

## Soft Launch (~2 weeks before opening)

Roughly 2 weeks before the escape room opens, we'll quietly switch `lockandlogic.com` from the coming-soon page to the main Astro website. **This is a soft launch — not a public announcement.**

### Why a soft launch?

- **Google indexing takes time.** Search engines need to crawl and index new pages before they start showing up in search results. Flipping the switch early gives Google a head start so the site is discoverable when real customers begin searching.
- **Shakedown period.** A quiet launch surfaces last-minute issues (broken links, slow pages, form errors) before any real traffic arrives.
- **GBP alignment.** The Google Business Profile link needs to point at the live site, not the coming-soon page.

### What happens at soft launch

- [ ] Flip the `lockandlogic.com` and `www.lockandlogic.com` domains from the coming-soon Vercel project to the Astro project (commands below)
- [ ] Submit the updated sitemap to Google Search Console
- [ ] Request indexing of key pages (home, rooms, contact, FAQ, about)
- [ ] Verify all forms work end-to-end (contact, newsletter)
- [ ] Verify the Bookeo integration is live and accepting bookings
- [ ] Spot-check on mobile, tablet, and desktop
- [ ] **Do not post on social media or send newsletters yet**

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

## Google Business Profile Readiness (~2 weeks before opening)

The GBP should be **fully set up, verified, and live** around the same time as the soft launch. Google allows profile creation up to 90 days before opening, so this can start well in advance — but the goal is for everything to be done and verified by the soft launch.

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

Booking opens in stages so play testers can run the rooms before the public, and so real customers can reserve sessions ahead of the grand opening.

### 1. Play-tester booking (private — before public booking)

Play testers (friends, family, and invited guests) need to book test sessions before booking is open to the public. The plan is to keep the booking page private and reachable only by people who are given access:

- **Secret link or password gate** on the `/book` page — only people with the link or password reach the Bookeo booking page. The page isn't linked anywhere public, and search engines are kept from indexing it.
- Alternatively, the Bookeo hosted page URL can be shared directly with play testers — it isn't linked from the site, so the public won't stumble onto it.
- Bookeo stays in Demo (test) payment mode for these runs, or comp codes are issued, so play testers aren't charged.

### 2. Public booking opens (before grand opening)

Ahead of the August 8 grand opening, booking opens to everyone so customers can reserve sessions in advance:

- [ ] Remove the password / secret-link gate so `/book` is publicly accessible
- [ ] Switch the Bookeo payment gateway from Demo back to Stripe (real payments)
- [ ] Confirm availability is open for grand-opening dates and beyond
- [ ] Verify the full booking → payment → confirmation flow with a real transaction

This can happen at or shortly after the soft launch — the site is live and indexable, but the loud announcement is still held for opening day.

### 3. Grand opening (loud launch)

See [Public Launch](#public-launch-opening-day-august-8-2026) below — press, social, newsletter, and ads.

---

## Public Launch (Opening Day — August 8, 2026)

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
| **Now – late July** | Pre-launch: GBP setup, SEO foundation, ad creative prep, newsletter list building |
| **Before public booking** | Play-tester booking: private/gated booking page, Bookeo in Demo mode |
| **~July 25, 2026** | Soft launch: domain switch, GBP goes live, quiet indexing period |
| **Soft launch → opening** | Public booking opens: gate removed, Bookeo on Stripe, customers reserve ahead |
| **August 8, 2026** | Public launch: press, social announcement, ads go live |
| **August 2026+** | Growth phase: ongoing content, review collection, seasonal campaigns |
