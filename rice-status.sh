#!/bin/bash
# Quick system dashboard — run with: status
echo "╔══════════════════════════════════════╗"
echo "║        🎛️  RESONANCE VPS             ║"
echo "╚══════════════════════════════════════╝"
echo ""

# System
echo "⚡ SYSTEM"
echo "  CPU:  $(uptime | awk -F'load average: ' '{print $2}')"
echo "  RAM:  $(free -m | awk '/Mem:/{printf "%dMB / %dMB (%.0f%%)", $3, $2, $3/$2*100}')"
echo "  Disk: $(df -h / | awk 'NR==2{printf "%s / %s (%s)", $3, $2, $5}')"
echo "  Swap: $(free -m | awk '/Swap:/{printf "%dMB / %dMB", $3, $2}')"
echo ""

# Services
echo "🔧 SERVICES"
pm2 status --no-color 2>/dev/null | grep -E "│|─" | head -15
echo ""

# Network
echo "🌐 NETWORK"
echo "  Tailscale: $(tailscale status --self 2>/dev/null | awk '{print $1, $2}' | head -1)"
echo "  Gateway:   $(curl -s -o /dev/null -w '%{http_code}' http://localhost:18789/health 2>/dev/null || echo 'DOWN')"
echo "  API:       $(curl -s -o /dev/null -w '%{http_code}' http://localhost:8088/health 2>/dev/null || echo 'DOWN')"
echo ""

# Uptime
echo "⏱️  $(uptime -p)"
