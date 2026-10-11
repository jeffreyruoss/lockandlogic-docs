# Monthly Reports

> A monthly look at how Lock & Logic is doing online: bookings, how people find you on Google, Google Maps and AI assistants like ChatGPT, and the behind-the-scenes upkeep that keeps the site safe and working.

Newest report first. Each one is a snapshot; ask your developer any time for current numbers. Until October these were search-only reports, so September covers Google and AI search.

---

## October 2026 — First full month open

**Covers September 10 to October 10, 2026.** Comparisons are with the month before opening.

### The short version

- **You're now #1 on Google Maps** for *escape room pottstown pa*. Three weeks ago you were 9th of 9. That's your reviews at work.
- **57 paid bookings this month**, and every week has been as busy as or busier than the one before.
- **Google sent 3× as many visitors as last month**, and ChatGPT still recommends you first.
- **The site was up the whole month**, every enquiry email arrived, and the nightly backups ran every night.
- **Halloween is the gap.** People searching for Halloween things to do aren't finding Blackwell's yet. See [What's next](#whats-next).

<StatTiles :tiles="[
  { label: 'Paid bookings', value: '57', note: '≈ $6,150 collected' },
  { label: 'Google Maps rank', value: '#1', was: 'was 9th of 9 on Sept 22' },
  { label: 'Google reviews', value: '23 ★5.0', was: 'was 3 on Sept 22' },
  { label: 'Website visitors', value: '597', was: 'was 136 the month before' },
  { label: 'Clicks from Google', value: '385', was: 'was 124 the month before' },
  { label: 'Site uptime', value: '100%', note: 'no outages' },
]" />

### Bookings

<BarList title="Paid bookings by week (when the booking was made)" :rows="[
  { label: 'Sept 10–18', value: 6 },
  { label: 'Sept 19–25 (opening week)', value: 15 },
  { label: 'Sept 26 – Oct 2', value: 18 },
  { label: 'Oct 3–10', value: 18 },
]" />

<BarList title="Bookings by room" :rows="[
  { label: 'Grandma Betty\'s Secret Recipe', value: 22 },
  { label: 'Blackwell\'s Sacrifice (Holiday Room)', value: 19 },
  { label: 'The Initiation', value: 16 },
]" />

Blackwell's is pulling almost as many bookings as the 60-minute rooms in its short season. Counts are from Bookeo and include front-desk bookings; 4 cancelled bookings aren't counted.

### Google Maps

When someone searches *escape room pottstown pa*, the map box at the top of Google is the first thing they see. Here's where you've been in it:

<RankJourney :steps="[
  { date: 'Sept 22', rank: '9th', note: 'of 9, on More places' },
  { date: 'Oct 6', rank: '3rd', note: 'in the map box' },
  { date: 'Oct 10', rank: '1st', note: 'top of the map box' },
]" />

In September we said reviews were what would move you. You went from 3 reviews to **23, all 5 stars, and every one has a reply**. Keep asking every group.

**Your Google profile in September:**

<StatTiles :tiles="[
  { label: 'Profile views', value: '772' },
  { label: 'Website clicks', value: '212' },
  { label: 'Direction requests', value: '78' },
  { label: 'Calls', value: '7' },
]" />

<BarList title="What people searched when your profile showed up (September)" :rows="[
  { label: 'things to do in pottstown pa', value: 88 },
  { label: 'escape room', value: 76 },
  { label: 'things to do pottstown pa', value: 36 },
  { label: 'escape room pottstown pa', value: 32 },
  { label: 'escape rooms near me', value: 30 },
]" />

**"Things to do in Pottstown" is your biggest search**, bigger than "escape room". People who aren't looking for an escape room yet are finding you, so posts about Game Nights, the event space and Blackwell's are worth putting on your profile.

October's numbers so far (Oct 1–7, Google's data runs a few days behind): 79 interactions, 47 website clicks, 30 direction requests, 2 calls.

### Google Search

<StatTiles :tiles="[
  { label: 'Clicks from Google', value: '385', was: 'was 124' },
  { label: 'Times you appeared', value: '1,087', was: 'was about 500' },
  { label: 'Click rate', value: '35%', was: 'was 25%' },
  { label: 'Average position', value: '3.6', was: 'was 7.9' },
]" />

