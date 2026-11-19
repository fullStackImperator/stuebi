# Betrieb der Website

So läuft die Website auf dem eigenen Server und so hält man sie am Laufen. Jeder Befehl hier wurde am Server
ausprobiert. Wer die Zugänge hat und wo die Passwörter liegen, steht in `docs/zugaenge.md`.

## Überblick

| | |
|---|---|
| Server | netcup VPS 1000 G12.5, Rechenzentrum Nürnberg, Debian 13 |
| Adresse | `188.68.38.203` (IPv6 `2a03:4000:13:258:78a5:80ff:fed6:c38f`) |
| Ordner | `/srv/stuebi` |
| Dienste | `caddy` (HTTPS), `app` (Website und CMS), `postgres` (Datenbank) – alle drei in Docker |
| Neue Version | automatisch bei jedem `git push` auf `main` (GitHub → Actions → Deploy) |
| Backups | jede Nacht 03:00, 14 Tage, in `/srv/stuebi/backups/` |

```
Internet ──443──▶ caddy ──▶ app ──▶ postgres
                             └── /srv/stuebi/media (hochgeladene Fotos)
```

Was wo liegt:

| Datei/Ordner | Inhalt |
|---|---|
| `/srv/stuebi/compose.yml`, `Caddyfile` | Kopien aus `deploy/` im Repo; der Deploy spielt sie bei jedem Lauf neu ein |
| `/srv/stuebi/.env` | Geheimnisse und welche Version läuft (`APP_TAG`). Nur auf dem Server |
| `/srv/stuebi/media/` | alle hochgeladenen Fotos und Dateien – **nur hier**, nicht im Image |
| `/srv/stuebi/backups/JJJJ-MM-TT/` | `db.dump` (Datenbank) und `media/` |
| `/srv/stuebi/backup.sh` | das Backup-Skript, gestartet von `stuebi-backup.timer` |

## Anmelden

```
ssh -i ~/.ssh/stuebi_netcup root@188.68.38.203
cd /srv/stuebi
```

- Manche Netze (Schule, Firmen, Gäste-WLAN) sperren SSH (Port 22): Dann kommt `Operation timed out`. Über den
  Hotspot des Handys geht es.
- Kein Schlüssel mehr da? → `docs/zugaenge.md`, Abschnitt „Notfall“.

Alle folgenden Befehle laufen in `/srv/stuebi`.

## Nachsehen, ob alles läuft

```
docker compose ps                         # alle drei „Up“, postgres „(healthy)“
docker compose logs --tail 50 app         # letzte Meldungen der Website
docker compose logs --tail 50 caddy       # HTTPS und Zertifikat
df -h /                                   # Platz auf der Festplatte
systemctl status stuebi-backup.service    # letztes Backup: „Deactivated successfully“ = gut, „failed“ = schlecht
```

**Einmal pro Woche** den Backup-Status prüfen. Ein fehlgeschlagenes Backup meldet sich sonst nirgends.

## Neu starten

```
docker compose restart app       # nur die Website (ca. 10 Sekunden weg)
docker compose up -d             # alles starten, was nicht läuft
reboot                           # ganzer Server; alles startet von selbst wieder (ca. 1 Minute)
```

## Neue Version und zurückrollen

Jeder Push auf `main` baut die Seite auf GitHub und spielt sie ein (GitHub → **Actions** → **Deploy**). Antwortet die
Seite danach nicht, setzt der Lauf die vorige Version zurück und wird rot. Von Hand neu starten:
GitHub → Actions → Deploy → **Run workflow**.

Von Hand auf eine ältere Version zurück:

```
grep APP_TAG .env                 # läuft gerade
cat .previous_tag                 # lief davor
docker image ls ghcr.io/fullstackimperator/stuebi   # alle Versionen auf dem Server
sed -i "s/^APP_TAG=.*/APP_TAG=$(cat .previous_tag)/" .env
docker compose up -d app
```

