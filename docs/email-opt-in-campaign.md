# 📧 Email Opt-In Campaign

You have a list of email addresses from people who may be interested in Lock & Logic. Before adding them to the newsletter, the professional and legally compliant approach is to send a **one-time opt-in email** asking if they'd like to subscribe.

This keeps you CAN-SPAM compliant, protects your sender reputation, and ensures your mailing list is made up of people who actually want to hear from you.

---

## Two Different Audiences — Why It Matters

By the time we run this campaign, you'll actually have **two groups of contacts** in Mailchimp, and they need to be handled differently:

| Group | Where they came from | Permission status |
|---|---|---|
| **Coming-soon signups** | People who voluntarily entered their email on `lockandlogic.com` | ✅ Already opted in — safe to email |
| **Imported contacts** (~140) | The existing contact list you'll upload from your spreadsheet | ⚠️ Have not yet opted in — must ask permission first |

**The opt-in campaign should only go to the imported contacts** — not to the people who already signed up on the website. Sending it to the website signups would confuse them ("Wait, I already signed up — why are they asking again?") and could hurt your sender reputation.

---

## How We'll Keep Them Separate

We'll use **one Mailchimp audience** with two **tags** to keep the groups organized. Mailchimp tags are like labels — every contact can have one or more, and when you send a campaign you can target only the contacts with a specific tag.

| Tag name | Who gets it | Applied how |
|---|---|---|
| `coming-soon-signup` | People who sign up via the website form | Automatically by the website, every time someone submits the form |
| `2026-import` | The ~140 contacts from your spreadsheet | Manually by you when you upload the CSV to Mailchimp |

Using one audience with tags (instead of two separate audiences) keeps the Mailchimp cost the same and avoids duplicate contacts if someone is in both groups.

### Sending campaigns after the tags are in place

| When you send… | Target this segment |
|---|---|
| **The one-time opt-in campaign** | Contacts tagged `2026-import` **AND NOT** `coming-soon-signup` |
| **Future newsletters and announcements** | Contacts tagged `coming-soon-signup` |

When an imported contact clicks the "Subscribe" button in the opt-in email, they'll land on the website signup form. Submitting that form automatically adds the `coming-soon-signup` tag to their existing record — so from then on, they're in your real, opted-in newsletter list.

---

## Step-by-Step Process

> **Before this can begin:** Jeff needs to make a small code change to the newsletter signup form on both the coming-soon page and the main website so that website signups are automatically tagged `coming-soon-signup`. Without that change in place first, the tag-based separation below won't work and imported contacts who later opt in via the website wouldn't be distinguishable from the unverified import group.

1. **Export the spreadsheet to CSV** (just the email column is required; first/last name optional)
2. **Upload to Mailchimp** → "Add contacts" → choose **"Import contacts"** → upload the CSV
3. **During the import**, apply the tag **`2026-import`** to all uploaded contacts
4. **Import status**: choose **"Subscribed"** so they'll receive the single opt-in email (we'll exclude them from everything else using the tag filter)
5. **Build the campaign** in Mailchimp using one of the three options below
6. **Target the segment**: contacts WITH tag `2026-import` AND WITHOUT tag `coming-soon-signup`
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

## Implementation Notes (Internal)

> The section below is technical implementation detail for Jeff — not required reading for the client.

The two-tag strategy above requires a small change to the existing newsletter API so that website signups are automatically tagged.

**File:** `src/lib/mailchimp.ts`

**Current behavior:**
- `POST /3.0/lists/{listId}/members` with `{email_address, status: "subscribed"}` — no tags applied
- "Member Exists" response is treated as a silent success — no tag updates on existing members

**Required changes:**

1. **Tag every new signup** by adding `tags: [{ name: "coming-soon-signup", status: "active" }]` to the POST body. (Note: the create-member endpoint accepts the simpler shape `tags: ["coming-soon-signup"]` too, but the object form is what's documented for `PATCH` and is consistent across endpoints.)

2. **Handle the "Member Exists" case** so imported contacts who later opt in via the website actually get tagged. When the POST returns `title: "Member Exists"`, follow up with:

   ```
   POST /3.0/lists/{listId}/members/{subscriber_hash}/tags
   {
     "tags": [{ "name": "coming-soon-signup", "status": "active" }]
   }
   ```

   Where `subscriber_hash` is the MD5 of the lowercased email address. The endpoint is idempotent — calling it on a member who already has the tag is a no-op.

3. **Don't change status to `subscribed` on existing members.** If a contact in the `2026-import` group has not yet opted in, they may be in `unsubscribed` or `pending` status. Adding the `coming-soon-signup` tag is the opt-in signal; let the tag-based segment filter do the work on the send side.

**Mailchimp setup that Jenn (or Jeff on her behalf) needs to do once:**

- Create the static tag `coming-soon-signup` in the audience tag library (Mailchimp will also auto-create it the first time the API references it, but pre-creating avoids a race on the first signup)
- Create the static tag `2026-import` ahead of the CSV upload

**Edge cases worth handling later (not blockers for the opt-in campaign):**

- **Double-tagging on re-signup**: if someone signs up twice, the tag-add call will succeed both times — fine.
- **Failed tag PATCH after a successful POST**: currently the API would still return `success: true` to the form. Acceptable for v1 — log the tag failure for review, but don't break the user-facing flow.
- **Cleanup after opt-in window closes**: write a one-off script (or do it in the Mailchimp UI) to remove the `2026-import` tag from any contact who picked up `coming-soon-signup`, leaving a clean unverified-only segment for the final purge.