<BarList title="Searches that brought clicks, other than your name (Sept 11 – Oct 8)" :rows="[
  { label: 'escape room pottstown pa', value: 37, note: 'average position 2.0' },
  { label: 'pottstown escape room', value: 18, note: 'average position 1.4' },
  { label: 'escape room pottstown', value: 16, note: 'average position 1.2' },
  { label: 'luck and logic (typo)', value: 10, note: 'average position 3.6' },
  { label: 'escape room near me', value: 5, note: 'average position 6.5' },
  { label: 'escape rooms near me', value: 5, note: 'average position 6.2' },
]" />

Your name (*lock and logic pottstown*) brought another 139 clicks at position 1. About a quarter of all clicks now come from people who didn't know your name yet, which is the number to watch grow.

The last week was quieter than the opening weeks (63 clicks vs 88), which is normal as opening buzz settles.

### AI assistants

Asked *"escape room in Pottstown PA"*, **ChatGPT lists Lock & Logic first** and recommends you by name, with the right address, phone, $35 price, the Holiday Room at $25 for 30 minutes, and your rooms by name and difficulty.

### Where website visitors came from

<BarList title="Visits, Sept 10 – Oct 9" :rows="[
  { label: 'Google and other search engines', value: 464 },
  { label: 'Typed the address / bookmarks', value: 233 },
  { label: 'Facebook & Instagram', value: 158 },
  { label: 'QR codes (business card, door sign)', value: 23 },
  { label: 'Morty (escape-room app)', value: 14 },
  { label: 'ChatGPT', value: 4 },
]" />

**Google search is your biggest source of bookings we can trace**: at least 9 online bookings ($1,005) came straight from a Google search since booking tracking started on September 24. Morty sent one ($70).

::: info About these numbers
Analytics only sees online bookings from visitors who allow cookies, so it records fewer bookings than Bookeo (27 vs 57). Bookeo is the true count; Analytics is for *where people came from*.
:::

### Site health

<StatTiles :tiles="[
  { label: 'Uptime', value: '100%', note: 'checked every 3 minutes' },
  { label: 'Nightly backups', value: '31 / 31', note: 'every night ran' },
  { label: 'Enquiry emails delivered', value: '4 / 4', note: '0 bounced' },
  { label: 'Newsletter signups', value: '0', was: 'last one Sept 9' },
]" />

- **Backups are real.** We opened the latest one and checked it holds your FAQs, announcements and form submissions.
- **Two short alerts, both outside your site:** Mailchimp had a two-hour hiccup on October 4 (no signups were lost), and GitHub, which runs the nightly jobs, had an outage on October 5. Both recovered on their own.
- **Your database provider's October 30 change**, which could have quietly broken the forms, needs nothing from you: the database already has the settings it needs.
- **No newsletter signups this month.** The signup form works; it's just not getting attention. See What's next.

### Security and software updates

Your site is built from open-source software packages. When a security problem is found in one, a fixed version is released, and the site needs updating to get it. This month's round:

<StatTiles :tiles="[
  { label: 'Known vulnerabilities', value: '0', was: 'was 27 before updates' },
  { label: 'Critical', value: '0', was: 'was 2' },
  { label: 'High', value: '0', was: 'was 19' },
  { label: 'Packages updated', value: '9 main', note: '+ dozens underneath' },
]" />

**What was updated:**

| Package | What it does for your site | Was | Now |
|---|---|---|---|
| Astro | The framework the whole site is built with | 5.17 | **7.3** |
| Astro Vercel adapter | Runs the site on Vercel, your web host | 9.0 | **11.0** |
| sharp | Resizes and compresses your images | 0.34 | **0.35** |
| Supabase | Connects to the database (FAQs, forms, announcements) | 2.99 | 2.117 |
| Resend | Sends enquiry emails to your inbox | 6.9 | 6.32 |
| Tailwind CSS | The site's styling | 4.1 | 4.3 |
| Sitemap | Tells Google which pages exist | 3.7.0 | 3.7.4 |
| Vitest | Runs the automated checks before every update | 4.1 | **5.0** |
| Playwright | Tests the admin login in a real browser | 1.61 | 1.64 |

**Bold** = a major version, which can change how things work, so the site was checked page by page on desktop and phone before going live.

**What the updates closed:**

