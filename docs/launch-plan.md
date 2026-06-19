# 🚀 Launch Plan

How we'll transition from the coming-soon page to the live website, and what needs to be ready ahead of opening day.

---

## Target Opening

**August 8, 2026** — confirmed by client 2026-06-01. Construction started the week of June 1, 2026.

---

## Soft Launch (ASAP)

As soon as the site is ready, we'll quietly switch `lockandlogic.com` from the coming-soon page to the main Astro website. **This is a soft launch — not a public announcement.** The goal is to get the site live early so **room testers can freely book sessions from the normal day/time picker**, and so Google has time to index the site ahead of the public launch.

### Why a soft launch?

- **Room testers can self-book.** With the site live, testers (friends, family, invited guests) book their own sessions straight from the day/time picker — no manual scheduling needed.
- **Google indexing takes time.** Search engines need to crawl and index new pages before they start showing up in search results. Flipping the switch early gives Google a head start so the site is discoverable when real customers begin searching.
- **Shakedown period.** A quiet launch surfaces last-minute issues (broken links, slow pages, form errors) before any real traffic arrives.
- **GBP alignment.** The Google Business Profile link needs to point at the live site, not the coming-soon page.

### What happens at soft launch

- [ ] Flip the `lockandlogic.com` and `www.lockandlogic.com` domains from the coming-soon Vercel project to the Astro project (commands below)
- [ ] Confirm Bookeo is live and room testers can book from the day/time picker
- [ ] Submit the updated sitemap to Google Search Console
- [ ] Request indexing of key pages (home, rooms, contact, FAQ, about)
- [ ] Verify all forms work end-to-end (contact, newsletter)
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

## Google Business Profile Readiness (by full public launch — mid-July)

The GBP should be **fully set up, verified, and live** by the full public launch in mid-July. Google allows profile creation up to 90 days before opening, so this can start well in advance — but the goal is for everything to be done and verified before the public can book.

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

Booking opens in stages: room testers first (soft launch), then the public (mid-July), with the physical rooms opening at the grand opening (early August).

### 1. Room-tester booking (soft launch — ASAP)

At soft launch the site is live but unannounced. Room testers (friends, family, invited guests) **book their own sessions directly from the day/time picker** — the same booking page the public will eventually use. Because the site isn't promoted anywhere yet, the only people booking are the testers we've shared it with.

- Testers self-serve from the normal Bookeo day/time picker — no manual scheduling.
- The pre-grand-opening tester slots are set up as normal, bookable availability.
- No public announcement, ads, or newsletter yet.

### 2. Full public site launch (mid-July)

In mid-July the site goes fully public and anyone can book:

- [ ] Remove the pre-grand-opening room-tester slots from Bookeo so the public can't book the test sessions
- [ ] Confirm public availability is open for grand-opening dates and beyond
- [ ] Verify the full booking → payment → confirmation flow with a real transaction
- [ ] GBP live and verified (see checklist above)

**If more room testers are needed after this point:** use Bookeo's **hidden slot** feature. Hidden slots don't appear on the public booking page and are reachable only via a secret link shared with the tester. Each hidden slot has to be set up **manually, one at a time** (tick the *Hidden* checkbox on each date/time). This keeps tester sessions invisible to the public while the rest of the room's slots stay publicly bookable.

### 3. Grand opening (early August — loud launch)

The physical rooms open and we go loud. See [Public Launch](#public-launch-grand-opening-early-august-august-8-2026) below — press, social, newsletter, and ads.

---

## Public Launch (Grand Opening — Early August / August 8, 2026)

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
| **ASAP** | Soft launch: domain switch to Astro site, quiet indexing period. Room testers book freely from the day/time picker. No public announcement. |
| **Mid-July 2026** | Full public site launch: public booking opens, pre-grand-opening tester slots removed, GBP live. Extra testers (if needed) via Bookeo hidden slot links (set up manually). |
| **Early August (August 8, 2026)** | Grand opening: rooms open, press, social announcement, newsletter, ads go live |
| **August 2026+** | Growth phase: ongoing content, review collection, seasonal campaigns |
