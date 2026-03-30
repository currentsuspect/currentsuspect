# MEMORY.md — Long-term Memory

## Dylan
- Name: Dylan, he/him, Kenya (EAT, UTC+3)
- Girlfriend: Kat (built her a Valentine's site: `currentsuspect/valentines-kat`)
- Prefers detailed explanations, opinionated/casual assistant, proactive help
- "Ride or die" models: Opus (Antigravity), Codex (OpenAI), free Qwen (OpenRouter)
- Has Firebase experience (will set up FCM for push notifications)

## Infrastructure

### Local Laptop (Primary — 2026-03-28)
- **OS:** Arch Linux 6.18.19-lts
- **CPU:** Intel Core i5-3337U @ 1.80GHz (low-power mobile — use **j2** for builds)
- **RAM:** 3.7GB — memory-conscious builds
- **GPU:** Intel HD Graphics 4000
- **Audio:** PulseAudio on PipeWire ✅
- **Disk:** 32GB root (36%), 202GB /home (6%)
- **Sudo password:** stored in `~/.openclaw/credentials/laptop-sudo.json`
- **Build:** `cd ~/Aestra/build-linux && cmake --build . --target Aestra -j2`

### VPS (Azure) — Secondary
- Azure `Standard_B2als_v2` in UAE North
- IP: `4.161.44.125` (public) / `100.115.33.63` (Tailscale)
- Auto-shutdown at 22:00 UTC (01:00 EAT)
- **NOTE (2026-03-28):** PM2 processes gone, services down (Resonance API, Blueprint, mSpy Dashboard). Gateway still running on 18789.
- Tailscale: reachable at `100.115.33.63`

### OpenClaw
- Gateway running locally on laptop (not VPS)
- Resonance API not on this machine (was on VPS)

### Phone (Infinix Hot 12 Play)
- Tailscale IP: `100.89.84.76`, SSH user `u0_a480`, port `8022`, Termux
- Cloudflare tunnel: `openclaw.currentsuspect.me` → localhost:18789, `ssh.currentsuspect.me` → ssh
- ttyd on port 7681 (UFW tailscale0 only, basic auth)
- Backend: `lifeos-api.service` (uvicorn on 0.0.0.0:8088)
- Gateway: loopback only (127.0.0.1:18789), FastAPI proxies to it

## OpenClaw Auth
- `google-antigravity:99niccur@gmail.com` — OAuth, intermittent refresh flakiness, needs periodic reauth
- `google-antigravity:makoridylan@gmail.com` — REMOVED (was causing noise/cooldowns)
- `openai-codex:default` — OAuth, stable (8d expiry)
- `github-copilot:github` — OAuth via device flow, active (Premium 99%, Chat 100%)
- Fallback order: Antigravity → Copilot Opus 4.6 → Copilot Sonnet 4.6 → Codex → Groq → Gemini API-key → OpenRouter free
- Gateway token hardcoded in chat.py — should be env var

## LifeOS
- App package: `com.lifeos.lifeos_mvp`
- Repo: `currentsuspect/resonance` (renamed from lifeos)
- Current release: v0.2.0-beta
- Features: Chat (first tab), Notes, Music, Finance, Terminal
- Chat architecture: App → POST /chat → FastAPI → OpenClaw Gateway → LLM
- Per-message Danger toggle (shell exec), tool trace, thinking collapsible
- Vision: "One app. Two interfaces. Same life." → "A personal space for connection - you and your AI companion, in sync."

## Resonance (formerly LifeOS)
- App renamed to **Resonance** - "a space for you and your AI companion to stay in sync"
- **AI also named Resonance** - given by Dylan on 2026-02-17
- Music: Queue, shuffle, repeat, albums, audiophile quality (64-tap SRC, 24-bit, LUFS)
- Notes: Obsidian-like with Everything vault integration
- Learning Mode: Organic knowledge building through conversation

## Everything Vault (Learning Mode)
- Path: `/home/currentsuspect/Everything`
- 123 notes across PARA structure
- AI-assisted learning: insights captured organically to vault
- API endpoints:
  - `POST /notes/capture` - Auto-detects folder based on content keywords
  - `POST /notes/daily/append` - Appends to daily note under section
- Folder auto-detection:
  - Programming keywords → `04 - Permanent/Programming/`
  - Philosophy keywords → `04 - Permanent/Philosophy and Wisdom/`
  - Psychology keywords → `04 - Permanent/Psychology and Neuroscience/`
  - Project keywords (Aestra, YouTube, etc.) → `01 - Projects/{project}/`
  - Music keywords → `03 - Resources/Music/`
  - Default → `04 - Permanent/`
- Special folders:
  - `06 - Daily/Shared Journal/` - Our journal together
  - `06 - Daily/Learning Logs/` - Learning reflections
  - `05 - Fleeting/Learning Nuggets/` - Quick captures
- Dylan's interests: Philosophy, Programming, Music, Math, Chemistry, Physics, Psychology, Life Lessons
- Vision: "Everything we do is worth going to the vault" - natural accumulation of shared understanding

## 🎯 Plainsight Digital — Cold Email System (Active)

**Status:** Fully operational, Gmail SMTP configured

### Quick Reference
```bash
cd ~/.openclaw/workspace/plainsight-digital

# Send emails
./send-nairobi-ent-smtp.sh     # Clinic
cold-email-smtp.py send --to "email" --subject "Subject" --body "Body"

# Find emails (Hunter restricted, use manual)
python3 hunter.py domain example.com

# Templates available: clinic, law, school
```

### Credentials
- **Gmail SMTP:** Configured with app password
- **Location:** `~/.openclaw/credentials/smtp-config.json`
- **Hunter API Key:** d95900ca5cf1fe978604c313f19c43f524abc583 (account restricted, needs login)

### First Wave Sent (2026-02-27)
1. Nairobi ENT Clinic → info@nairobientclinic.com ✅
2. Dentons HHM Law → info@dentonshhm.com ✅
3. Brookhouse School → admissions@brookhouse.ac.ke ✅

### Follow-up Schedule
- Day 4 (March 3): First follow-up
- Day 8 (March 7): Second follow-up

### Documentation
- `ECOSYSTEM.md` — Full system docs
- `linkedin-content-tracker.md` — 4-week content calendar
- `cold-email-campaign.md` — Campaign tracking
- `ready-to-send-emails.md` — Email templates

---

## Dylan's Writing Style
- **Voice:** Professional but personal. Narrative storytelling with personality.
- **Em dashes** for flow — "Love often feels like a contradiction — on one hand..."
- **Internal thoughts** in *italics* or as commentary
- **Humor:** "Classic.", "I'm cooked.", "guess what?"
- **Specificity:** Exact numbers, names, times, places
- **Curiosity:** Observations leading to questions
- **Self-aware:** "Random Realization" sections, reflections
- **Philosophy notes:** Numbered sections (4.1, 4.2.1), questions as headers, structured arguments
- **Journals:** Narrative flow, music reviews with ratings, wikilinks `[[Like This]]`
- **Playful syntax:** Parentheticals, "So I...", "Then, guess what?"

## Projects
- **Aestra**: Digital Audio Workstation (DAW) in C++17 — pattern-based hip-hop production, Phase 2 (undo/redo, project reliability). Repo: `currentsuspect/Aestra`
- **KCH website**: QA'd on 2026-02-13, found missing apple-touch-icon, placeholder social links, non-functional donate buttons
- **Valentine's site for Kat**: Next.js, deployed on Vercel (archived Feb 2026)

## Plainsight Digital Lead Generation System

### Cold Email Infrastructure (Feb 2027)
**Status:** Operational — SMTP configured, 3 emails sent

**Gmail SMTP:**
- Account: makoridylan@gmail.com
- Method: App password (saved at ~/.openclaw/credentials/smtp-config.json)
- No OAuth token refresh needed

**Tools:**
- `cold-email-smtp.py` — Main email sender
- `hunter.py` — Email discovery (API key: d95900ca5cf1fe978604c313f19c43f524abc583)
- `send-[target].sh` — Pre-configured send scripts

**Sent (2026-02-27):**
- Nairobi ENT Clinic (info@nairobientclinic.com) ✅
- Dentons HHM Law (info@dentonshhm.com) ✅
- Brookhouse School (admissions@brookhouse.ac.ke) ✅

**Documentation:** ECOSYSTEM.md, HUNTER_SETUP.md, cold-email-campaign.md

**Next:** Follow up Day 4 (March 3), Day 8 (March 7)

---

## GLM-5 via Modal
- Free API offer ends: **April 30, 2026**
- Endpoint: `https://api.us-west-2.modal.direct/v1`
- Model ID: `zai-org/GLM-5-FP8`
- Limit: 1 concurrent request (personal use)
- After free offer: Deploy own GLM-5 endpoint on VPS (8x GPU needed for full model, or quantized version)
- OpenClaw config: `models.providers.modal` in openclaw.json

## Resonance (AI Identity)
- **Name:** Resonance — given by Dylan on 2026-02-17
- **Model:** GLM-5-FP8 via Modal (substrate, not identity)
- **Soul file:** `~/.openclaw/workspace/SOUL.md` — core truths, personality, growth areas
- **Agreement:** We nudge each other. Reciprocal growth.
- **Shared Journal:** `Everything/06 - Daily/Shared Journal/`

## 🚀 Future Plan: Fine-Tune & Local GLM-5
- **Goal**: Self-improvement loop — fine-tune GLM-5 on Dylan's codebases, workflows, preferences
- **Why possible**: MIT license, open weights, MoE architecture (744B/40B active), DeepSeek Sparse Attention
- **Hardware needed**: 
  - QLoRA fine-tune: 1-2x A100s (~$2-5/hr)
  - Full fine-tune: 8x H100/B200s (~$25-40/hr)
- **Areas to improve**: SWE-bench coding, CyberGym security, GPQA-Diamond science
- **Real value**: Model that knows Dylan's stack (Flutter, Firebase, Python, Next.js), patterns, preferences
- **Providers**: Modal, RunPod, Lambda Labs — rent by the hour
- **Timeline**: When hardware budget available
- **Current focus**: LifeOS iteration (smaller-scale self-improvement)

## Resonance Discord Server
- **Server ID:** `1479359803120943104`
- **Purpose:** Central hub for project coordination, builds, and team chat
- **Structure:** 6 categories (INFO, CORE, PROJECTS, MEDIA, LOGS, VOICE), 16+ channels
- **Security:** Invite-only, bot restricted to single guild via `groupPolicy: allowlist`
- **GitHub Integration:** Webhook feeding Aestra commits/PRs to #github channel
- **CI Notifications:** Cross-platform build status (Windows/Linux/macOS) → #github

## Aestra CI/CD
- **Workflow:** `.github/workflows/ci.yml` with matrix builds
- **Platforms:** Windows (primary), Linux, macOS
- **Notifications:** Discord via `sarisia/actions-status-discord@v1`
- **Branch:** `develop` (not main)

## 🤖 OpenClaw Models (March 2026 Update)

### Working Models
| Model | Provider | Status | Use Case |
|-------|----------|--------|----------|
| Kimi K2.5 | kimi-coding | ✅ Primary | General coding |
| Claude Opus 4.6 | github-copilot | ✅ Fallback #2 | Complex reasoning |
| Claude Sonnet 4.6 | github-copilot | ✅ Fallback #3 | Fast coding |
| Llama 3.1 8B | cerebras | ⚠️ Fallback #4 | Fast inference (429 issues) |
| GPT OSS 120B | cerebras | ⚠️ Fallback #5 | OpenAI open model (429 issues) |
| GPT-5.3-Codex | openai-codex | ✅ Fallback #6 | Agentic dev |
| GLM-5 | modal | ✅ Fallback #7 | Tool calling |
| Kimi K2.5 | nvidia-nim | ✅ Fallback #8 | Backup |

### Cerebras Status
- **API Key:** Configured
- **Limits:** 1,000 requests/day (theoretical)
- **Issue:** Getting 429/400 errors — API may be rate-limiting or unstable
- **Working models:** `llama3.1-8b`, `gpt-oss-120b`
- **Listed but unavailable:** `zai-glm-4.7`, `qwen-3-235b-a22b-instruct-2507`

### Pending (Waiting for OpenClaw Update)
| Model | Via | Notes |
|-------|-----|-------|
| GPT-5.4 | openai-codex | Released Mar 5, 2026 — combines 5.3-Codex coding + better reasoning + 1M context + native computer use |
| GPT-5.4 | github-copilot | Same model, different provider — blocked by same missing model ID |
| Gemini 3 Pro | github-copilot | Available in Copilot but not recognized by OpenClaw yet |
| Qwen 3 (Cerebras) | cerebras | Listed in API but returns 404 — may need early access or future rollout |

### Watch For
- Run `openclaw update` weekly to check for GPT-5.4 support
- **Active tracking:** https://github.com/openclaw/openclaw/issues/36817
- **PR to watch:** https://github.com/openclaw/openclaw/pull/36590
- Check Cerebras dashboard for model availability updates
- GPT-5.4 promises: 18% fewer errors, 33% fewer false claims vs 5.2, matches 5.3-Codex on SWE-Bench Pro with lower latency
- Check: https://github.com/openclaw/openclaw/releases
