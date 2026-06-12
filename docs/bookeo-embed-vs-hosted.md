# Bookeo Embed vs. Hosted Page

Bookeo gives us two ready-made ways to put booking on the website: an **embedded widget** that lives inside our own `/book` page, or Bookeo's **hosted booking page** that we link out to. This page compares the two, with screenshots, so the trade-offs are clear.

> **Update (June 2026):** We've switched the site to the **hosted page** (Option B below). The `/book` page now has a **Book Your Escape** button that opens the Bookeo hosted page in a new tab. The embedded widget (Option A) is kept here for reference and comparison.

There's also a third, fully-custom option — building the booking flow directly against the Bookeo API so it matches our branding perfectly. That's documented separately in [Bookeo API AI Integration](/bookeo-api). This page is only about the two off-the-shelf options.

## Option A — Embedded widget (previous approach)

The booking widget was loaded inside our own **Book Your Escape** page via Bookeo's `widget.js`. The schedule list rendered fine inside the page, but as soon as a visitor clicked a time slot, Bookeo opened a pop-up (modal) for picking the number of players — and that modal was the problem.

[![Bookeo embed on the Book Your Escape page, with the player-selection modal open](/screenshots/bookeo-embed.jpg)](/screenshots/bookeo-embed.jpg)

**Pros**

- Visitors stay on `lockandlogic.com` the whole time — our header, footer, and navigation surround the widget.
- Feels like part of the site, not a hand-off to a third party.

**Limitations**

- **Very little design control.** Because the widget runs inside an iframe, we can't restyle its colors, spacing, or layout to match the rest of the site.
- **The pop-up modal looks bad and can't be fixed.** When a visitor selects a time, the player-selection modal (shown above) is cramped and awkward inside the constrained widget area. This is controlled entirely by Bookeo — there's nothing on our end we can change.
- **Width is constrained** to the column it sits in, so the schedule has less room to breathe than it does on Bookeo's own page.

## Option B — Bookeo hosted page (current)

This is what the site uses now: a **Book Your Escape** button on the `/book` page links out to Bookeo's hosted page (opening in a new tab). It's a standalone, full-width page that Bookeo serves and styles, carrying our logo, address, and dark theme.

- **Branded URL:** `https://bookeo.com/lockandlogic` (Bookeo redirects this to the live booking page)

[![Bookeo hosted booking page showing the full schedule](/screenshots/bookeo-hosted-page.jpg)](/screenshots/bookeo-hosted-page.jpg)

Because it has the full width of the browser, the steps that look cramped in the embed — including the player-selection and the booking confirmation — render cleanly:

[![Bookeo hosted booking confirmation page](/screenshots/bookeo-hosted-confirmation.jpg)](/screenshots/bookeo-hosted-confirmation.jpg)

**Pros**

- **The modal/pop-up problem goes away** — every step has room to display properly.
- Carries our **logo and branding**, with Bookeo's dark theme applied consistently.
- Nothing for us to maintain — Bookeo handles the page.

**Cons**

- Takes the visitor **off `lockandlogic.com`** to a `bookeo.com` URL, so it's a hand-off rather than a seamless in-site experience.
- We have **even less layout control** than the embed — we get Bookeo's page exactly as designed (though it looks better than the embedded version).

## At a glance

| | Embedded widget (former) | Hosted page (current) |
|---|---|---|
| Where it lives | On our `/book` page, in an iframe | Bookeo's site (`bookeo.com/lockandlogic`) |
| Stays on lockandlogic.com | ✅ Yes | ❌ No (links out) |
| Player-selection modal | ❌ Cramped, can't be fixed | ✅ Renders cleanly |
| Design control | ⚠️ Very limited | ⚠️ None (but looks better) |
| Our logo/branding shown | ✅ Site chrome around it | ✅ On Bookeo's page |
| Maintenance | None | None |

## Recommendation

The embed keeps people on our site, but its broken pop-up modal is a real wart we can't paint over. The hosted page solves that at the cost of sending visitors to a `bookeo.com` URL — but it still shows our logo and branding, so the hand-off is fairly soft. For the cleanest booking experience without custom development, **the hosted page is the better of the two off-the-shelf options — and it's what the site now uses.**

If keeping booking fully on-site *and* fully branded matters enough to justify the work, the [custom Bookeo API integration](/bookeo-api) is the path that delivers both.
