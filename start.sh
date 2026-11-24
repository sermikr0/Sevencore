#!/usr/bin/env bash
# Start Sevencore Attendance (local): database containers + app server on http://127.0.0.1:8790
set -euo pipefail
cd "$(dirname "$0")"
docker compose --env-file .env up -d
for i in $(seq 1 30); do curl -sf -o /dev/null http://127.0.0.1:55441/system_settings && break; sleep 1; done
if curl -sf -o /dev/null http://127.0.0.1:8790/healthz; then
  echo "server already running: http://127.0.0.1:8790"
else
  setsid nohup python3 "$PWD/server/app.py" > server/server.log 2>&1 < /dev/null &
  sleep 2
  curl -sf http://127.0.0.1:8790/healthz >/dev/null && echo "Sevencore running: http://127.0.0.1:8790" || { echo "server did not start, see server/server.log"; exit 1; }
fi
