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

    if not api_id or not api_hash:
        raise RuntimeError('Missing TG_API_ID/TG_API_HASH (or LIFEOS_TG_API_ID/LIFEOS_TG_API_HASH).')

    os.makedirs(Path(session_path).parent, exist_ok=True)
    client = TelegramClient(session_path, api_id, api_hash)
    await client.start()
    me = await client.get_me()
    print(f'Authorized as: {getattr(me, "username", None) or getattr(me, "first_name", "unknown")} ({me.id})')
    print(f'Session saved at: {session_path}')
    await client.disconnect()


if __name__ == '__main__':
    asyncio.run(main())
