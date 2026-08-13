# QR Code Campaigns

Your print marketing materials include QR codes with built-in tracking. When someone scans a QR code, their visit is automatically tagged so you can see exactly how many people each piece of marketing brings to your site.

## How It Works

Each QR code links to your website with hidden tracking parameters (called UTM tags) that Google Analytics picks up automatically. You don't see them on the page — they just tell Analytics where the visitor came from.

A tracked URL looks like this:

```
https://www.lockandlogic.com?utm_source=flyer&utm_medium=print&utm_campaign=spring_2026
```

That tells Analytics: this visitor came from a **flyer** (source), it was **print** marketing (medium), and it was part of the **spring_2026** campaign.

## Active Campaigns

### Spring 2026 Flyer

| Detail | Value |
|--------|-------|
| **Campaign** | `spring_2026` |
| **Source** | `flyer` |
| **Medium** | `print` |
| **URL** | `https://www.lockandlogic.com?utm_source=flyer&utm_medium=print&utm_campaign=spring_2026` |

Printed as a handheld flyer for the founders to carry and show to people in person.

**Download full resolution:** [PNG](/qr-codes/qr-code_flyer-print-spring_2026/qr-code_flyer-print-spring_2026.png) · [SVG](/qr-codes/qr-code_flyer-print-spring_2026/qr-code_flyer-print-spring_2026.svg)

### In-Venue Door Sign

| Detail | Value |
|--------|-------|
| **Campaign** | `in_venue` |
| **Source** | `door_sign` |
| **URL** | `https://www.lockandlogic.com?utm_source=door_sign&utm_campaign=in_venue` |

QR code posted on the escape room door for visitors who are already at the venue.

**Download full resolution:** [PNG](/qr-codes/qr-code-door_sign-in_venue/qr-code-door_sign-in_venue.png) · [SVG](/qr-codes/qr-code-door_sign-in_venue/qr-code-door_sign-in_venue.svg)

### Business Card

| Detail | Value |
|--------|-------|
| **Campaign** | `business_card` |
| **Source** | `business_card` |
| **Medium** | `print` |
| **URL** | `https://www.lockandlogic.com?utm_source=business_card&utm_medium=print&utm_campaign=business_card` |

For the founders' business cards. Scans land on the homepage.

**Download full resolution:** [PNG](/qr-codes/qr-code_business_card-print/qr-code_business_card-print.png) · [SVG](/qr-codes/qr-code_business_card-print/qr-code_business_card-print.svg)

**Print at 1 inch square or larger.** A business card is the smallest surface these codes go on, and printing much below that makes it unreliable to scan. Give your designer the SVG — it stays sharp at any size, unlike the PNG.

## Results So Far

**Snapshot taken August 13, 2026 — covering March 31 (first scan) through August 13, 2026.**

These numbers are a point-in-time snapshot, not a live dashboard. Ask your developer any time for current figures.

| Campaign | Real scans | Active period | Still running? |
|----------|-----------|---------------|----------------|
| Spring 2026 Flyer | ~23 | Mar 31 – Apr 10 | No — nothing since April 10 |
| In-Venue Door Sign | 8 | Apr 22 – Jul 23 | Yes — roughly 1–2 per month |
| Business Card | — | Not yet distributed | — |

### What the numbers mean

**The flyer worked, then stopped.** It brought in about 23 scans in a ten-day burst at the start of April, and visitors who came through it spent an average of over two minutes on the site — genuinely engaged, not a bounce. Encouragingly, most scans came from right around the venue: Sanatoga, Gilbertsville, Kenilworth, and Philadelphia. But there hasn't been a single scan since April 10. If flyers are still out in circulation, they've stopped producing.

**The door sign is slow but still going.** Eight scans between late April and late July, all from the local area, most recently July 23. That's a modest number, but every one of them is somebody who walked up to the building before it opened and wanted to know more — which is a meaningful signal this far ahead of opening.

### A note on the raw numbers

Google Analytics recorded 31 visits for the flyer and 21 for the door sign. The counts above are lower because we filtered out automated traffic — web crawlers and bots that follow links around the internet and aren't real people.

They're easy to spot: a QR code taped to the front door of a building in Pottstown shouldn't be producing desktop-computer visits from Los Angeles and Las Vegas, which is exactly what a chunk of the door sign's raw total was. The filtered figures are the ones worth paying attention to.

## Viewing Campaign Performance

Campaign results are available through the [Google Analytics AI Integration](/google-analytics-ai). Your developer can pull performance data on demand — sessions, unique visitors, and trends — without needing to log into Google Analytics.

Example questions you can ask:

- "How is the spring flyer campaign performing?"
- "How many people scanned the QR code this week?"
- "Compare flyer traffic to other sources"

## QR Code Design

Every code uses the same look: black on white with the Lock & Logic logo centered for brand recognition. Each one is checked to make sure it still scans reliably with the logo covering the middle.

### How new codes are made

**Generate them with Claude Code** — this is how the business card code was made, and it's the default going forward. The generator script lives in `qr-codes/make_qr.py` in the docs repo, alongside the logo it stamps into the center:

```bash
# from docs-site/ — one-time: pip install "qrcode[pil]"
python3 qr-codes/make_qr.py "<tracked-url>" "<slug>" docs/public/qr-codes/<slug>
```

It writes a matching PNG and SVG straight into the published folder, using the same module grid, quiet zone, and centered logo as every existing code. Then add a section above with the download links.

Two reasons this is the default: the design stays identical across codes without eyeballing it, and the result can be decode-tested at several sizes before it goes to print — which is how we confirmed the business card code scans down to the same threshold as the flyer and door sign.

### Making one by hand instead

If you'd rather do it manually, [QRCode Monkey](https://www.qrcode-monkey.com/) is what produced the original flyer and door sign codes. Upload the logo, paste the tracked URL, and download both the PNG and the SVG. Keep the error correction on the highest setting — the logo covers part of the code, and that setting is what lets it still scan.

## Adding New Campaigns

When you create a new piece of marketing (a new flyer, a poster, a social media ad), a new tracked QR code can be generated with its own campaign name. This lets you compare the performance of different materials side by side — for example, seeing whether the flyer or the poster drives more traffic.

Just let your developer know what the material is and they'll create the QR code with tracking built in.
