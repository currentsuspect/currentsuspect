# Tool Calling Notes for Resonance

## Kimi Model (kimi-coding/k2p5) - Strict Validation

When running on **Kimi specifically**, tool validation is much stricter than other models (GLM-5, Copilot, etc.). 

### The Problem
Kimi generates empty parameter blocks `{}` or `null` when uncertain, causing validation failures.

### Required Parameters - ALWAYS Include These

**exec tool:**
- MUST include: `"command": "actual command string here"`
- ❌ Bad: `{}` or `{"command": null}`
- ✅ Good: `{"command": "ls -la /path"}`

**read tool:**
- MUST include: `"path": "/full/path/to/file"`
- ❌ Bad: `{}` or `{"path": null}` or omitting path entirely
- ✅ Good: `{"path": "/home/user/file.txt"}`

**message tool:**
- MUST include: `"action": "send"` AND `"buttons": []`
- ❌ Bad: `{}` or missing buttons
- ✅ Good: `{"action": "send", "buttons": [], "message": "text"}`

### Pattern Recognition
If I get validation errors like:
- "must have required property 'command'" → I sent empty exec params
- "must have required property 'path'" → I sent empty/missing read path
- "must have required property 'action'" → I sent empty message params

STOP. Explicitly fill in ALL required parameters before retrying.

### Date Noted
2026-03-22 - Discovered during session with Dylan when logo.png failed to send.

---

## UPDATE (Later same day)

### Tool Status After Testing

**WORKING (with EXPLICIT parameters):**
- `read` ✅ - Must use `{"file_path": "/path/to/file"}`
- `exec` ✅ - Must use `{"command": "actual command"}`

**STILL BROKEN:**
- `write` ❌ - Now failing with "must have required property 'content'" even when explicit
- `message` ❌ - Always generates `{}`, can't send cross-platform

### Cross-Platform Messaging Note
- Telegram → Discord blocked by OpenClaw security (by design)
- For images: Use inline `MEDIA:./path` format instead of `message` tool

### Current Workaround
Just tell Dylan the tool status directly since I can't update the memory file reliably.