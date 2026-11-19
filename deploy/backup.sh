#!/usr/bin/env bash
# Nightly backup of the database and the uploaded photos (stuebi-backup.timer, 03:00).
# Each day gets /srv/stuebi/backups/YYYY-MM-DD/ with db.dump (pg_dump -Fc) and media/.
# Unchanged photos are hard links to the previous day, so 14 days cost little more than one.
# Restoring: docs/betrieb.md, "Backup zurückspielen".
set -euo pipefail

SRV=/srv/stuebi
KEEP_DAYS=14
TODAY=$(date +%F)
DEST="$SRV/backups/$TODAY"
PREV=$(find "$SRV/backups" -mindepth 1 -maxdepth 1 -type d -name '20*' ! -name "$TODAY" | sort | tail -n 1)

mkdir -p "$DEST"
cd "$SRV"
trap 'rm -f "$DEST/db.dump.part"' EXIT

docker compose exec -T postgres pg_dump -U stuebi -d stuebi -Fc > "$DEST/db.dump.part"
# An empty or broken dump must not replace a good one.
docker compose exec -T postgres pg_restore --list < "$DEST/db.dump.part" > /dev/null
mv "$DEST/db.dump.part" "$DEST/db.dump"

rsync -a --delete ${PREV:+--link-dest="$PREV/media/"} "$SRV/media/" "$DEST/media/"

find "$SRV/backups" -mindepth 1 -maxdepth 1 -type d -name '20*' -mtime +$((KEEP_DAYS - 1)) -exec rm -rf {} +

echo "backup ok: $DEST ($(du -sh "$DEST/db.dump" | cut -f1) database, $(find "$DEST/media" -type f | wc -l) files)"
