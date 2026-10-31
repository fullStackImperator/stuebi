# Schwerpunkte: kurze Startseite, ausführliche Schwerpunkt-Seite

Datum: 2026-10-31 · Status: zur Freigabe

## Ziel

Eltern überfliegen die Startseite. „Unsere Besonderheiten“ soll dort nur neugierig machen und auf die
Schwerpunkt-Seite verlinken. Dort bekommen Sport, Makerspace und Abgekocht je einen eigenen, bildstarken
Abschnitt mit den vollständigen Infos (inkl. der Inhalte der alten Website unter
`stuebi-hamburg.de/stadtteilschule/` → Lernen) und mehreren Fotos aus dem CMS.

## Entscheidungen

| Thema | Entscheidung |
|---|---|
| Startseite | Drei Farbkarten untereinander (Prototyp B, Branch `proto/besonderheiten-b`) |
| Schwerpunkt-Abschnitte | Bento-Layout (Variante C aus dem Mockup) |
| Fotos | CMS-Galerie pro Schwerpunkt, zusätzlich zum bestehenden Fotoplatz |
| Migration | Direkt auf der Live-Datenbank (vom Nutzer so entschieden; Änderung ist rein additiv) |
| Individuelle Förderung | Bleibt als kleinerer Abschnitt mit einem Foto |
| „Noch mehr zu entdecken“ | Bleibt unverändert |
| Makerspace | Link auf https://stuebi-makerspace.de/ (neuer Tab) |

## 1. Startseite – `school-life-section.tsx`

- Kopf (Eyebrow, „Das macht Stübi besonders.“, Unterzeile) und Button „Alle Schwerpunkte ansehen“ bleiben.
- Je Schwerpunkt eine breite Karte in seiner Farbe (Sport `accent`, Makerspace `mint`, Abgekocht `golden`):
  halb Foto, halb Text, große Nummer „01/02/03“, Icon, Titel, zwei Sätze Teaser, „Mehr erfahren →“.
  Die ganze Karte ist ein Link auf `/schwerpunkt#sport|#makerspace|#abgekocht`. Foto abwechselnd links/rechts,
  auf Handys oben.
- Foto: Titelfoto aus dem CMS, sonst das Broschürenfoto aus `schwerpunktFallbacks`.
- Entfällt auf der Startseite: Stichpunktlisten, Partner, Zitate, Hinweise (wandern auf die Schwerpunkt-Seite).

## 2. Schwerpunkt-Seite – `/schwerpunkt`

Reihenfolge: PageIntro (mint) → Sport → Makerspace → Abgekocht → Individuelle Förderung → Noch mehr zu entdecken.

Jeder der drei großen Abschnitte (`id` = `sport` / `makerspace` / `abgekocht`, mit `scroll-mt` für den festen Header):

1. **Farbband** in der Schwerpunktfarbe: Eyebrow „Schwerpunkt 1/2/3“, Titel, Intro (zwei Sätze).
   Textfarben wie bei PageIntro (Navy auf Gold/Mint, Weiß auf Pink).
2. **Bento-Mosaik**: Raster aus Fotos und Fakten-Kacheln. Desktop 4 Spalten, Handy 2 Spalten.
   Das Titelfoto ist die große 2×2-Kachel, Galeriefotos füllen weitere Felder. Fakten-Kacheln und das Zitat
   (breite Kachel) sind fest. Bei wenigen Fotos füllen die Fakten-Kacheln das Raster; es entstehen keine leeren
   Kästen. Fotos: `next/image`, `sizes` passend zur Kachelgröße, Alt-Text aus der Mediathek.
3. **Details in zwei Spalten**: links die Stichpunkte, rechts Partner, „So läuft’s“ und Links.

Inhalte (Texte werden im Ton der Website neu formuliert, nicht wörtlich von der alten Seite übernommen):

