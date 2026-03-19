# Telegram Organizer Bot

A privacy-first Telegram media organizer for large channels/groups.

## Design
This bot is intentionally **blind by default**:
- it does **not** send raw video/image/audio content to an LLM
- it extracts **metadata only** (caption, filename, size, duration, resolution, hashes, source info)
- an AI model such as **GLM-5** acts as a **librarian**, not a viewer

## What it does
- scans Telegram messages from a configured chat/channel
- indexes media + metadata into SQLite
- computes exact file hashes and media properties
- asks an LLM to suggest:
  - collection/category
  - tags
  - canonical title
  - rename pattern
  - keep/review/archive action
- writes a manifest and optional folder plan

## Privacy boundary
The LLM only receives structured text metadata. No frames, no audio, no raw media bytes.

## Architecture
- `src/ingest.py` — Telegram ingestion via Telethon
- `src/media_index.py` — SQLite schema + persistence
- `src/media_probe.py` — ffprobe metadata extraction
- `src/librarian.py` — GLM-5 metadata-only classification
- `src/bot.py` — main CLI / indexer entrypoint
- `src/command_bot.py` — Telegram bot command layer
- `config/.env.example` — environment config

## Current status
Scaffolded v1.

## Quick start
```bash
cd ~/.openclaw/workspace/telegram-organizer-bot
./setup.sh
source .venv/bin/activate
python3 src/auth_telethon.py
python3 src/list_chats.py
# edit config/.env and set TG_TARGET_CHAT
python3 src/bot.py
```

## Next steps
1. Fill in Telegram and model credentials in `.env` (or reuse existing `LIFEOS_TG_*` env vars)
2. If reusing an existing Telethon session/creds, skip auth and go straight to `python3 src/list_chats.py`
3. Otherwise create Telethon user session with `python3 src/auth_telethon.py`
4. Find your target group/channel id with `python3 src/list_chats.py`
5. Set `TG_TARGET_CHAT` in `config/.env`
6. Run initial index with `python3 src/bot.py`
7. Review classification output before enabling any move/apply behavior

## Safety
- default mode is `review_only`
- no deletes
- no moves unless explicitly enabled
