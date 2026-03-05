# Game Master Software & In-Room Systems

> What game master software does, how it connects to the website leaderboard, and the options available

---

## What Game Master Software Does

When a group is in a room, a staff member needs to be watching them. Game master (GM) software is what staff use — typically on an iPad or tablet — to:

- **Run a countdown timer** displayed on a screen inside the room
- **Send clues and hints** via text, image, audio, or video to the in-room display
- **Monitor cameras** to see how players are progressing
- **Track puzzle completion** and hint usage
- **Trigger props and effects** — lights, sounds, locks, fog machines
- **Record escape times** for the leaderboard

Every escape room needs this. The main decision is whether to use an existing platform or build something custom.

---

## Off-the-Shelf Options

These are the most actively maintained GM platforms designed specifically for escape rooms.

| Platform | Cost | Highlights |
|----------|------|------------|
| **Houdini MC** | ~$165 one-time per room | Full GM console, countdown timer, clue delivery (text/image/audio/video), 30+ themes, leaderboard, Arduino/Raspberry Pi support. Runs on any device with a browser. Lifetime license — no monthly fees. |
| **Clue Command** | Contact for pricing | Cloud-based, iPad-friendly. Timer, clue delivery, puzzle tracking, sensor integration, multi-location support. Automated Facebook photo sharing. |
| **ClueMaster** | Monthly subscription (free trial) | 100% cloud — nothing to install. GM workspace, in-room display, device/player stats. Supports network relays for automating doors, lights, locks. |
| **Escape Room Master** | ~$20/mo or lifetime option | GM room control, leaderboard, Raspberry Pi/Arduino integration, Philips Hue lighting, events-to-actions editor. Also handles digital waivers. |
| **QUEEN (Escape Room Doctor)** | License + consultation | The most advanced option. Full room automation CAD system, branching game logic, multi-language support. Phillips Hue, MQTT, DMX, Arduino, Raspberry Pi. Very powerful but complex to set up. |
| **M3 (Mythric Mystery Master)** | Monthly or annual subscription | Story-driven game design, branching logic, Phillips Hue, MQTT, DMX, Arduino/Pi. Runs offline (no internet needed). One license = unlimited rooms per location. |

### Local vs. Cloud

An important distinction between these platforms:

- **Local (Houdini MC, Escape Room Master, M3):** Software runs on a computer at the venue. All data stays on that machine. Lower cost (often one-time), works without internet, but backups are your responsibility.
- **Cloud (ClueMaster, Clue Command):** Everything runs on the provider's servers. Data is backed up automatically. Requires internet. Monthly subscription fees.

---

## Website Leaderboard

The leaderboard on the website needs to get its data from somewhere. There are a few approaches:

**From the GM software directly:**
- Some platforms (Houdini MC, Escape Room Master) have built-in leaderboards that display on a lobby TV or local network URL
- These are typically LAN-only — they work great on a lobby screen but aren't directly embeddable on a public website without additional work

**With a separate leaderboard tool:**
- **Buzzshot** specializes in this — auto-updating leaderboards that embed on websites and display on lobby TVs. Also handles team photos, waivers, and review generation. Monthly subscription.

**With a custom-built component:**
- A simple admin interface where staff enter escape times after each game
- Data goes to a database that powers both a lobby TV display and the website leaderboard
- Most flexible and keeps everything on-brand, but requires development time

**Hybrid approach:**
- Use GM software for running the actual games (timer, clues, cameras)
- Use a separate lightweight system for the website leaderboard
- This avoids being limited by whatever leaderboard the GM software provides

---

## Data & Backups

This is worth understanding regardless of which platform gets chosen.

**Cloud-based platforms** (ClueMaster, Clue Command) handle backups automatically — data lives on their servers.

**Local platforms** (Houdini MC, Escape Room Master, M3) store everything on the venue's computer. If that machine fails without a backup, scoreboard history and room configurations are lost.

For any local platform, an automated backup can be set up on the host computer — a scheduled script that copies the data to cloud storage (Google Drive, Dropbox, etc.) daily. This runs in the background with no manual effort required. Houdini MC also has a manual "Export All" button that bundles everything into a single file.

---

## Typical Room Setup

A standard iPad-based setup per room:

| Device | Purpose |
|--------|---------|
| **Staff iPad** | Runs the GM software — timer control, clue delivery, camera monitoring, hint tracking |
| **In-room display** (TV/monitor) | Shows the countdown timer and clue messages to players — driven by the GM software |
| **Lobby display** (optional) | Shows the leaderboard for all rooms — either from the GM software or a custom web page |

The staff iPad connects to the same local network as the in-room display. The GM sends clues from the iPad, and they appear on the TV inside the room in real time.

---

## Hardware Automation (Arduino / Raspberry Pi)

Some GM platforms support connecting to Arduino and Raspberry Pi controllers to automate physical props — electromagnetic locks, lights, sound effects, fog machines, etc.

Platforms with built-in hardware support:
- **Houdini MC** — Arduino and Raspberry Pi via network commands
- **Escape Room Master** — Arduino, Raspberry Pi, Philips Hue
- **QUEEN** — Arduino, Raspberry Pi, Phillips Hue, Z-Wave, MQTT, DMX, PLCs (most extensive)
- **M3** — Phillips Hue, Z-Wave, MQTT, DMX, Arduino, Raspberry Pi

This doesn't need to be part of the initial setup. Hardware automation can be added to any of these platforms after launch, one prop or puzzle at a time.

---

## Custom-Built Option

It's also possible to build a fully custom GM system as a web app — timer, clue delivery, leaderboard, and hardware control all in one. This gives complete control over the experience and tight integration with the website, but it's a significant development effort compared to buying a $165 license.

A custom build makes the most sense when:
- The off-the-shelf tools don't cover a specific need
- Deeper website integration is a priority (live leaderboard, real-time puzzle tracking for spectators, etc.)
- The business has grown enough that the investment is justified

Nothing about starting with an off-the-shelf platform prevents moving to a custom system later.
