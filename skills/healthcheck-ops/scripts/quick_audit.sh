#!/usr/bin/env bash
set -euo pipefail

printf "== System ==\n"
uname -a
lsb_release -a 2>/dev/null || cat /etc/os-release
uptime

printf "\n== Users (counts) ==\n"
getent passwd | wc -l
getent group sudo || true

printf "\n== Disk ==\n"
df -h
printf "\n== Inodes ==\n"
df -i

printf "\n== Memory ==\n"
free -h

printf "\n== Updates (top 50) ==\n"
apt list --upgradable 2>/dev/null | head -n 50 || true

printf "\n== Firewall ==\n"
ufw status verbose || true

printf "\n== Open Ports (top 50) ==\n"
ss -tulpen | head -n 50 || true

printf "\n== Failed Services ==\n"
systemctl --failed || true

printf "\n== Recent Errors (top 200) ==\n"
journalctl -p 3 -xb | head -n 200 || true
