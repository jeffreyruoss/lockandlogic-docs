# 📧 Email Opt-In Campaign

You have a list of email addresses from people who may be interested in Lock & Logic. Before adding them to the newsletter, the professional and legally compliant approach is to send a **one-time opt-in email** asking if they'd like to subscribe.

This keeps you CAN-SPAM compliant, protects your sender reputation, and ensures your mailing list is made up of people who actually want to hear from you.

---

## Two Different Audiences — Why It Matters

By the time we run this campaign, you'll actually have **two groups of contacts** in Mailchimp, and they need to be handled differently:

| Group | Where they came from | Permission status |
|---|---|---|
| **Website signups** | People who voluntarily entered their email through a form on `lockandlogic.com` (the coming-soon page or, after launch, the main site) | ✅ Already opted in — safe to email |
| **Imported contacts** (~140) | The existing contact list you'll upload from your spreadsheet | ⚠️ Have not yet opted in — must ask permission first |

**The opt-in campaign should only go to the imported contacts** — not to the people who already signed up on the website. Sending it to the website signups would confuse them ("Wait, I already signed up — why are they asking again?") and could hurt your sender reputation.

---

## How We'll Keep Them Separate

We'll use **one Mailchimp audience** with **tags** to keep the groups organized. Mailchimp tags are like labels — every contact can have one or more, and when you send a campaign you can target only the contacts with a specific tag.

| Tag name | Who gets it | Applied how |
|---|---|---|
| `coming-soon-signup` | People who sign up via the **coming-soon page** form | Automatically by the website, every time someone submits the form |
| `website-signup` | People who sign up via the **main website** form (after launch) | Automatically by the website, every time someone submits the form |
| `2026-import` | The ~140 contacts from your spreadsheet | Manually by you when you upload the CSV to Mailchimp |

Both `coming-soon-signup` and `website-signup` mean the same thing for permission purposes — **the person voluntarily opted in through a form on our site**. We use two separate tags only so you can see *where* a signup came from inside Mailchimp. The `2026-import` group is the one that hasn't opted in yet.

Using one audience with tags (instead of separate audiences) keeps the Mailchimp cost the same and avoids duplicate contacts if someone is in more than one group.

### Sending campaigns after the tags are in place

| When you send… | Target this segment |
|---|---|
| **The one-time opt-in campaign** | Contacts tagged `2026-import` **AND NOT** (`coming-soon-signup` **OR** `website-signup`) |
| **Future newsletters and announcements** | Contacts tagged `coming-soon-signup` **OR** `website-signup` |

When an imported contact clicks the "Subscribe" button in the opt-in email, they'll land on the website signup form. Submitting that form automatically adds the website opt-in tag to their existing record — so from then on, they're in your real, opted-in newsletter list and will be excluded from any future opt-in sends.

---

## Step-by-Step Process

> **Code prerequisite — done:** The newsletter signup forms on both the coming-soon page and the main website now automatically tag signups (`coming-soon-signup` and `website-signup` respectively), including re-tagging existing/imported contacts who later opt in. This is what makes the tag-based separation below work. (Deploy still required — see Implementation Notes.)

1. **Export the spreadsheet to CSV** (just the email column is required; first/last name optional)
2. **Upload to Mailchimp** → "Add contacts" → choose **"Import contacts"** → upload the CSV
3. **During the import**, apply the tag **`2026-import`** to all uploaded contacts
4. **Import status**: choose **"Subscribed"** so they'll receive the single opt-in email (we'll exclude them from everything else using the tag filter)
5. **Build the campaign** in Mailchimp using one of the three options below
6. **Target the segment**: contacts WITH tag `2026-import` AND WITHOUT tags `coming-soon-signup` or `website-signup`
7. **Send and wait 1–2 weeks** for clicks
8. **After 2 weeks**, anyone still tagged `2026-import` who never clicked through is removed (or kept as "unsubscribed" so they can't be re-imported by mistake)

---

## Option 1 — Friendly & Casual

**Subject:** Want to stay in the loop with Lock & Logic?

**Message:**

Hey there!

We're building something exciting — **Lock & Logic**, a brand-new escape room experience coming soon.

You're receiving this because we've connected at some point and thought you might be interested in following along.

We'd love to keep you in the loop with updates, opening announcements, and exclusive offers — but only if you want to hear from us.

**[Yes, sign me up!]**

No hard feelings if not — this is the only email you'll receive unless you opt in.

Thanks!
The Lock & Logic Team

---

## Option 2 — Mystery & Intrigue

**Subject:** You've been invited to unlock something new...

**Message:**

Something is coming — and you're on the guest list.

**Lock & Logic** is a new escape room experience, and we're gearing up for launch.

We're putting together an insider list for people who want early access to updates, sneak peeks, and special offers. Want in?

**[Unlock Early Access]**

If this isn't your thing, no worries — you won't hear from us again unless you opt in.

See you on the inside,
The Lock & Logic Team

---

## Option 3 — Straightforward & Professional

**Subject:** Lock & Logic — would you like to receive updates?

**Message:**

Hi,

We're reaching out because you've had some connection with us in the past, and we wanted to let you know about **Lock & Logic** — a new escape room experience launching soon.

We're building a mailing list for people who'd like to receive:

- Opening date announcements
- Special promotions and early-bird offers
- News and behind-the-scenes updates

If you're interested, click below to subscribe:

**[Subscribe to Updates]**

If you'd rather not receive future emails, simply ignore this message — we won't contact you again.

Best regards,
The Lock & Logic Team

---

## Our Recommendation

**Option 2** strikes a good balance — it leans into the escape room brand with a sense of mystery, which is more memorable than a generic email and more likely to get clicks. Option 1 is a safe fallback if you prefer a warmer, more personal tone. Option 3 works best if your audience skews more corporate (e.g., team-building contacts).

Whichever you choose, the **[button]** in the email should link to your newsletter signup on the website, so people opt in through the existing form.

---

## Mailchimp Plan & Access

A few constraints of the current Mailchimp **Free** plan that affect this campaign and everyday use:

- **One user seat.** The Free plan allows only a single login (the Owner). If the account shows two users, Mailchimp restricts campaign and automation setup until the extra user is removed or you upgrade. Removing the second user restores campaign sending on Free.
- **Campaigns work; automations don't.** A one-time campaign like this opt-in send works on Free, including the tag targeting it needs (send to `2026-import`, exclude the website tags). Automated *welcome emails* were removed from the Free plan in 2026 — those need a paid plan, but this campaign doesn't require one.
- **250-contact cap.** Free is limited to 250 contacts; unsubscribed contacts still count. With ~140 imported plus website signups, keep an eye on the total.
- **Upgrade options:** Essentials (~$13/mo) adds seats and automations; a read-only "Viewer" login only exists on the Standard plan and above.

### Testing the signup form (no Mailchimp login needed)

You don't need a Mailchimp seat to confirm the form works end to end:

1. Submit the newsletter form with a test email.
2. Open **`lockandlogic.com/admin` → Form submissions** — the entry shows `mailchimp_success: true` when the subscribe call succeeded.

**Use your own (already-subscribed) email as the test address.** Because it's already in the list, Mailchimp returns "Member Exists" — which the code counts as success, adds **no** new contact (so it won't eat into the 250-contact cap), and exercises the re-tagging path. Avoid made-up addresses: Mailchimp's spam filter may reject an obvious fake (making the test falsely "fail"), and any genuinely new address you submit becomes a contact you can't delete without Mailchimp access.

