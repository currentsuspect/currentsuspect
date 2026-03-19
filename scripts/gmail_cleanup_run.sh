#!/usr/bin/env bash
set -euo pipefail

cd /home/currentsuspect/.openclaw/workspace

# Install deps if needed
python3 -m pip install --user --quiet google-api-python-client google-auth google-auth-oauthlib

# 1) Dry-run cleanup summary
python3 scripts/gmail_worker.py cleanup

# 2) Apply cleanup (spam + promotions + older than 2y)
python3 scripts/gmail_worker.py cleanup --apply

# 3) Large attachment report only
python3 scripts/gmail_worker.py report-large --min-mb 10 --limit 300

echo "Done. Report: /home/currentsuspect/.openclaw/workspace/reports/gmail/large_attachments_report.json"
