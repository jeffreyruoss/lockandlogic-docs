# Game Master Software — Technical Analysis

> Build vs buy analysis, architecture notes, and integration planning

---

## Platform Deep Dive

### Houdini MC (Recommended for Launch)

- **Pricing:** One-time lifetime license. 1 room = EUR 150 (~$165), 3 rooms = EUR 300, 6 rooms = EUR 500. No recurring fees.
- **Architecture:** Runs as a local web server on a Windows/Mac/Linux machine. All devices (GM iPad, in-room displays) connect via browser on the same LAN. No internet required for core operation.
- **GM Interface:** Browser-based. Works on iPad Safari. Timer control, clue queue, camera feeds, prop triggers.
- **Clue Delivery:** Text (HTML-formatted), image, audio, video. 30+ preset themes or custom CSS.
- **In-Room Display:** Any device with a browser pointed at the local server URL. Shows countdown timer + clue messages.
- **Leaderboard:** Built-in, accessible via local network URL. Customizable per room. Designed for lobby TV display — not for website embedding via API.
- **Hardware Integration:** Supports Arduino and Raspberry Pi via network commands. Can trigger relays, read sensor inputs, control Philips Hue lights. Configuration is through the Houdini MC interface.
- **Data Storage:** Everything is stored locally on the host machine in a single file (their "Export All" bundles room params, themes, sounds, scheduled events, scoreboard, and automation settings). No cloud sync, no remote backup — you're responsible for your own data.
- **Limitations:** Leaderboard is local network only (no public API for website integration). No cloud sync — data lives on the host machine. No built-in booking system integration. If the host machine dies without a backup, all scoreboard history and room configs are lost.
- **Website:** [houdinimc.com](https://houdinimc.com/)

### Clue Command

- **Architecture:** Cloud-based SaaS. Everything runs through their servers.
- **GM Interface:** Web app, works on iPad. Timer, clue delivery, puzzle tracking.
- **Display:** In-room display via HDMI or Chromecast. Real-time sync with GM controls.
- **Hardware:** Connects physical sensors and buttons to trigger clues and track puzzle completions automatically.
- **Extras:** Multi-location management from one account. Automated Facebook photo sharing.
- **Pricing:** Not publicly listed — contact for quote. Likely monthly subscription.
- **Website:** [cluecommand.com](https://www.cluecommand.com/)

### ClueMaster

- **Architecture:** 100% cloud (Google Cloud hosted). Nothing to install. Browser-only.
- **GM Interface:** Web workspace — works on any device with a browser.
- **Hardware:** Supports network-enabled dry contact sensors and network relays for automating lights, doors, locks, effects.
- **Stats:** Tracks player, game, and device statistics in the cloud.
- **Pricing:** Monthly subscription, 30-day free trial on Starter accounts.
- **Website:** [cluemaster.io](https://www.cluemaster.io/)

### Escape Room Master

- **Pricing:** $19.95/mo for waiver management. Lifetime subscription option available. ~20% discount on annual billing.
- **Architecture:** Local software with web-based interfaces.
- **Hardware:** Integrates with Raspberry Pi, Arduino, and Philips Hue out of the box. Events-to-actions editor for time-based and button-based triggers.
- **Leaderboard:** Built-in. Runs on any device with a browser. Auto-calculated from room statistics.
- **Extras:** Digital waiver management (iPad/Android/web), photo/audio/video clues, background soundtracks.
- **Website:** [escaperoommaster.com](https://escaperoommaster.com/)

### QUEEN (Escape Room Doctor)

- **Architecture:** Combined hardware + software system. Software runs on Windows or Raspberry Pi. Real-time engine with 100ms deterministic cycle.
- **Automation:** Full CAD-style visual scenario editor. Events and actions as flowcharts. Branching game logic.
- **Hardware:** Native support for Arduino, Controllino, Phillips Hue, Z-Wave, MQTT, DMX, PLCs, and generic network devices.
- **Multi-language:** Switch room language/scenario in seconds.
- **Pricing:** License purchase + 10 hours consultation included. Specialist rates $25-50/hr. Average integration project: 1-2 weeks.
- **Verdict:** Massively powerful but way too complex for a first escape room. Worth revisiting if they expand to 5+ rooms or want fully automated experiences.
- **Website:** [escaperoomdoctor.com/queen](https://escaperoomdoctor.com/queen/)

### M3 (Mythric Mystery Master)

- **Architecture:** Windows desktop app (requires Windows 7+, 1GB RAM). Runs offline — no internet needed.
- **Design:** Story-driven. Rooms are "Stories" with Prologues and Epilogues. Supports branching logic and alternate story paths.
- **Hardware:** Phillips Hue, Z-Wave, MQTT, DMX, PLCs, Arduino, Raspberry Pi.
- **Licensing:** One license = unlimited rooms per location. Monthly or annual subscription (annual = 1 month free).
- **Website:** [mythricmysterymaster.com](https://www.mythricmysterymaster.com/)

---

## Houdini MC Backup Automation

Since Houdini MC is fully local with no cloud sync, we need to set up automated backups on the host machine. Here's the plan.

### What Needs Backing Up

Houdini MC stores everything in its application data directory. The "Export All" function bundles: room parameters, themes, sounds, scheduled events, scoreboard data, and automation settings into a single file. We need to either:

1. Automate the file-level backup of the Houdini MC data directory, or
2. Automate the "Export All" equivalent and push the result to cloud storage

### Option 1: Sync Data Directory to Cloud (Recommended)

Install Google Drive for Desktop (or Dropbox/OneDrive) on the host machine and set up a scheduled copy.

**On macOS/Linux — cron + rsync:**
```bash
#!/bin/bash
# houdini-backup.sh — runs daily via cron
HOUDINI_DATA="$HOME/HoudiniMC"  # verify actual path after install
BACKUP_DIR="$HOME/Google Drive/Backups/HoudiniMC"
DATE=$(date +%Y-%m-%d)

# Create dated backup
mkdir -p "$BACKUP_DIR/$DATE"
rsync -a "$HOUDINI_DATA/" "$BACKUP_DIR/$DATE/"

# Keep only last 30 days of backups
find "$BACKUP_DIR" -maxdepth 1 -type d -mtime +30 -exec rm -rf {} \;
```

```bash
# Add to crontab (runs daily at 2am)
crontab -e
0 2 * * * /path/to/houdini-backup.sh
```

**On Windows — Task Scheduler + PowerShell:**
```powershell
# houdini-backup.ps1
$HoudiniData = "$env:APPDATA\HoudiniMC"  # verify actual path after install
$BackupDir = "$env:USERPROFILE\Google Drive\Backups\HoudiniMC"
$Date = Get-Date -Format "yyyy-MM-dd"

# Create dated backup
$Dest = Join-Path $BackupDir $Date
New-Item -ItemType Directory -Path $Dest -Force | Out-Null
Copy-Item -Path "$HoudiniData\*" -Destination $Dest -Recurse -Force

# Keep only last 30 days
Get-ChildItem $BackupDir -Directory |
  Where-Object { $_.CreationTime -lt (Get-Date).AddDays(-30) } |
  Remove-Item -Recurse -Force
```

Set up in Windows Task Scheduler to run daily.

### Option 2: rclone to Any Cloud Provider

If they don't want Google Drive installed, `rclone` can push to Google Drive, S3, Backblaze B2, etc. without a desktop app.

```bash
# One-time setup
rclone config  # configure Google Drive remote

# In backup script
rclone sync "$HOME/HoudiniMC" gdrive:Backups/HoudiniMC --backup-dir "gdrive:Backups/HoudiniMC-old/$(date +%Y-%m-%d)"
```

### Setup Checklist

After installing Houdini MC:
- [ ] Locate the actual data directory on the host machine
- [ ] Verify what files/folders contain scoreboard, room configs, and settings
- [ ] Choose backup destination (Google Drive, Dropbox, or rclone remote)
- [ ] Install and test the backup script
- [ ] Schedule it (cron or Task Scheduler)
- [ ] Verify the first backup landed in the cloud
- [ ] Document the restore process (copy backed-up files back → use Import All in Houdini MC)

### Estimate

~2 hours to set up and test once Houdini MC is installed on the actual host machine.

---

## Leaderboard — Website Integration Options

The client-facing doc recommends Houdini MC + a custom website leaderboard. Here's how that would work technically.

### Option A: Simple Manual Entry (Launch)

**Stack:** Form UI on a protected admin route + database + public API endpoint

```
Staff completes game
  → Opens admin page on iPad (or separate device)
  → Enters: room, team name, time, # hints used, escaped (y/n)
  → Data saves to database

Website leaderboard component
  → Fetches from public API endpoint
  → Displays top times per room, filterable
  → Auto-refreshes or uses SSR with revalidation

Lobby TV
  → Same public URL, styled for large display
  → Auto-refreshes every 30-60 seconds
```

**Tech choices:**
- **Database:** Supabase (free tier, Postgres, real-time subscriptions, built-in auth for admin)
- **Admin UI:** Simple protected page on the Astro site or standalone at a subdomain
- **API:** Supabase REST API (auto-generated from table schema) or a simple Astro API route
- **Frontend component:** Astro component or vanilla JS that fetches and renders

**Schema:**
```sql
create table leaderboard (
  id uuid primary key default gen_random_uuid(),
  room text not null,
  team_name text not null,
  escape_time_seconds int not null,
  hints_used int default 0,
  escaped boolean default true,
  played_at timestamptz default now(),
  created_at timestamptz default now()
);
```

**Estimate:** 8-12 hours to build admin + API + website component + lobby display page.

### Option B: Automated from GM Software (Phase 2)

If Houdini MC's data can be read (it stores data locally on the host machine), we could write a sync script:

```
Cron job or file watcher on Houdini MC host
  → Reads game results from Houdini MC's local data
  → Pushes to Supabase via API
  → Website and lobby display update automatically
```

This eliminates the manual entry step. Requires investigating Houdini MC's data storage format (likely SQLite or flat files).

### Option C: Full Custom GM + Leaderboard (Phase 3+)

Build the entire game master system as a web app. Only worth it when the business has specific needs that no off-the-shelf tool covers.

**Architecture sketch:**
```
WebSocket server (Node.js or Bun)
  ├── GM iPad client (React/Vue PWA)
  │   ├── Timer controls (start/stop/pause/reset)
  │   ├── Clue queue + delivery
  │   ├── Camera feeds (RTSP → WebRTC or HLS)
  │   └── Prop trigger buttons
  ├── In-room display client (fullscreen browser)
  │   ├── Countdown timer
  │   ├── Clue display area
  │   └── Ambient effects (CSS animations, audio)
  ├── Lobby display client
  │   └── Auto-rotating leaderboard
  ├── Arduino/Pi MQTT bridge
  │   ├── Puzzle completion sensors → server events
  │   └── Server commands → relay triggers (locks, lights, fog)
  └── Database (Postgres/Supabase)
      ├── Game sessions
      ├── Leaderboard
      └── Room configurations
```

**Rough estimate:** 80-150 hours for MVP (timer + clues + leaderboard + basic prop control). Ongoing maintenance.

---

## Arduino / Raspberry Pi Integration Notes

The owner wants to tinker with hardware. Here's the practical path:

### At Launch (with Houdini MC)
- Houdini MC supports sending network commands to Arduino/Pi devices
- Simple setup: Arduino with Ethernet/WiFi shield listens for HTTP requests or MQTT messages
- Example uses: trigger a magnet lock release, turn on blacklight, play a sound effect, activate fog machine

### DIY Props (Independent of GM Software)
- **Arduino + relay modules** — control 5V/12V/120V devices (locks, lights, motors)
- **Raspberry Pi** — more complex logic, camera integration, audio playback, screen output
- **MQTT** — lightweight messaging protocol. Arduino publishes "puzzle solved" → GM software subscribes and reacts. This is the standard protocol used by QUEEN, M3, and the ArduinoProps library.
- **ArduinoProps library** (open source on GitHub) — specifically designed for escape room props with MQTT

### Communication Flow
```
Puzzle sensor (reed switch, RFID, pressure plate, etc.)
  → Arduino reads sensor input
  → Arduino publishes MQTT message: "puzzle_3_solved"
  → GM software receives message, updates puzzle tracker
  → GM software sends command: "trigger_relay_2"
  → Arduino receives, activates relay (opens lock, turns on light, etc.)
```

### Hardware Budget Estimate Per Room
| Component | Cost |
|-----------|------|
| Arduino Mega + Ethernet Shield | ~$50 |
| Relay module (8-channel) | ~$10 |
| Reed switches, buttons, sensors (assorted) | ~$30 |
| 12V power supply | ~$15 |
| Wiring, connectors, breadboards | ~$20 |
| Raspberry Pi 4 (if needed for camera/audio) | ~$60 |
| **Total per room** | **~$125-185** |

---

## Buzzshot (Supplemental Tool)

Worth mentioning separately because it's not GM software — it's a marketing/operations layer that sits alongside your GM platform.

- **Leaderboard:** Auto-updating, embeddable on website and lobby TV. Customizable appearance, filterable by room/time period.
- **Team Photos:** Branded photo capture and delivery. Customers get photos via SMS/email with social sharing buttons.
- **Waivers:** Digital waiver management.
- **Reviews:** Automated review request flow after each game.
- **Analytics:** Business dashboard with performance stats.
- **Pricing:** Monthly subscription, all features included at every tier. Cost scales with SMS volume.
- **Website:** [buzzshot.com](https://buzzshot.com/)

Could be useful later for the photo/review automation angle, but not needed at launch.

---

## Recommendation Summary

| Phase | GM Software | Leaderboard | Hardware |
|-------|------------|-------------|----------|
| **Launch** | Houdini MC (~$165/room) | Custom web component + manual entry via admin form (8-12 hrs dev) | None — add later |
| **3-6 months** | Houdini MC | Automate entry from Houdini MC data if possible | First Arduino props (locks, lights) connected to Houdini MC |
| **6-12 months** | Evaluate: stay with Houdini MC or start custom build | Full custom if building own GM system | MQTT-based prop network |
| **12+ months** | Custom web app (if justified by business needs) | Integrated with custom GM system | Full room automation |

**Bottom line:** Don't build what you can buy for $165/room. Spend dev time on the leaderboard website integration and save custom GM development for when there's a clear reason the off-the-shelf tool isn't enough. The Arduino/Pi hobby stuff can plug into Houdini MC from day one.
