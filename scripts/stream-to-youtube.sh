#!/usr/bin/env bash
# ==============================================================================
# 24/7 Serverless YouTube Live Cloud Stream Runner (1920x1080 @ 30fps + Silent AAC)
# Captures the Clean 1080p Broadcast Mode URL (?broadcast=1) in a virtual
# Xvfb framebuffer and streams via FFmpeg to YouTube Live RTMP.
# ==============================================================================
set -euo pipefail

if [ -z "${YOUTUBE_STREAM_KEY:-}" ]; then
  echo "Error: YOUTUBE_STREAM_KEY environment variable is required."
  exit 1
fi

RAW_URL="${STREAM_URL:-https://ais-pre-76yoaovnseq25tkj6urhpm-940401561773.asia-east1.run.app}"
if [[ "$RAW_URL" == *"?"* ]]; then
  if [[ "$RAW_URL" != *"broadcast="* && "$RAW_URL" != *"stream="* ]]; then
    TARGET_URL="${RAW_URL}&broadcast=1"
  else
    TARGET_URL="${RAW_URL}"
  fi
else
  TARGET_URL="${RAW_URL}/?broadcast=1"
fi

STREAM_DURATION_SECONDS="${STREAM_DURATION_SECONDS:-19800}" # Default 5.5 hours per GitHub Action cycle
DISPLAY_NUM=":99"

echo "Starting Xvfb virtual 1920x1080 display on ${DISPLAY_NUM}..."
Xvfb "${DISPLAY_NUM}" -screen 0 1920x1080x24 -ac +extension GLX +render -noreset &
XVFB_PID=$!
export DISPLAY="${DISPLAY_NUM}"
sleep 2

BROWSER_BIN=""
for candidate in google-chrome-stable google-chrome chromium-browser chromium; do
  if command -v "$candidate" >/dev/null 2>&1; then
    BROWSER_BIN="$candidate"
    break
  fi
done

if [ -z "$BROWSER_BIN" ]; then
  echo "Error: Chromium or Google Chrome binary not found."
  kill "$XVFB_PID" || true
  exit 1
fi

echo "Launching ${BROWSER_BIN} in 1920x1080 Kiosk Mode -> ${TARGET_URL}"
"$BROWSER_BIN" \
  --no-sandbox \
  --disable-setuid-sandbox \
  --disable-dev-shm-usage \
  --disable-gpu \
  --kiosk \
  --start-fullscreen \
  --window-position=0,0 \
  --window-size=1920,1080 \
  --autoplay-policy=no-user-gesture-required \
  --hide-scrollbars \
  --disable-infobars \
  --no-first-run \
  "$TARGET_URL" &
BROWSER_PID=$!

# Allow page & assets to settle before RTMP ingestion starts
sleep 5

echo "Starting FFmpeg 1080p30 H.264 + Silent AAC stream to YouTube Live RTMP..."
ffmpeg \
  -hide_banner -loglevel warning \
  -thread_queue_size 1024 \
  -f x11grab -video_size 1920x1080 -framerate 30 -draw_mouse 0 -i "${DISPLAY_NUM}.0" \
  -f lavfi -i anullsrc=channel_layout=stereo:sample_rate=44100 \
  -t "${STREAM_DURATION_SECONDS}" \
  -c:v libx264 -preset veryfast -tune zerolatency \
  -pix_fmt yuv420p \
  -b:v 4500k -maxrate 4500k -bufsize 9000k \
  -g 60 -keyint_min 60 \
  -c:a aac -b:a 128k -ar 44100 \
  -f flv "rtmp://a.rtmp.youtube.com/live2/${YOUTUBE_STREAM_KEY}" || true

echo "Cleaning up browser and Xvfb processes..."
kill "$BROWSER_PID" 2>/dev/null || true
kill "$XVFB_PID" 2>/dev/null || true
