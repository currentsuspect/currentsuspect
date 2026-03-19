from __future__ import annotations

import json
import sqlite3
from pathlib import Path


def db_stats(db_path: str) -> dict:
    if not Path(db_path).exists():
        return {"total": 0, "classified": 0, "review": 0, "archive": 0, "keep": 0}

    with sqlite3.connect(db_path) as conn:
        cur = conn.execute("SELECT COUNT(*) FROM media_items")
        total = cur.fetchone()[0]
        cur = conn.execute("SELECT classification_json FROM media_items WHERE classification_json IS NOT NULL")
        classified = 0
        review = 0
        archive = 0
        keep = 0
        for (raw,) in cur.fetchall():
            classified += 1
            try:
                obj = json.loads(raw)
            except Exception:
                continue
            action = obj.get("action")
            if action == "review":
                review += 1
            elif action == "archive":
                archive += 1
            elif action == "keep":
                keep += 1
        return {
            "total": total,
            "classified": classified,
            "review": review,
            "archive": archive,
            "keep": keep,
        }


def _load_manifest(manifest_path: str) -> tuple[list[dict], list[dict]]:
    p = Path(manifest_path)
    if not p.exists():
        return [], []
    raw = json.loads(p.read_text())
    if isinstance(raw, dict):
        return raw.get('items', []), raw.get('groups', [])
    if isinstance(raw, list):
        return raw, []
    return [], []


def latest_digest(manifest_path: str) -> str:
    data, groups = _load_manifest(manifest_path)
    if not data:
        return "No manifest yet. Run /scan first."

    total = len(data)
    review = 0
    archive = 0
    keep = 0
    cats: dict[str, int] = {}
    for item in data:
        c = item.get("classification", {})
        action = c.get("action")
        cat = c.get("category") or "uncategorized"
        cats[cat] = cats.get(cat, 0) + 1
        if action == "review":
            review += 1
        elif action == "archive":
            archive += 1
        elif action == "keep":
            keep += 1

    top = sorted(cats.items(), key=lambda kv: kv[1], reverse=True)[:5]
    top_text = "\n".join(f"- {name}: {count}" for name, count in top) if top else "- none"
    return (
        f"Latest digest\n"
        f"Total indexed: {total}\n"
        f"Keep: {keep} | Review: {review} | Archive: {archive}\n"
        f"Duplicate-ish groups: {len(groups)}\n"
        f"Top categories:\n{top_text}"
    )


def review_report(manifest_path: str, limit: int = 10) -> str:
    data, groups = _load_manifest(manifest_path)
    if not data:
        return "No manifest yet. Run /scan first."

    unknowns = []
    for item in data:
        rec = item.get('record', {})
        c = item.get('classification', {})
        if c.get('category') == 'unknown_low_context' or c.get('action') == 'review':
            unknowns.append(item)

    lines = ["Review report"]
    lines.append(f"Total review candidates: {len(unknowns)}")
    lines.append(f"Duplicate-ish groups: {len(groups)}")
    lines.append("")
    lines.append("Top unknown / low-context items:")

    for item in unknowns[:limit]:
        rec = item.get('record', {})
        c = item.get('classification', {})
        caption = (rec.get('caption') or '').replace('\n', ' ')[:60]
        fname = rec.get('file_name') or f"message-{rec.get('message_id')}"
        dur = rec.get('duration_sec') or 0
        lines.append(
            f"- msg {rec.get('message_id')}: {fname} | {c.get('category')} | {dur}s | {caption or '[no caption]'}"
        )

    if groups:
        lines.append("")
        lines.append("Top duplicate-ish groups:")
        for g in groups[:5]:
            mids = ', '.join(str(x) for x in g.get('message_ids', [])[:6])
            canon = g.get('canonical_message_id')
            lines.append(f"- {g.get('group_id')} ({g.get('count')} items): {mids} | keep msg {canon}")

    lines.append("")
    lines.append("Suggested next actions:")
    lines.append("- Move short_clip items into a Shorts bucket")
    lines.append("- Review unknown_low_context items for better naming")
    lines.append("- Inspect duplicate-ish groups and choose canonical keeps")
    return '\n'.join(lines)


def duplicate_report(manifest_path: str, limit: int = 10) -> str:
    data, groups = _load_manifest(manifest_path)
    if not data:
        return 'No manifest yet. Run /scan first.'
    if not groups:
        return 'No duplicate-ish groups found.'
    lines = ['Duplicate-ish groups']
    for g in groups[:limit]:
        mids = ', '.join(str(x) for x in g.get('message_ids', [])[:8])
        lines.append(f"- {g.get('group_id')} ({g.get('count')} items) | keep msg {g.get('canonical_message_id')} | {mids}")
    return '\n'.join(lines)


def unknowns_report(manifest_path: str, limit: int = 12) -> str:
    data, _ = _load_manifest(manifest_path)
    if not data:
        return 'No manifest yet. Run /scan first.'
    rows = []
    for item in data:
        rec = item.get('record', {})
        c = item.get('classification', {})
        if c.get('category') == 'unknown_low_context':
            rows.append(item)
    if not rows:
        return 'No unknown_low_context items found.'
    lines = ['Unknown / low-context items']
    for item in rows[:limit]:
        rec = item.get('record', {})
        caption = (rec.get('caption') or '').replace('\n', ' ')[:60]
        lines.append(f"- msg {rec.get('message_id')}: {(rec.get('file_name') or '[no filename]')} | {caption or '[no caption]'}")
    return '\n'.join(lines)
