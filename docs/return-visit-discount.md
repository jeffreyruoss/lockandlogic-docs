# Return Visit Discount

How to offer a 10% discount to customers who book their next room before leaving the venue -- using Bookeo's built-in promo code system.

---

## How It Works

Staff book the customer's next visit right at the front desk before they leave. The customer never sees or handles a promo code.

### Setup (One-Time)

1. **Create a promo code in Bookeo** -- Go to **Marketing > Promotional codes** and create a code (e.g., `RETURN10`). Set it to 10% off.
2. **Train staff** -- After a game, if the guest wants to book their next visit, staff open the Bookeo dashboard, create the booking, and apply the promo code on their end.

### At Checkout

1. Guest finishes their game and wants to book again.
2. Staff open the Bookeo dashboard and create a new booking for the guest.
3. Staff enter the promo code to apply the 10% discount.
4. Guest pays the discounted rate on the spot.

### Why This Works

- **Code never leaves the building** -- Only staff know it, so it can't be shared or used online by anyone else.
- **No code management overhead** -- One reusable code for all return bookings. No individual codes to create or track.
- **Simple for customers** -- They just tell staff what room and date they want. Staff handle everything.
- **Easy to change** -- If a staff member leaves or the code needs to rotate, just update it in Bookeo.

---

## Bookeo Promo Code Capabilities

Here's a full overview of what Bookeo supports for promotional codes, so you know what's available if you want to run other promotions in the future.

### Creating Codes

Promo codes are managed in the Bookeo dashboard under **Marketing > Promotional codes**. Each code is created manually.

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

Codes can be limited to **specific rooms or products** rather than applying to everything.

### Staff-Applied Discounts

Staff can also apply discounts without a promo code:

- **Enter a promo code on behalf of a customer** when making a booking through the Bookeo dashboard.
- **Add a manual adjustment** (dollar amount or percentage) to any individual booking.

### Limitations

- **No bulk code generation** -- Each code must be created individually in the dashboard. There's no way to auto-generate 50 unique codes at once.
- **No API access** -- Promo codes can only be managed through the dashboard, not programmatically.
- **No rolling expiration** -- You can't create a code that expires "1 hour after it's given out." Expiration is by calendar date only.
- **No automatic per-customer codes** -- There's no built-in feature to automatically issue a unique code to each customer.
