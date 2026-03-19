from __future__ import annotations

import asyncio
import os
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / 'src'
if str(SRC) not in sys.path:
    sys.path.insert(0, str(SRC))

from bot import main as run_indexer  # noqa: E402


async def run_scan() -> str:
    await run_indexer()
    return "Scan complete. Manifest updated."


def manifest_path() -> str:
    manifest_dir = os.getenv('MANIFEST_DIR', str(ROOT / 'data' / 'manifests'))
    return str(Path(manifest_dir) / 'latest_manifest.json')
