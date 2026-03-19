#!/bin/bash
# Service Dashboard - Quick health overview
# Usage: ./service-status.sh

echo "╔════════════════════════════════════════════════════════╗"
echo "║           OpenClaw Services Dashboard                  ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""

# Check PM2 services
echo "📦 PM2 Managed Services"
echo "─────────────────────────────────────────────────────────"
pm2 list 2>/dev/null | grep -E "(name|online|errored)" | head -10
echo ""

# Check HTTP endpoints
echo "🌐 HTTP Health Checks"
echo "─────────────────────────────────────────────────────────"
printf "%-20s %5s %10s\n" "Service" "Port" "Status"
echo "─────────────────────────────────────────────────────────"

RES=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8088/health --connect-timeout 2 2>/dev/null)
[ "$RES" = "200" ] && STATUS="✅ UP" || STATUS="❌ DOWN"
printf "%-20s %5s %10s\n" "Resonance API" "8088" "$STATUS"

BLU=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8090 --connect-timeout 2 2>/dev/null)
[ "$BLU" = "200" ] && STATUS="✅ UP" || STATUS="❌ DOWN"
printf "%-20s %5s %10s\n" "Blueprint" "8090" "$STATUS"

MSP=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8091 --connect-timeout 2 2>/dev/null)
[ "$MSP" = "200" ] && STATUS="✅ UP" || STATUS="❌ DOWN"
printf "%-20s %5s %10s\n" "mSpy Dashboard" "8091" "$STATUS"

GW=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:18789/health --connect-timeout 1 2>/dev/null)
[ "$GW" = "200" ] && STATUS="✅ UP" || STATUS="❌ DOWN"
printf "%-20s %5s %10s\n" "Gateway" "18789" "$STATUS"

echo ""
echo "💾 System Resources"
echo "─────────────────────────────────────────────────────────"
printf "%-15s %10s\n" "Disk Usage:" "$(df -h / | tail -1 | awk '{print $5}')"
printf "%-15s %10s\n" "Memory:" "$(free -h | grep Mem | awk '{print $3"/"$2}')"
printf "%-15s %10s\n" "Load:" "$(uptime | awk -F'load average:' '{print $2}' | cut -d',' -f1)"

echo ""
echo "📝 Recent Logs"
echo "─────────────────────────────────────────────────────────"
echo "Logs: ~/.openclaw/logs/"
ls -lh ~/.openclaw/logs/*.log 2>/dev/null | tail -5 | awk '{print $9, $5}'

echo ""
echo "Quick Commands:"
echo "  pm2 status     - View all services"
echo "  pm2 logs       - Stream logs"
echo "  pm2 restart all - Restart everything"
