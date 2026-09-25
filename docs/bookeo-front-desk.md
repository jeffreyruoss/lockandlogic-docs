# Bookeo Front Desk Guide

> Everyday Bookeo tasks at the front desk: checking groups in, marking no-shows, adding a player who wants to pay with their own card, and moving a booking to another day or time. Plus a note on sales tax.

---

## Finding a booking

Every task below starts here.

1. Log in to Bookeo and open the **Calendar**.
2. Use the small month calendar (top-left) to jump to the date.
3. Click the **time-slot row** for the room (it shows "3 booked", etc.). A window opens for that session.
4. The **Bookings** tab lists the group as a **blue bar with the customer's name**.

::: warning "Cancel" just closes the window
In any Bookeo window, **Cancel** means "close without saving". It does *not* cancel the booking.
:::

---

## Checking a group in

1. Find the booking (above).
2. On the blue name bar, click the **small square at the right end**.
3. Pick a status:
   - **customer arrived** (blue) when the group checks in
   - **visit completed** (green) when they finish (optional)
   - **Clear** if you picked the wrong one

The change shows up right away for everyone logged in to Bookeo. It's for staff only: customers never see it, and it sends no emails.

---

## Marking a no-show

This is a separate button, and it only appears **after the booking's start time has passed**.

1. Find the booking, then click the **blue name bar** to open the booking record.
2. Click **No-show** in the right sidebar.
3. Confirm with **Yes, mark as a no-show**, then click **Ok**.

The no-show is recorded in the customer's history and in the booking reports (**Marketing → Reports → Bookings**). Under the [cancellation policy](/cancellations-and-refunds), no-shows aren't refunded.

---

## Adding a player who pays with their own card

For when a group has already paid and one more person joins but wants to pay for themselves.

**1. Add the player**

1. Find the booking, then click the **blue name bar** to open the booking record.
2. Next to **Participants**, click **+** to add one person. (Rooms hold up to 8.)
3. Click **Save**. The total goes up by $35 and the booking shows **Total due: $35**.

If Bookeo offers to charge the card on file, **skip it**. That card belongs to the person who made the booking.

**2. Send a payment request**

1. Open the booking record again and click **Payment**.
2. Set **Action** to **send a payment request**.
3. Leave **Amount** as the amount due ($35).
4. Add a **Message**, e.g. *"This is for Sam's spot. Please forward it to Sam so they can pay."*
5. Click **Save**.

The organizer gets an email with a **Pay now** button and forwards it to the new player, who pays with their own card. If they're standing at the desk, they can open the email on their phone and pay on the spot. The payment then appears in the booking's **Payments** tab.

::: danger Leave "cancel booking if no payment is received" unticked
That option cancels the **whole group's booking** if the extra $35 isn't paid in time.
:::

::: tip Paid another way?
If the player pays cash or on a card reader instead, use **Payment → record a manual payment** so the booking shows as paid.
:::

---

## Moving a booking to another day or time

For when someone booked the wrong slot. Moving the booking keeps their payment attached, so you don't need to refund or charge anything. The old slot opens back up for sale automatically.

1. Find the booking, then click the **blue name bar** to open the booking record.
2. In the **When** section, click **Find** to see open dates and times, or pick the new **Date** and time from the dropdowns.
3. Leave **Send email: customer** ticked so they get an updated confirmation with the new date.
4. Click **Save**.

### Joining another group's slot

Rooms are **private**: once one group books a slot, Bookeo shows it as full ("0 available") and won't let anyone else in, including a booking you're moving. To put a second group in the same slot, briefly open the slot to one more booking:

1. **Open up the target slot.** On the Calendar, click the time-slot row the group is joining. At the top of the window, set **Private** to **no** and **Seats** to the total players (e.g. **4** for 2 + 2). Click **Save**.
2. **Move the booking** into that slot using the steps above.
3. **Set the slot back.** Click the time-slot row again, set **Private** to **yes (default)** and **Seats** to **8 (default)**, and click **Save**.

Setting **Seats** to the combined total means the slot is full right after the move, so no stranger can book the empty seats in between.

The slot now shows **both bookings** (e.g. 4 booked). They stay as two separate bookings, each with its own payment, confirmation, and waivers. That's fine: they play together as one group.

::: tip Rather merge them into one booking?
You can instead add the players to the existing booking (**Participants +**), then cancel the other booking with a refund. That means refunding one card and collecting again with a payment request, so moving the booking is usually simpler.
:::

**Bookeo help:** [Reschedule a booking from the calendar](https://support.bookeo.com/hc/en-us/articles/360017925672-How-can-I-reschedule-a-booking-from-my-Bookeo-Calendar) · [Overbook a slot](https://support.bookeo.com/hc/en-us/articles/360017924512-Can-I-overbook-a-tour-class-workshop)

---

## Sales tax

Bookeo has **no sales tax set up**, so it records each $35 ticket as $35 of sales with no tax line. None of its reports can show tax collected.

Bookeo can split the tax out of the $35 automatically for **new** bookings (Settings → Taxes, set as "included in price"). The price customers pay stays the same. Bookings made before the change won't be split.

---

## Quick reference

| I want to… | Where | What to click |
|---|---|---|
| Check a group in | Calendar → date → slot → blue name bar | Small square → **customer arrived** |
| Mark a no-show | Open the booking record (after start time) | **No-show** → **Yes, mark as a no-show** → **Ok** |
| Add a player who pays separately | Booking record → Participants **+** → Save | **Payment** → **send a payment request** → Save |
| Record cash / card-reader payment | Booking record | **Payment** → **record a manual payment** |
| Move a booking to another day/time | Booking record → **When** | **Find** → pick the slot → **Save** |
| Put a group into another group's slot | Target slot: **Private** no, **Seats** = total → Save | Move the booking, then set the slot back to the defaults |
| Cancel or refund | See [Cancellations & Refunds](/cancellations-and-refunds) | |
