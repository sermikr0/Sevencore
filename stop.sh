#!/usr/bin/env bash
# Stop Sevencore Attendance (local). Data stays in the docker volume; add --down to also stop the database.
cd "$(dirname "$0")"
here=$(pwd -P)
pid=$(ss -ltnpH 'sport = :8790' 2>/dev/null | grep -oP 'pid=\K[0-9]+' | head -1)
if [ -n "$pid" ] && [ "$(readlink -f /proc/$pid/cwd 2>/dev/null)" = "$here" ] && grep -q "server/app.py" /proc/$pid/cmdline 2>/dev/null; then
  kill "$pid" && echo "server stopped"
else
  echo "server was not running"
fi
[ "${1:-}" = "--down" ] && docker compose --env-file .env stop
exit 0
