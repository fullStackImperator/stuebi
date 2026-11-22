# Checkliste: Umzug auf den netcup-Server

Die alte WordPress-Seite bei Bytecamp wird durch die neue Seite auf dem netcup-Server ersetzt, unter derselben
Adresse `stuebi-hamburg.de`. Die E-Mail bleibt bei Bytecamp. Hintergrund: `docs/superpowers/specs/2026-11-19-go-live-netcup-design.md`.
Danach geht es mit `docs/seo-go-live.md` weiter (Google).

## A. Vorbereitung

- [x] Server eingerichtet, Seite läuft unter <https://v2202611456465561877.ultrasrv.de> (19.11.2026)
- [x] Automatischer Deploy, nächtliches Backup (19.11.2026)
- [x] Zugang zum Bytecamp-Kundenkonto (19.11.2026)
- [x] TTL der `A`-Einträge `stuebi-hamburg.de.` und `www` von 12H auf **5M** gesenkt (19.11.2026, 18:05) –
      umziehen frühestens 12 Stunden später
- [ ] Alte Seite archiviert: Dateien per FTPS, beide MySQL-Datenbanken → als ZIP in den Admin-Ordner auf IServ, vom Mac löschen
- [ ] Im Bytecamp-Kundenkonto eine zweite Kontakt-Mail eintragen (damit Login-Codes nicht nur bei Herrn Herpe landen)
- [x] AV-Vertrag im netcup-Kundenpanel abgeschlossen (19.11.2026); PDF noch auf IServ ablegen
- [x] Redaktion: Umzug am 19.11.2026 abends, niemand im CMS

## B. Umzugstag (ca. eine Stunde) – erledigt am 19.11.2026, 22:15–23:00

Ergebnis: Zahlen gleich (21 Beiträge, 320 Medien, 1 Nutzer, 6 Migrationen), Zertifikate für `stuebi-hamburg.de`
und `www`, Smoke-Test 10/10, Vercel pausiert. Die E-Mail-Prüfung entfiel: Auf `@stuebi-hamburg.de` gibt es nur
`postmaster@` (leer) und `webmaster@` (2 KB), keine Weiterleitungen; `MX` und SPF sind unverändert.

1. [x] **Redaktion eingefroren** (Uhrzeit notieren).
2. [x] **Frische Daten aus Neon** auf den Server (nur lesend auf Neon):
   ```
   # auf dem Mac, im Repo-Ordner
   U=$(grep ^DATABASE_URL= .env | cut -d= -f2- | tr -d '"' | sed 's/-pooler\././')
   docker run --rm postgres:17 pg_dump -Fc --no-owner --no-acl "$U" > neon-umzug.dump
   scp -i ~/.ssh/stuebi_netcup neon-umzug.dump root@188.68.38.203:/root/
   ```
   ```
   # auf dem Server, in /srv/stuebi
   systemctl start stuebi-backup.service      # Sicherung des Teststands
   docker compose stop app
   docker compose exec -T postgres dropdb -U stuebi stuebi
   docker compose exec -T postgres createdb -U stuebi stuebi
   docker compose exec -T postgres pg_restore -U stuebi -d stuebi --no-owner < /root/neon-umzug.dump
   docker compose start app
   ```
   **Fotos:** Neue Fotos gibt es nur im Ordner `media/` des Repos (auf Vercel bleiben Uploads nicht erhalten).
   Also vorher `git pull`, dann:
   ```
   rsync -a media/ root@188.68.38.203:/srv/stuebi/media/      # auf dem Mac
   chown -R 1000:1000 /srv/stuebi/media                       # auf dem Server
   ```
3. [x] **Zahlen vergleichen** (Neon und Server müssen gleich sein):
   `select (select count(*) from news),(select count(*) from media),(select count(*) from users)` –
   und `ls /srv/stuebi/media | wc -l` gegen `ls media | wc -l`.
4. [x] **DNS bei Bytecamp** (Domain → DNS-Konfiguration). Nur diese Zeilen ändern, alles andere bleibt:

   | Typ | Name | Ziel | TTL |
   |---|---|---|---|
   | A | `stuebi-hamburg.de.` | `188.68.38.203` | 5M |
   | A | `www` | `188.68.38.203` | 5M |
   | AAAA | `stuebi-hamburg.de.` | `2a03:4000:13:258:78a5:80ff:fed6:c38f` | 5M |
   | AAAA | `www` | `2a03:4000:13:258:78a5:80ff:fed6:c38f` | 5M |

   **Nicht anfassen:** `MX`, `TXT` (SPF), `autoconfig`, `autodiscover`, `20140709._domainkey`, `*`.
   Bis Schritt 7 durch ist, zeigt der Browser unter `stuebi-hamburg.de` eine Zertifikatswarnung – deshalb die
   Schritte 4–7 zügig hintereinander.