Jede Version heißt wie ihr Commit auf GitHub (z. B. `1bd6bd7753e5…`). Eine andere als die vorige: den Hash statt
`$(cat .previous_tag)` eintragen.

## Backup zurückspielen

Erst prüfen, welche Backups es gibt:

```
ls backups/
```

**Nur die Datenbank** (z. B. nach einem versehentlichen Löschen im CMS). Alles nach dem Backup-Zeitpunkt geht dabei
verloren.

```
TAG=2026-11-19                                     # gewünschtes Backup
docker compose stop app
docker compose exec -T postgres dropdb -U stuebi stuebi
docker compose exec -T postgres createdb -U stuebi stuebi
docker compose exec -T postgres pg_restore -U stuebi -d stuebi --no-owner < backups/$TAG/db.dump
docker compose start app
```

**Nur die Fotos:**

```
TAG=2026-11-19
rsync -a --delete backups/$TAG/media/ media/
chown -R 1000:1000 media
```

Ein Backup gefahrlos ausprobieren (die laufende Seite bleibt unberührt):

```
docker compose exec -T postgres createdb -U stuebi probe
docker compose exec -T postgres pg_restore -U stuebi -d probe --no-owner < backups/$TAG/db.dump
docker compose exec -T postgres psql -U stuebi -d probe -c "select count(*) from news"
docker compose exec -T postgres dropdb -U stuebi probe
```

Backup sofort machen (z. B. vor einer großen Änderung): `systemctl start stuebi-backup.service`

**Bekannte Lücke:** Die Backups liegen auf demselben Server. Fällt er ganz aus, sind sie mit weg
(`docs/offene-fragen.md`). Bis das gelöst ist, ab und zu ein Backup herunterladen:

```
scp -r -i ~/.ssh/stuebi_netcup root@188.68.38.203:/srv/stuebi/backups/2026-11-19 ./stuebi-backup-2026-11-19
```

## Updates

- **System:** Sicherheitsupdates spielt Debian jede Nacht selbst ein (`unattended-upgrades`). Steht nach einem Kernel-
  Update `cat /var/run/reboot-required` da, irgendwann `reboot`.
- **Caddy und Postgres:** `docker compose pull caddy postgres && docker compose up -d`. Postgres nur innerhalb von
  Version 17 – eine neue Hauptversion braucht Export und Import.
- **Die Website:** kommt über GitHub, siehe oben.

## HTTPS-Zertifikat

Caddy holt und erneuert es selbst. Prüfen: `docker compose logs caddy | grep -i certificate`.
Voraussetzung: Die Domain zeigt auf diesen Server und Port 80 und 443 sind offen (`ufw status`).

## Firewall und SSH

```
ufw status                                  # offen: 22, 80, 443
cat /etc/ssh/sshd_config.d/10-stuebi.conf   # nur Schlüssel, kein Passwort
```

## Server ganz neu aufsetzen

Falls der Server neu installiert werden muss (Debian 13 im netcup-Server-Panel):

1. Den eigenen öffentlichen SSH-Schlüssel bei der Installation angeben und die Anmeldung testen.
2. `deploy/` aus dem Repo auf den Server kopieren (`scp -r deploy root@<ip>:/root/stuebi-deploy-files`), dann dort:
   `bash server-base.sh` (SSH nur mit Schlüssel, Updates, Firewall, Docker, Swap) und
   `bash server-setup.sh deploy_key.pub` (Ordner, Nutzer `deploy`, `.env`, Backup-Timer).
3. Neue Werte aus `/srv/stuebi/.env` in die GitHub-Secrets `BUILD_DATABASE_URL` und `PAYLOAD_SECRET` eintragen.
4. Backup zurückspielen (Datenbank und Fotos, siehe oben).
5. GitHub → Actions → Deploy → Run workflow.

Hinweis für Macs: Beim Kopieren einzelner Dateien `scp` nehmen. Das `rsync` von macOS hat beim Kopieren mehrerer
Quellen auf einmal Dateien vertauscht.
