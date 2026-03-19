---
name: tmux-ops
description: Control tmux sessions for interactive or long‑running CLI workflows (start/attach, send keys, capture output, manage panes). Use when you need persistent terminal sessions, interactive CLIs, or to recover/inspect background tasks.
---

# Tmux Ops

## Overview
Use tmux to run or control interactive commands that need a persistent terminal. Prefer tmux when a process must survive disconnects or requires keystrokes and screen scraping.

## Decision Guide
- **Need interactive CLI / long‑running process?** → Use tmux.
- **One‑shot command or quick output?** → Use exec without tmux.

## Core Workflow

### 1) Discover sessions
```bash
tmux ls
```
If none exist, create one.

### 2) Create session
```bash
tmux new -s <name>
```
If you need a default layout:
```bash
tmux new -s <name> -n main
```

### 3) Send commands (non‑interactive)
```bash
tmux send-keys -t <name> "<command>" C-m
```

### 4) Capture output
```bash
tmux capture-pane -t <name> -pS -200
```
Adjust scrollback (`-pS`) as needed.

### 5) Attach (when manual control is required)
```bash
tmux attach -t <name>
```
Detach with `Ctrl-b d`.

### 6) Manage windows/panes
```bash
tmux new-window -t <name> -n <win>
tmux split-window -t <name>:<win> -h
```

### 7) Cleanup
```bash
tmux kill-session -t <name>
```
Confirm before killing sessions that may hold important state.

## Safety Rules
- Confirm before killing sessions or closing panes with active work.
- Prefer session names tied to task (e.g., `aestra-build`, `deploy`, `logs`).
- Capture pane output before destructive actions.

## Example Patterns
- **Build in background**:
  ```bash
  tmux new -s aestrabuild
  # run build
  tmux send-keys -t aestrabuild "npm run build" C-m
  ```
- **Tail logs persistently**:
  ```bash
  tmux new -s logs
  tmux send-keys -t logs "tail -f /var/log/syslog" C-m
  ```
- **Recover output**:
  ```bash
  tmux capture-pane -t logs -pS -200
  ```

## References
- See `references/commands.md` for a compact command cheat sheet.
