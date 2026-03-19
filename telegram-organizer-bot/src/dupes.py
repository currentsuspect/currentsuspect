from __future__ import annotations

from collections import defaultdict

from classify import stem_key


def _canonical_item(items: list[dict]) -> dict | None:
    if not items:
        return None
    ranked = sorted(
        items,
        key=lambda x: (
            int(x.get('record', {}).get('duration_sec') or 0),
            int(x.get('record', {}).get('file_size') or 0),
            int(x.get('record', {}).get('message_id') or 0),
        ),
        reverse=True,
    )
    return ranked[0]


def group_records(records: list[dict]) -> list[dict]:
    buckets: dict[str, list[dict]] = defaultdict(list)
    for item in records:
        rec = item.get("record", {})
        caption = rec.get("caption") or ""
        fn = rec.get("file_name") or ""
        dur = int(rec.get("duration_sec") or 0)
        size = int(rec.get("file_size") or 0)
        key = f"{stem_key(caption or fn)}|{dur//5}|{size//5000000}"
        buckets[key].append(item)

    groups = []
    gid = 1
    for key, items in buckets.items():
        if len(items) < 2:
            continue
        canon = _canonical_item(items)
        groups.append({
            "group_id": f"G{gid:03d}",
            "key": key,
            "count": len(items),
            "message_ids": [x.get("record", {}).get("message_id") for x in items],
            "canonical_message_id": canon.get('record', {}).get('message_id') if canon else None,
        })
        gid += 1
    return groups
