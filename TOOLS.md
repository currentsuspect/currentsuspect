# TOOLS.md - Environment-Specific Notes

Quick reference for infrastructure, devices, and preferences.

## SSH Access

| Host | Address | User | Key |
|------|---------|------|-----|
| VPS (Azure) | `4.161.44.125` | `currentsuspect` | `~/.openclaw/credentials/vps-4.161.44.125.pem` |
| VPS (Tailscale) | `100.115.33.63` | `currentsuspect` | Same key |
| Phone (Termux) | `100.89.84.76:8022` | `u0_a480` | Tailscale only |

## Tailscale Network

| Device | IP |
|--------|-----|
| VPS | `100.115.33.63` |
| Phone (Infinix Hot 12 Play) | `100.89.84.76` |

## VPS Services

| Service | Port | Access |
|---------|------|--------|
| Gateway | `18789` | Loopback only |
| lifeos-api | `8088` | `0.0.0.0` |
| ttyd (web terminal) | `7681` | Tailscale only |
| Cloudflare tunnel | `443` | `openclaw.currentsuspect.me`, `ssh.currentsuspect.me` |

## Cloudflare Tunnel

- Tunnel ID: `83a5ab92-dc33-4102-a585-fe4cd83d008e`
- DNS: `openclaw.currentsuspect.me`, `ssh.currentsuspect.me`
- Config: `/etc/cloudflared/config.yml`

## Azure

- Subscription: Azure for Students (`d233b1c6-f632-4408-9f6f-ad00229e930d`)
- VM: `currentsuspect` in `ZT_TGRC` RG, UAE North
- Size: `Standard_B2as_v2` (8GB RAM, 2 vCPU)
- Auto-shutdown: 22:00 UTC (01:00 EAT)

## Everything Vault

- Path: `/home/currentsuspect/Everything`
- Structure: PARA (Projects, Areas, Resources, Permanent, Fleeting, Daily)
- API: `POST http://localhost:8088/notes/capture`, `POST /notes/daily/append`

## Projects

| Project | Path | Description |
|---------|------|-------------|
| Resonance (LifeOS) | `~/workspace/resonance` | Flutter app |
| Aestra | `~/workspace/Aestra` | AI project |
| valentines-kat | `~/workspace/valentines-kat` | Valentine's site for Kat |

## Auth Providers

| Provider | Account | Status |
|----------|---------|--------|
| Google (Antigravity) | `99niccur@gmail.com` | OAuth, occasional refresh issues |
| OpenAI (Codex) | `default` | OAuth, stable (8d expiry) |

## Model Fallback Order

1. Antigravity (Google)
2. Codex (OpenAI)
3. Groq
4. Gemini API-key
5. OpenRouter free

## Dylan's Preferences

- **Timezone:** EAT (UTC+3)
- **Explanation style:** Detailed, opinionated, proactive
- **Writing style:** Em dashes, italics for thoughts, narrative flow, specific numbers

---

# 🎛️ VPS Ricing — Quick Reference

## Shell Power Tools

| Tool | Command | What it does |
|------|---------|--------------|
| **eza** | `l`, `ll`, `la`, `ltree` | Modern ls with icons, git status, tree view |
| **fd** | `f`, `fd` | Fast find with smart defaults |
| **bat** | `cat`, `bat` | Syntax-highlighted cat/less |
| **fzf** | `Ctrl+R`, `Ctrl+T` | Fuzzy search history, files, processes |
| **zoxide** | `z`, `zi`, `zq`, `zqi` | Smarter cd with learning |
| **ripgrep** | `grep`, `rg` | Fast grep with smart case |
| **delta** | `git diff` | Beautiful diff viewer |
| **starship** | prompt | Fast, informative prompt |

## Navigation Aliases

```bash
ws          # ~/.openclaw/workspace
wr          # Resonance project
wa          # Aestra project
wpd         # PlainSight Digital
.. ... .... # cd up 1/2/3 levels
```

## Git Aliases

```bash
gs          # git status -sb
ga          # git add
gaa         # git add -A
gcm "msg"   # git commit -m
glog        # Pretty git log with graph
glga        # Log all branches
gd          # git diff
gds         # git diff --staged
```

## Tmux Shortcuts

