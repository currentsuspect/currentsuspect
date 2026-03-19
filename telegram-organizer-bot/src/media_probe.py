from __future__ import annotations

import hashlib
import os
import subprocess
import json


def sha256_file(path: str) -> str:
    h = hashlib.sha256()
    with open(path, 'rb') as f:
        for chunk in iter(lambda: f.read(1024 * 1024), b''):
            h.update(chunk)
    return h.hexdigest()


def ffprobe_media(path: str) -> dict:
    if not os.path.exists(path):
        return {}
    cmd = [
        'ffprobe', '-v', 'error', '-print_format', 'json',
        '-show_streams', '-show_format', path,
    ]
    try:
        out = subprocess.check_output(cmd, stderr=subprocess.STDOUT, text=True)
        data = json.loads(out)
    except Exception:
        return {}

    result = {}
    fmt = data.get('format', {})
    if fmt.get('duration'):
        try:
            result['duration_sec'] = int(float(fmt['duration']))
        except Exception:
            pass

    for stream in data.get('streams', []):
        if stream.get('codec_type') == 'video':
            result['width'] = stream.get('width')
            result['height'] = stream.get('height')
            break
    return result
