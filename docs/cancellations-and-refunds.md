# Cancelling a Booking & Issuing Refunds

> Step-by-step: how to cancel a customer's booking in Bookeo (which frees the time slot) and refund their payment in Stripe. Two systems, two steps — always in that order.

---

## The policy (what customers were promised)

Shown on the website and on the Bookeo checkout page:

> Cancel or reschedule for free up to 24 hours before your booking (full refund). Cancellations with less than 24 hours notice, and no-shows, are non-refundable.

So in practice:

| Situation | Slot | Money |
|---|---|---|
| Cancelled **24+ hours** before the game | Free it (steps below) | **Full refund** in Stripe |
| Cancelled **less than 24 hours** before | Free it | No refund (offer to reschedule if you can) |
| No-show | Nothing to do | No refund |

Customers can also cancel or change their own booking online up to **1 day** before their game (from the link in their confirmation email). A self-cancellation frees the slot automatically, but **money never moves on its own** — if a refund is owed, you still do the Stripe step below.

---

## Step 1 — Cancel the booking in Bookeo

This frees the time slot immediately so someone else can book it.

1. Log in to Bookeo and open the **Calendar**.
2. Use the small month calendar (top-left) to jump to the booking's date.
3. Click the **time-slot row** for the room (it will show "1 booked"). A window opens for that session.
4. In the **Bookings** tab of that window, click the **blue bar with the customer's name**. This opens the actual booking record (you'll see the booking number, price, and payment).
5. In the booking record, click **🗑 Delete** in the right sidebar.

::: warning The buttons are confusingly named
- **"Cancel"** (in either window) just closes the window — it does *not* cancel anything.
- **"Delete" on the first window (the time slot)** would delete the whole session from the schedule — don't use that one.
- **"Delete" on the booking record (the window with the customer's name in the title)** is the correct "cancel this booking" action. Bookeo will ask you to confirm before anything happens.
:::

6. A confirmation appears: *"Are you sure that you want to cancel this booking?"* The default checkboxes are usually right:
   - **Track cancellation in customer's history** — leave on.
   - **Send email: customer** — leave on (the customer gets a cancellation confirmation).
   - **Send email: other users** — leave on (the other owners are notified).
   - **Allow customer to reschedule** — tick this only if you're letting them rebook themselves instead of refunding.
   - You can add an optional personal message to the customer.
7. Click **Yes, cancel**.

The slot goes back to "0 booked, 8 available" instantly and is bookable again by the public.

::: tip
Bookeo never moves money. Cancelling here only frees the slot and updates records — if a refund is owed, continue to Step 2.
:::

---

## Step 2 — Refund the payment in Stripe

Only when the policy says a refund is due (24+ hours notice).

1. Log in to the [Stripe Dashboard](https://dashboard.stripe.com).
2. Go to **Payments** in the left menu.
3. Find the customer's charge — search by their name, email, or the amount, and match the date. (The Bookeo booking record's **Payments** tab shows the amount and date if you need to double-check.)
4. Click the payment to open it, then click **Refund**.
5. Leave the amount as the full amount, pick a reason if you like ("Requested by customer"), and confirm.

The customer's money is returned to their card — it typically shows on their statement in 5–10 business days.

::: tip Good to know about Stripe refunds
- **Stripe keeps its processing fee** (about 3%) even on a full refund — a refunded $70 booking costs the business roughly $2. That's normal and there's no way around it.
- The refund can look odd on some customers' bank statements for a day or two (a negative charge rather than a deposit). The balance is still correct.
- Always do Bookeo first, Stripe second, so the booking record and the money stay in sync.
:::

---

## Quick reference

| I want to… | Where | What to click |
|---|---|---|
| Cancel a booking + free the slot | Bookeo → Calendar → date → slot → customer's blue name bar | **Delete** (on the booking record) → **Yes, cancel** |
| Refund the payment | Stripe → Payments → find the charge | **Refund** |
| Let the customer rebook instead of refunding | Same cancel flow in Bookeo | Tick **"Allow customer to reschedule"** before confirming |
