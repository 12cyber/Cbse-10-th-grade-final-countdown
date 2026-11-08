# 24/7 Serverless YouTube Live Setup (No Laptop Required)

Your **CBSE Class 10 Board Exam 2027 Final Countdown** includes both a **Clean 1080p Broadcast Mode URL** and an automated **GitHub Actions Cloud Stream Workflow** with a built-in silent AAC audio stream required by YouTube Live.

---

## 1. Your Clean 1080p Broadcast Mode URL

Append `?broadcast=1` to your hosted application URL to open the distraction-free **1920×1080 Broadcast Feed**:

```text
https://ais-pre-76yoaovnseq25tkj6urhpm-940401561773.asia-east1.run.app/?broadcast=1
```

What `?broadcast=1` does automatically:
- Hides all interactive top-right studio buttons (`Rain`, `Glow`, `Preview Exam Started`, `Focus HUD`, and manual quote buttons) and hides the mouse cursor.
- Keeps the **5 glowing countdown panels** (`MONTHS`, `Total DAYS`, `Total HOURS`, `Total MINUTES`, `SECONDS`), live **Indian Standard Time (IST)** digital clock, and **10-second motivational quote rotation** active.
- Automatically cycles through the 4 NCERT Class 10 subject volumes (`Mathematics`, `Science`, `Social Science`, `English`) on the left bookshelf every 30 seconds.

---

## 2. How to Run 24/7 on YouTube Live via GitHub Actions

1. **Export / Push this project to a GitHub Repository** (using AI Studio's GitHub export or `git push`).
2. **Get your YouTube Stream Key**:
   - Open [YouTube Studio](https://studio.youtube.com) → click **Create** → **Go Live**.
   - Enable **Auto-start** and **Auto-stop** in Stream Settings (so YouTube stays live whenever the cloud runner connects).
   - Copy your **Stream key** (e.g. `xxxx-xxxx-xxxx-xxxx-xxxx`).
3. **Add your Stream Key to GitHub Secrets**:
   - In your GitHub repository, go to **Settings** → **Secrets and variables** → **Actions** → **New repository secret**.
   - Name: `YOUTUBE_STREAM_KEY`
   - Secret: Paste your YouTube Stream Key.
   - *(Optional)* Add a second secret named `STREAM_URL` set to `https://ais-pre-76yoaovnseq25tkj6urhpm-940401561773.asia-east1.run.app/?broadcast=1`.
4. **Start the Cloud Stream**:
   - Go to the **Actions** tab in your GitHub repository.
   - Select **24/7 YouTube Live Countdown Stream** on the left.
   - Click **Run workflow** → **Run workflow**.
   - GitHub's cloud runner will launch a virtual 1920×1080 screen, open your `?broadcast=1` URL, attach a continuous silent stereo AAC audio track (`anullsrc`), and stream 1080p 30fps video to YouTube Live—with zero laptop power required!
