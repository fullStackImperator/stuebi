#!/usr/bin/env bash
# Sets up /srv/stuebi on the server. Run as root from a copy of deploy/ on the server; safe to run again.
#   bash server-setup.sh [path/to/deploy_key.pub]
# Creates the user `deploy` (GitHub's login for the deploy workflow), the folders and, if missing, .env with
# random secrets. Existing values in .env are never overwritten.
set -euo pipefail

SRV=/srv/stuebi
HERE="$(cd "$(dirname "$0")" && pwd)"
DEPLOY_KEY="${1:-}"

id deploy >/dev/null 2>&1 || useradd --create-home --shell /bin/bash deploy
usermod -aG docker deploy
passwd -l deploy >/dev/null # no password login, key only

install -d -m 700 -o deploy -g deploy /home/deploy/.ssh
touch /home/deploy/.ssh/authorized_keys
if [ -n "$DEPLOY_KEY" ] && ! grep -qxF "$(cat "$DEPLOY_KEY")" /home/deploy/.ssh/authorized_keys; then
  cat "$DEPLOY_KEY" >> /home/deploy/.ssh/authorized_keys
fi
chown deploy:deploy /home/deploy/.ssh/authorized_keys
chmod 600 /home/deploy/.ssh/authorized_keys

install -d -m 755 -o deploy -g deploy "$SRV"
install -d -m 755 -o 1000 -g 1000 "$SRV/media" # uid 1000 = user `node` in the app image
install -d -m 700 -o root -g root "$SRV/backups"

if [ "$HERE" != "$SRV" ]; then
  install -m 644 -o deploy -g deploy "$HERE/compose.yml" "$HERE/Caddyfile" "$SRV/"
  install -m 700 -o root -g root "$HERE/backup.sh" "$SRV/backup.sh"
  install -m 644 "$HERE/stuebi-backup.service" "$HERE/stuebi-backup.timer" /etc/systemd/system/
  systemctl daemon-reload
  systemctl enable --now stuebi-backup.timer >/dev/null
fi

if [ ! -f "$SRV/.env" ]; then
  umask 077
  cat > "$SRV/.env" <<EOF
SITE_ADDRESS=v2202611456465561877.ultrasrv.de
APP_TAG=initial
POSTGRES_PASSWORD=$(openssl rand -hex 24)
PAYLOAD_SECRET=$(openssl rand -hex 32)
EOF
  echo "created $SRV/.env – copy its values into the password manager"
fi
chown deploy:deploy "$SRV/.env"
chmod 600 "$SRV/.env"

echo "ok: $SRV ready"
