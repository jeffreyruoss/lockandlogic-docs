# Site Database Backups

> Backups of the **website's own database** (Supabase) — form submissions and the admin-managed content. For backing up the **booking platform** data in Bookeo, see [Booking Data Backup Strategy](/data-backup-strategy) instead.

---

## What gets backed up

Four Supabase tables, each dumped as its own JSON file:

- **`form_submissions`** — every contact, group-inquiry, and newsletter submission. ⚠️ Contains customer **personal information** (names, emails, IP addresses) — handle these files carefully.
- **`faqs`** — the questions/answers shown on the public FAQ page.
- **`site_modals`** — the promo pop-ups.
- **`announcements`** — the top announcement-bar entries.

The genuinely irreplaceable data is `form_submissions`. FAQs are also seeded from the codebase, and pop-ups/announcements are short-lived promos — so those are reconstructable even without a backup.

---

## Two ways it runs

### Manual — `npm run backup`

Run from the main project on your computer. It writes a timestamped folder, `supabase/backups/<timestamp>/`, holding the four JSON files.

- These stay **local only** — `supabase/backups/` is gitignored, so backups are never committed to the repo.
- Use it when you want an immediate copy on your machine (e.g. before a risky change).
- **To open them:** open the `supabase/backups/` folder — the JSON files inside *are* the backup.

### Automatic — daily GitHub Action

A scheduled GitHub Action (`.github/workflows/backup.yml`) runs every **day at 09:23 UTC**, plus on demand. (The odd minute is deliberate — top-of-the-hour slots are GitHub's most congested and got the job delayed ~10 hours on 2026-08-27. It ran weekly until 2026-07-29; daily was cheap and means a bad day costs at most 24 hours of form submissions instead of a week's worth.)

**It runs entirely on GitHub's servers — not your computer.** Your machine can be off, asleep, or anywhere; the backup still happens in the cloud. The result is uploaded as a **private artifact** attached to that workflow run.

- **Download it:** GitHub → the repo → **Actions** tab → open the latest **Daily admin backup** run → scroll to **Artifacts** → download the zip.
- **Run it on demand:** Actions tab → **Daily admin backup** → **Run workflow**. (Good for verifying it works without waiting for the next scheduled run.)
- **Retention:** artifacts are kept **90 days**, then auto-deleted — rolling protection (recover something from the last ~3 months), not a permanent archive.

---

## What it depends on

The Action needs two **repository secrets** (GitHub → Settings → Secrets and variables → Actions) — already configured:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

(Same values as the local `.env`, which is what the manual command reads from.) The service-role key grants full database access and is server-side only — keep it secret.

---

## Limitations & upgrade path

- **PII handling:** `form_submissions.json` holds customer personal data. The CI artifact is private (the repo is private), but treat any downloaded copies the same way.
- **90-day window:** the automatic backup protects a rolling ~3 months, not forever. For permanent, off-GitHub archival, have the Action push the dump to external storage (Amazon S3, Supabase Storage) instead of — or in addition to — the artifact.
- **Scope:** this page covers the **website database only**. Booking and payment data lives in Bookeo and is backed up separately — see [Booking Data Backup Strategy](/data-backup-strategy).
