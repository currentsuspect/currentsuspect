---
name: healthcheck-ops
description: Perform host security and health checks on OpenClaw machines (updates, users, SSH, firewall, disk, services, backups). Use for periodic audits, hardening reviews, or troubleshooting system health.
---

# Healthcheck Ops

## Overview
Run a careful, non‑destructive audit of system health and security posture. Provide findings, risk level, and actionable next steps. Confirm before any hardening changes.

## Quick Workflow
1) **Snapshot basics** (OS, uptime, disk, memory, load).
2) **Security posture** (users, SSH, firewall, updates).
3) **Services & logs** (critical services, recent errors).
4) **Backups & integrity** (if configured).
5) **Summarize** with risk/impact and recommended fixes.

## Safe Commands (non‑destructive)
Use the script `scripts/quick_audit.sh` for the basics, then expand as needed.

## What to Check
- **Updates**: pending security updates.
- **Firewall**: UFW status / open ports.
- **SSH**: password auth, root login, key‑only.
- **Users**: unexpected accounts or sudoers.
- **Disk**: low space, inode pressure.
- **Services**: failed units, crash loops.
- **Backups**: last successful run and location.

## Safety & Confirmation
- Never disable services or lock accounts without explicit approval.
- Ask before editing SSH config, firewall rules, or auto‑updates.
- If critical risk is found, recommend mitigation steps before applying.

## Reporting Template
- **Summary**: overall health (Good / Attention / Critical)
- **Findings**: bullet list (risk + evidence)
- **Actions**: recommended fixes in priority order
- **Commands**: exact commands to execute (ask before running)

## References
- See `references/checklist.md` for a detailed checklist.
- See `references/commands.md` for safe commands to gather evidence.
