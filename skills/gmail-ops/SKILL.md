---
name: gmail-ops
description: Manage Gmail via safe, human-like workflows. Use for Gmail cleanup, search, reporting large attachments, deleting/archiving mail by rules, composing/sending emails, and unsubscribe review. Supports browser relay and optional Gmail API access when configured.
---

# Gmail Ops

## Overview
Operate Gmail safely and transparently, prioritizing human-like actions in the Gmail UI via browser relay, with optional API access if credentials exist.

## Access Methods (choose one)
1) **Browser relay (preferred)**
- Use when no Gmail API credentials are configured.
- Acts like a human inside Gmail.
- Requires the user to attach a Gmail tab via the OpenClaw Browser Relay extension.

2) **Gmail API (optional)**
- Use only if Gmail API auth is already configured.
- Never ask for or accept passwords/app passwords in chat.
- If API auth is missing, fall back to browser relay.

## Safety Rules
- Confirm before any destructive action (bulk delete, empty trash, delete spam, delete older-than rules).
- For “report-only” tasks (e.g., large attachments), list findings without deleting.
- Never request or process OAuth codes in chat; use OpenClaw’s auth flow on the host.

## Core Tasks

### 1) Cleanup (Spam/Promotions/Old Mail)
**Workflow (browser relay):**
1. Ask for confirmation of rules (e.g., delete Spam + Promotions; delete older than 2 years).
2. Use Gmail search operators (see `references/gmail-search.md`).
3. Bulk-select results and delete.
4. Report what was removed (counts/labels if visible).

**Common searches:**
- `is:spam`
- `category:promotions`
- `older_than:2y`

### 2) Large Attachments (Report Only)
1. Search: `has:attachment larger:10m` (or agreed threshold).
2. Summarize top offenders: sender, subject, size, date.
3. Ask whether to delete or keep.

### 3) Unsubscribe List (Collaborative)
1. Identify frequent bulk senders.
2. Propose a list of candidates.
3. Get explicit approval before unsubscribing or deleting.

### 4) Read / Send / Delete Individual Emails
- Confirm the target message(s) and action.
- For send: draft + show summary before sending if the message is sensitive.
- For delete: confirm if uncertain.

## References
- `references/gmail-search.md` — Gmail search operators and examples.
