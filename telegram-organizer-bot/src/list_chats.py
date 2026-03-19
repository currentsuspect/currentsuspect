from __future__ import annotations

import asyncio
import os
from pathlib import Path

from dotenv import load_dotenv

ROOT = Path(__file__).resolve().parents[1]
load_dotenv(ROOT / 'config' / '.env')


async def main() -> None:
    from telethon import TelegramClient

    api_id = int(os.getenv('TG_API_ID') or os.getenv('LIFEOS_TG_API_ID') or '0')
    api_hash = os.getenv('TG_API_HASH') or os.getenv('LIFEOS_TG_API_HASH') or ''
    session_path = os.getenv('TG_SESSION_PATH', str(ROOT / 'data' / 'telethon_user'))

    client = TelegramClient(session_path, api_id, api_hash)
    await client.connect()
    if not await client.is_user_authorized():
        await client.disconnect()
        raise RuntimeError('Session not authorized. Run auth_telethon.py first.')

    try:
        async for dialog in client.iter_dialogs():
            entity = dialog.entity
            print(f'{dialog.name} | id={getattr(entity, "id", None)} | username={getattr(entity, "username", None)}')
    finally:
        await client.disconnect()


if __name__ == '__main__':
    asyncio.run(main())
