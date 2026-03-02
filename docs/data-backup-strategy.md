# Booking Data Backup Strategy

> Protecting customer, booking, and payment data from platform risk

---

## Why This Matters

Neither Bookeo nor Resova offers built-in automatic backups. If either platform experiences data loss, an outage, or shuts down, any data not independently backed up could be lost. Resova's 2022 acquisition by Clubspeed adds long-term platform continuity risk.

Your booking platform holds:
- Customer contact info (names, emails, phone numbers)
- Full booking history (dates, rooms, group sizes, revenue)
- Payment/transaction records
- Waiver signatures
- Room configurations, pricing rules, and email templates

---

## What Both Platforms Provide

| Capability | Bookeo | Resova |
|---|---|---|
| CSV export of customers | Yes | Yes |
| CSV export of bookings | Yes | Yes |
| CSV export of payments | Yes (via reports) | Yes (via reports) |
| REST API | Yes — well-documented ([OpenAPI spec](https://www.bookeo.com/apiref/)) | Yes |
| Zapier integration | Yes | Yes |
| Webhooks | Yes | Yes |
| Built-in scheduled backup | No | No |
| GDPR data portability | Yes | Yes |

---

## Recommended Backup Approach

### Option 1: Zapier to Google Sheets (Recommended at Launch)

The simplest no-code solution. Set up on day one.

**Setup:**
1. Create a Google Sheet with columns: Date, Time, Room, Customer Name, Email, Phone, Group Size, Amount Paid, Payment Method, Booking ID
2. Create a Zapier account (free tier handles low volume)
3. Create Zaps:
   - **New booking** → Add row to Google Sheet
   - **Booking cancelled** → Add row to a "Cancellations" sheet
   - **New customer** → Add row to a "Customers" sheet

**Cost:** Free (Zapier free tier: 100 tasks/month) or $19.99/mo for higher volume

**Pros:** Real-time, no coding, runs automatically
**Cons:** Limited to what Zapier triggers expose; doesn't capture configuration/settings

---

### Option 2: Monthly Manual CSV Exports

A simple backup routine to supplement Zapier or use on its own.

**Monthly checklist:**
- [ ] Export customer list (CSV) from dashboard
- [ ] Export bookings for the month (CSV)
- [ ] Export payment/revenue report (CSV)
- [ ] Save all files to a dated folder in Google Drive (e.g., `Backups/2026-03/`)

**Also back up quarterly:**
- [ ] Screenshot room configurations and pricing rules
- [ ] Screenshot email template settings
- [ ] Screenshot waiver templates
- [ ] Export any custom reports

---

### Option 3: API-Based Automated Backup (Future)

The most robust solution. Build when booking volume justifies it.

- Scheduled script (cron job or GitHub Action) that pulls all data via the platform's REST API
- Stores data in a database (PostgreSQL, Airtable) or date-stamped JSON/CSV files in cloud storage
- Bookeo's API is particularly well-suited for this with its public OpenAPI spec
- Can run nightly for complete historical snapshots

---

## What to Do Right Now

1. **Day one:** Set up Zapier → Google Sheets for new bookings and customers
2. **Monthly:** Manual CSV export routine (add to calendar)
3. **Separate customer list:** Keep a master email/contact list in Mailchimp or Google Contacts independent of the booking platform
4. **Document settings:** After configuring rooms, pricing, and waivers, screenshot everything and save to Google Drive

---

## Platform Risk Assessment

| Risk | Bookeo | Resova |
|---|---|---|
| Company stability | Independent, operating since ~2010 | Acquired by Clubspeed (2022) |
| Product continuity risk | Low | Moderate — could be merged, repriced, or sunset |
| Data portability | Strong (mature API, CSV exports) | Adequate (API, CSV exports) |
| Public status page | No | No |

**Bottom line:** Regardless of which platform you choose, having independent backups means you're never locked in and never at risk of losing business data.
