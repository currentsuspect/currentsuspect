from __future__ import annotations

import os
import shutil
import tempfile
from pathlib import Path
from typing import AsyncIterator

from dotenv import load_dotenv

load_dotenv(os.path.join(Path(__file__).resolve().parents[1], 'config', '.env'))


async def iter_media_records() -> AsyncIterator[dict]:
    from telethon import TelegramClient

    api_id = int(os.getenv('TG_API_ID') or os.getenv('LIFEOS_TG_API_ID') or '0')
    api_hash = os.getenv('TG_API_HASH') or os.getenv('LIFEOS_TG_API_HASH') or ''
    session_path = os.getenv('TG_SESSION_PATH', str(Path(__file__).resolve().parents[1] / 'data' / 'telethon_user'))
    target_chat = os.getenv('TG_TARGET_CHAT') or os.getenv('LIFEOS_MUSIC_CHAT_ID') or ''
    max_messages = int(os.getenv('MAX_MESSAGES', '200'))

    resolved_target = target_chat
    if isinstance(target_chat, str):
        s = target_chat.strip()
        if s and (s.lstrip('-').isdigit()):
            resolved_target = int(s)

    base = session_path[:-8] if session_path.endswith('.session') else session_path
    base_session = base + '.session'
    if not os.path.exists(base_session):
        raise RuntimeError(f'Telethon session file not found: {base_session}')

    tmpdir = tempfile.mkdtemp(prefix='telethon_sess_')
    sess_copy = os.path.join(tmpdir, 'telethon_user')
    shutil.copy2(base_session, sess_copy + '.session')

    client = TelegramClient(sess_copy, api_id, api_hash)
    await client.connect()
    if not await client.is_user_authorized():
        await client.disconnect()
        raise RuntimeError('Telethon session not authorized. Create session first.')

    try:
        count = 0
        async for msg in client.iter_messages(resolved_target):
            if count >= max_messages:
                break
            if not getattr(msg, 'media', None):
                continue
            # Skip bot/self noise and obvious organizer error artifacts
            text_preview = (msg.message or '').strip()
            if getattr(msg, 'out', False):
                continue
            if 'Scan failed:' in text_preview or 'Organizer bot' in text_preview or 'RFO outbound test' in text_preview:
                continue

            file_name = None
            mime_type = None
            file_size = None
            duration_sec = None
            width = None
            height = None

            if getattr(msg, 'document', None):
                mime_type = getattr(msg.document, 'mime_type', None)
                file_size = getattr(msg.document, 'size', None)
                for attr in getattr(msg.document, 'attributes', []):
                    if hasattr(attr, 'file_name'):
                        file_name = attr.file_name
                    if hasattr(attr, 'duration'):
                        duration_sec = attr.duration
                    if hasattr(attr, 'w'):
                        width = attr.w
                    if hasattr(attr, 'h'):
                        height = attr.h

            if getattr(msg, 'video', None):
                duration_sec = getattr(msg.video, 'duration', duration_sec)
                width = getattr(msg.video, 'w', width)
                height = getattr(msg.video, 'h', height)
                file_size = getattr(msg.video, 'size', file_size)
                mime_type = mime_type or 'video/mp4'

            yield {
                'chat_id': str(target_chat),
                'message_id': msg.id,
                'posted_at': msg.date.isoformat() if msg.date else None,
                'caption': msg.message or '',
                'file_name': file_name,
                'mime_type': mime_type,
                'file_size': file_size,
                'duration_sec': duration_sec,
                'width': width,
                'height': height,
                'local_path': None,
                'sha256': None,
            }
            count += 1
    finally:
        await client.disconnect()
        try:
            shutil.rmtree(tmpdir)
        except Exception:
            pass