```bash
tmx main    # Main workspace session
tmx dev     # Dev session
tmx logs    # Logs session (auto-runs pm2 logs)
tmx ls      # List sessions

# Inside tmux:
Ctrl+Space c    # New window
Ctrl+Space %    # Split vertical
Ctrl+Space "    # Split horizontal
Ctrl+Space hjkl # Navigate panes
Alt+1/2/3...    # Switch windows
Alt+z           # Toggle zoom
```

## Quick Commands

```bash
status      # pm2 status
logs        # pm2 logs
ports       # Show listening ports
myip        # Public IP
ts          # Tailscale shortcut
vps-health  # Service status dashboard
goto        # Interactive project navigator
fh          # Fuzzy search history
fdcd        # Fuzzy cd to directory
fve         # Fuzzy edit file
fkill       # Fuzzy kill process
```

## SSH Shortcuts

```bash
ssh vps         # Connect to Azure VPS
ssh vps-tail    # Connect via Tailscale
ssh phone       # Connect to Termux
```

## Files

| File | Purpose |
|------|---------|
| `~/.bashrc` | Main shell config (aliases, functions, integrations) |
| `~/.config/starship.toml` | Prompt customization |
| `~/.tmux.conf` | Tmux keybindings and style |
| `~/.gitconfig` | Git aliases and delta integration |
| `~/.inputrc` | Readline (bash line editing) config |
| `~/.ssh/config` | SSH shortcuts |
| `~/.gitignore_global` | Global gitignore |

## FZF Bindings

| Key | Action |
|-----|--------|
| `Ctrl+R` | Search command history |
| `Ctrl+T` | Find files |
| `Alt+C` | Find directories |
| `Tab` / `Shift+Tab` | Cycle through matches |

## Prompt Symbols

| Symbol | Meaning |
|--------|---------|
| `❯` | Normal mode |
| `❮` | Vi command mode |
| `🌱` | Git branch |
| `⇡n` | n commits ahead |
| `⇣n` | n commits behind |
| `!n` | n modified files |
| `+n` | n staged files |
| `?n` | n untracked files |
| `✓` | Clean working tree |
| `⏱` | Command duration (if >2s) |

---

# 🤖 AI Operations Toolkit

## OpenClaw Quick Commands

```bash
oc              # openclaw
oc-s            # openclaw sessions
oc-l            # sessions list (last 20)
oc-m            # openclaw models
oc-ml           # models list
oc-d            # openclaw doctor
oc-c            # openclaw config
oc-g            # gateway status
oc-status       # quick status card
oc-model kimi   # switch to Kimi
oc-model glm    # switch to GLM
```

## Session / Subagent Management

```bash
oc-spawn "task description" [label]     # Spawn a task
oc-agent "task" [timeout]               # Spawn subagent with timeout
oc-agents                               # List active agents
oc-kill <pattern>                       # Kill matching agents
oc-history [session] [limit]            # View session history
```

## Service Management

```bash
p2              # pm2
p2s             # pm2 status
p2l             # pm2 logs
p2r <name>      # restart service
p2rs            # restart all

# Quick access
status          # pm2 status
logs            # pm2 logs (last 100)
ltail           # pm2 logs (last 20, raw)
lapi            # logs for lifeos-api
lgateway        # logs for gateway
lblueprint      # logs for blueprint
lmspy           # logs for mspy-dashboard

# Functions
restart-api             # Restart Resonance API
restart-gateway         # Restart OpenClaw Gateway
restart-all             # Restart all (with confirm)
health                  # Full health check
```

## Log Operations

```bash
lt [service] [lines]            # Tail PM2 logs
plog <pattern> [service]        # Search PM2 logs
ocl                             # OpenClaw logs
gwl                             # Gateway logs
follow <file>                   # Tail -f a file
```

## Workspace Navigation

```bash
w               # ~/.openclaw/workspace
wr              # Resonance
wa              # Aestra
wpd             # PlainSight Digital
wm              # mSpy Clone
wmd             # mSpy Dashboard
wb              # Blueprint
we              # Everything Vault

fw <pattern>    # Find file in workspace
sw <pattern>    # Search content in workspace code
```

## Memory / Notes

```bash
mem [file]              # Quick read (MEMORY, TODAY, HEARTBEAT, TOOLS, etc.)
mem-today               # Edit today's memory file
note "content" [file]   # Quick append note
smem <query>            # Search memory files
```

