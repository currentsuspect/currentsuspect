#!/usr/bin/env python3
"""Sync OpenRouter free models list and report newly free models."""
import json
import time
from pathlib import Path
import requests

OUT_PATH = Path("/home/currentsuspect/.openclaw/workspace/memory/openrouter-free-models.json")


def fetch_free_models():
    api = requests.get("https://openrouter.ai/api/v1/models", timeout=30).json()["data"]
    free_ids = []
    for m in api:
        pricing = m.get("pricing") or {}
        try:
            prompt = float(pricing.get("prompt", "1"))
            completion = float(pricing.get("completion", "1"))
        except Exception:
            continue
        if prompt == 0.0 and completion == 0.0:
            free_ids.append(m["id"])
    return sorted(set(free_ids))


def main():
    free_ids = fetch_free_models()
    now = int(time.time())
    if OUT_PATH.exists():
        prev = json.loads(OUT_PATH.read_text())
        prev_ids = set(prev.get("models", []))
    else:
        prev_ids = set()

    new = [m for m in free_ids if m not in prev_ids]
    OUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    OUT_PATH.write_text(json.dumps({"updatedAt": now, "models": free_ids}, indent=2))

    result = {
        "updatedAt": now,
        "total": len(free_ids),
        "newCount": len(new),
        "newModels": new,
    }
    print(json.dumps(result, indent=2))


if __name__ == "__main__":
    main()
