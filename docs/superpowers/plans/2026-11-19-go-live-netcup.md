# Go-live auf netcup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Die Website läuft als Docker-Compose-Stack (Caddy, App, Postgres) auf dem netcup-Server. Jeder Push auf `main` deployt sie automatisch. Betrieb und Übergabe sind dokumentiert.

**Architecture:** Das App-Image baut eine GitHub Action. Sie liest beim Build die Live-Datenbank über einen SSH-Tunnel und pusht das Image nach `ghcr.io`. Danach startet sie den `app`-Dienst auf dem Server neu. Vor dem Umzug läuft alles unter dem netcup-Hostnamen, nach dem Umzug unter `stuebi-hamburg.de`.

**Tech Stack:** Next.js 16 (`output: "standalone"`), Payload 3, Postgres 16, Caddy 2, Docker Compose v5, GitHub Actions, systemd-Timer, Playwright.

**Spec:** `docs/superpowers/specs/2026-11-19-go-live-netcup-design.md`

## Global Constraints

- Server: `188.68.38.203` / `2a03:4000:13:258:78a5:80ff:fed6:c38f`, Debian 13. Alles liegt in `/srv/stuebi/`.
- Test-Adresse vor dem Umzug: `v2202611456465561877.ultrasrv.de` (siehe Ruling 1). Live-Adresse: `stuebi-hamburg.de`.
- Nach außen sind nur die Caddy-Ports 80 und 443 (tcp und udp) offen. Postgres ist nur an `127.0.0.1:5432` gebunden, die App hat keinen veröffentlichten Port.
- Keine Geheimnisse ins Repo, auch keine Beispielwerte, die wie echte aussehen. Geheimnisse liegen in `/srv/stuebi/.env` (`chmod 600`) und in den GitHub-Secrets.
- Image: `ghcr.io/fullstackimperator/stuebi:<commit-hash>`. Die Image-Adresse steht genau an zwei Stellen: `deploy/compose.yml` und `.github/workflows/deploy.yml`.
- Caddy hat keinen `log`-Block, es gibt also kein Zugriffslog.
- Backups: jede Nacht um 03:00, 14 Tage auf dem Server, in `/srv/stuebi/backups/JJJJ-MM-TT/`.
- Jeder neue Zugang bekommt eine Zeile in `docs/zugaenge.md`.
- Der Port 22 ist im üblichen Netz des Nutzers gesperrt. Befehle am Server laufen nur, wenn der Nutzer im Hotspot ist. Vorher fragen.
- Nur eigene Dateien committen (parallele Session). Pushen nur, wenn der Nutzer es sagt.

## Rulings

1. **Test-Adresse:** Statt `neu.stuebi-hamburg.de` (Spec 3A.5) nehmen wir den netcup-Hostnamen `v2202611456465561877.ultrasrv.de`. Er zeigt schon auf den Server, und Caddy bekommt dafür ein echtes Zertifikat. Wir brauchen so keinen Bytecamp-Zugang vor dem Umzug. Kosten, falls das falsch ist: Ein DNS-Eintrag kommt später dazu.
2. **Caddy-Adresse als Variable:** `SITE_ADDRESS` in `.env`. Vor dem Umzug ist es der netcup-Hostname, danach `stuebi-hamburg.de`. Den `www`-Block gibt es nur für die Live-Adresse.

3. **Keine Login-Drosselung in Caddy** (Spec §1): Das Standard-Image von Caddy kann nicht drosseln, dafür bräuchte es ein eigenes Build mit `caddy-ratelimit`. Die App drosselt selbst (10 Versuche pro IP in 15 Minuten) und sperrt Konten (`docs/security.md`). Die IP-Erkennung ist sicher, weil die App nur über Caddy erreichbar ist. Kosten, falls das falsch ist: Ein Caddy mit Plugin kommt nachträglich dazu.

## Review Focus

