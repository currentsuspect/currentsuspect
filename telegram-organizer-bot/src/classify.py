from __future__ import annotations

import re
from difflib import SequenceMatcher


def normalize_text(text: str | None) -> str:
    if not text:
        return ""
    text = text.lower().strip()
    text = re.sub(r"https?://\S+", " ", text)
    text = re.sub(r"[^a-z0-9]+", " ", text)
    text = re.sub(r"\s+", " ", text).strip()
    return text


def stem_key(text: str | None) -> str:
    t = normalize_text(text)
    parts = t.split()
    return " ".join(parts[:8])


def classify_metadata(record: dict) -> dict:
    caption = record.get("caption") or ""
    file_name = record.get("file_name") or ""
    mime = (record.get("mime_type") or "").lower()
    duration = int(record.get("duration_sec") or 0)
    width = int(record.get("width") or 0)
    height = int(record.get("height") or 0)

    text = f"{caption} {file_name}"
    norm = normalize_text(text)
    stem = stem_key(text)
    tags: list[str] = []
    confidence = 0.55
    action = "review"
    category = "unknown_low_context"

    if any(x in norm for x in ["ep ", "episode", "s01", "s1", "season", "part ", "pt "]):
        category = "series_episode"
        tags += ["series"]
        confidence = 0.78
    elif duration and duration <= 90:
        category = "short_clip"
        tags += ["shortform"]
        confidence = 0.72
    elif duration and duration >= 20 * 60:
        category = "full_video"
        tags += ["longform"]
        confidence = 0.7
    elif mime.startswith("video/"):
        category = "full_video"
        confidence = 0.58
    elif mime.startswith("image/"):
        category = "image_post"
        confidence = 0.62
    elif mime.startswith("audio/"):
        category = "audio_post"
        confidence = 0.62

    if width and height:
        if height > width:
            tags.append("vertical")
        elif width > height:
            tags.append("landscape")
        else:
            tags.append("square")

    if not caption and re.match(r"^(vid|video|img|image|file|document)[_\- ]?\d*", file_name.lower() if file_name else ""):
        category = "unknown_low_context"
        confidence = min(confidence, 0.45)

    canonical_title = file_name or f"message-{record.get('message_id')}"
    rename_to = None
    if stem:
        safe = stem.replace(" ", "_")[:80]
        rename_to = f"{category}__{safe}"

    if confidence >= 0.8:
        action = "keep"
    elif confidence >= 0.6:
        action = "review"
    else:
        action = "review"

    return {
        "category": category,
        "tags": sorted(set(tags)),
        "canonical_title": canonical_title,
        "rename_to": rename_to,
        "confidence": round(confidence, 2),
        "action": action,
        "rationale": "Deterministic metadata classification",
        "stem_key": stem,
    }


def similarity(a: str | None, b: str | None) -> float:
    return SequenceMatcher(None, normalize_text(a), normalize_text(b)).ratio()
