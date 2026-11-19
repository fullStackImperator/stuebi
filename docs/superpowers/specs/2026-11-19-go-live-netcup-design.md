# Go-live auf netcup – Design

Stand: 19.11.2026 · Status: Entwurf, wartet auf Freigabe

## Ziel

Die neue Website läuft unter `https://stuebi-hamburg.de` auf dem eigenen netcup-Server in Nürnberg. Datenbank und
Fotos liegen auf demselben Server, so wie es die Datenschutzerklärung beschreibt. Die 287 alten Adressen leiten
weiter, die Redaktion kann sich anmelden, die E-Mail unter `@stuebi-hamburg.de` läuft unverändert weiter, und
jedes `git push` auf `main` bringt die neue Version ohne Handarbeit auf den Server.

Nicht Teil dieses Designs (eigene Specs später): Rechte für Bearbeiter nur für einzelne Bereiche, E-Mail-Versand
für „Passwort vergessen“, Backup-Kopie außerhalb des Servers.

## Ausgangslage

| | |
|---|---|
| Server | netcup VPS 1000 G12.5, Nürnberg, 4 vCPU, 8 GB RAM, 128 GB, Debian 13, IPv4 `188.68.38.203`, IPv6 `2a03:4000:13:258:78a5:80ff:fed6:c38f` |
| Schon eingerichtet (19.11.) | SSH nur mit Schlüssel, automatische Sicherheitsupdates, Firewall (ufw: 22, 80, 443/tcp+udp), Docker 29 + Compose, 2 GB Swap |
| Domain | `stuebi-hamburg.de` bei Bytecamp, DNS bei Bytecamp (`ns1/ns2.bytecamp.net`), heute `A → 212.204.60.2` (WordPress) |
| E-Mail | `MX → mail2.bytecamp.net`, SPF `v=spf1 ip4:212.204.60.0/24 -all` – bleibt bei Bytecamp |
| Daten heute | Inhalte und Konten in Neon (AWS Frankfurt), Fotos in `media/` (1.054 Dateien, 387 MB, im Git) |
| Seiten | ISR mit `revalidate = 60` – `next build` liest aus der Datenbank |

## Entscheidungen

1. **Domain und E-Mail bleiben bei Bytecamp.** Es ändern sich nur die `A`/`AAAA`-Einträge für `@` und `www`.
   `MX` und SPF bleiben unangetastet. Bytecamp-Paket nach dem Umzug auf Domain + E-Mail verkleinern.
2. **Docker Compose auf dem Server**, gebaut wird auf GitHub (nicht auf dem Server).
3. **Der Build liest die Live-Datenbank über einen SSH-Tunnel**, damit die vorgerenderten Seiten echten Inhalt
   haben. Postgres ist nie aus dem Internet erreichbar.
4. **Backups vorerst nur auf dem Server** (nächtlich, 14 Tage). Eine Kopie außerhalb kommt später.

## 1. Server und Container

```
Internet ──443──▶ caddy ──▶ app :3000 ──▶ postgres :5432
                  (HTTPS)    │             (nur internes Docker-Netz)
                             └── /srv/stuebi/media → /app/media
```

Alles liegt in `/srv/stuebi/` auf dem Server:

| Datei/Ordner | Inhalt | Im Repo? |
|---|---|---|
| `compose.yml` | die drei Dienste | ja, `deploy/compose.yml` |
| `Caddyfile` | HTTPS, `www` → ohne `www`, Sicherheits-Header | ja, `deploy/Caddyfile` |
| `.env` | `DATABASE_URL`, `POSTGRES_PASSWORD`, `PAYLOAD_SECRET`, `APP_TAG` | **nein**, nur auf dem Server, `chmod 600` |
| `media/` | hochgeladene Fotos | Erstbefüllung aus dem Repo, danach nur Server |
| `backups/` | nächtliche Sicherungen | nein |

- **caddy** (`caddy:2`): einzige Ports nach außen, 80 und 443 (tcp + udp). Holt Let's-Encrypt-Zertifikate selbst.
  Leitet `www.stuebi-hamburg.de` dauerhaft auf `stuebi-hamburg.de` um. Setzt `X-Forwarded-For` richtig; die App
  liest die Client-IP daraus (`docs/security.md`). Drosselt `/api/users/login` und Verwandte zusätzlich.
