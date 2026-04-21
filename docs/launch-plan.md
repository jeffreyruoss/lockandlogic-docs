# 🚀 Launch Plan

How we'll transition from the coming-soon page to the live website, and what needs to be ready ahead of opening day.

---

## Target Opening

**Mid June 2026** — exact date to be confirmed closer to opening.

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
- [ ] Request indexing of key pages (home, rooms, contact, groups, FAQ)
- [ ] Verify all forms work end-to-end (contact, group inquiry, newsletter)
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

## Public Launch (Opening Day — Mid June 2026)

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
| **Now – early June** | Pre-launch: GBP setup, SEO foundation, ad creative prep, newsletter list building |
| **~2 weeks before opening** | Soft launch: domain switch, GBP goes live, quiet indexing period |
| **Mid June 2026** | Public launch: press, social announcement, ads go live |
| **July 2026+** | Growth phase: ongoing content, review collection, seasonal campaigns |
