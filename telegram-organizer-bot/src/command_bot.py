from __future__ import annotations

import asyncio
import os
from pathlib import Path

import httpx
from dotenv import load_dotenv

from actions import run_scan, manifest_path
from summary import db_stats, latest_digest, review_report, duplicate_report, unknowns_report

ROOT = Path(__file__).resolve().parents[1]
load_dotenv(ROOT / 'config' / '.env')


async def tg_api(method: str, payload: dict | None = None) -> dict:
    token = os.getenv('BOT_TOKEN', '')
    if not token or token == 'REDACTED_PLACEHOLDER':
        raise RuntimeError('Missing BOT_TOKEN in config/.env')
    url = f'https://api.telegram.org/bot{token}/{method}'
    async with httpx.AsyncClient(timeout=60) as client:
        r = await client.post(url, json=payload or {})
        r.raise_for_status()
        data = r.json()
        if not data.get('ok'):
            raise RuntimeError(f'Telegram API error: {data}')
        return data['result']


HELP_TEXT = (
    'Organizer bot commands:\n'
    '/scan - scan recent media into the index\n'
    '/digest - show latest manifest summary\n'
    '/stats - show basic counts\n'
    '/review - show review report\n'
    '/dupes - show duplicate-ish groups\n'
    '/unknowns - show low-context items\n'
    '/help - show this message'
)


async def send_message(chat_id: int | str, text: str, reply_to_message_id: int | None = None) -> None:
    payload = {'chat_id': chat_id, 'text': text}
    # Forum/supergroup reply behavior can be flaky across contexts; prefer plain sends.
    await tg_api('sendMessage', payload)


async def get_updates(offset: int | None = None) -> list[dict]:
    payload = {'timeout': 2, 'allowed_updates': ['message']}
    if offset is not None:
        payload['offset'] = offset
    return await tg_api('getUpdates', payload)


async def main() -> None:
    target_chat = str(os.getenv('TG_TARGET_CHAT', ''))
    if not target_chat:
        raise RuntimeError('Missing TG_TARGET_CHAT')

    offset = None
    print('Command bot polling started...')
    while True:
        updates = await get_updates(offset)
        for u in updates:
            offset = u['update_id'] + 1
            msg = u.get('message') or {}
            chat = msg.get('chat') or {}
            text = (msg.get('text') or '').strip()
            print(f"update chat={chat.get('id')} text={text!r}", flush=True)
            if str(chat.get('id')) != target_chat:
                continue
            if not text.startswith('/'):
                continue

            if text.startswith('/help') or text.startswith('/start'):
                await send_message(chat['id'], HELP_TEXT, msg.get('message_id'))
            elif text.startswith('/scan'):
                await send_message(chat['id'], 'Running metadata-only scan…', msg.get('message_id'))
                try:
                    result = await run_scan()
                    await send_message(chat['id'], result, msg.get('message_id'))
                except Exception as e:
                    await send_message(chat['id'], f'Scan failed: {e}', msg.get('message_id'))
            elif text.startswith('/digest'):
                try:
                    digest = latest_digest(manifest_path())
                    await send_message(chat['id'], digest, msg.get('message_id'))
                except Exception as e:
                    await send_message(chat['id'], f'Digest failed: {e}', msg.get('message_id'))
            elif text.startswith('/stats'):
                try:
                    stats = db_stats(os.getenv('DB_PATH', str(ROOT / 'data' / 'index.db')))
                    text_out = (
                        f"Stats\nTotal: {stats['total']}\nClassified: {stats['classified']}\n"
                        f"Keep: {stats['keep']} | Review: {stats['review']} | Archive: {stats['archive']}"
                    )
                    await send_message(chat['id'], text_out, msg.get('message_id'))
                except Exception as e:
                    await send_message(chat['id'], f'Stats failed: {e}', msg.get('message_id'))
            elif text.startswith('/review'):
                try:
                    report = review_report(manifest_path(), limit=10)
                    await send_message(chat['id'], report, msg.get('message_id'))
                except Exception as e:
                    await send_message(chat['id'], f'Review failed: {e}', msg.get('message_id'))
            elif text.startswith('/dupes'):
                try:
                    report = duplicate_report(manifest_path(), limit=10)
                    await send_message(chat['id'], report, msg.get('message_id'))
                except Exception as e:
                    await send_message(chat['id'], f'Dupes failed: {e}', msg.get('message_id'))
            elif text.startswith('/unknowns'):
                try:
                    report = unknowns_report(manifest_path(), limit=12)
                    await send_message(chat['id'], report, msg.get('message_id'))
                except Exception as e:
                    await send_message(chat['id'], f'Unknowns failed: {e}', msg.get('message_id'))
        await asyncio.sleep(2)


if __name__ == '__main__':
    asyncio.run(main())
