# Offene Fragen an die Schule

Inhalte auf der Website, bei denen wir unsicher sind: veraltete Quellen, nicht bestätigte Angaben,
Fotos mit unklaren Rechten oder Formulierungen, die wir selbst gewählt haben. Jede Frage nennt die
Stelle im Code, die Quelle und was zu klären ist. Erledigte Fragen werden gelöscht, nicht abgehakt.

Agenten tragen hier ein, was sie nicht selbst prüfen können (siehe `AGENTS.md`).

## Schwerpunkt-Seite (`/schwerpunkt`)

- **MINTprax-Projekte noch aktuell?** Nachwuchscampus der TUHH mit Mercedes-Benz (Werk Harburg) und die
  Kooperation mit Aurubis im Profil- und Praxistag. Quelle: alte Seite „MINTprax“ (etwa 2021/22).
  Stelle: `src/content/weitere-schwerpunkte.ts` → `mintprax.projects`.
- **MINTprax-Zahlen und Lernorte prüfen:** Gruppen mit 10–12 Kindern, 4 Räume für die Naturwissenschaften,
  Minitopia, MINTarium, ZSU, DESY@school, „Stübi-Mini-Phänomenta“. Gleiche Quelle, gleiche Stelle (`facts`, `points`).
- **Hörspiel „Reisender“ (2019) noch zeigen?** Der Preis ist einige Jahre alt. Stelle: `projektlernen.award`.
- **Stübi-Assistenten gibt es noch?** Jahrgang 8 in der Mittagsfreizeit. Quelle: alte Seite „Projektlernen“.
  Stelle: `projektlernen.points`.
- **Sport-Partner unvollständig?** Die alte Seite nennt zusätzlich FC Eintracht Norderstedt und den Hamburger
  Fußball-Verband. Nicht übernommen, weil unklar ist, ob die Kooperationen noch bestehen.
  Stelle: `src/content/schwerpunkte.ts` → `sport.partners`.
- **Sport-Wettkämpfe aktuell?** Bundesjugendspiele, Inselparklauf, Außenmühlenlauf, Uwe-Seeler-Pokal, Tag des Judo.
  Quelle: alte Seite „Sportbetonte Schule“ (2017/18). Stelle: `sport.groups`.
- **Fotos fehlen für Sport:** zwei Platzhalter „Foto folgt“ neben den Wettkämpfen – gesucht ein Foto vom Stübi-Cup
  oder einem Turnier und eines vom Judo oder einem Wettkampf. Stelle: `src/content/schwerpunkte.ts` →
  `sport.groupAside.missing`; ein Foto ersetzt dort den Eintrag.
- **Musik ganz weggelassen?** Im Kursangebot 2026/27 gibt es keinen Musikkurs mehr, deshalb steht unter „Was es
  sonst noch gibt“ statt „Musik & Chor“ jetzt „Treffpunkte im Stadtteil“. Gibt es Musik (Chor, Band) außerhalb der
  Kurse, kann sie zurück. Stelle: `src/app/(site)/(unterseiten)/schwerpunkt/page.tsx` → `extras`.

## Anmeldung auf den Stufenseiten

- **Anmeldeformulare von Frau Sabadija:** die Formulare für Klasse 5 und den Wechsel in Klasse 7 als PDF erbitten
  und zum Herunterladen anbieten. Das geht ohne Code im CMS: Abteilungen → Mittelstufe → Anmeldung → Downloads.
  Das Gleiche für Vorschule und Klasse 1 (Primarstufe) und die Vorstufe (Oberstufe), falls es dort Formulare gibt.
- **Anmeldung komplett online? (Frage an Herrn Herpe):** Kann der ganze Ablauf online laufen – Formular ausfüllen,
  Unterlagen hochladen, Termin buchen? Davon hängt ab, ob wir ein Online-Formular bauen oder bei Papier und
  Schulbüro bleiben.
- **„So geht’s“-Schritte aus den CMS-Texten:** Die Schritte für Vorschule, 1. Klasse und 5. Klasse stehen im Code und
  sind aus den Anmeldetexten im CMS abgeleitet. Ändert die Schule den Ablauf im CMS, müssen die Schritte mit.
  Stelle: `src/content/stufen/anmeldung.ts`.

## Stufenseiten: Inhalte von der alten Seite

