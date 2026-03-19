from __future__ import annotations

import asyncio
import json
import os
from pathlib import Path

from dotenv import load_dotenv

from media_index import init_db, get_db, upsert_media
from ingest import iter_media_records
from librarian import classify_record
from classify import classify_metadata
from dupes import group_records

ROOT = Path(__file__).resolve().parents[1]
load_dotenv(ROOT / 'config' / '.env')


def ensure_dirs() -> None:
    for key in ['DOWNLOAD_DIR', 'MANIFEST_DIR']:
        value = os.getenv(key, '')
        if value:
            os.makedirs(value, exist_ok=True)


async def main() -> None:
    db_path = os.getenv('DB_PATH', str(ROOT / 'data' / 'index.db'))
    manifest_dir = os.getenv('MANIFEST_DIR', str(ROOT / 'data' / 'manifests'))
    ensure_dirs()
    init_db(db_path)

    manifest = []
    async for record in iter_media_records():
        heuristic = classify_metadata(record)
        classification = heuristic
        if heuristic.get('confidence', 0) < 0.75:
            try:
                llm = await classify_record(record)
                if isinstance(llm, dict) and llm.get('category') and llm.get('category') != 'unclassified':
                    classification = llm
                else:
                    classification = heuristic
            except Exception:
                classification = heuristic
        record['classification_json'] = json.dumps(classification, ensure_ascii=False)
        with get_db(db_path) as conn:
            upsert_media(conn, record)
        manifest.append({
            'record': record,
            'classification': classification,
        })
        print(f"Indexed message {record['message_id']} -> {classification.get('action')} / {classification.get('category')}")

    groups = group_records(manifest)
    out = Path(manifest_dir) / 'latest_manifest.json'
    out.write_text(json.dumps({'items': manifest, 'groups': groups}, ensure_ascii=False, indent=2))
    print(f'Wrote manifest: {out}')


if __name__ == '__main__':
    asyncio.run(main())
