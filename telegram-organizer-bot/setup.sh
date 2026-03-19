#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
python3 -m venv .venv
source .venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt
if [ ! -f config/.env ]; then
  cp config/.env.example config/.env
  echo "Created config/.env from example"
fi
echo "Setup complete. Next: source .venv/bin/activate && python3 src/auth_telethon.py"
