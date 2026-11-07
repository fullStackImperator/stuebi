# SEO: Umzug auf stuebi-hamburg.de ohne Ranking-Verlust, gefunden werden wie eine Schule

Datum: 2026-11-07 · Status: zur Freigabe

## Ziel

Die neue Website löst die alte WordPress-Seite unter **stuebi-hamburg.de** ab. Dabei sollen

1. alle alten Adressen (Google-Treffer, Flyer, Links anderer Seiten) weiter funktionieren und ihre Rankings an
   die neuen Seiten weitergeben,
2. Suchmaschinen jede neue Seite finden und richtig zuordnen,
3. geteilte Links eine ordentliche Vorschau zeigen,
4. Google die Schule, ihre Termine und Neuigkeiten als solche erkennen.

Erfolg heißt: Keine alte Adresse endet auf einer Fehlerseite, jede Seite hat genau eine kanonische Adresse,
Titel, Beschreibung und Vorschaubild, und die strukturierten Daten bestehen Googles Rich-Results-Test.

## Ausgangslage

- Vorhanden: Titel pro Seite, meist eine Beschreibung, Server-Rendering, eine H1 pro Seite, sprechende URLs,
  Weiterleitungen `/abteilungen/*` in `next.config.ts`.
- Fehlt: Sitemap, robots.txt, `metadataBase` und kanonische Adressen, Link-Vorschauen (Open Graph),
  strukturierte Daten, Weiterleitungen von der alten Seite.
- Alte Seite: 287 Adressen laut `stadtteilschule/wp-sitemap.xml` – 132 Seiten, 139 News-Beiträge
  (`/stadtteilschule/JJJJ/MM/TT/<slug>/`), 16 Schlagwort- und Kategorieseiten. 22 der Beiträge sind mit
  gleichem Slug im CMS (Collection `news`).

## Entscheidungen

| Thema | Entscheidung |
|---|---|
| Domain | `https://stuebi-hamburg.de`, als Konstante im Code (öffentliche Konfiguration gehört in den Code) |
| Weiterleitungen | Ansatz A: eine Zeile pro alter Seite, dazu Regeln für News, Schlagwörter und Rest; alle permanent (308) |
| Nicht-Live-Umgebungen | robots.txt sperrt alles, wenn die Seite nicht unter der Live-Domain läuft |
| Vorschaubild | ein Standardbild für die Seite (Schulfoto mit Logo, 1200×630); News mit eigenem Bild nutzen dieses |
| Strukturierte Daten | `School` (Startseite), `NewsArticle` (Beiträge), `Event` (CMS-Termine auf /termine) |
| Termine als Events | nur CMS-Termine: Tag der offenen Tür, Feste, Infoveranstaltungen. Keine Anmeldezeiträume, kein IServ-Kalender |
| Titel | Vorlage `%s | Stübi Hamburg` im Layout; Startseite behält ihren langen Titel |

## 1. Weiterleitungen von der alten Seite

- **`src/content/alte-seite-weiterleitungen.ts`**: Liste „alter Pfad → neue Seite“ für die 132 alten Seiten.
  Eindeutige Fälle direkt (z. B. `…/kontakt/beratung/bob-team/` → `/beratung`,
  `…/anmeldung-neue-schueler/start-in-klasse-1/` → `/anmeldung#primarstufe`). Unklare Fälle bekommen die
  nächstliegende Seite und stehen in einem eigenen, kommentierten Block zur Prüfung; sie kommen zusätzlich in
  `docs/offene-fragen.md`.
- **Eine Route für `/stadtteilschule/[...pfad]`**, Reihenfolge:
  1. Pfad steht in der Liste → diese Seite.
  2. News-Beitrag (`JJJJ/MM/TT/<slug>`) → `/news/<slug>`, wenn der Beitrag im CMS ist, sonst `/news`.
  3. `tag/*`, `category/*` → `/news`.
  4. Alles andere (auch alte PDF- und Upload-Links) → Startseite.
- Abschließender Schrägstrich und Groß-/Kleinschreibung spielen beim Nachschlagen keine Rolle.
- Status 308 (permanent). Die bestehenden `/abteilungen`-Weiterleitungen bleiben.
- Die 287 alten Adressen liegen als Datei im Repo (Testgrundlage).

## 2. Sitemap, robots.txt, kanonische Adressen