- **app** (`ghcr.io/fullstackimperator/stuebi:${APP_TAG}`): Next.js `output: "standalone"`, läuft als Nicht-Root.
  Kein veröffentlichter Port, nur im Docker-Netz. Startet erst, wenn Postgres gesund ist.
- **postgres** (`postgres:16`, gleiche Hauptversion wie Neon): Daten im Volume `pgdata`. Port nur an
  `127.0.0.1:5432` des Servers gebunden – für den Build-Tunnel; aus dem Internet nicht erreichbar.

## 2. Deploy

GitHub Action `.github/workflows/deploy.yml`, bei jedem Push auf `main` (und von Hand startbar):

1. Checkout, Node 24 LTS, `npm ci`.
2. SSH-Tunnel zum Server: `ssh -N -L 5432:127.0.0.1:5432 deploy@188.68.38.203`.
3. `npx payload migrate` gegen die Live-Datenbank (nur hinzufügende Migrationen – die alte Version läuft weiter).
4. `docker build` mit `NEXT_PUBLIC_SERVER_URL=https://stuebi-hamburg.de` als Build-Argument und `DATABASE_URL` über
   den Tunnel. Tags: Commit-Hash und `latest`. Push nach `ghcr.io`.
5. Per SSH: `APP_TAG=<hash>` in `/srv/stuebi/.env` setzen, `docker compose pull app && docker compose up -d app`.
6. Prüfung: `https://stuebi-hamburg.de/` muss binnen 60 s `200` liefern, sonst setzt der Workflow `APP_TAG` auf den
   vorigen Wert zurück, startet neu und schlägt fehl.

Benutzer `deploy` auf dem Server: eigener SSH-Schlüssel (nur in GitHub-Secrets), Mitglied der Gruppe `docker`,
kein Passwort, kein `sudo`. Ehrlich gesagt: Wer in der Gruppe `docker` ist, kann den Server faktisch wie root
bedienen – der Schlüssel ist also so wertvoll wie der Root-Zugang und liegt nur in den GitHub-Secrets. GitHub-Secrets: `DEPLOY_SSH_KEY`, `DEPLOY_KNOWN_HOSTS`, `BUILD_DATABASE_URL`,
`PAYLOAD_SECRET`. Das Image ist öffentlich (das Repo ist es auch); es enthält keine Geheimnisse – `PAYLOAD_SECRET`
und `DATABASE_URL` kommen erst zur Laufzeit aus `.env`.

**Vor dem Umzug** (solange die Domain noch auf WordPress zeigt) prüft Schritt 6 `https://neu.stuebi-hamburg.de/`.

**Zurückrollen von Hand:** in `/srv/stuebi/.env` den vorigen `APP_TAG` eintragen, `docker compose up -d app`.

Vercel bleibt bis nach dem Umzug als Vorschau; `scripts/vercel-media.mjs` und die Rewrites greifen nur, wenn
`VERCEL` gesetzt ist, auf dem Server also nicht.

## 3. Umzug

### A. Vorbereitung

1. Bytecamp-Zugang: Herr Herpe setzt das Passwort zurück; prüfen, ob DNS-Einträge änderbar sind; eigene
   E-Mail-Adresse als zweiten Kontakt eintragen, damit Login-Codes nicht nur bei ihm landen.
2. Alte Seite archivieren: WordPress-Dateien per (S)FTP und beide MySQL-Datenbanken exportieren. Ablage auf dem
   Schul-Laufwerk, **nie im Repo** (personenbezogene Daten, Passwort-Hashes).
3. TTL für `@` und `www` auf 300 s senken, mindestens einen Tag vor dem Umzug.
4. Server einrichten (Abschnitt 1), Neon-Kopie einspielen, ersten Deploy laufen lassen.
5. Test unter `neu.stuebi-hamburg.de` (`A`/`AAAA` → netcup): alle Seiten, Weiterleitungen, Fotos. Die robots.txt
   sperrt dort alles, weil die Adresse nicht `SITE_URL` ist. Den CMS-Login nur grob prüfen – Cookies passen erst
   unter der echten Adresse.