5. [x] Prüfen, dass der DNS stimmt: `dig +short stuebi-hamburg.de @ns1.bytecamp.net` → `188.68.38.203`.
6. [x] **Erst jetzt den Server auf die echte Adresse umstellen** (vorher würde Caddy kein Zertifikat bekommen
       und Let's Encrypt nach mehreren Fehlversuchen eine Stunde sperren):
   - in `/srv/stuebi/.env`: `SITE_ADDRESS=stuebi-hamburg.de`
   - in `deploy/Caddyfile` im Repo die drei Zeilen für `www.stuebi-hamburg.de` einkommentieren
   - GitHub → Settings → Secrets and variables → Actions → **Variables**: `SITE_URL` = `https://stuebi-hamburg.de`
7. [x] **Neu deployen** (Push mit dem Caddyfile oder GitHub → Actions → Deploy → Run workflow). Caddy holt das
       Zertifikat für `stuebi-hamburg.de` und `www`. Der Lauf muss grün sein.
8. [x] **Testen:**
   - `BASE_URL=https://stuebi-hamburg.de npx playwright test e2e/deploy-smoke.spec.ts` → 5 passed
   - `curl https://stuebi-hamburg.de/robots.txt` enthält `Allow: /`
   - `https://www.stuebi-hamburg.de` leitet auf `https://stuebi-hamburg.de` um
   - im CMS anmelden (`/admin`)
   - eine Test-Mail an eine `@stuebi-hamburg.de`-Adresse schicken und den Empfang prüfen
9. [x] **Vercel-Vorschau stilllegen:** Ihr CMS schreibt weiter in Neon, nicht auf den Server – Änderungen dort gingen
       verloren. Vercel → Projekt → Settings → **Pause Project** (oder das Projekt löschen).
10. [x] Redaktion wieder freigeben: ab jetzt nur noch <https://stuebi-hamburg.de/admin>.
11. [x] `docs/seo-go-live.md`, Schritte 2–4 (Search Console bestätigt und Sitemap eingereicht am 22.11.2026) (Search Console, Sitemap, Weiterleitungen).

**Notfall:** Läuft etwas schief, bei Bytecamp die beiden `A`-Ziele zurück auf `212.204.60.2` und die `AAAA`-Zeilen
leeren. Nach höchstens 5 Minuten ist wieder die alte Seite da. Die alte Seite läuft weiter, bis das Bytecamp-Paket
verkleinert ist.

## C. Danach

- [ ] Ab 26.11.2026: TTL der `A`/`AAAA`-Einträge wieder auf `12H`
- [ ] CMS-Konten anlegen: zwei Admins (Stevan Veljovic, Schulleitung), Bearbeiterin (Rolle `teacher`).
      Zugangsdaten in die KeePassXC-Datei (`docs/zugaenge.md`)
- [ ] Werte aus `/srv/stuebi/.env`, den Deploy-Schlüssel und den Notfall-Schlüssel in die KeePassXC-Datei
- [ ] Uptime-Check (UptimeRobot) auf `https://stuebi-hamburg.de`, Mail an eine Adresse der Schule
- [ ] Ab 3.12.2026: Neon löschen. Lokale Entwicklung auf das lokale Docker-Postgres umstellen
      (`.env` → `DATABASE_URL` auf die lokale Kopie)
- [ ] **Entscheiden: Bytecamp verkleinern oder ganz kündigen?** Die alte Webseite, FTP und MySQL entfallen in jedem Fall.
  - **Verkleinern:** Domain, DNS und E-Mail bleiben bei Bytecamp. Wenig Aufwand, aber zwei Anbieter und zwei Rechnungen.
  - **Domain zu netcup umziehen, Bytecamp kündigen:** ein Anbieter, ein Zugang. Dafür den Auth-Code bei Bytecamp anfordern,
    den Transfer bei netcup beauftragen und die DNS-Einträge dort neu anlegen (`A`/`AAAA` für `@` und `www`). E-Mail auf
    `@stuebi-hamburg.de` wird kaum genutzt (nur `postmaster@`, `webmaster@`). Soll `webmaster@` Absender für CMS-Mails
    werden, braucht es dann ein Postfach bei netcup. Vorher Preis und Ablauf bei netcup prüfen.
- [ ] Vercel-Projekt löschen, wenn es nicht mehr gebraucht wird
- [ ] E-Mail-Versand fürs CMS („Passwort vergessen“) über `webmaster@stuebi-hamburg.de` bei Bytecamp – bis dahin setzt ein
      Admin Passwörter unter `/admin` → Users von Hand neu
- [ ] `docs/offene-fragen.md`: erledigte Punkte löschen