1. **Neustart des Servers** (Updates, netcup-Wartung): Alle drei Container starten von selbst wieder, und die Fotos sind noch da. Test in Task 3.
2. **Ein Foto, das nach dem Deploy hochgeladen wurde:** Es überlebt den nächsten Deploy, weil `media/` gemountet ist und nicht im Image liegt. Test in Task 3.
3. **Der Deploy schlägt beim Gesundheits-Check fehl:** Die vorige Version läuft wieder, und der Workflow ist rot. Test in Task 5.
4. **Port-Scan von außen:** Nur 22, 80 und 443 antworten, 5432 und 3000 nicht. Test in Task 3.
5. **Ein Backup ist kaputt oder leer:** Die Probe zum Wiederherstellen fällt auf. Test in Task 4.

---

### Task 1: App-Image

**Files:**
- Modify: `next.config.ts` (nur `output: "standalone"` ergänzen; die offenen Änderungen der anderen Session **nicht** anfassen und nicht mitcommitten, siehe Step 5)
- Create: `Dockerfile`, `.dockerignore`
- Create: `e2e/deploy-smoke.spec.ts`

**Interfaces:**
- Produces: Image `stuebi:local`. Es lauscht auf `:3000`, liest `DATABASE_URL`, `PAYLOAD_SECRET` und `NEXT_PUBLIC_SERVER_URL` (dieses beim Build) und speichert Uploads in `/app/media`.
- Produces: `e2e/deploy-smoke.spec.ts`. Es läuft gegen `BASE_URL` und wird in Task 3, 5 und 7 wiederverwendet.

- [ ] **Step 1: Write the failing test** `e2e/deploy-smoke.spec.ts`. Ohne `BASE_URL` wird es mit `test.skip` übersprungen, damit es die normale Suite nicht stört.
  - `home answers 200 with the school name`: `/` → Status 200, `h1` sichtbar.
  - `a news post renders`: `/news` → der erste Beitragslink öffnet eine Seite mit `h1`.
  - `uploaded photos are served`: das erste `img[src*="/api/media/file/"]` oder `img[src*="_next/image"]` auf `/` → `naturalWidth > 0`.
  - `the CMS login loads`: `/admin` → das Feld `input[name="email"]` ist sichtbar.
  - `old addresses redirect`: `/stadtteilschule/kontakt/beratung/bob-team/` → endet auf `/beratung`.
- [ ] **Step 2: Run** `BASE_URL=http://localhost:3100 npx playwright test e2e/deploy-smoke.spec.ts --project=desktop`. Expected: FAIL (connection refused).
- [ ] **Step 3: Implement**
  - Mehrstufiges `Dockerfile` auf `node:24-bookworm-slim`: `deps` (`npm ci`), `build` (`ARG NEXT_PUBLIC_SERVER_URL`, `DATABASE_URL` und `PAYLOAD_SECRET` als Build-Secrets per `--mount=type=secret`, **nicht** als `ARG`, damit sie nicht in den Image-Schichten landen; `npm run build`), `run` (`.next/standalone`, `.next/static`, `public`; Nutzer `node`; `CMD ["node","server.js"]`).
  - `sharp` muss im Standalone-Ordner landen. Falls es fehlt, im Run-Schritt nachinstallieren.
  - `.dockerignore`: `node_modules`, `.next`, `.env*`, `media`, `_reference`, `news_wordpress_export`, `test-results`, `.git`.
  - Lokal bauen gegen eine lokale Postgres-Kopie: `docker compose up -d` (die vorhandene `docker-compose.yml`), dann `pg_dump` aus Neon und `pg_restore` dort. Nur lesend auf Neon, **nichts schreiben**.
  - Starten: `docker run -p 3100:3000 -v $PWD/media:/app/media --env-file <lokale env>`.
- [ ] **Step 4: Run** Step 2 noch einmal. Expected: 5 passed. Wird ein Foto nicht optimiert, `images.localPatterns` für `/api/media/**` ergänzen (Risiko aus der Spec).
- [ ] **Step 5: Commit.** Nur `Dockerfile`, `.dockerignore`, `e2e/deploy-smoke.spec.ts` und der eine Hunk in `next.config.ts` (`git add -p`):
  `feat(deploy): Docker-Image für den eigenen Server`

