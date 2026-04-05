# Return Visit Discount

How to offer a 10% discount to customers who book their next room before leaving the venue.

---

## How It Works

After a game, if the guest wants to book their next visit, staff handle the entire booking and payment at the front desk.

1. Staff open the Bookeo dashboard and create a new booking for the guest.
2. In the booking tab, under **Additional items/adjustments**, staff enter **-$3** to apply the 10% discount.
3. The booking total shows **$27** instead of $30.
4. Staff process the $27 payment using the **Square POS card reader** at the front desk.
5. Bookeo records the booking and payment together — everything stays in one system.

---

## Payment Setup

Bookeo supports using two different payment processors at the same time:

- **Stripe** -- Handles all online payments (customers booking through the website).
- **Square POS** -- Handles in-store payments (customers paying at the front desk with tap or swipe).

These work independently. You do not need Square E-Commerce to use Square POS — it's only used for processing cards in store.

---

## Why This Works

- **No promo codes** -- Staff apply the discount manually as a booking adjustment. Nothing for customers to share or misuse.
- **One system** -- The booking, discount, and payment are all recorded in Bookeo. No separate POS records to reconcile.
- **Simple for staff** -- Create booking, enter -$3, tap the card reader. Done.
- **Accurate records** -- The booking total reflects the actual discounted price, so there's no "unpaid" balance showing up.

---

## Bookeo Promo Code Capabilities

Bookeo also has a built-in promo code system under **Marketing > Promotional codes** that can be used for other promotions. Here's what it supports:

### Discount Types

| Type | Example |
|------|---------|
| Percentage off | 10% off the booking total |
| Fixed amount off | $5 off the booking total |
| Fixed price override | Set the price to $25 regardless of the original |

### Usage Limits

- **Max total uses** -- Limit how many times a code can be redeemed overall. Set to 1 for a single-use code.
- **Max uses per customer** -- Limit how many times the same customer can use the code.

### Date Restrictions

- **Valid date range** -- Set a start and end date for when the code can be used.
- **Booking date restrictions** -- Restrict the code to bookings on specific dates (e.g., only valid for Tuesday bookings).

### Product Restrictions

Codes can be limited to **specific rooms** rather than applying to everything.

### Limitations

- **No promo code field in the dashboard's New Booking modal** -- Codes only work on the customer-facing booking widget.
- **No bulk code generation** -- Each code must be created individually in the dashboard.
- **No rolling expiration** -- Expiration is by calendar date only (not "1 hour after issue").
- **No automatic per-customer codes** -- No built-in feature to auto-generate unique codes for each customer.