| Severity | Problem |
|---|---|
| Critical | A specially made image file could run code on the server |
| High | Security holes in the image library (sharp) |
| High | A way to make the server fetch other web addresses via its error pages |
| High / Moderate | Several ways to slip malicious script into pages (cross-site scripting) |
| Moderate | A way around Vercel's own path rules |
| High | A slow-pattern bug that could tie up the server (denial of service) |
| Mixed | 20 more in packages underneath (file handling, web sockets, build tools) |

One more change came with the new version: it would have stored the site's passwords and service keys inside the built website files on the server. We changed the site so they're only read when needed and never written into the build.


### Fixed and improved this month

- **Event Space page** for parties and team building, with a quote form, live before the space opened on October 1.
- **Game Nights page** published, in the menu and open to Google.
- **Bookings are now tracked from the website through Bookeo's checkout**, including where each customer came from (Google, Facebook, Morty, QR codes).
- **Better on phones** (about 4 in 5 of your visitors): a Book Now button in the header, the booking button first on the Book page, and the cookie pop-up only shown to visitors in Europe, where the law requires it.
- **Admin dashboard sign-in fixed** after Kristin found a login loop.
- **The Holiday Room is promoted** on every room page's "Explore Our Other Rooms".
- **Phone number** hidden while the line was down, then restored when it went live.
- **The Initiation** shows *Advanced* and *4+ players recommended* everywhere.
- **Pricing answer on the FAQ** now mentions the Holiday Room's $25 price, so it no longer reads as if every room is $35. Same fix for AI assistants.
- **Bookeo Front Desk Guide** for check-in, no-shows, moving a booking and sales tax.
- **Blackwell's page now tells Google it's a Halloween escape room in Pottstown**, in the title and description Google shows in results, so it can come up for Halloween searches.

### What's next {#whats-next}

1. **Halloween is three weeks away and Blackwell's ends with it.** Google hasn't shown your site for a single Halloween search yet. We've retitled Blackwell's page to fix that on the website side; a few Google profile and Facebook posts that say *Halloween escape room* (with a photo and a Book link) are the fastest way to fix that this month.
2. **Keep the reviews coming.** They took you from 9th to 1st. Google weighs recent reviews, so a steady flow keeps you there.
3. **Post to your Google profile weekly.** "Things to do in Pottstown" is your top search, so Game Nights, the event space and Blackwell's all fit.
4. **Mention the newsletter at the front desk**, or ask us about a newsletter opt-in at Bookeo's checkout. No one signed up this month.

Next report: mid-November.

---

## September 2026 — Opening month

**Covers August 25 to September 21, 2026** (the four weeks around opening day, September 19).

### The short version

- **People searching for you by name find you first.** "Lock and Logic Pottstown" is #1 on Google.
- **People searching for an escape room in Pottstown mostly find you too.** On a regular Google search for *escape room pottstown pa*, Lock & Logic is the **first website listed**, and **ChatGPT names you first** when asked the same thing.
- **You're not in the map listings yet.** The map box at the top of Google ("Places") still shows the big King of Prussia rooms. That's normal for a brand-new business. **Reviews are what fixes it.**
- **Opening weekend brought about 3× your usual search traffic.**

### Google Search

| | Last 4 weeks |
|---|---|
| Clicks from Google | **260** |
| Times you appeared in results | 755 |
| Click rate | 34% (very high; a typical site sees 2–5%) |
| Average position | **5.7** overall |

**What people searched to find you** (last 2 weeks):

| Search | Clicks | Average position |
|---|---|---|
| lock and logic pottstown | 84 | **1.0** |
| escape room pottstown pa | 15 | **2.2** |
| lock and logic | 8 | 1.8 |
| luck and logic *(a common typo)* | 6 | 4.6 |
| pottstown escape room | 6 | 1.8 |
| escape room pottstown | 3 | 1.4 |
| things to do near pottstown pa | 1 | 1.0 |

::: tip What "average position 2.2" means
Google shows different results to different people depending on where they are, what device they're on, and what they've searched before. "Average position" is your spot averaged across everyone who saw you.

For *escape room pottstown pa*, the map box counts as the top spot, so 2.2 means you're usually **the first regular result, right under the map**. When we checked by hand, from a Pottstown-area search and from a search routed through Los Angeles, that's exactly where you were.
:::

**Daily clicks jumped at opening:** around 5 a day in late August, then 36, 36 and 39 on September 18, 19 and 20.

### Google Maps ("Places")

This is the one area that isn't there yet, and it's worth being straight about why.

