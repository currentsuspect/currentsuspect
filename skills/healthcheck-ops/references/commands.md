# Safe command set

```bash
# Basics
uname -a
lsb_release -a || cat /etc/os-release
uptime
who
last -a | head

# Disk & memory
df -h
df -i
free -h

# Updates
apt list --upgradable | head -n 50

# Users
getent passwd | wc -l
getent group sudo

# SSH config (read only)
sshd -T | egrep 'permitrootlogin|passwordauthentication|pubkeyauthentication'

# Firewall / network
ufw status verbose
ss -tulpen | head -n 50

# Services / logs
systemctl --failed
journalctl -p 3 -xb | head -n 200
```
