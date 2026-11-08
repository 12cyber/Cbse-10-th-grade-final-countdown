# 24/7 Serverless YouTube Live Broadcast & Cloud Runner

Enable **THE FINAL COUNTDOWN – CBSE CLASS 10 BOARD EXAMS 2027** to stream continuously to YouTube Live in crisp 1920×1080 (16:9) without keeping a personal laptop turned on, pairing a dedicated chromeless **1080p Broadcast URL Mode** in the web application with an automated **GitHub Actions Cloud Stream Workflow** and a **silent AAC audio track** for uninterrupted YouTube RTMP ingestion.

## User Review & Critical Decisions

> [!IMPORTANT]
> The following architectural and UX choices were confirmed during interactive clarification and govern this implementation:

- **Confirmed Decision 1 — Cloud Streaming Platform**: **Scheduled GitHub Actions Cloud Stream Workflow** that launches a headless 1920×1080 browser on a cloud runner, captures the live countdown screen, and pushes an H.264/AAC RTMP stream directly to YouTube Live (`rtmp://a.rtmp.youtube.com/live2`), automatically re-triggering before GitHub's job timeout so the stream runs 24/7 without your laptop.
- **Confirmed Decision 2 — In-App Streaming Experience**: **Clean 1080p Broadcast Mode URL Only** (`?broadcast=1` or `?stream=1`) plus a quick header toggle that strips away all interactive control buttons and mouse cursors, locking the viewport to a distraction-free 16:9 broadcast canvas while preserving the full study room bookshelf, 5-panel countdown (`MONTHS`, `DAYS`, `HOURS`, `MINUTES`, `SECONDS`), IST digital clock, and rotating motivational quotes.
- **Confirmed Decision 3 — YouTube RTMP Audio Requirement**: **Silent Audio Track (`anullsrc` 44.1 kHz Stereo AAC)** embedded directly in the cloud FFmpeg pipeline so YouTube Live's ingestion server receives a valid continuous audio stream with zero risk of copyright strikes.

---

## 1. Overview & Core Concept

- **What It Does**:
  1. Adds a dedicated **1080p Broadcast URL Mode** (`?broadcast=1` or `?stream=1`) to the countdown application that hides all interactive studio buttons (`Rain: On`, `Glow: High`, `Preview Exam Started`, `Focus HUD`, and manual quote arrows) while keeping the complete 3-column nighttime study room stage, live IST clock, 5 glowing countdown panels (**MONTHS**, **Total DAYS**, **Total HOURS**, **Total MINUTES**, **SECONDS**), and rotating quotes active.
  2. Provides a ready-to-use **GitHub Actions Cloud Stream Workflow** and streaming launch script configured to capture the live application URL in a virtual 1920×1080 display (`Xvfb` + headless Chromium) and encode it via `FFmpeg` with a silent AAC audio stream directly to your YouTube Live Stream Key stored in GitHub Secrets.
- **Target Audience / Persona**: Students and creators broadcasting a continuous 24/7 CBSE Class 10 Board Exam 2027 study & countdown livestream on YouTube without dedicating local hardware or electricity.
- **Key Value**: Because the countdown math is computed dynamically from real UTC/IST epoch timestamps (`2027-02-17T10:30:00+05:30`), any cloud runner can open the broadcast URL at any moment and immediately stream the exact second-accurate countdown to YouTube Live.

---

## 2. User Experience & Visual Design