- `metadataBase` im Layout aus der Domain-Konstante.
- **`src/app/sitemap.ts`**: feste Seiten (/, /vision, /bildungswege, /vorschule, /grundschule, /mittelstufe,
  /oberstufe, /ganztag, /schwerpunkt, /termine, /anmeldung, /beratung, /news, /impressum, /datenschutz), alle
  News-Beiträge mit `updatedAt`, alle CMS-Seiten (`/[slug]`).
- **`src/app/robots.ts`**: alles erlaubt außer `/admin` und `/api`, Verweis auf die Sitemap. Läuft die Seite
  nicht unter der Live-Domain (über `NEXT_PUBLIC_SERVER_URL`), `Disallow: /` für alle.
- **Kanonische Adresse** (`alternates.canonical`) auf jeder Seite, bei News und CMS-Seiten aus dem Slug.

## 3. Link-Vorschauen und strukturierte Daten

- **Open Graph / Twitter**: Standardbild über die Next-Konvention `opengraph-image` (1200×630, Schulfoto mit
  Logo), großes Vorschauformat. Titel und Beschreibung aus den Metadaten der Seite. News-Beiträge mit Bild
  nutzen ihr Bild.
- **`School`** auf der Startseite: Name „Stadtteilschule Stübenhofer Weg“, alternativ „Stübi“, Adresse
  Stübenhofer Weg 20a, 21109 Hamburg, Telefon, E-Mail, Logo, URL, `sameAs` mit den Social-Media-Profilen der
  Schule, soweit im Code hinterlegt. Adresse und Kontakt aus `src/content/contacts.ts`.
- **`NewsArticle`** auf jedem Beitrag: Überschrift, Veröffentlichungs- und Änderungsdatum, Bild, Schule als
  Herausgeberin.
- **`Event`** auf /termine für jeden kommenden CMS-Termin der Arten Tag der offenen Tür, Fest und
  Infoveranstaltung: Name, Beginn und Ende (mit Uhrzeit, wenn vorhanden), Ort (Schuladresse; bei eigenem Ort
  dieser Ort in Hamburg), Beschreibung, `eventAttendanceMode` vor Ort, `eventStatus` geplant, Schule als
  Veranstalterin. Anmeldezeiträume und IServ-Termine bekommen kein Event.

## 4. Seitentexte und Leitfaden

- Titel-Vorlage `%s | Stübi Hamburg`; die Seiten setzen nur noch ihren Namen.
- Beschreibung für jede Seite, höchstens 150 Zeichen; fehlende ergänzen (/news, CMS-Seiten). News nutzen
  ihren `excerpt`.
- **`docs/seo-go-live.md`**: Leitfaden für den Umzug – vorher meistbesuchte alte Seiten aus der Search Console
  mit der Liste abgleichen; nachher Domain in der Search Console bestätigen (DNS) und Sitemap einreichen,
  Weiterleitungen stichprobenartig prüfen, Bericht „Seiten“ auf 404 beobachten und fehlende Adressen
  nachtragen, Google-Unternehmensprofil aktualisieren (Website, Bürozeiten, Fotos), optional Bing Webmaster
  Tools.

## Tests (Playwright, Projekte phone und desktop)

- Alle 287 alten Adressen leiten mit 308 weiter und landen auf einer Seite, die lädt (kein 404).
- Stichproben: BOB-Team → `/beratung`; migrierter Beitrag → `/news/<slug>`; nicht migrierter Beitrag → `/news`;
  Schlagwort → `/news`; unbekannte Adresse → `/`; Schreibweise mit und ohne Schrägstrich und in Großbuchstaben.
- `/sitemap.xml` enthält die festen Seiten und einen bekannten Beitrag.
- `/robots.txt` sperrt `/admin`, nennt die Sitemap; lokal (keine Live-Domain) `Disallow: /`.
- Jede Seite hat einen kanonischen Link, `og:title`, `og:image` und eine Beschreibung ≤ 150 Zeichen.
- Das Vorschaubild lädt als Bild in 1200×630.
- Startseite: gültiges `School`-JSON-LD mit Adresse. Beitrag: `NewsArticle` mit Überschrift und Datum.
  /termine: ein `Event` pro CMS-Termin mit Name, Beginn und Ort, keine Anmeldezeiträume.
- Jede Seite: genau eine H1, kein Bild ohne Alt-Text.

## Nicht Teil dieses Vorhabens

- Domain-Umzug selbst (DNS, Hosting) und die Konten bei Google; dafür gibt es den Leitfaden.
- Migration der ~117 älteren News-Beiträge ins CMS (Weiterleitung auf `/news` reicht; nachträglich migrierte
  Beiträge werden automatisch erkannt).
- Eigene Vorschaubilder pro Seite.
