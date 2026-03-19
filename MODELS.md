# Model Configuration — Final State (2026-02-25)

## ✅ Active Providers (4)

| Provider | Auth | Models | Status |
|----------|------|--------|--------|
| **kimi-coding** | API Key | k2p5 | ✅ PRIMARY |
| **nvidia-nim** | API Key | moonshotai/kimi-k2.5 | ✅ Fallback |
| **modal** | API Key | zai-org/GLM-5-FP8 | ✅ Fallback |
| **openai-codex** | OAuth | gpt-5.3-codex | ✅ Fallback |
| **openrouter** | API Key | auto | ✅ Catch-all |

## 🗑️ Removed

- ❌ **google-antigravity** (both accounts) — OAuth removed
- ❌ **google-ai-studio** — API key removed
- ❌ **google** — API key removed
- ❌ **62 redundant fallback models** → trimmed to 4

## 🎯 Fallback Chain

1. `kimi-coding/k2p5` (current)
2. `openrouter/auto` (smart routing)
3. `openai-codex/gpt-5.3-codex` (Codex backup)
4. `modal/zai-org/GLM-5-FP8` (Modal free tier)
5. `nvidia-nim/moonshotai/kimi-k2.5` (NVIDIA NIM)

## 🔧 Config Location

`~/.openclaw/openclaw.json`

Backup: `~/.openclaw/openclaw.json.bak.*`
