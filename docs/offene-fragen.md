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
- **MakerLand-Bild auf der Website erlaubt?** Die Bildkachel „MakerLand spielen“ zeigt das Intro-Bild und das Logo
  aus dem Spiel selbst (makerland.stuebi-makerspace.de, dort gibt es eine Seite „Lizenzen und Quellen“). Bitte vom
  Makerspace-Team bestätigen lassen. Stelle: `src/content/schwerpunkte.ts` → `makerspace.portals`,
  Dateien `public/images/fotos/makerland.jpg` und `public/images/makerland-logo.png`.

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

## Termine und Schulkalender

- **Wer trägt welche Termine wo ein?** Die Website hat zwei Quellen, und je nach Quelle erscheint ein Termin an
  anderer Stelle:
  - **CMS (Abteilungen → Termine):** Tag der offenen Tür, Feste, Anmeldezeiträume, Infoabende, Schulführungen. Diese
    Termine stehen auf `/termine` oben (Feste, Neue Familien) und auf den Stufenseiten unter „Nächste Termine“.
  - **Öffentlicher IServ-Kalender der Schule:** alles andere (Elternabende, LEG, Klassenreisen, Ferien …). Diese
    Termine stehen auf `/termine` unter „Schulkalender“, automatisch, höchstens eine Stunde nach dem Eintrag.
  Zu klären: Wer pflegt den IServ-Kalender, und welche Termine gehören hinein? Alles, was dort steht, ist öffentlich.
- **Wie ein IServ-Termin aussehen muss, damit er auf der Website gut aussieht:**
  - **Titel** so, wie er auf der Website stehen soll, kurz und für Eltern verständlich („Elternabend Jg. 5“, nicht
    „EA 5abc“). Die Beschreibung des Termins wird auf der Website nicht angezeigt.
  - **Ganze Tage** als „ganztägig“ eintragen, mehrtägige Termine (Klassenreise, Ferien) als ein Termin vom ersten
    bis zum letzten Tag, nicht als einzelne Tage.
  - **Uhrzeit** mit Beginn und Ende, dann steht „18:00 – 19:30 Uhr“ da.
  - **Ort** ins Feld „Ort“ (Raum oder Gebäude), er wird mit angezeigt.
  - **Wiederkehrende Termine** als Serie anlegen, die Website zeigt die nächsten Termine der Serie.
  - **Keine Namen von Kindern** und keine internen Hinweise in Titel oder Ort.
  Stelle: `src/lib/iserv-calendar.ts` (liest Titel, Datum/Uhrzeit, Ort).
- **Termine der Mittelstufe:** Der Jahresplan auf `/mittelstufe` hat nur die Jahrgänge 8–10 (von Frau Sabadija). Gibt
  es solche Termine auch für 5–7? Und die Termine für den Wechsel in Klasse 7 (werden mit dem HSG abgestimmt).
  Stelle: `src/content/jahresplan-mittelstufe.ts`.
- **„Ein Jahr an der Stübi“ (`/termine#jahreslauf`) bitte von Frau Sabadija bestätigen lassen:** Die Monate stammen
  aus dem Stübi-Kalender **2025/26**. Liegen die Ereignisse 2026/27 wieder im selben Monat? Die kurzen Erklärzeilen
  sind selbst formuliert (z. B. „Lichterfest: Laternen und Lichter“, „Bundesjugendspiele: der Sporttag der Schule“,
  „Fastenbrechen: gemeinsam essen im Ramadan“ – der Ramadan wandert jedes Jahr etwa elf Tage nach vorn, 2027 liegt
  er im Februar/März). Weggelassen, weil unklar: **„OSW-Cup“** (Januar) – was ist das, und gehört er dazu?
  Stelle: `src/content/jahreslauf.ts`.

## Ganztag: Betreuungszeiten

