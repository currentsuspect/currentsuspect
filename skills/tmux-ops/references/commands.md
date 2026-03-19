# tmux command cheat‑sheet

## Sessions
- List: `tmux ls`
- New: `tmux new -s <name>`
- Attach: `tmux attach -t <name>`
- Kill: `tmux kill-session -t <name>`

## Windows / panes
- New window: `tmux new-window -t <name> -n <win>`
- Split h: `tmux split-window -t <name>:<win> -h`
- Split v: `tmux split-window -t <name>:<win> -v`

## Send / capture
- Send: `tmux send-keys -t <name> "<cmd>" C-m`
- Capture: `tmux capture-pane -t <name> -pS -200`