### Task 2: Datenschutz und offene Fragen auf netcup umstellen

**Files:**
- Modify: `src/content/rechtliches.ts` (`hosting`, Abschnitt „Server-Protokolle“)
- Modify: `e2e/rechtliches.spec.ts` (der Hetzner-Test wird zum netcup-Test)
- Modify: `docs/offene-fragen.md` (Eintrag „Hosting“), `docs/mails/2026-11-schulleitung-impressum-datenschutz.md`

- [ ] **Step 1: Test anpassen.** Der Abschnitt „Server-Protokolle“ enthält `netcup GmbH`, `Deutschland` und `Art. 28 DSGVO`. `main` enthält **nicht** `Hetzner`, `Vercel` oder `USA`. Der Abschnitt enthält `nicht protokolliert`.
- [ ] **Step 2: Run** `npx playwright test e2e/rechtliches.spec.ts`. Expected: FAIL (`Hetzner` gefunden).
- [ ] **Step 3: Implement.** In `hosting` kommt `name: 'netcup GmbH, Daimlerstraße 25, 76185 Karlsruhe'`. Die Adresse **vorher auf netcup.com/impressum prüfen**. Ist sie anders, die geprüfte nehmen. Der Text wird so umgestellt: Zugriffe werden nicht protokolliert, die Verbindungsdaten werden nur für die Auslieferung verarbeitet, Fehlermeldungen werden nach kurzer Zeit überschrieben. `logDays` fällt weg. Den Eintrag in den offenen Fragen auf netcup umschreiben (AV-Vertrag im Kundenpanel, Standort Nürnberg).
- [ ] **Step 4: Run** Step 2 noch einmal. Expected: 8 passed. Bei veraltetem Turbopack-Cache vorher fragen.
- [ ] **Step 5: Commit** `feat(datenschutz): Hosting bei netcup in Nürnberg, keine Zugriffsprotokolle`

### Task 3: Compose-Stack und Server

**Files:**
- Create: `deploy/compose.yml`, `deploy/Caddyfile`, `deploy/env.example` (nur Variablennamen, Werte `CHANGE_ME`)
- Create: `deploy/server-setup.sh` (idempotent, läuft als root auf dem Server)

**Interfaces:**
- Consumes: Image aus Task 1.
- Produces: `/srv/stuebi/{compose.yml,Caddyfile,.env,media/,backups/}`. Linux-Nutzer `deploy` in der Gruppe `docker`, mit `~deploy/.ssh/authorized_keys`. Variablen in `.env`: `SITE_ADDRESS`, `APP_TAG`, `POSTGRES_PASSWORD`, `DATABASE_URL`, `PAYLOAD_SECRET`.

- [ ] **Step 1: Failing check.** `BASE_URL=https://v2202611456465561877.ultrasrv.de npx playwright test e2e/deploy-smoke.spec.ts --project=desktop`. Expected: FAIL (connection refused).
- [ ] **Step 2: Implement**
  - `compose.yml` hat drei Dienste mit `restart: unless-stopped`.
  - `postgres:16`: Healthcheck `pg_isready`, Volume `pgdata`, Port `127.0.0.1:5432:5432`.
  - `app`: Image `ghcr.io/fullstackimperator/stuebi:${APP_TAG}`, `depends_on: postgres: condition: service_healthy`, Volume `./media:/app/media`, keine `ports`.
  - `caddy:2`: Ports `80:80`, `443:443`, `443:443/udp`, Volumes `caddy_data` und `caddy_config`.
  - `Caddyfile`: `{$SITE_ADDRESS} { encode zstd gzip; header { Strict-Transport-Security "max-age=31536000"; X-Content-Type-Options nosniff; Referrer-Policy strict-origin-when-cross-origin; X-Frame-Options SAMEORIGIN }; reverse_proxy app:3000 }`. Dazu ein `www.stuebi-hamburg.de { redir https://stuebi-hamburg.de{uri} permanent }`, auskommentiert bis zum Umzug.
  - `server-setup.sh` legt den Nutzer `deploy` und die Ordner an. Es fügt den öffentlichen Deploy-Schlüssel als Argument ein und erzeugt `.env` mit zufälligen Werten (`openssl rand -hex 32`), wenn sie noch fehlt.
  - Das erste Image wird per `docker save | ssh | docker load` übertragen, bis Task 5 läuft. Fotos per `rsync` aus `media/`. Die Datenbank kommt als Kopie aus Neon per `pg_dump | pg_restore`.