- **Betreuungszeiten fehlen:** Der Abschnitt „Betreuungszeiten“ auf `/ganztag` ist noch ein Platzhalter. Gebraucht:
  Kernzeit (bis wann ist der Ganztag verbindlich, an welchen Tagen?), Früh- und Spätbetreuung (ab/bis wann, Kosten,
  Anmeldung), Ferienbetreuung (welche Wochen, wo, wie anmelden) – jeweils für Vorschule/Grundschule und für die
  Mittelstufe, falls es Unterschiede gibt. Stelle: `src/content/stufen/ganztag.ts` → Block `betreuung`.
- Hängt zusammen mit der Frage oben unter „Stufenseiten“: Ganztag Grundschule Mo–Mi bis 15:55 Uhr (alte Seite).

## Ansprechpersonen prüfen

- **Schulbüro Primarstufe:** Ist Gabriela Bajohr (neben Iris Westphal) noch im Schulbüro der Primarstufe? Stimmen
  Zuständigkeit („Vorschule – Kl. 4“), E-Mail und Foto? Stelle: `src/content/contacts.ts` → Schulbüro-Team.
- **Berufsorientierung Mittelstufe:** Stimmen die vier Personen auf `/mittelstufe` noch – Konrad Sens (Koordination),
  Heike Lammerding und Sabine Henkel (Berufsschule BS 08, Mi und Do 8:20–13:20 Uhr), Sabine Nieden (Elternmentorin)?
  Fehlt jemand (z. B. die Jugendberufsagentur)? Stelle: `src/content/stufen/shared.ts` → `careersBlock.people`.
- **Förderkoordination:** Welche der drei (Florian Elpel, Sonja Kronenberg, Sandra Woitschig) ist für welche Stufe
  zuständig? Fotos fehlen noch. Stelle: `src/content/stufen/shared.ts` → `supportBlock.people`.
- **Beratungsdienst (`/beratung`):** Texte stammen von der alten Seite (teils 2021), nur das Teamfoto ist von 2025.
  Bitte den Beratungsdienst gegenlesen lassen: Angebot, Sprechstunde (dienstags in der Mittagsfreizeit), Telefon
  040 – 428 7619 42, ob Jenny Zerbin (PTF-Koordinatorin) und Marina Merkina (Beratungslehrerin) noch in diesen Rollen
  sind und ob die Namen unter dem Teamfoto stimmen. Stelle: `src/content/beratung.ts`.

## Fotos

- **Startseite, breites Foto nach „Vision“:** Hier steht ein Platzhalter „Foto folgt“. Ein breites Foto ohne
  erkennbare Kindergesichter lässt sich im CMS einsetzen: Seitenbilder → Startseite → Breites Foto 1.
- **Ganztag: Nachmittag und Mittagessen:** Die Fotos der alten Ganztagsseiten sind fast alle Stockfotos, deshalb
  nicht übernommen. Gesucht: ein eigenes Foto aus einem Nachmittagskurs und eines aus der Mensa. Einsetzen im CMS:
  Seitenbilder → Ganztag → Nachmittag / Mensa. Neben dem Tagesrhythmus steht bis dahin dasselbe Foto wie auf der
  Startseite (Treppe).
- **Kollegiumsfoto auf `/vision`:** Es ist von 2022/23. Gibt es ein neueres? Einsetzen im CMS: Seitenbilder → Vision.
- **Titelbild der Startseite:** Das Treppenfoto zeigt zwei Mädchen im Vordergrund gut erkennbar. Ist das so in
  Ordnung (Einverständnis der Eltern), oder lieber ein anderes? Einsetzen im CMS: Seitenbilder → Startseite → Titelbild.
- **Fotos von Frau Sabadija:** In ihrem Dokument zur Anmeldung Klasse 5 stehen zwei „Foto“-Platzhalter. Welche Fotos
  meint sie?

## Weitere Seiten

- **Zahlen auf `/vision` veraltet:** Schülerzahl (≈ 780) und Kollegium (≈ 100) stammen von der alten Seite
  „Kurz und knapp“. Stelle: `src/content/vision.ts` → `visionFacts`.
- **Was die Profile machen:** Die Stichworte („Sportevents planen“, „Eigene Produkte“ …) haben wir aus dem
  Profiltext abgeleitet, sie stehen so nicht in der Broschüre. Stelle: `src/content/profile.ts` → `doing`.