- **Key User Flows**:
  1. **Standard Interactive Mode (Default URL)**: Visitors and the creator see the full study room experience with top-right studio controls (`Rain: On/Off`, `Glow: High/Subtle`, `Preview Exam Started`, `Focus HUD`, and a **1080p Broadcast Mode** switch).
  2. **Clean 1080p Broadcast URL Mode (`?broadcast=1` or `?stream=1`)**:
     - Automatically hides all interactive top-bar buttons and manual quote navigation buttons.
     - Centers the `CBSE CLASS X • 2027` brand mark and live `INDIAN STANDARD TIME` digital clock cleanly in the top bar.
     - Displays the full 3-column nighttime study room stage (Left: Study Room Bookshelf with automatic subject highlight rotation; Center: 5-panel glowing cyan countdown for `MONTHS`, `DAYS`, `HOURS`, `MINUTES`, `SECONDS`; Right: auto-rotating motivational quotes and Mathematics Class X desk card) and the bottom `ALL THE BEST FOR YOUR BOARD EXAMS!` horizon bar.
     - Hides the mouse cursor (`cursor-none`) and locks overflow (`overflow-hidden`) for a broadcast-grade 1920×1080 television feed.
     - Pressing `Escape` (or clicking a subtle hover-only corner restore trigger when moving a local mouse) returns to interactive mode if opened on a desktop browser.
- **Visual Identity & Theme**:
  - *Aesthetic Direction*: Nocturnal Academic Cinema & High-Craft Dark UI HUD.
  - *Color Palette & Mood*: Deep midnight navy (`#030816`, `#040d21`), translucent obsidian glass panels (`rgba(4, 13, 33, 0.72)`), electric cyan neon borders (`#22d3ee`), and high-contrast pure white/cyan tabular numerals.
  - *Typography & Hierarchy*: Geometric display headers (`CBSE CLASS 10 / THE FINAL COUNTDOWN / BOARD EXAM 2027`), tabular monospace countdown digits (`font-mono-tabular`) for zero horizontal jitter every second, and clean sans-serif study metadata.
  - *Component Styling & Layout*: Balanced 12-column 16:9 broadcast stage (`3 cols` left bookshelf, `6 cols` center 5-panel countdown HUD, `3 cols` right motivational quote & desk essentials) with top IST clock bar and bottom motivational banner.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1 — URL-Driven Clean 1080p Broadcast Mode (`?broadcast=1`)**
  - *Chosen Approach*: Configure broadcast mode directly via URL query parameters (`?broadcast=1` or `?stream=1`) as well as an in-app toggle that updates the URL query string.
  - *Why*: Headless cloud browsers in GitHub Actions cannot click UI buttons easily before streaming starts. Passing `?broadcast=1` in the target URL guarantees the cloud stream immediately boots into a 100% chromeless, control-free 1920×1080 broadcast layout.
  - *Alternatives Considered*: Requiring manual button clicks or local storage flags, which would fail on fresh stateless cloud runners.
- **Decision 2 — Automatic Subject Bookshelf Cycling in Broadcast Mode**
  - *Chosen Approach*: While in `?broadcast=1` mode, automatically cycle the highlighted NCERT subject book (`Mathematics`, `Science`, `Social Science`, `English`) every 30 seconds alongside the 10-second motivational quote rotation.
  - *Why*: Since no human is clicking the bookshelf during a 24/7 cloud stream, automatic subject rotation keeps the left panel dynamic and showcases revision tips for all four core Class 10 subjects throughout the livestream.
- **Decision 3 — Continuous GitHub Actions Workflow with Self-Chaining Schedule & Silent AAC Audio**
  - *Chosen Approach*: Use a GitHub Actions workflow equipped with `workflow_dispatch` and a recurring `schedule` cron trigger, running `Xvfb` (virtual 1920×1080×24 framebuffer), Chromium in kiosk mode (`--kiosk --window-size=1920,1080`), and `FFmpeg` (`x11grab` + `anullsrc` silent AAC audio) streaming to `rtmp://a.rtmp.youtube.com/live2/$YOUTUBE_STREAM_KEY`.
  - *Why*: GitHub Actions jobs have a maximum single-job runtime of 6 hours; combining a graceful 5.5-hour stream cycle with scheduled/chaining re-runs allows the stream to continue automatically in the cloud using only a repository secret (`YOUTUBE_STREAM_KEY`) and the hosted app URL (`STREAM_URL`).

