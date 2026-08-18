# Bookeo Booking Flow Checklist

A running checklist of requirements and considerations for the Bookeo booking integration. Items are organized by who submitted them.

---

## Submitted by Jenn

### Booking Modes

- **One person books for the whole group** -- A single person should be able to book and pay for all slots in their group in one transaction.
- **Each person books their own slot** -- Individual members of a group should be able to book and pay for their own slot separately.

### Private Room Booking

- **Rooms are private once booked** -- Once the first booking is made for a room/time slot, that session becomes private to that group. Only people with a link or code associated with that group should be able to book into the same session. No strangers mixed in.

### Return Visit Discount

- **10% discount for booking your next room before leaving the store** -- Offer a 10% promo code that customers can use if they book their next experience before they leave the venue.
- **Restrict the code to in-store use only** -- Can we limit the promo code so it can't be shared or used outside the store? Options to explore with Bookeo:
  - Time-limited codes (e.g., expires within 1 hour of issue)
  - Single-use codes generated at checkout
  - Staff-applied discount at the point of sale rather than a customer-facing code
  - Require the code to be entered on a store device only

---

## AI-Suggested Requirements

These are additional booking flow items worth verifying or configuring in Bookeo based on common escape room business needs.

### Capacity & Group Size

- **Minimum and maximum group sizes per room** -- Each room should enforce a min/max player count (e.g., 2-8 players). Bookeo should prevent under- or over-booking.
- **Display remaining slots** -- Show customers how many spots are left for a session so partial groups know they can still join (when the room isn't privately booked).

### Payments & Pricing

- **Per-person pricing vs. flat-rate** -- Confirm which pricing model each room uses and that Bookeo calculates totals correctly for both booking modes.
- **Deposit vs. full payment** -- Decide whether customers pay in full at booking or put down a deposit. Configure Bookeo accordingly.
- **Cancellation and refund policy** -- Set up Bookeo's cancellation window (e.g., free cancellation up to 24 hours before) and any refund rules.
- **Modify reservations after payment** -- Can customers change their booking after paying? Specifically: adding more people to an existing reservation, paying the difference for the added spots, and changing the date/time. Confirm what Bookeo allows customers to do self-service vs. what requires staff intervention.

### Notifications & Reminders

- **Booking confirmation emails** -- Verify that Bookeo sends a branded confirmation email with date, time, room name, group size, and any prep instructions.
- **Reminder emails** -- Set up automated reminders (e.g., 24 hours and 1 hour before) to reduce no-shows.
- **Staff notifications** -- Ensure the game master or front desk gets notified of new bookings, cancellations, and changes.

### Waivers & Policies

- **Liability waiver integration** -- Determine whether Bookeo can collect signed waivers during booking or if a separate waiver tool is needed.
- **Age restrictions / parental consent** -- If any rooms have age limits, configure Bookeo to enforce them or display a notice during booking.

### Calendar & Availability

- **Buffer time between sessions** -- Build in reset/cleanup time between bookings so rooms aren't back-to-back with no prep time. **Current policy: 30 minutes between sessions per room** (see the [Room Schedule](/room-schedule)).
- **Blackout dates and special hours** -- Ability to block off holidays, private events, or maintenance days.
- **Seasonal or day-of-week pricing** -- If weekend or holiday pricing differs, confirm Bookeo supports variable pricing rules.

### Website Integration

- **Embedded vs. redirect booking** -- Decide whether the Bookeo widget is embedded directly on the Lock & Logic website or opens in a new tab/popup.
- **Mobile-friendly booking flow** -- Verify the booking experience works smoothly on phones since a large percentage of bookings will come from mobile.
- **Brand consistency** -- Customize the Bookeo widget colors, fonts, and language to match the Lock & Logic brand.

### Gift Cards & Special Offers

- **Gift card / voucher support** -- Can customers purchase gift cards through Bookeo? If so, configure redemption flow.
- **Group/corporate booking rates** -- If you plan to offer discounts for corporate team-building or large groups, set up those pricing tiers.

---

## Room Tester Free Codes

Before the public launch, room testers (friends, family, invited guests) should be able to book and play for free. The plan is to give each tester a unique, one-time code (e.g. `Test01`, `Test02`, …) so their booking is free and we can track who used which code.

### How to set it up in Bookeo

- **One promotion, multiple coupon codes.** Create a single promotion set to **100% discount**, then attach a list of coupon codes to it (`Test01`, `Test02`, `Test03`, …). This is the same "multiple coupon codes" mechanism Bookeo uses for Groupon-style campaigns.
- **Each code is single-use.** In the multiple-coupon-codes model, a code can't be reused once it's been redeemed on a booking — so each code is effectively one person, one use.
- **100% discount = free room.** A code applies a full discount, bringing the tester's total to $0.

### Tracking who used each code (and which room)

- **Coupons report** (Reports → Coupons, downloadable as XLS) lists each code, whether/when it was used, and the booking it applied to — which ties back to the customer's name. This is the source of truth for "who used `Test01`."
- The **individual booking detail** also shows the promotion/code that was applied.
- **Which room they chose is captured automatically.** Every Bookeo booking records the product/service (the room) booked, so each tester's booking shows their room — no extra setup needed. To see code + name + room together, cross-reference the Coupons report's booking against the **Bookings report** (or open the booking), or filter the Bookings report by date/room.
- ⚠️ **Don't rely on the payments/transaction history** to match a code to a person — a 100%-off booking is **$0**, so it may not create a payment line at all. Use the Coupons report or the booking detail instead.

### ✅ Verified 2026-08-17

- [x] A **100%-off booking completes without hitting the payment gateway** — $0, payment skipped entirely. Confirmed again with a full room of eight ($280 → $0).
- [x] The **Coupons report shows the tester's name** alongside the code they used — the coupon list links straight to the booking.
- [x] A redeemed code **cannot be reused** — retried and Bookeo reported it already used.
- [x] The booking record shows **which room** was played, with no extra setup.

Two behaviours the original checklist didn't anticipate:

- **Cancelling a booking does not release the code.** It stays used. There's a setting on the promotion ("Mark the coupon as unused if the customer cancels…") that changes this, currently switched off.
- **Codes only work on the public booking page**, not from the staff dashboard. Anyone being comped has to book their own day and time; at the front desk, use a price adjustment instead.

The same mechanism now powers the standing comp offers — see [Free Room Codes](/free-room-codes).