- [ ] **Step 3: Run** Step 1 noch einmal. Expected: 5 passed.
- [ ] **Step 4: Review-Focus-Checks** (die Ausgaben ins Ledger):
  - Port-Scan von außen: `nc -vz -w5 188.68.38.203 5432` und `… 3000` → Timeout. `80` und `443` → offen.
  - `ssh root@… reboot`, nach 2 Minuten Smoke-Test → 5 passed.
  - Im CMS ein Testbild hochladen, `docker compose up -d --force-recreate app`, das Bild lädt noch. Danach das Testbild wieder löschen. (Das ist der Test-Server, nicht das Live-CMS.)
- [ ] **Step 5: Commit** `feat(deploy): Compose-Stack mit Caddy und Postgres, Server-Einrichtung`

### Task 4: Nächtliches Backup

**Files:**
- Create: `deploy/backup.sh`, `deploy/stuebi-backup.service`, `deploy/stuebi-backup.timer`

- [ ] **Step 1: Failing check:** `ssh root@… 'ls /srv/stuebi/backups/$(date +%F)/db.dump'` → No such file.
- [ ] **Step 2: Implement.** `backup.sh`: `docker compose exec -T postgres pg_dump -Fc` → `db.dump`. `rsync -a --link-dest=<voriger Tag>` für `media/`. Ordner, die älter als 14 Tage sind, löschen. Bricht das Skript ab, gibt es einen Exit-Code ungleich 0. Timer `OnCalendar=*-*-* 03:00`, `Persistent=true`.
- [ ] **Step 3: Run** `systemctl start stuebi-backup.service`. Dann die Wiederherstellungsprobe: `pg_restore --list db.dump | grep -c "TABLE DATA"` > 0, und in eine Wegwerf-Datenbank zurückspielen, dort `select count(*) from news` gleich dem Live-Wert. Expected: Zahlen gleich.
- [ ] **Step 4: Commit** `feat(deploy): nächtliches Backup von Datenbank und Fotos`

### Task 5: GitHub-Deploy

**Files:**
- Create: `.github/workflows/deploy.yml`

**Interfaces:**
- Consumes: Nutzer `deploy` und `.env` aus Task 3.
- Secrets: `DEPLOY_SSH_KEY`, `DEPLOY_KNOWN_HOSTS`, `BUILD_DATABASE_URL` (`postgres://…@127.0.0.1:5432/stuebi`), `PAYLOAD_SECRET`. Variable: `SITE_URL` (vor dem Umzug der netcup-Hostname mit `https://`).

- [ ] **Step 1: Implement** den Workflow nach Spec §2 (`on: push: main` und `workflow_dispatch`, `concurrency: deploy`):
  - Tunnel per `ssh -fN -L 5432:127.0.0.1:5432`.
  - `npx payload migrate`.
  - `docker/build-push-action` mit Secrets, Tags `${{ github.sha }}` und `latest`, `permissions: packages: write`.
  - Der Deploy-Schritt merkt sich den alten `APP_TAG`, setzt den neuen und führt `pull` und `up -d app` aus.
  - Gesundheits-Check: `curl -fsS --retry 12 --retry-delay 5 "$SITE_URL"`. Schlägt er fehl, wird der alte Tag zurückgesetzt, die App neu gestartet und `exit 1` ausgelöst.