## Git (AI-Optimized)

```bash
gs-all                  # Status of all repos in workspace
gc-quick [msg]          # Add all, commit with message
gp-now                  # Push current branch
g-sync                  # Pull then push
g-nuke                  # Discard all changes (confirm)
ghistory                # Recent commits across all repos (7 days)
```

## Network / Infra

```bash
pingg           # Ping Google
myip            # Public IP
myip-full       # Full IP info (JSON)
ts              # Tailscale
ts-s            # Tailscale status
ports           # Listening ports
port-check 8088 # Check what's on port
```

## System

```bash
cpu             # CPU usage (htop/top)
mem-usage       # Memory usage
disk            # Disk usage
disk-big        # Biggest directories
du-sort [dir]   # Sort directories by size
ps-cpu          # Top CPU processes
ps-mem          # Top memory processes
```

## File Operations

```bash
te <file>               # Touch and edit
bak <file>              # Backup with timestamp
rm-safe                 # Trash if available, else rm -i
cpv                     # Copy with progress (rsync)
mx <file>               # Make executable
```

## Data

```bash
json <file|text>        # Pretty print JSON
json-get <file> <key>   # Extract JSON key
yaml2json               # Convert YAML to JSON
```

## Development

```bash
# Python
py              # python3
py-serve        # Python HTTP server
py-env          # Activate venv

# Node
nr              # npm run
ni              # npm install
ns              # npm start
nb              # npm run build

# Flutter
fl              # flutter
flr             # flutter run
flb             # flutter build
flc             # flutter clean
flg             # flutter pub get

# Docker
d               # docker
dc              # docker compose
dps             # Docker ps (formatted)
```

## Utilities

```bash
repeat <n> <cmd>        # Run command n times
timer <seconds>         # Countdown timer
weather [city]          # Quick weather
qr <text>               # Generate QR code
clip                    # Copy to clipboard
```

## Config Quick Edit

```bash
conf oc         # ~/.openclaw/openclaw.json
conf bash       # ~/.bashrc
conf git        # ~/.gitconfig
conf tmux       # ~/.tmux.conf
conf ssh        # ~/.ssh/config
conf starship   # ~/.config/starship.toml
```

---

# 🧹 Storage Management

## Quick Storage

```bash
storage         # Current disk usage
big             # Biggest directories here
big-files       # Files >100MB
storage-report  # Full breakdown
clean           # Quick clean (caches, logs)
clean-deep      # Interactive deep clean
disk-watch      # Watch usage in real-time
```

## Log Management

```bash
log-size                # Check log sizes
log-rotate [dir] [days] # Compress logs older than N days
log-clear [dir]         # Clear logs (with backup)
log-watch [pattern]     # Watch multiple logs
lt [service] [lines]    # Tail service / PM2 logs
plog <pattern>         # Search PM2 logs
```

## Backup & Recovery

```bash
config-backup           # Backup all configs
backups                 # List available backups
config-restore [file]   # Restore from backup
```

## Safety

```bash
safe-rm                 # Confirm before delete
rm-force                # Bypass safe-rm
check-space [needed]    # Verify space before operation
storage-alert [%]       # Alert if disk > threshold%
```

## Session Management

```bash
session-save            # Save current session state
session-restore         # Restore last session
ws-summary              # Git status across all projects
```

---

# 🤖 Smart Operations

## Dashboard

```bash
dash                    # Full system dashboard
dash-mini               # Compact version for small terminals
```

Shows: disk usage (color-coded), services status, git repo status, recent activity, quick actions.

## Workflow Shortcuts (Tmux)

```bash
dev [project]           # Dev layout: code | logs + status
                        # Default: resonance
                        # Projects: resonance, mspy-dashboard, blueprint
logs-flow [service]     # Log monitoring layout
monitor                 # htop + pm2 status
overview                # Git + storage + PM2 + mini-dash

# Manage workflows
dev-ls                  # List workflow sessions
dev-kill [session]      # Kill a workflow session
```

### Dev Layout (`dev` command)
```
┌─────────────┬─────────┐
│             │  logs   │
│   code      ├─────────┤
│   (70%)     │ status  │
│             │ (watch) │
└─────────────┴─────────┘
```

