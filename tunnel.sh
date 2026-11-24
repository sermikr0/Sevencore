#!/usr/bin/env bash
# Give the employee Mini App (127.0.0.1:8791) a public HTTPS address with a Cloudflare quick tunnel,
# so Telegram can open it. Only port 8791 is published: the admin and manager panels (8790) stay local.
# The running server notices the address within ~10 s and points the bot's buttons at it.
# A quick tunnel gets a new address on every start; for a fixed address set TMA_PUBLIC_URL in .env instead.
set -euo pipefail
cd "$(dirname "$0")"
command -v cloudflared >/dev/null || { echo "cloudflared is not installed"; exit 1; }
port=$(grep -E '^TMA_PORT=' .env | cut -d= -f2); port=${port:-8791}
metrics=$(grep -E '^TUNNEL_METRICS=' .env | cut -d= -f2); metrics=${metrics:-127.0.0.1:20292}
echo "Publishing http://127.0.0.1:$port  (Ctrl+C stops it)"
exec cloudflared tunnel --no-autoupdate --metrics "$metrics" --url "http://127.0.0.1:$port"
