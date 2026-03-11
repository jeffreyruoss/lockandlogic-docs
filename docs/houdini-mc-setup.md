# Houdini MC Setup Guide

> Step-by-step guide to installing and configuring Houdini MC for your escape rooms

---

## What You'll Need

Before getting started, make sure you have the following:

| Item | Purpose |
|------|---------|
| **A Windows PC** (Windows 8, 10, or 11) | This is the host machine — it runs Houdini MC. A dedicated PC at the venue is ideal. Houdini MC recommends one PC per room. |
| **An HDMI cable per room** | Connects the host PC to the in-room TV. This is the recommended display method. |
| **A TV or monitor in each room** | Displays the countdown timer and clues to players. |
| **A local network (Wi-Fi router)** | Needed if you want to use tablets for remote control or network-based displays. No internet required for running games. |
| **A Houdini MC license** | €150 one-time per PC (~$165 USD). No monthly fees. Purchase at [houdinimc.com](https://houdinimc.com/buy/). |

**Optional but recommended:**
- A tablet or phone for remote game control via Houdini MC's Mobile Smart Menu
- A TV in the lobby for displaying the leaderboard
- Cameras for monitoring players (USB or IP cameras)
- [Google Chrome](https://www.google.com/chrome/) installed on the host PC (recommended browser)

**Good to know:** There's a **free trial** that's fully functional with unlimited 45-minute sessions — no registration required. You can test everything before buying a license.

---

## Step 1 — Install Houdini MC

1. Go to [houdinimc.com/download](https://houdinimc.com/download/) and download the latest stable version (it downloads as a `.zip` file)
2. Extract the `.zip` file to a folder on your PC
3. Double-click **HoudiniInstaller.exe**
4. Select **"Clean Install"** and click Next
5. Wait for the installation to finish, then click **"Launch Application"**
6. Windows will ask you to allow access twice — once for the IIS Express Server and once for Houdini MC itself. Allow both (and uncheck "Always ask before operating this file" so it doesn't ask again)

Houdini MC will open on your PC. This is your main control center for everything — room setup, game control, clue delivery, cameras, and leaderboard.

**System requirements:** 1 GHz processor, 1–2 GB RAM, 300 MB disk space, 1024×768 display. Any modern Windows PC will handle it easily.

---

## Step 2 — Set Up Your First Room

Houdini MC comes with a default room (called "Safecracker") that's great for learning the interface. When you're ready to set up your own room:

1. **Open the Room Editor** — This is where you configure room parameters
2. **Set the room name** — Give it a name (e.g., "The Vault," "Mystery Manor")
3. **Set the game duration** — Standard is 60 minutes, but you can set any time
4. **Set the puzzle count** — How many puzzles the room has (used for tracking progress)
5. **Choose a theme** — Houdini MC comes with 30+ built-in display themes for the countdown timer and clue screens. You can preview them and pick one that fits your room's vibe. Themes are fully customizable (colors, fonts, backgrounds, icons)
6. **Prepare your clues** — Add the hints and clues your game masters will send to players. Each clue can be:
   - Text (with HTML formatting)
   - An image
   - An audio clip
   - A video
   - Text-to-speech (Houdini MC reads it aloud)

You can always adjust these later — nothing is permanent.

---

## Step 3 — Connect the In-Room Display

The TV inside the room shows players the countdown timer and any clues your game master sends. There are several ways to connect it:

### Option A — HDMI Cable (Recommended)

The simplest and most reliable method:

1. Run an **HDMI cable** from your host PC to the TV in the room
2. Set the TV as an extended display in Windows display settings
3. Houdini MC will output the in-room screen to this display

This gives you the full experience — timer, clues, images, audio, and video all work over HDMI. Audio plays through the TV speakers.

### Option B — Chromecast

1. Plug a **Chromecast** into the room TV
2. Make sure the Chromecast and host PC are on the **same Wi-Fi network**
3. Use the Google Cast extension in Chrome to cast the in-room display to the TV

This is wireless and also supports audio through the TV.

### Option C — Network Display (Raspberry Pi, Laptop, etc.)

1. Connect a device (Raspberry Pi, old laptop, etc.) to the room TV via HDMI
2. Make sure it's on the **same network** as the host PC
3. Open Chrome on that device and navigate to the display URL shown in Houdini MC

This works well for text and image clues. Keep in mind that audio and video clues may have limitations over a network connection compared to a direct HDMI setup.

**Tip:** Whichever method you use, set things up so the display starts automatically when the PC boots — that way it's ready to go every day without manual setup.

---

## Step 4 — Game Master Controls

The main game master interface runs directly on the host PC. The Houdini MC window has four main areas:

- **Setup Region** — Shows info about the selected room
- **Control Region** — Start, pause, stop, and monitor the game
- **Console Region** — Send clues and interact with players
- **CCTV Panel** — Monitor camera feeds from the room

### Remote Control from a Tablet (Optional)

If you'd rather control games from a tablet instead of sitting at the PC:

1. In Houdini MC, go to **Settings → Connections** and enable incoming requests
2. Connect a tablet or phone to the **same Wi-Fi network**
3. Open Chrome on the tablet and go to the **Mobile Smart Menu (MSM)** URL shown in Houdini MC

From the tablet, your game master can:
- **Start and stop** the countdown timer remotely
- **Send clues** to the in-room display
- **Monitor game progress**

The full interface with all features (cameras, detailed settings, etc.) is always available on the host PC.

---

## Step 5 — Set Up the Leaderboard

Houdini MC has a built-in leaderboard that tracks team names, escape times, and hints used.

1. Find the **Leaderboard / Scoreboard** section in Houdini MC
2. The leaderboard has its own URL accessible from any device on the same network
3. Point a **lobby TV** browser to this URL to display scores for customers to see

The leaderboard is local-network only — it shows on devices connected to your venue's network (like a lobby TV) but isn't publicly accessible on the internet. Your website leaderboard will be handled separately.

---

## Step 6 — Run a Test Game

Before opening to the public, run through a full test game:

1. Start the timer from the Houdini MC control panel (or from the tablet if using MSM)
2. Verify the countdown appears on the in-room TV
3. Send a few test clues — confirm they show up on the in-room display
4. Check that audio plays through the TV speakers (if using HDMI or Chromecast)
5. Stop the timer and check that the score records to the leaderboard
6. Have someone stand in the room to check visibility and audio levels

Do this with your staff so everyone is comfortable with the controls.

---

## Day-to-Day Usage

Once everything is set up, here's what a typical game looks like from the staff side:

1. **Before the game:** Open Houdini MC on the host PC (or the tablet MSM). Reset the timer.
2. **Start the game:** Hit start on the timer. The countdown begins on the in-room TV.
3. **During the game:** Watch the cameras, send clues/hints as needed.
4. **End of game:** Stop the timer. The time and stats are saved automatically.
5. **After the game:** The leaderboard updates. Reset for the next group.

---

## Backups

Houdini MC stores all your data locally — room settings, themes, soundtracks, leaderboard scores, automation settings, everything. If the host computer fails without a backup, that data is gone.

**What to do:**
- Houdini MC has a **one-click backup** button that bundles everything into a single file (room parameters, clues, themes, sounds, automations, scores, and Hue light settings)
- Use this regularly (at least weekly) and save the file somewhere safe — a USB drive, Google Drive, Dropbox, etc.
- We can also set up an automated daily backup that runs in the background, so you don't have to think about it

**To restore from a backup:** Use the **Import** button in Houdini MC and select your backup file. Everything comes back — room configs, themes, scores, all of it.

---

## Troubleshooting

**The in-room display isn't showing anything (HDMI):**
- Check that the HDMI cable is connected and the TV is set to the correct input
- Make sure Windows recognizes the TV as a second display (Settings → Display)
- Verify Houdini MC is set to output to the correct screen

**The in-room display isn't connecting (network method):**
- Make sure both the host PC and the display device are on the same Wi-Fi network
- Check that Houdini MC is running and incoming connections are enabled in Settings → Connections
- Use Google Chrome on the display device — it's the recommended browser
- Try refreshing the browser

**Clues aren't showing on the TV:**
- Verify you're sending clues to the correct room
- Try refreshing the display

**The timer looks wrong or the theme isn't right:**
- Go to the Room Editor and re-select your theme
- Clear the browser cache on the display device and reload (if using a network display)

**Leaderboard not updating:**
- Make sure the game was properly stopped (not just paused)
- Refresh the leaderboard display

**Need help?** Contact Houdini MC support at support@houdinimc.com — they also offer remote support via TeamViewer.

---

## Quick Reference

| What | Where |
|------|-------|
| Main GM interface | Houdini MC application on the host PC |
| Remote control (tablet) | Mobile Smart Menu — URL shown in Settings → Connections |
| In-room display (TV) | HDMI from host PC (recommended), Chromecast, or network URL |
| Leaderboard (lobby TV) | URL shown in Houdini MC leaderboard section |
| Backup | Houdini MC → Export / one-click backup |
| Restore | Houdini MC → Import |
| Tutorials | [houdinimc.com/houdinitutorials](https://houdinimc.com/houdinitutorials/) |
| Support | support@houdinimc.com |

---

## Adding More Rooms Later

When you're ready to expand:

1. **One PC can control multiple rooms** — you can add new rooms in Houdini MC without buying another license. However, Houdini MC recommends dedicating a PC per room for the best experience.
2. **Volume discounts** are available if you need additional licenses: 1 for €150, 3 for €300, 6 for €500 (all one-time, lifetime)
3. Set up a display (HDMI, Chromecast, or network) and TV for the new room
4. Configure the new room in the Room Editor with its own theme, clues, and settings
