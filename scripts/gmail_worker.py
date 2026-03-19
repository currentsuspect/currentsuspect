#!/usr/bin/env python3
import argparse
import base64
import json
from email.mime.text import MIMEText
from pathlib import Path

from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build

CREDS_DIR = Path.home() / ".openclaw" / "credentials"
TOKEN_PATH = CREDS_DIR / "gmail-token.json"
REPORT_DIR = Path("/home/currentsuspect/.openclaw/workspace/reports/gmail")


def gmail_service():
    if not TOKEN_PATH.exists():
        raise SystemExit(f"Missing token file: {TOKEN_PATH}. Run gmail_auth.py first.")
    creds = Credentials.from_authorized_user_file(str(TOKEN_PATH))
    return build("gmail", "v1", credentials=creds)


def list_message_ids(svc, query, limit=500):
    ids = []
    page_token = None
    while len(ids) < limit:
        resp = (
            svc.users()
            .messages()
            .list(userId="me", q=query, maxResults=min(500, limit - len(ids)), pageToken=page_token)
            .execute()
        )
        ids.extend([m["id"] for m in resp.get("messages", [])])
        page_token = resp.get("nextPageToken")
        if not page_token:
            break
    return ids


def batch_trash(svc, ids):
    if not ids:
        return
    for i in range(0, len(ids), 1000):
        svc.users().messages().batchModify(
            userId="me", body={"ids": ids[i : i + 1000], "removeLabelIds": ["INBOX"], "addLabelIds": ["TRASH"]}
        ).execute()


def get_headers(payload):
    headers = payload.get("headers", [])
    out = {}
    for h in headers:
        out[h.get("name", "").lower()] = h.get("value", "")
    return out


def attachment_bytes(payload):
    total = 0
    stack = [payload]
    while stack:
        part = stack.pop()
        body = part.get("body", {})
        total += int(body.get("size", 0) or 0)
        for p in part.get("parts", []) or []:
            stack.append(p)
    return total


def cmd_cleanup(args):
    svc = gmail_service()
    queries = {
        "spam": "in:spam",
        "promotions": "category:promotions -in:trash",
        "older_2y": "older_than:2y -in:trash",
    }

    all_ids = set()
    counts = {}
    for name, q in queries.items():
        ids = list_message_ids(svc, q, limit=args.limit)
        counts[name] = len(ids)
        all_ids.update(ids)

    print(json.dumps({"counts": counts, "unique_total": len(all_ids), "apply": args.apply}, indent=2))

    if args.apply:
        batch_trash(svc, list(all_ids))
        print(f"Moved {len(all_ids)} messages to Trash.")


def cmd_report_large(args):
    svc = gmail_service()
    query = f"has:attachment larger:{args.min_mb}m -in:trash"
    ids = list_message_ids(svc, query, limit=args.limit)

    items = []
    for mid in ids:
        msg = svc.users().messages().get(userId="me", id=mid, format="full").execute()
        payload = msg.get("payload", {})
        hdr = get_headers(payload)
        size_mb = round(attachment_bytes(payload) / (1024 * 1024), 2)
        items.append(
            {
                "id": mid,
                "from": hdr.get("from", ""),
                "subject": hdr.get("subject", ""),
                "date": hdr.get("date", ""),
                "size_mb_estimate": size_mb,
            }
        )

    REPORT_DIR.mkdir(parents=True, exist_ok=True)
    out = REPORT_DIR / "large_attachments_report.json"
    with open(out, "w", encoding="utf-8") as f:
        json.dump(items, f, indent=2)
    print(f"Saved report: {out}")
    print(f"Found: {len(items)}")


def cmd_read(args):
    svc = gmail_service()
    msg = svc.users().messages().get(userId="me", id=args.id, format="full").execute()
    payload = msg.get("payload", {})
    hdr = get_headers(payload)
    print(json.dumps({
        "id": msg.get("id"),
        "from": hdr.get("from"),
        "to": hdr.get("to"),
        "subject": hdr.get("subject"),
        "date": hdr.get("date"),
        "snippet": msg.get("snippet"),
    }, indent=2))


def cmd_send(args):
    svc = gmail_service()
    message = MIMEText(args.body)
    message["to"] = args.to
    message["subject"] = args.subject
    raw = base64.urlsafe_b64encode(message.as_bytes()).decode()
    sent = svc.users().messages().send(userId="me", body={"raw": raw}).execute()
    print(f"Sent message id: {sent.get('id')}")


def cmd_delete_id(args):
    svc = gmail_service()
    svc.users().messages().trash(userId="me", id=args.id).execute()
    print(f"Moved to trash: {args.id}")


def main():
    p = argparse.ArgumentParser(description="Gmail worker")
    sub = p.add_subparsers(dest="cmd", required=True)

    c = sub.add_parser("cleanup")
    c.add_argument("--apply", action="store_true", help="Apply deletions (otherwise dry-run)")
    c.add_argument("--limit", type=int, default=5000)
    c.set_defaults(func=cmd_cleanup)

    r = sub.add_parser("report-large")
    r.add_argument("--min-mb", type=int, default=10)
    r.add_argument("--limit", type=int, default=200)
    r.set_defaults(func=cmd_report_large)

    rd = sub.add_parser("read")
    rd.add_argument("id")
    rd.set_defaults(func=cmd_read)

    s = sub.add_parser("send")
    s.add_argument("--to", required=True)
    s.add_argument("--subject", required=True)
    s.add_argument("--body", required=True)
    s.set_defaults(func=cmd_send)

    d = sub.add_parser("delete-id")
    d.add_argument("id")
    d.set_defaults(func=cmd_delete_id)

    args = p.parse_args()
    args.func(args)


if __name__ == "__main__":
    main()
