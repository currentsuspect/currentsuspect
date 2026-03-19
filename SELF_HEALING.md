# Self-Healing System — Optimal Configuration

## Architecture

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│  Service Check  │────▶│ Circuit Breaker  │────▶│  Heal / Alert   │
│   (every 2min)  │     │  (3 failures)    │     │  (with backoff) │
└─────────────────┘     └──────────────────┘     └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
   Retry 3x with          5min cooldown           Telegram/Log
   exponential                                    notification
   backoff (5-60s)
```

## Features

| Feature | Before | After (Optimal) |
|---------|--------|-----------------|
| Check interval | 5 min | **2 min** |
| Retry logic | None | **3x with backoff** |
| Circuit breaker | None | **3 failures = 5min cooldown** |
| Notifications | Log only | **Log + Telegram ready** |
| Blueprint handling | Manual | **Auto-kill + restart** |
| Cascade protection | None | **Circuit breaker per service** |

## Scripts

| Script | Location | Purpose |
|--------|----------|---------|
| Self-healing | `/opt/scripts/self-healing.sh` | Main monitor |
| Health check (legacy) | `/opt/scripts/health-check.sh` | Basic check (deprecated) |
| Workspace cleanup | `/opt/scripts/workspace-cleanup.sh` | Weekly maintenance |

## State Files

Circuit breaker state stored in:
- `~/.openclaw/state/{service}.cb`

Format: `failures,timestamp`

## Notifications

To enable Telegram alerts, create:
```bash
# ~/.openclaw/config/telegram-bot.conf
BOT_TOKEN="your_bot_token"
CHAT_ID="your_chat_id"
```

## Cron Schedule

```
*/2 * * * *  self-healing.sh      # Service monitoring (every 2 min)
0 3 * * 0    workspace-cleanup.sh # Weekly maintenance
```

## Recovery Flow

1. Service fails health check
2. Retry 3x with exponential backoff (5s, 10s, 20s)
3. If still failing → Trigger healing
4. Healing:
   - PM2 services: `pm2 restart {service}`
   - Blueprint: Kill port 8090, restart uvicorn
   - Gateway: Alert only (critical)
5. If healing succeeds → Clear circuit breaker
6. If healing fails → Record failure, trigger circuit breaker after 3rd failure
7. Circuit breaker: 5min cooldown before next healing attempt

## Manual Override

Force heal a service:
```bash
pm2 restart {service}          # For PM2 services
/opt/scripts/self-healing.sh  # Run full check now
```

Check circuit breaker state:
```bash
cat ~/.openclaw/state/*.cb
```

View healing logs:
```bash
tail -f ~/.openclaw/logs/self-healing.log
tail -f ~/.openclaw/logs/healing-alerts.log
```
