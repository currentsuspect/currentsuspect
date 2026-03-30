# HEARTBEAT.md

## Current Status (2026-03-30)

**Machine:** Local laptop (Arch Linux) — primary. VPS is backup/sleeping.

- ✅ **Gateway** — running on laptop (port 18789)
- ✅ **Tailscale** — running on laptop (100.100.235.90)
- ⚠️ **PM2 services** — NOT running (were on VPS, need recreation)
- ⚠️ **VPS services** — DOWN (Azure VPS in auto-shutdown)

*Last verified: 2026-03-30 07:22 UTC*

### At-a-Glance Health

| Service | Port | Status | Location |
|---------|------|--------|----------|
| OpenClaw Gateway | 18789 | 🟢 Online | Laptop |
| Telegram | - | 🟢 Connected | Laptop |
| Discord | - | 🟢 Connected | Laptop |
| WhatsApp | - | ⚠️ Disconnected | Laptop — needs re-link |
| Resonance API | 8088 | 🔴 Down | Was VPS |
| Blueprint | 8090 | 🔴 Down | Was VPS |
| mSpy Dashboard | 8091 | 🔴 Down | Was VPS |
| Gitea | 3002 | 🔴 Down | Was VPS |
| Uptime Kuma | 3001 | 🔴 Down | Was VPS |

**Quick Commands:**
```bash
openclaw status          # Gateway + channel status
tailscale status         # VPN status
```

**OpenClaw channels (laptop):**
- Telegram ✅ — @AestraBot — connected, 1 account paired
- Discord ✅ — ResonanceBot — connected
- WhatsApp ⚠️ — linked but disconnected, needs re-pairing

## VPS (Azure) — Secondary / Sleep Mode

- Azure `Standard_B1s` in UAE North (downsized from B2als_v2 on 2026-03-30 — cost savings, 1 vCPU / 1GB RAM)
- Auto-shutdown at 22:00 UTC (01:00 EAT)
- Wake via: `~/.venvs/az-cli/bin/az vm start --name currentsuspect --resource-group ZT_TGRC`
- SSH: `ssh -i ~/.openclaw/credentials/vps-4.161.44.125.pem currentsuspect@4.161.44.125`
- Tailscale on laptop: `sudo systemctl start tailscaled`
- **Role:** VPN exit node + file storage (services moved to local laptop)

## Today's Progress (2026-03-30)

- 🖥️ **VPS downsized** — from `Standard_B2als_v2` (8GB) to `Standard_B1s` (1GB) for cost savings
  - Azure for Students subscription still covers it
  - VPN + file storage only — services on local laptop now

*Last updated: 2026-03-30 07:22 UTC*

## Yesterday's Progress (2026-03-29)

- 🎛️ **Aestra CI — ALL GREEN!** (5 commits)
  - AestraAudio ALIAS→INTERFACE so PUBLIC includes propagate
  - Added all include subdirectories to test targets
  - Fixed DriverRegistryStub MSVC guard (`#ifdef __GNUC__`)
  - Fixed docs broken links (Aestra-* → nomad-*)
  - Added AESTRA_HEADLESS skip for audio tests (Windows CI has no audio hardware)
- ☁️ **Azure CLI installed** — `~/.venvs/az-cli/bin/az`
- 🖥️ **VPS woken** — briefly for repo access, auto-shutdown at 22:00 UTC (1h left)
- 📦 **PSD + aestra-website cloned** — fresh from GitHub to `~/.openclaw/workspace/`
- 📍 **Aestra docs** — scoping documentation work (aestra.studio + repo docs)

## Yesterday's Progress (2026-03-28)

- 🖥️ **Switched to local laptop** (Arch Linux, Intel i5-3337U, 3.7GB RAM)
  - OpenClaw gateway running locally
  - Telegram paired, Discord connected
  - Fish aliases ported from VPS
  - Tailscale running
- 🎛️ **Aestra DAW text fixes:**
  - Track IDs now start at 1 (fixes Track 1/master collision)
  - MeterSnapshotBuffer implemented (VU meters now work)
  - Theme overhaul: void-black bg (#0e0e0e), neon purple accent (#cc97ff)
  - Font atlas: RGB=white fix (proper anti-aliasing), gamma boost for dark bg readability
  - Hardcoded text colors fixed globally (PluginBrowserPanel, AuditionPanel, TrackManagerUI)
  - `clampRectToAllowed` crash fixed
- 🪄 **Obsidian installed** — AppImage at `~/.local/bin/obsidian`
- 📚 **Everything vault synced** — 146MB from VPS via Tailscale rsync
- 🔑 **VPS SSH** — laptop key added to authorized_keys

## Aestra (DAW) Status

**Phase 2 — Project + Undo/Redo (Apr–Jun 2026)** | Target: v1 Beta Dec 2026

| Phase | Focus | Status |
|-------|-------|--------|
| Phase 1 | Foundation lock | ✅ Complete |
| Phase 2 | Project reliability, undo/redo | ⏳ In Progress |
| Phase 3 | Recording + Export | Jul–Sep |
| Phase 4 | Plugin decision | Sep |
| Phase 5 | UX hardening | Oct–Nov |
| Phase 6 | v1 Beta release | Dec |

**Phase 2 P0 Tasks:**
- [ ] E-001: Define canonical command model for undo/redo
- [ ] E-002: Integrate command history across main UX
- [ ] E-003: Transactions/atomic grouping for multi-step edits
- [ ] C-001: Project schema versioning policy
- [ ] D-003: Recovery UX on startup

**Repo:** `currentsuspect/Aestra` | **Location:** `~/Aestra`

## GitHub Repositories

| Project | URL |
|---------|-----|
| mSpy Clone | https://github.com/currentsuspect/mspy-clone (Private) |
| mSpy Dashboard | https://github.com/currentsuspect/mspy-dashboard (Private) |

## Pending (No Card Required)

- [ ] Create Datadog alerts in UI (CPU, Memory, Disk, Services)
- [ ] Claim Termius Pro from GitHub Education Pack
- [ ] Claim GitHub Codespaces (free Pro tier)
- [ ] Claim Frontend Masters (6 months free)
- [ ] Claim MongoDB Atlas ($50 credit)
- [ ] WhatsApp re-linking on laptop

## 🦞 OpenClaw GPT-5.4 Watch

**Status:** Done — GPT-5.4 is already available. No more heartbeat checks needed.

---

*Last updated: 2026-03-29 14:48 UTC — Aestra CI green. Azure CLI installed. VPS woken. PSD work in progress.*
