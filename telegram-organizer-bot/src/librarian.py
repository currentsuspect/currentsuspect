from __future__ import annotations

import json
import os
import httpx

SYSTEM_PROMPT = """You are a privacy-first media archivist. You do not see raw video or audio. You only receive metadata.
Your job is to organize media records into practical collections with conservative confidence.
Return strict JSON with keys: category, tags, canonical_title, rename_to, confidence, action, rationale.
Actions allowed: keep, review, archive.
Prefer review when uncertain.
"""


def build_user_prompt(record: dict) -> str:
    return json.dumps({
        "system": SYSTEM_PROMPT,
        "task": "Classify this Telegram media item using metadata only.",
        "record": record,
        "rules": [
            "Do not infer visual specifics that are not present in metadata.",
            "Use caption, filename, source pattern, duration, mime type, and dates.",
            "If uncertain, set action to review.",
            "Return JSON only.",
        ],
    }, ensure_ascii=False)


def _fallback(text: str, record: dict) -> dict:
    return {
        "category": "unclassified",
        "tags": [],
        "canonical_title": record.get("file_name") or f"message-{record.get('message_id')}",
        "rename_to": None,
        "confidence": 0.1,
        "action": "review",
        "rationale": text[:500],
    }


async def classify_record(record: dict) -> dict:
    url = os.getenv("OPENCLAW_CHAT_URL", "http://127.0.0.1:8088/chat")

    payload = {
        "message": build_user_prompt(record),
        "history": [],
        "stream": True,
        "danger": False,
        "user": "telegram-organizer-bot",
    }
    headers = {"Content-Type": "application/json"}

    chunks: list[str] = []
    async with httpx.AsyncClient(timeout=120) as client:
        async with client.stream("POST", url, headers=headers, json=payload) as r:
            r.raise_for_status()
            async for line in r.aiter_lines():
                if not line or not line.startswith("data: "):
                    continue
                raw = line[6:]
                if raw == "[DONE]":
                    break
                try:
                    event = json.loads(raw)
                except Exception:
                    continue
                if event.get("type") == "delta":
                    chunks.append(event.get("text", ""))
                elif event.get("type") == "done":
                    chunks.append(event.get("text", ""))

    text = "".join(chunks).strip()
    if not text:
        return _fallback("No model output", record)

    try:
        return json.loads(text)
    except Exception:
        start = text.find('{')
        end = text.rfind('}')
        if start != -1 and end != -1 and end > start:
            try:
                return json.loads(text[start:end+1])
            except Exception:
                pass
        return _fallback(text, record)
