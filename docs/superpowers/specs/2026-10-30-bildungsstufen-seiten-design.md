# Eigene Seiten für die Bildungsstufen und den Ganztag

Stand: 30.10.2026

## Ziel

Eltern, die eine Schule für ihr Kind suchen, sollen auf der Startseite die Stufen Vorschule, Grundschule,
Mittelstufe, Oberstufe und den Ganztag deutlich sehen und zu je einer eigenen Seite mit allen wichtigen
Informationen kommen. Die Inhalte stammen aus der Schulbroschüre 2026 und der alten Schulwebseite
(stuebi-hamburg.de/stadtteilschule); fehlende Fakten werden als Platzhalter markiert.

Nicht Teil dieses Vorhabens: Internationale Vorbereitungsklasse (IVK), Gremien, Schullandheime,
Elternarbeit, iServ/WebUntis-Links, Pflege der Stufentexte im CMS.

## Seitenstruktur

| Route | Inhalt |
| --- | --- |
| `/vorschule` | neu |
| `/grundschule` | neu |
| `/mittelstufe` | neu |
| `/oberstufe` | neu |
| `/ganztag` | bestehend, neu aufgebaut |
| `/bildungswege` | wird zur Übersicht: Einleitung, fünf Kacheln zu den Seiten, Abschnitt „Abschlüsse“ |

- Die vier neuen Routen sind statische Seiten in `src/app/(site)/(unterseiten)/`. Sie haben Vorrang vor
  `[slug]`; zusätzlich werden die Slugs in `RESERVED` aufgenommen, damit eine gleichnamige CMS-Seite nicht
  unerreichbar angelegt wird.
- Links auf `/bildungswege#vorschule` usw. werden auf die neuen Seiten umgestellt: Hero-Kacheln
  (`hero.tsx`), Footer, Hauptnavigation (`site-navigation.ts`), `schwerpunkt/page.tsx`.
  Alte Anker-Links landen weiterhin auf der Übersicht (die Abschnitte dort behalten ihre ids).

## Gemeinsame Vorlage `StagePage`

Eine Komponente baut alle fünf Seiten aus denselben Blöcken; jeder Block ist optional:

1. **Intro** – Stufe, Jahrgänge, kurzer Lead, Foto (CMS-Seitenbild der Stufe aus „Bildungswege“, sonst Broschürenfoto).
2. **„Das erwartet Ihr Kind“** – Punkte aus der Broschüre (`PointList`).
3. **„So sieht der Schulalltag aus“** – Fakten der alten Webseite, gegliedert in Unterabschnitte
   (z. B. Mittelstufe: Jg. 5/6, Jg. 7/8, Jg. 9/10).
4. **„Förderung & Beratung“** – Sprach-, Lern- und Entwicklungsförderung; Beratungsdienst mit Angeboten,
   allgemeiner E-Mail (beratungsdienst@stuebenhofer-weg.de), Telefon und Sprechstunde der
   Beratungslehrerin. Keine Namensliste des Teams.
5. **„Berufsorientierung“** – nur Mittel- und Oberstufe: Betriebspraktikum, Praxislerntag,
   Schülerfirmen (Barista, Formel 1, Medien-Stübi, Holzwerkstatt, SUO Design, Stübi-Manager, Kazumi).
6. **Anmeldung, Termine, Kontakt** – aus der CMS-Collection `departments` über die vorhandenen
   Bausteine (`RegistrationSection`, `DatesSection`, `ContactBlock`). Zuordnung:
   Vorschule und Grundschule → `primarstufe`, Mittelstufe → `mittelstufe`, Oberstufe → `oberstufe`.
   Der Ganztag hat keine Abteilung; dort entfällt der Block.
7. **„Nächste Stufe“** – Link zur folgenden Seite (Vorschule → Grundschule → Mittelstufe → Oberstufe → Ganztag).

Die Texte liegen typisiert je Stufe in `src/content/stufen/` (eine Datei pro Seite). Platzhalter nutzen die
vorhandene `Placeholder`-Komponente.

## Inhalte je Seite (Quellen)

- **Vorschule:** Broschüre (Regeln & Struktur, Bewegung & Kreativität, Kinderbauernhof); alte Seite
  „Vorschulisches Lernen“ (Schutzraum zwischen Kita und Schule, Kommunikation, Verkehrserziehung).
- **Grundschule:** Broschüre (Lernzeiten, bewegtes Klassenzimmer, Lesezeiten, Talentgruppen, Wahlkurse);
  alte Seite „Informationen Jg. 1–4“ (WIKI, drei Sportstunden, Talentgruppe Hamburger Sportbund).
- **Mittelstufe:** Broschüre (Beobachtungsstufe, zwei Bildungswege, Durchlässigkeit); alte Seite
  „Informationen Jg. 5–10“ (Logbuch, Starterwoche, zweite Fremdsprache ab 7, Praktikum und
  Praxislerntag ab 9, Abschlussfeier).
- **Oberstufe:** Broschüre (Vorstufe, Profile „Fair Play“ und „Mein Start-Up“, Seminarfach); alte Seite
  „Vorstufe Jg. 11“ (Voraussetzung MSA-Schnitt 3,0 und 3,0 in Deutsch/Englisch/Mathe, Stundentafel,
  Anmeldezeitraum laut CMS).
- **Ganztag:** alte Seite „Ganztagsschule“ (rhythmisierter Tag: TUT-Zeit, Unterrichtsband,
  Vertiefungsband, Mittagsfreizeit, Mittags- und Nachmittagsband); „Kursangebot“ als Beispiele
  (gekennzeichnet „Beispiele aus 2024/25“); Schulbibliothek; Ganztagskoordination; Mittagessen und
  Brotzeit als Platzhalter (Quellseite nicht mehr erreichbar).

## Startseite „Für Eltern“

- Fünf große Foto-Kacheln (Vorschule, Grundschule, Mittelstufe, Oberstufe, Ganztag) in den Stufenfarben,
  je mit Foto, Jahrgängen, einem Satz und Link zur Seite. Desktop: drei oben, zwei unten (Ganztag breit);
  mobil untereinander.
- Einleitung zum „Konzept eine Klasse“ und Button „Alles zur Anmeldung“ bleiben.
- Entfallen: die vier kleinen Karten (Ganztag, Ernährung, Förderung, eine Klasse) und die dunkle
  Stufenleiste; ihre Inhalte stehen in den Kacheln und auf den Seiten.

## Prüfung

- Lint und Typprüfung.
- Jede neue Route liefert 200; alte Anker-Links funktionieren.
- Stufenseiten zeigen die Anmeldung/Termine/Kontakte der richtigen Abteilung.
- Screenshots aller fünf Seiten und der Startseite auf Desktop und Mobil, hell und dunkel.
- Nach jeder Änderung prüfen, dass der Dev-Server die neue Fassung ausliefert.
