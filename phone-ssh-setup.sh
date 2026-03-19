#!/bin/bash
# Phone SSH Setup Script
# Run this to add the phone key

PHONE_IP="100.89.84.76"
PHONE_PORT="8022"
PHONE_USER="u0_a480"
PHONE_PASS="Dylan@16678"
PUB_KEY="ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIH3xkN6T1GLBkpsgnCjcuZN6mKf7DwiFQo6jUMjfvPBk phone-ssh"

# Add to SSH config
cat >> ~/.ssh/config << EOF

# Phone via Tailscale
Host phone
    HostName 100.89.84.76
    Port 8022
    User u0_a480
    IdentityFile ~/.ssh/phone_key
    ServerAliveInterval 10
    ServerAliveCountMax 3
    ConnectTimeout 30
EOF

echo "SSH config added. Use: ssh phone"