6. Datenschutz: `hosting` in `src/content/rechtliches.ts` auf netcup GmbH umstellen; AV-Vertrag im netcup-Kundenpanel
   abschließen; `docs/offene-fragen.md` und den Mail-Entwurf anpassen.

### B. Umzugstag (ca. 1 Stunde, abends oder am Wochenende)

1. Redaktion informieren: ab Uhrzeit X keine Änderungen im CMS.
2. `pg_dump` aus Neon → `pg_restore` auf dem Server. Fotos mit `rsync` nach `/srv/stuebi/media`. Anzahl Beiträge,
   Termine, Nutzer und Dateien vergleichen.
3. DNS bei Bytecamp: `A @` und `A www` → `188.68.38.203`, `AAAA @` und `AAAA www` → IPv6. `MX`/`TXT` nicht ändern.
4. Caddy holt das Zertifikat. Prüfen: CMS-Login, `docs/seo-go-live.md` Schritte 2–4, eine Test-Mail an eine
   `@stuebi-hamburg.de`-Adresse kommt an.
5. Notfall: `A`-Einträge zurück auf `212.204.60.2` – WordPress läuft weiter, bis das Bytecamp-Paket verkleinert ist.

### C. Danach

- Neon zwei Wochen als Rückfall behalten, dann löschen (enthält Redaktionskonten).
- Lokale Entwicklung auf das lokale Docker-Postgres mit einer Kopie umstellen – `.env` zeigt dann auf keine
  Live-Datenbank mehr.
- CMS-Konten anlegen: zwei Admins (Stevan Veljovic, Schulleitung), Bearbeiterin (Rolle `teacher`).
  Zugangsdaten in einem gemeinsamen Passwortmanager, den Herr Herpe festlegt.
- Bytecamp auf Domain + E-Mail verkleinern; Vercel abschalten oder als Vorschau behalten.

## 4. Betrieb

- **Backups:** `systemd`-Timer jede Nacht 3:00 – `pg_dump -Fc` und `rsync` von `media/` nach
  `/srv/stuebi/backups/JJJJ-MM-TT/`, älter als 14 Tage wird gelöscht. Wiederherstellung einmal vor dem Umzug proben
  und in `docs/betrieb.md` beschreiben.
  **Bekannte Lücke:** Fällt der Server aus, sind auch die Backups weg. Gegenmittel später: netcup-Speicher
  (separat zu buchen) oder Schul-Laufwerk. Eintrag in `docs/offene-fragen.md`.
- **Server-Protokolle:** Caddy schreibt kein Zugriffslog (kein `log`-Block im `Caddyfile`). Übrig bleiben nur
  Fehlermeldungen von App und Caddy im Docker-Log, durch die Rotation auf 3 × 10 MB je Container begrenzt. Die
  Datenschutzerklärung („nach 7 Tagen gelöscht“) wird an diese Wirklichkeit angepasst: Zugriffe werden nicht
  protokolliert, Fehlermeldungen nur kurz aufbewahrt.
- **Überwachung:** ein kostenloser externer Check (z. B. UptimeRobot, alle 5 Min., Mail an Stevan Veljovic).
- **Doku:** `docs/betrieb.md` – Anmelden, Logs ansehen, Neustart, Zurückrollen, Backup zurückspielen.

## Tests

- Docker-Image lokal bauen und mit `compose.yml` gegen eine lokale Postgres-Kopie starten: Startseite, ein Beitrag,
  ein Foto unter `/api/media/file/…`, `/admin` lädt.
- Bestehende Playwright-Tests gegen `neu.stuebi-hamburg.de` laufen lassen (`PLAYWRIGHT_BASE_URL`).
- Nach dem Umzug: Stichproben aus `docs/seo-go-live.md`, robots.txt zeigt `Allow: /`.

## Risiken

| Risiko | Gegenmittel |
|---|---|
| Fotos über `next/image` werden nicht optimiert (heute nur `localhost:3000` erlaubt) | Beim lokalen Image-Test prüfen; ggf. `images.localPatterns` |
| `sharp` fehlt im Standalone-Image | Im Dockerfile mitinstallieren, Test lädt ein Bild |
| Bytecamp-DNS lässt keine eigenen `AAAA`-Einträge zu | Dann nur IPv4 |
| Migration bricht ab | Workflow stoppt vor dem Deploy, alte Version läuft weiter |
