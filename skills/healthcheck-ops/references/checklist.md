# Healthcheck checklist (detailed)

## System
- `uname -a`, `lsb_release -a`
- `uptime`, `who`, `last -a | head`

## Updates
- `apt list --upgradable` (or `unattended-upgrades --dry-run`)

## Disk / Memory
- `df -h`, `df -i`, `free -h`
- Identify large dirs: `du -xh / | sort -h | tail -n 20`

## Users / Auth
- `/etc/passwd`, `getent group sudo`
- `sudo -l` (if needed)

## SSH
- `/etc/ssh/sshd_config` (check `PermitRootLogin`, `PasswordAuthentication`)

## Firewall / Network
- `ufw status verbose`
- `ss -tulpen` (open ports)

## Services
- `systemctl --failed`
- `journalctl -p 3 -xb` (errors)

## Backups
- Check known backup directories or tools (rclone, rsync, borg, restic)