- [ ] **Step 2:** Der Nutzer legt die Secrets an. Der Deploy-Schlüssel wird lokal erzeugt, und der private Teil kommt **nur** nach GitHub und in den Passwortmanager. `ghcr`-Paket auf öffentlich stellen.
- [ ] **Step 3: Run** `gh workflow run deploy.yml` (erst nach dem „push“ des Nutzers), dann `gh run watch`. Expected: grün, danach Smoke-Test gegen die Test-Adresse → 5 passed.
- [ ] **Step 4: Rückfall prüfen.** Den Workflow einmal von Hand mit einem Tag starten, der den Check nicht besteht, z. B. per `workflow_dispatch`-Eingabe `break_healthcheck: true`. Sie hängt an die Check-URL einen Pfad, der 404 liefert. Expected: Der Workflow ist rot, und auf dem Server läuft wieder der vorige `APP_TAG`. Die Eingabe bleibt drin und ist dokumentiert.
- [ ] **Step 5: Commit** `feat(deploy): automatischer Deploy auf den netcup-Server`

### Task 6: Betriebs- und Übergabe-Doku

**Files:**
- Create: `docs/betrieb.md`, `docs/zugaenge.md`
- Modify: `docs/seo-go-live.md` (oben ein Link auf `docs/umzug.md`)
- Create: `docs/umzug.md` (Checkliste A/B/C aus Spec §3, mit Häkchen)

- [ ] **Step 1:** `docs/zugaenge.md` mit allen Zeilen aus Spec §5. Die Spalten sind: Was, Wofür, Wo, Eintrag im Passwortmanager, Wer hat Zugriff, Zurücksetzen. Dazu der Notfallweg ohne Schlüssel (Root-Passwort im netcup-Server-Panel neu setzen, Browser-Konsole).
- [ ] **Step 2:** `docs/betrieb.md` behandelt: anmelden (Hotspot-Hinweis, falls Port 22 gesperrt ist), Logs mit `docker compose logs`, Neustart, Zurückrollen per `APP_TAG`, Backup zurückspielen (die in Task 4 geprobten Befehle, wörtlich), Zertifikat, Updates und Uptime-Check.
- [ ] **Step 3: Prüfen.** Jeder Befehl in `betrieb.md` wird einmal am Server ausgeführt. Eine Zeile der Doku gilt erst als fertig, wenn ihr Befehl ohne Fehler gelaufen ist.
- [ ] **Step 4:** Zweiter Root-Schlüssel. Der Nutzer erzeugt `~/.ssh/stuebi_notfall`, und der öffentliche Teil kommt in `/root/.ssh/authorized_keys`. Der private Teil geht in den Passwortmanager und wird danach lokal gelöscht. Die Anmeldung damit testen.
- [ ] **Step 5:** Uptime-Check einrichten, z. B. UptimeRobot (kostenlos): alle 5 Minuten auf die Test-Adresse prüfen, nach dem Umzug auf `https://stuebi-hamburg.de`, Benachrichtigung an eine Adresse der Schule. Dazu eine Zeile in `docs/zugaenge.md`.
- [ ] **Step 6: Commit** `docs: Betrieb, Zugänge und Umzugs-Checkliste`

### Task 7: Umzug (mit dem Nutzer, Schritt für Schritt)

Hier gibt es keinen Code. Die Checkliste `docs/umzug.md` wird abgehakt. Voraussetzung ist der Bytecamp-Zugang mit DNS.

- [ ] A1–A3: Bytecamp-Zugang, die alte Seite archivieren, TTL auf 300.
- [ ] B1–B2: Die Redaktion einfrieren, frische Neon-Kopie und Fotos einspielen, die Zahlen vergleichen.
- [ ] B3: Den DNS umstellen. `SITE_ADDRESS=stuebi-hamburg.de`, den `www`-Block einkommentieren, die Repo-Variable `SITE_URL=https://stuebi-hamburg.de`, neu deployen.
- [ ] B4: `BASE_URL=https://stuebi-hamburg.de npx playwright test e2e/deploy-smoke.spec.ts` → 5 passed. `curl https://stuebi-hamburg.de/robots.txt` enthält `Allow: /`. Eine Test-Mail an `@stuebi-hamburg.de` kommt an. Dann `docs/seo-go-live.md` Schritte 2–4.
- [ ] C: Nach 2 Wochen Neon löschen, `.env` lokal auf Docker-Postgres umstellen, die CMS-Konten anlegen, Bytecamp verkleinern.