- **Sport** – Fakten: „3 Std. Sport pro Woche“, „A- & B-Lizenz-Coaches“, „5 Sporthallen“; Zitat Dirk Nowitzki.
  Stichpunkte von heute plus: Bewegung im Unterricht, Spielgeräte-Container und offene Halle in der großen Pause,
  Stübi-Cup, Winter-Judo-Cup, Spendenlauf, Wilhelmsburger Insel-Cup, Auszeichnung „sportbetonte Schule“ seit 2017/18.
  Partner wie heute.
- **Makerspace** – Fakten: „Größter Schul-Makerspace Deutschlands“, „Club mit Gürtelsystem“; Zitat Pestalozzi.
  Stichpunkte von heute; rechts prominenter Button „Zur Makerspace-Website ↗“.
- **Abgekocht** – Fakten: „Seit 2017“, „1 Woche pro Klasse und Jahr“, „DGE-Standard“.
  Stichpunkte von heute plus: frisch gekochtes Mittagessen, Bio-Rohkost bzw. aus dem Schulgarten, Halal-Fleisch vom
  regionalen Schlachter, Unterstützung durch den Mensaverein. „So läuft’s“: Klasse wird geteilt, wechselt zwischen
  Lernküche (mit Koch) und Unterricht „Gesunde Ernährung“, mittwochs Exkursionen; jeder Jahrgang hat ein Thema
  (z. B. saisonal & regional, Fairtrade, Sporternährung).

**Individuelle Förderung**: kleinerer Abschnitt (Foto + Text) mit dem bisherigen Inhalt und Foto.

## 3. Aufbau im Code

- `src/content/schwerpunkte.ts` – Inhalte der drei Schwerpunkte (Teaser, Intro, Fakten, Zitat, Stichpunkte,
  Partner, „So läuft’s“, Links, Farbe, Icon). Startseite und Schwerpunkt-Seite lesen daraus; keine doppelten Texte.
- `src/components/schwerpunkt/schwerpunkt-feature.tsx` – ein großer Abschnitt (Farbband, Bento, Details).
- `src/components/landingpage/school-life-section.tsx` – Farbkarten aus Prototyp B, Teaser aus der Inhaltsdatei.
- `src/app/(site)/(unterseiten)/schwerpunkt/page.tsx` – setzt die Abschnitte zusammen, lädt Titelfotos und Galerien.

## 4. CMS und Migration

- `src/globals/PageImages.ts`, Gruppe `schwerpunkt`: die bestehenden Uploads `sport`, `makerspace`, `abgekocht`
  bleiben (Beschriftung „… – Titelfoto“). Neu je Schwerpunkt ein Upload-Feld mit `hasMany: true`, max. 6 Fotos
  (`sportGalerie`, `makerspaceGalerie`, `abgekochtGalerie`), sortierbar, optional.
- Migration mit `npx payload migrate:create`, rein additiv (keine bestehenden Daten werden verändert),
  ausgeführt auf der Live-Datenbank. Danach `npm run generate:types` und `npm run generate:importmap`.
- Die Migration läuft vor dem Deploy des neuen Codes, sonst fragt die Seite nicht vorhandene Spalten ab.

## 5. Fehlerfälle

- CMS nicht erreichbar oder Galerie leer: Titelfoto fällt auf das Broschürenfoto zurück, Bento füllt mit Fakten-Kacheln.
- Foto ohne Alt-Text: wie heute über `toPhoto`; Alt-Text in der Mediathek pflegen.

## 6. Test

- `npm run lint`, `npx tsc --noEmit`.
- Screenshots hell/dunkel, Desktop und 390 px: Startseite (Karten) und Schwerpunkt-Seite mit 0, 1 und ≥ 4
  Galeriefotos (Galerie-Fall lokal mit Broschürenfotos simuliert, nicht über Uploads ins Live-CMS).
- Links der Startseiten-Karten landen am richtigen Abschnitt; Makerspace-Link öffnet in neuem Tab.
- Admin: Seitenbilder → Schwerpunkt zeigt Titelfotos und Galerien; bestehende Fotos sind noch da.

## 7. Aufräumen

Server auf Port 3002 stoppen, Worktree `stuebi-besonderheiten-b` und Branch `proto/besonderheiten-b` löschen,
Mockup-Server beenden.