---

## 4. Technical Architecture & Data Strategy *(Technical Reference)*

- **Architecture & Component Diagram**:

```
┌────────────────────────────────────────────────────────────────────────────┐
│                   GITHUB ACTIONS CLOUD RUNNER (Ubuntu VM)                  │
│                                                                            │
│  ┌──────────────────────┐    ┌──────────────────────┐    ┌──────────────┐  │
│  │ Xvfb Virtual Display │───▶│ Headless Chromium    │───▶│ FFmpeg x11   │  │
│  │ 1920x1080 @ 24-bit   │    │ --kiosk ?broadcast=1 │    │ + anullsrc   │  │
│  └──────────────────────┘    └──────────────────────┘    └──────┬───────┘  │
└─────────────────────────────────────────────────────────────────┼──────────┘
                                                                  │ RTMP (H.264 + Silent AAC)
                                                                  ▼
                                                       ┌─────────────────────┐
                                                       │    YouTube Live     │
                                                       │  24/7 Stream Feed   │
                                                       └─────────────────────┘

┌────────────────────────────────────────────────────────────────────────────┐
│               REACT COUNTDOWN APPLICATION (?broadcast=1 Mode)              │
│                                                                            │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │ Top Broadcast Bar: CBSE CLASS X • 2027  |  Live IST Clock (UTC+5:30) │  │
│  └──────────────────────────────────┬───────────────────────────────────┘  │
│                                     ▼                                      │
│  ┌────────────────────┐  ┌──────────────────────┐  ┌────────────────────┐  │
│  │ Bookshelf Panel    │  │ 5-Panel Countdown    │  │ Motivational Panel │  │
│  │ Auto-cycles Math,  │  │ MONTHS | TOTAL DAYS  │  │ Auto-rotates 6     │  │
│  │ Science, SST, Eng  │  │ TOTAL HRS | TOT MINS │  │ Quotes + Math Desk │  │
│  │ every 30s in Stream│  │ SECONDS (1s tick)    │  │ Essentials Card    │  │
│  └────────────────────┘  └──────────────────────┘  └────────────────────┘  │
└────────────────────────────────────────────────────────────────────────────┘
```

- **Data Model & State**:
  - `isBroadcastMode` (`boolean`): Initialized from URL search params (`?broadcast=1` or `?stream=1`). When `true`:
    - Top-bar studio control buttons and manual quote prev/next buttons are hidden.
    - Root container applies `h-screen overflow-hidden cursor-none` for exact 16:9 frame capture.
    - `selectedBook` automatically cycles through `CBSE_SUBJECT_BOOKS` every 30 seconds.
    - Moving the mouse or pressing `Escape` on a local machine reveals a subtle `Exit Broadcast Mode` button so the user can easily return to standard mode.
- **Interactive Component & State Mapping**:
  - **Top Bar `1080p Broadcast` Button**: Enters Clean 1080p Broadcast Mode and syncs `?broadcast=1` to `window.history.replaceState` so the user can copy the exact broadcast URL from their browser address bar.
  - **Escape / Local Hover Exit Control**: Restores interactive studio controls and removes `?broadcast=1` from the URL.
  - **Cloud Streaming Automation Bundle**:
    - Automated GitHub Actions workflow and shell runner script that reads `STREAM_URL` (the hosted applet URL with `?broadcast=1`) and `YOUTUBE_STREAM_KEY`, launches `Xvfb :99 -screen 0 1920x1080x24`, opens Chromium in full-screen kiosk mode, and streams 30fps 1080p H.264 video (`-preset veryfast -b:v 4500k -maxrate 4500k -bufsize 9000k -pix_fmt yuv420p -g 60`) paired with `-f lavfi -i anullsrc=channel_layout=stereo:sample_rate=44100 -c:a aac -b:a 128k` to YouTube Live RTMP.
