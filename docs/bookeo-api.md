# Bookeo API AI Integration

Your Bookeo account is connected to a private integration that lets your website talk directly to Bookeo's system. Here's what that makes possible — now or in the future.

## What We Can Access

### Read

- **Bookings** — past, present, and upcoming reservations across all rooms
- **Customers** — contact details and booking history for every customer
- **Availability** — real-time open time slots for each room
- **Payments** — payment records tied to bookings
- **Products** — your rooms, pricing, and configurations
- **Resources** — staff, rooms, and equipment tracked in Bookeo
- **Business info** — your location, contact details, and account settings

### Read & Write

- **Bookings** — create, update, and cancel reservations
- **Customers** — create and update customer records
- **Payments** — add payments to bookings
- **Time slot blocks** — block off specific slots to prevent bookings
- **Webhooks** — set up real-time alerts when bookings are created, changed, or cancelled

## What's Available

### Fully Custom Booking Experience

Rather than sending visitors to Bookeo's standard booking page, we can build the entire booking flow directly into your website. You'd have complete control over the look, feel, and content — it would match your branding perfectly and feel like a seamless part of the site, not a third-party widget. Behind the scenes, everything still syncs with Bookeo: checking availability, holding the time slot, creating the booking, and processing payment.

### Split Payments

The API supports adding multiple payments to a single booking, which means group members can each pay their own share. For example, if a group of 6 books a room at $30/person, each person could pay their $30 individually instead of one person covering the full $180. This would be built into the custom booking flow — after selecting a room and time, the organizer could generate a payment link to share with their group.

### Show Real-Time Availability on Your Website

Instead of sending visitors straight to the Bookeo booking page, your website could display which time slots are open directly on each room's page. Visitors would see what's available before they even click "Book Now," reducing friction and helping fill gaps in your schedule.

### Booking Data & Reporting

Your integration can pull booking history — who booked, when, which room, group size, etc. This could power things like:

- A private dashboard showing upcoming bookings at a glance
- "X groups have escaped this month" counters on the website
- Weekly or monthly booking reports

### Customer Information

Access to customer records means the system could look up repeat visitors, track how often groups return, or pre-fill information for returning customers.

### Payment History

The integration can pull payment records tied to bookings — useful for reconciliation or building a revenue summary without logging into Bookeo directly.

### Instant Notifications

Bookeo can send your website an automatic alert whenever a booking is created, updated, or cancelled. This could trigger things like:

- A Slack or text message when a new booking comes in
- An internal dashboard that updates in real time
- Automated follow-up emails through your own system (outside of Bookeo's built-in emails)

### Block Off Time Slots

The integration can block specific time slots to prevent bookings — useful for maintenance, private events, or staff scheduling. This wouldn't replace Bookeo's calendar management, but it could be used to automate blocks based on rules you define.

## What's Not Possible Through the Integration

Some things can only be done in the Bookeo dashboard directly:

- **Creating or editing rooms** — room setup, descriptions, photos, and pricing
- **Changing schedules** — daily/weekly time slot patterns and recurring availability
- **Account settings** — payment processing, staff accounts, notification preferences

These are managed through [your Bookeo dashboard](https://signin.bookeo.com) as usual.

## Current Status

The integration is set up and connected. We're starting with read access to bookings, which lets us pull booking data and verify everything works. Additional capabilities can be enabled as needed — each one is a simple configuration change, not a rebuild.
