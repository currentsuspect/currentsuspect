from __future__ import annotations

import os
import sqlite3
from contextlib import contextmanager

SCHEMA = """
CREATE TABLE IF NOT EXISTS media_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    chat_id TEXT NOT NULL,
    message_id INTEGER NOT NULL,
    posted_at TEXT,
    caption TEXT,
    file_name TEXT,
    mime_type TEXT,
    file_size INTEGER,
    duration_sec INTEGER,
    width INTEGER,
    height INTEGER,
    local_path TEXT,
    sha256 TEXT,
    classification_json TEXT,
    UNIQUE(chat_id, message_id)
);
"""


def init_db(db_path: str) -> None:
    os.makedirs(os.path.dirname(db_path), exist_ok=True)
    with sqlite3.connect(db_path) as conn:
        conn.executescript(SCHEMA)
        conn.commit()


@contextmanager
def get_db(db_path: str):
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row
    try:
        yield conn
        conn.commit()
    finally:
        conn.close()


def upsert_media(conn: sqlite3.Connection, item: dict) -> None:
    conn.execute(
        """
        INSERT INTO media_items (
            chat_id, message_id, posted_at, caption, file_name, mime_type, file_size,
            duration_sec, width, height, local_path, sha256, classification_json
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(chat_id, message_id) DO UPDATE SET
            posted_at=excluded.posted_at,
            caption=excluded.caption,
            file_name=excluded.file_name,
            mime_type=excluded.mime_type,
            file_size=excluded.file_size,
            duration_sec=excluded.duration_sec,
            width=excluded.width,
            height=excluded.height,
            local_path=excluded.local_path,
            sha256=excluded.sha256,
            classification_json=COALESCE(excluded.classification_json, media_items.classification_json)
        """,
        (
            item.get("chat_id"), item.get("message_id"), item.get("posted_at"), item.get("caption"),
            item.get("file_name"), item.get("mime_type"), item.get("file_size"), item.get("duration_sec"),
            item.get("width"), item.get("height"), item.get("local_path"), item.get("sha256"),
            item.get("classification_json"),
        ),
    )
