# Schule Stübenhofer Weg (Stübi)

Öffentliche Schulwebsite mit **Next.js 16**, **shadcn/ui**, **Payload CMS 3** und **PostgreSQL** (Drizzle-Adapter in Payload).

## Voraussetzungen

- Node 20+
- **PostgreSQL** — z. B. [Neon](https://neon.tech) (hosted) oder lokal mit `docker compose up -d` und der mitgelieferten `docker-compose.yml`

### Datenbank: Neon

1. Projekt in Neon anlegen und eine Datenbank erstellen.
2. Unter **Connection details** die URL kopieren. Für dieses Next.js-Setup ist die **pooled** / **Transaction**-Verbindung (Pooler-Hostname) sinnvoll, damit viele kurze Requests nicht die direkte Verbindungsgrenze sprengen.
3. In `.env` setzen:

   ```bash
   DATABASE_URL=postgresql://…?sslmode=require
   ```

   Neon liefert `sslmode=require` in der Regel bereits mit. Payload nutzt den normalen Postgres-Treiber (`pg`); keine Extra-Pakete nötig.

4. Migrationen laufen gegen dieselbe URL (von deinem Rechner oder in CI):

   ```bash
   npx payload migrate
   ```

## Einrichtung

1. Umgebungsvariablen:

   ```bash
   cp .env.example .env
   ```

   `DATABASE_URL` (Neon) und `PAYLOAD_SECRET` ausfüllen.

2. Schema anwenden:

   ```bash
   npx payload migrate
   ```

   (Lokalen Docker-Postgres brauchst du nur, wenn du bewusst nicht Neon nutzt: dann `npm run db:up` zuerst.)

3. Admin-Importmap bei Änderungen an Payload-Komponenten:

   ```bash
   npm run generate:importmap
   npm run generate:types
   ```

4. Entwicklung:

   ```bash
   npm run dev
   ```

- Website: [http://localhost:3000](http://localhost:3000)  
- CMS: [http://localhost:3000/admin](http://localhost:3000/admin) — ersten Nutzer als **Admin** anlegen, anschließend weitere Lehrkräfte mit Rolle **Teacher** (kein Zugriff auf Benutzerverwaltung; Aktuelles schreiben).

### Local API (Payload)

Die öffentlichen Seiten nutzen dieselbe Payload-Instanz wie `/admin` — per **`getPayload({ config })`** (ohne HTTP). Siehe [Local API](https://payloadcms.com/docs/local-api/overview). Im Projekt: [`src/lib/payload-local-api.ts`](src/lib/payload-local-api.ts) bzw. der Re-Export `getPayloadClient` in [`src/lib/get-payload.ts`](src/lib/get-payload.ts).

### CMS: keine Rechte / Logout geht nicht

1. **`NEXT_PUBLIC_SERVER_URL`** muss exakt der URL im Browser entsprechen (z. B. `http://localhost:3000` — nicht `127.0.0.1`, wenn du dort `localhost` einträgst). Sonst können Cookies/Logout fehlschlagen.
2. Nach dem Update am **User-Feld `role`** (JWT): **einmal abmelden**, ggf. Cookies für die Seite löschen und **neu anmelden**, damit das Token die Rolle enthält (`saveToJWT` auf `role`).
3. In der Datenbank prüfen, ob dein Nutzer `role: "admin"` hat (falls der erste Account noch `teacher` war).

## Inhalte & Social Media

- **Seiten** (z. B. `ueber-uns`, `ganztag`, `anmeldung`, `kontakt`) legen Admins unter „Pages“ mit passendem Slug an; die Navigation verlinkt bereits diese Pfade.
- **Aktuelles**: Collection „News“ (Lehrer:innen und Admins).
- **Facebook**: `NEXT_PUBLIC_FACEBOOK_PAGE_URL` für das Page-Plugin; optional Graph-API-Variablen in `.env.example` für zusätzliche Beitragszeilen.
- **Instagram**: Graph API oder manuelle **Social highlights** im CMS.

Referenz-PDFs des Auftritts liegen unter `public/reference/`.