**What this confirms — and what it doesn't.** `mailchimp_success: true` proves the form pipeline and the Mailchimp connection are working; it does **not** by itself prove the source *tag* was applied (a tag hiccup is logged but still reported as success, so visitors never see an error). Reusing your own email also exercises the "existing member" branch, not brand-new member creation. To verify the new-signup path and that tags are actually landing, either submit a Gmail +alias once (e.g. `you+test@gmail.com` — a real, deliverable address that creates one new, undeletable contact) or, better, spot-check the contact's tags directly in Mailchimp.

---

## Implementation Notes (Internal)

> The section below is technical implementation detail for Jeff — not required reading for the client.

**Status: implemented in code, not yet deployed.** Both newsletter APIs now tag signups and re-tag existing members.

**Files changed:**
- `src/lib/mailchimp.ts` (main Astro site) — tags with `website-signup`
- `coming-soon/api/newsletter.js` (coming-soon page) — tags with `coming-soon-signup` (also stopped HTML-escaping the email before Mailchimp, which had corrupted addresses containing `'` or `&`)

**What each does now:**

1. **Tags every new signup** — the create call includes `tags: ["<source-tag>"]` in the POST body, so a brand-new subscriber is tagged on creation.

2. **Handles the "Member Exists" case** so imported contacts who later opt in via the website actually get tagged. When the create POST returns `title: "Member Exists"`, it follows up with:

   ```
   POST /3.0/lists/{listId}/members/{subscriber_hash}/tags
   {
     "tags": [{ "name": "<source-tag>", "status": "active" }]
   }
   ```

   Where `subscriber_hash` is the MD5 of the lowercased email (`node:crypto`). The endpoint is idempotent — re-tagging a member who already has the tag is a no-op.

3. **Doesn't change status on existing members.** A `2026-import` contact who hasn't opted in may be `unsubscribed` or `pending`. Adding the source tag is the opt-in signal; the tag-based segment filter does the work on the send side.

4. **Tag-add failures don't break the form** — a failed follow-up tag POST is logged (`console.error`) but the user still sees success. Acceptable for v1; worth reviewing logs after launch.

**Deploy:** both are separate Vercel projects — `vercel --prod` from the repo root (Astro) and from `coming-soon/`.

**Mailchimp tag setup — mostly optional:**

The code applies tags through the Mailchimp API, which **auto-creates any tag the first time it's referenced**. So website signups get tagged correctly even if nobody touches Mailchimp first, and **a missing tag will never make the form fail**. Order of operations doesn't matter — the tag code can ship before or after the Mailchimp setup.

- *(Optional)* Pre-create `coming-soon-signup` and `website-signup` in the audience tag library if you'd like them visible in the UI before the first signup (avoids a harmless race on the very first submit).
- *(Required, but it's a manual import step anyway)* Apply the `2026-import` tag when uploading the CSV — see Step 3 above.

**Edge cases worth handling later (not blockers for the opt-in campaign):**

- **Double-tagging on re-signup**: if someone signs up twice, the tag-add call will succeed both times — fine.
- **Failed tag-add after a successful create**: the follow-up `POST .../tags` could fail even though the member create succeeded; the API still returns `success: true` to the form. Acceptable for v1 — log the tag failure for review, but don't break the user-facing flow.
- **Cleanup after opt-in window closes**: write a one-off script (or do it in the Mailchimp UI) to remove the `2026-import` tag from any contact who picked up `coming-soon-signup` or `website-signup`, leaving a clean unverified-only segment for the final purge.