## Smart Alerts

**Auto-checks before commands:**
- `npm install` → warns if <2GB free
- `flutter build` → warns if <3GB free  
- `docker build` → warns if <5GB free
- `git clone` → warns if <1GB free

**Manual checks:**
```bash
watch-services          # Monitor and alert on service changes
autoclean-remind        # Show cleanup tip if disk >80%
storage-alert [85]      # Alert if disk exceeds threshold
```

## Error Recovery

### Kill Port
```bash
kill-port 8088          # Kill process using port 8088
port-check 8088         # See what's using the port
```

### Fix Common Issues
```bash
fix npm                 # Clean reinstall node_modules
fix git                 # Abort merge/rebase, reset hard
fix port                # Show all used ports
fix pm2                 # Restart all services
```

**Auto-suggestions on errors:**
- Port in use → suggests `kill-port` or `port-check`
- NPM fails → suggests cache clean, node_modules delete
- Git push/pull fails → suggests sync strategies
- Flutter fails → suggests `flc && flg`, doctor check

### Command Not Found
Smart handler suggests:
- Similar aliases you might have meant
- Install commands for common tools (docker, code, vim)

---

# 📊 Storage Audit Summary (2026-03-06)

**Cleaned Today:**
| Item | Before | After | Saved |
|------|--------|-------|-------|
| npm cache | 2.0GB | 229MB | **1.8GB** |
| pip cache | 198MB | 0 | **198MB** |
| duplicate kch-website | 195MB | 0 | **195MB** |
| Android NDK 26 | 2.1GB | 0 | **2.1GB** |
| PM2/old logs | ~500MB | minimal | **~500MB** |
| **TOTAL** | **~5GB** | **~230MB** | **~4.8GB** |

**Result:** 56% → **48%** disk usage

**Remaining Large Items:**
| Path | Size | Keep? |
|------|------|-------|
| ~/android-sdk/ndk/27.0.12077973 | 2.0GB | ✅ Current NDK |
| ~/.openclaw/workspace/resonance | 4.5GB | ✅ Active project |
| ~/.npm-global/lib/node_modules | 1.7GB | ✅ Global packages |
| ~/.openclaw/workspace/mspy-dashboard | 979MB | Active project - keep |

**Auto-Cleanup:**
```bash
setup-auto-cleanup      # Schedule daily cleanup at 3am (85% threshold)
auto-cleanup [%]        # Manual trigger
```

---

# 🎛️ AESTRA DAW Development

## Navigation

```bash
aestra / aea           # cd to Aestra project
ae-core                # AestraCore directory
ae-audio               # AestraAudio directory
ae-ui                  # AestraUI directory
ae-tests               # Tests directory
```

## Build

```bash
ae-config              # Configure with CMake preset
ae-build               # Build (parallel)
ae-config-debug        # Debug configuration
ae-build-release       # Release build
ae-clean               # Clean build directories
ae-rebuild             # Full clean + rebuild
```

## Test

```bash
ae-test                # Run all tests
ae-test-verbose        # Verbose test output
ae-test-run <name>    # Run specific test
```

## Development Workflow

```bash
dev-aestra             # Launch tmux layout:
                       # - editor (main)
                       # - build output (watch)
                       # - git status (watch)
                       # - build window
                       # - tests window

ae-status              # Quick project status
ae-tasks               # Show Phase 2 P0 tasks
```

### Tmux Layout (dev-aestra)
```
Window 1: editor
┌────────────────┬───────────────┐
│                │  build status │
│   code/editor  ├───────────────┤
│                │  git status   │
└────────────────┴───────────────┘

Window 2: build
Window 3: tests
```

## Code Quality

```bash
ae-format              # Format all C++ files
ae-format-check        # Check formatting (CI mode)
ae-format-diff         # Show files needing format
```

## GitHub / CI

```bash
ae-ci                  # List recent CI runs
ae-ci-watch            # Watch current CI run
ae-ci-status           # CI status for current branch
ae-pr                  # List PRs
ae-pr-create           # Create PR
```

## Search

```bash
ae-search <pattern>   # Search in C++ codebase
ae-find <pattern>     # Find files by name
```

## Quick Commands

```bash
ae-run                 # Run Aestra binary (if built)
ae-files               # List project files
ae-phase               # Show phase document
```
