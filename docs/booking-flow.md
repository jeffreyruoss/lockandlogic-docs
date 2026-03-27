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

### Notifications & Reminders

- **Booking confirmation emails** -- Verify that Bookeo sends a branded confirmation email with date, time, room name, group size, and any prep instructions.
- **Reminder emails** -- Set up automated reminders (e.g., 24 hours and 1 hour before) to reduce no-shows.
- **Staff notifications** -- Ensure the game master or front desk gets notified of new bookings, cancellations, and changes.

### Waivers & Policies

- **Liability waiver integration** -- Determine whether Bookeo can collect signed waivers during booking or if a separate waiver tool is needed.
- **Age restrictions / parental consent** -- If any rooms have age limits, configure Bookeo to enforce them or display a notice during booking.

### Calendar & Availability

- **Buffer time between sessions** -- Build in reset/cleanup time between bookings (e.g., 15-30 minutes) so rooms aren't back-to-back with no prep time.
- **Blackout dates and special hours** -- Ability to block off holidays, private events, or maintenance days.
- **Seasonal or day-of-week pricing** -- If weekend or holiday pricing differs, confirm Bookeo supports variable pricing rules.

### Website Integration

- **Embedded vs. redirect booking** -- Decide whether the Bookeo widget is embedded directly on the Lock & Logic website or opens in a new tab/popup.
- **Mobile-friendly booking flow** -- Verify the booking experience works smoothly on phones since a large percentage of bookings will come from mobile.
- **Brand consistency** -- Customize the Bookeo widget colors, fonts, and language to match the Lock & Logic brand.

### Gift Cards & Special Offers

- **Gift card / voucher support** -- Can customers purchase gift cards through Bookeo? If so, configure redemption flow.
- **Group/corporate booking rates** -- If you plan to offer discounts for corporate team-building or large groups, set up those pricing tiers.