- **Vorschule: Angebote noch aktuell?** Wöchentlich Mathematikwerkstatt, „Haus der kleinen Forscher“, Kinderbauernhof
  Kirchdorf, Sportunterricht mit Sportlehrkräften, Frühstück mit der ganzen Klasse, Sprachförderung nach MITsprache
  (Stiftung Fairchance). Quelle: alte Seite „Schwerpunkte“ (Vorschule). Stelle: `src/content/stufen/vorschule.ts` →
  `expect` („Forschen und Staunen“, „Sprache von Anfang an“, „Bewegung und Kreativität“) und `everyday` („Gemeinsam frühstücken“).
- **Grundschule: Angebote noch aktuell?** Mehr Wochenstunden in Deutsch und Mathematik, digitales Lernen, Mathematikwerkstatt,
  Wettbewerbe (Mathematik-Olympiade, Informatik-Biber, Papierflieger-Wettbewerb), MITsprache, festes Jahrgangsteam.
  Quelle: alte Seite „Schwerpunkte Jg. 1–4“. Stelle: `src/content/stufen/grundschule.ts` → `expect` und `everyday`.
- **Ganztag Grundschule: Zeiten?** Die alte Seite nennt Mo–Mi verbindlich bis 15:55 Uhr, Donnerstag auf Elternwunsch,
  freitags Betreuung. Nicht übernommen, bis die Zeiten bestätigt sind; prüfen gegen `src/content/stufen/ganztag.ts`.
- **Mittelstufe Klasse 5–6:** Lese-, Mathe- und Kunsttage, Sport- und Lauftage, Girls’ und Boys’ Day – gibt es die noch?
  Quelle: alte Seite „Informationen Jg. 5–10“. Stelle: `src/content/stufen/mittelstufe.ts` → `everyday.alltag.phases[0].tags`.
- **Oberstufe: Anmeldezeitraum** „Februar bis März, Bestätigung ab April, Zusage nach dem MSA“ von der alten Seite
  „Vorstufe Jg. 11“ (Schuljahr 2026/27); für 2027/28 bestätigen und den neuen Anmeldebogen erbitten.
  Stelle: `src/content/stufen/oberstufe.ts` → `anmeldungVorstufe`.
- **Oberstufe: Profil-Flyer von 2022 noch gültig?** Fair Play und Mein Start-Up, Stunden und Fächer aus der alten Seite
  „Profiloberstufe ab Jg. 12“. Neue Flyer lassen sich im CMS hochladen (Abteilungen → Oberstufe → Profil-Flyer).
  Stelle: `src/content/profile.ts` → `subjects`, `flyer`.

## Ganztag: Kursangebot

- **Kursangebot 2026/27 (Stand 2.9.2026):** aus der „Übersicht Kurse + Räume“ von Anneke Breyer. Die Kursleitungen
  stehen bewusst nur als Einrichtung auf der Seite (SV Wilhelmsburg, Hamburg Towers, Jugendzentrum, Dolle Deerns),
  ohne Namen. „Design your place“ (Herr Bredendiek) steht ohne Anbieter. Bei neuer Planung (Halbjahr) die Liste
  ersetzen. Stelle: `src/content/stufen/ganztag.ts` → `courseSlots`.
- **Genauer Name des Jugendzentrums?** Die Übersicht nennt nur „Jugendzentrum (Karl-Arnold-Ring 9)“. Stelle: gleiche
  Datei → `homeround`.
- **4. Block: praktisches Arbeiten noch aktuell?** Der Tagesrhythmus nennt „praktisches Arbeiten mit Holz, Metall,
  Textil und in der Hauswirtschaft“ (alte Seite). In der Kursübersicht 2026/27 steht dazu nichts. Stelle: gleiche
  Datei → `schedule`.

## Weitere Seiten

- **Zahlen auf `/vision` veraltet:** Schülerzahl (≈ 780) und Kollegium (≈ 100) stammen von der alten Seite
  „Kurz und knapp“. Stelle: `src/content/vision.ts` → `visionFacts`.
- **Was die Profile machen:** Die Stichworte („Sportevents planen“, „Eigene Produkte“ …) haben wir aus dem
  Profiltext abgeleitet, sie stehen so nicht in der Broschüre. Stelle: `src/content/profile.ts` → `doing`.
