#!/usr/bin/env bash
# Base setup of a fresh Debian 13 server, as done on 19.11.2026. Run as root; safe to run again.
# Afterwards: server-setup.sh (folders, user deploy, .env). See docs/betrieb.md, "Server ganz neu aufsetzen".
# Before running: make sure your SSH key works (`ssh -i ~/.ssh/stuebi_netcup root@<ip>`) – step 1 turns off passwords.
set -euo pipefail
export DEBIAN_FRONTEND=noninteractive

# 1. SSH: key only
printf "PasswordAuthentication no\nKbdInteractiveAuthentication no\nPermitRootLogin prohibit-password\n" \
  > /etc/ssh/sshd_config.d/10-stuebi.conf
sshd -t && systemctl reload ssh

# 2. Updates now and every night
apt-get update -q
apt-get -y -q full-upgrade
apt-get -y -q install unattended-upgrades apt-listchanges curl ca-certificates gnupg rsync ufw
printf 'APT::Periodic::Update-Package-Lists "1";\nAPT::Periodic::Unattended-Upgrade "1";\n' \
  > /etc/apt/apt.conf.d/20auto-upgrades

# 3. Firewall: SSH, HTTP, HTTPS (also HTTP/3 over UDP)
ufw default deny incoming
ufw default allow outgoing
for rule in 22/tcp 80/tcp 443/tcp 443/udp; do ufw allow "$rule"; done
ufw --force enable

# 4. Docker from Docker's own package source, logs capped at 3 × 10 MB per container
install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/debian/gpg -o /etc/apt/keyrings/docker.asc
chmod a+r /etc/apt/keyrings/docker.asc
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/debian $(. /etc/os-release && echo "$VERSION_CODENAME") stable" \
  > /etc/apt/sources.list.d/docker.list
mkdir -p /etc/docker
printf '{\n  "log-driver": "json-file",\n  "log-opts": { "max-size": "10m", "max-file": "3" }\n}\n' > /etc/docker/daemon.json
apt-get update -q
apt-get -y -q install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
systemctl enable --now docker

# 5. 2 GB swap as a buffer, used only when memory is nearly full
if [ ! -f /swapfile ]; then
  fallocate -l 2G /swapfile && chmod 600 /swapfile && mkswap /swapfile && swapon /swapfile
  echo "/swapfile none swap sw 0 0" >> /etc/fstab
fi
echo "vm.swappiness=10" > /etc/sysctl.d/99-swappiness.conf
sysctl -q -p /etc/sysctl.d/99-swappiness.conf

echo "ok: base setup done"