When someone searches *escape room pottstown pa*, the map box at the top shows three escape rooms. Right now those are The Escape Game King of Prussia (about 10,000 reviews), Amazing Escape Room Collegeville (1,300) and Escape Room Mystery (6,000). Lock & Logic is on the "More places" list, **9th of 9**.

Google ranks the map box on three things:

1. **Relevance.** Does the business match the search? ✅ You do.
2. **Distance.** How close is it? ✅ You're the one actually in Pottstown.
3. **Prominence.** How established and well-reviewed is it? ❌ This is the gap. You have **3 reviews** on a profile that has been open for days; the others have thousands.

Being local isn't enough on its own. Google will happily show a business 20 miles away if it's far more established. **The good news:** you don't need thousands to start climbing. Google weighs recent reviews heavily, so a steady stream from here moves you up faster than the totals suggest. See [Getting Google Reviews](/getting-reviews).

### AI assistants (ChatGPT and others)

Asked *"escape room pottstown pa"*, **ChatGPT lists Lock & Logic first**, with the correct address, the correct $35 price and 60-minute length, and your rooms by name and difficulty. It links your website as the source. That accuracy is by design: your site publishes the details in a format AI tools read directly.

ChatGPT also sent **5 visitors** straight to your site this month. That's small, but it's a channel that barely existed two years ago, and you're already showing up in it.

### Where visitors came from

| Source | Visits |
|---|---|
| Google search | 220 |
| Typed the address / bookmarks | 115 |
| Facebook & Instagram | 91 |
| **Morty** (escape-room app) | **13** |
| Business card QR code | 11 |
| ChatGPT | 5 |
| Yahoo, Bing, DuckDuckGo | 7 |

**Most-viewed pages:** Home (377), All Rooms (182), **Book Now (140)**, Grandma Betty's (88), FAQ (66), The Initiation (66), Blackwell's Sacrifice (44).

Worth noticing: **Morty is already sending people**, and the business cards are getting scanned.

::: info About these numbers
Your site asks visitors for cookie consent, and people who never answer the banner are counted by estimate rather than exactly. The trends are reliable; treat any single number as approximate.

As of September 25, US visitors are counted unless they click Decline, so visitor numbers from that date on are more complete and will look higher. That's better measurement, not a jump in traffic.

In early October the cookie pop-up was limited to visitors in Europe, the UK and Switzerland, where the law requires it. US visitors no longer see a Decline button on their first visit, so counts from then on are more complete again and will look a little higher.
:::

### Fixed this month

- **The booking page wasn't in Google's index.** Google last visited `/book/` in June, when the coming-soon page was live and the page didn't exist yet, and it hadn't been back since. **Blackwell's Sacrifice** had never been seen by Google at all. Both have now been submitted for re-crawling.
- **The site switched to "Now Open"** everywhere: home page, footer, booking page and Blackwell's.
- **FAQ links to a removed group-booking page** were pointed at the contact page instead.
- **The post-game email** was asking for a Google review with no button to click. It now has one.
- **The review QR code** is now tracked, so scans can be counted.
- **Bookings are now tracked end to end.** Google Analytics used to lose people the moment they left for Bookeo. It now sees each step through checkout and every completed booking, so you can tell where people drop off.

### What's next

**For you (the biggest levers are yours):**

1. **Reviews: ask every group, every game.** This is the single thing that gets you into the map box. [The guide](/getting-reviews) has the exact words.
2. **Real photos on your Google profile.** Lobby, exterior, team photos and props, nothing that gives away puzzles. Profile completeness counts toward prominence.
3. **Reply to every review.** Google reads it as an active business.
4. **October is Blackwell's whole season.** A small Google Ads budget is the only way into the map box *this month*, and there's already a [strategy](/google-ads-strategy) for it.
5. **The Pottstown Mercury.** A story about the opening is a strong local signal for Google and a trusted source for AI tools.

**For your developer:**

1. **Bing Webmaster Tools and Bing Places.** ChatGPT's search draws heavily on Bing, so this protects the AI results you already have.
2. **Apple Business Connect.** Covers Apple Maps and Siri. iPhone users asking for an escape room nearby never see Google.
3. **Directory listings** with matching name, address and phone: Yelp, TripAdvisor, Room Escape Artist, Chamber of Commerce and Valley Forge Tourism.
4. **Show star ratings in search results** once you reach about 10 reviews. The code is ready.

