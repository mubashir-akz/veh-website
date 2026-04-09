#!/bin/bash
# Veh Website Work Script
# Runs during IST 1am - 6am (UTC 19:30 - 00:30)

LOG_FILE="/home/mubashir/.openclaw/workspace/veh-work.log"
PROJECT_DIR="/home/mubashir/veh-website"

echo "=== Veh Work Session Started: $(date) ===" >> "$LOG_FILE"

cd "$PROJECT_DIR" || exit 1

# Check if within work window (IST 1am-6am = UTC 19:30-00:30)
hour_utc=$(date -u +%H)
minute_utc=$(date -u +%M)
current_mins=$((10#$hour_utc * 60 + 10#$minute_utc))
# Work window: 19:30 (1170) to 00:30 (30) next day
# If between 1170-1440 or 0-30, we're in the window
in_window=false
if [ $current_mins -ge 1170 ] || [ $current_mins -le 30 ]; then
    in_window=true
fi

if [ "$in_window" = false ]; then
    echo "Outside work window (IST 1am-6am). Current UTC: $hour_utc:$minute_utc" >> "$LOG_FILE"
    exit 0
fi

echo "In work window. Starting development..." >> "$LOG_FILE"

# Pull latest changes
git pull origin main 2>&1 >> "$LOG_FILE"

# Run tests
npm run build >> "$LOG_FILE" 2>&1
if [ $? -eq 0 ]; then
    echo "Build successful" >> "$LOG_FILE"
    npx playwright test >> "$LOG_FILE" 2>&1
else
    echo "Build failed" >> "$LOG_FILE"
fi

# Check for improvements to make
# (This is where autonomous improvements would happen)
echo "Checking for improvements..." >> "$LOG_FILE"

# Commit if there are changes
git add -A
if git diff --staged --quiet; then
    echo "No changes to commit" >> "$LOG_FILE"
else
    git commit -m "Auto-update: $(date)"
    git push origin main 2>&1 >> "$LOG_FILE"
    echo "Changes pushed" >> "$LOG_FILE"
fi

echo "=== Work Session Ended: $(date) ===" >> "$LOG_FILE"
