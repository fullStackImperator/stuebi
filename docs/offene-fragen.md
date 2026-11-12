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

- **Ganztag Grundschule: Zeiten?** Die alte Seite nennt Mo–Mi verbindlich bis 15:55 Uhr, Donnerstag auf Elternwunsch,
  freitags Betreuung. Nicht übernommen, bis die Zeiten bestätigt sind; prüfen gegen `src/content/stufen/ganztag.ts`.
- **Mittelstufe Klasse 5–6:** Lese-, Mathe- und Kunsttage, Sport- und Lauftage, Girls’ und Boys’ Day – gibt es die noch?
  Quelle: alte Seite „Informationen Jg. 5–10“. Herr Herpe schlägt vor, die Texte aus der Schulbroschüre zu nehmen. Stelle: `src/content/stufen/mittelstufe.ts` → `everyday.alltag.phases[0].tags`.
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
## Termine und Schulkalender

- **Wer trägt welche Termine wo ein?** Die Website hat zwei Quellen, und je nach Quelle erscheint ein Termin an
  anderer Stelle:
  - **CMS (Abteilungen → Termine):** Tag der offenen Tür, Feste, Anmeldezeiträume, Infoabende, Schulführungen. Diese
    Termine stehen auf `/termine` oben (Feste, Neue Familien) und auf den Stufenseiten unter „Nächste Termine“.
  - **Öffentlicher IServ-Kalender der Schule:** alles andere (Elternabende, LEG, Klassenreisen, Ferien …). Diese
    Termine stehen auf `/termine` unter „Schulkalender“, automatisch, höchstens eine Stunde nach dem Eintrag.
  Die Schulleitung sorgt dafür, dass der IServ-Kalender aktuell ist (Herr Herpe, Nov. 2026). Alles, was dort steht,
  ist öffentlich.
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

- **Schulbüro Primarstufe:** Gabriela Bajohr arbeitet nicht mehr an der Schule (Nov. 2026) und ist von der Website
  entfernt; jetzt steht Iris Westphal allein für „Vorschule – Kl. 4“. Gibt es eine Nachfolge (Name, Zuständigkeit,
  E-Mail, Foto)? Stelle: `src/content/contacts.ts` → Schulbüro-Team.
- **Berufsorientierung Mittelstufe:** Stimmen die drei Personen auf `/mittelstufe` noch – Konrad Sens (Koordination),
  Heike Lammerding und Sabine Henkel (Berufsschule BS 08, Mi und Do 8:20–13:20 Uhr)? Sabine Nieden (Elternmentorin)
  arbeitet nicht mehr an der Schule (Nov. 2026) und ist entfernt – gibt es eine neue Elternmentorin? Fehlt jemand
  (z. B. die Jugendberufsagentur)? Stelle: `src/content/stufen/shared.ts` → `careersBlock.people`.
- **Förderkoordination:** Florian Elpel ist Förderkoordinator für die ganze Schule, Sonja Kronenberg Sprachlernberaterin
  und für die Vorstellung der Viereinhalbjährigen zuständig (Herr Herpe, Nov. 2026). Offen: die Rolle von Sandra
  Woitschig, die Fotos und das Förderkonzept, das Herr Herpe bei beiden erbeten hat. Stelle: `src/content/stufen/shared.ts` → `supportBlock.people`.
- **Beratungsdienst (`/beratung`):** Texte stammen von der alten Seite (teils 2021), nur das Teamfoto ist von 2025.
  Bitte den Beratungsdienst gegenlesen lassen: Angebot, Sprechstunde (dienstags in der Mittagsfreizeit), Telefon
  040 – 428 7619 42, ob Jenny Zerbin (PTF-Koordinatorin) und Marina Merkina (Beratungslehrerin) noch in diesen Rollen
  sind und ob die Namen unter dem Teamfoto stimmen. Stelle: `src/content/beratung.ts`.

## Fotos

- **Fotos aus dem IServ-Bildarchiv (Nov. 2026):** Herr Herpe hat die Ordner „Bilder/2026“ und „Broschüre bunt/Bilder“
  für die Website genannt; die Verantwortung für die Einwilligungen liegt damit bei der Schule. Übernommen:
  Sumoturnier Jg. 4 und Fußballturnier Jg. 3 (`public/images/fotos/sport-sumoturnier.jpg`, `sport-fussballturnier.jpg`,
  Stelle `src/content/schwerpunkte.ts` → `sport.groupAside.more`). In die Seitenbilder gesetzt (Skript
  `scripts/iserv-fotos.ts`): Mensa beim Frühstück (Startseite, Breites Foto 1), Legokurs (Ganztag → Nachmittag),
  Mensa mit Obst (Ganztag → Mensa). Auf den Mensa- und Sportfotos sind Kinder zu erkennen – wenn jemand
  widerspricht, Foto austauschen.
- **Kollegiumsfoto auf `/vision`:** Es ist von 2022/23. Gibt es ein neueres? Einsetzen im CMS: Seitenbilder → Vision.
- **Titelbild der Startseite:** Jetzt das Foto von der Einschulungsfeier im August 2026 (Kinder mit blauen
  Papierkronen und Schultüten, Fotograf der Schule; Quelle: Beitrag auf der alten Website,
  `media/wp-2026-08-4M5A0467.jpg`). Mehrere Kinder sind groß und gut erkennbar. Gilt die Einwilligung der Eltern
  für den Beitrag auch für das Titelbild der Startseite? Sonst ein anderes Foto wählen. Datei
  `public/images/fotos/einschulung-feier.jpg`, Stelle `src/components/landingpage/hero.tsx` → `fallback`; ein im
  CMS gesetztes Bild (Seitenbilder → Startseite → Titelbild) hat Vorrang.
- **Fotos von Frau Sabadija:** In ihrem Dokument zur Anmeldung Klasse 5 stehen zwei „Foto“-Platzhalter. Welche Fotos
  meint sie?

## Weitere Seiten

- **Was die Profile machen:** Die Stichworte („Sportevents planen“, „Eigene Produkte“ …) haben wir aus dem
  Profiltext abgeleitet, sie stehen so nicht in der Broschüre. Stelle: `src/content/profile.ts` → `doing`.

## Impressum & Datenschutz

Beides ist ein sorgfältiger Entwurf, keine Rechtsberatung: Bitte vor dem Start von der Schulleitung und am besten
von der/dem Datenschutzbeauftragten der BSFB prüfen lassen. Alle Texte stehen in `src/content/rechtliches.ts`.
Mail-Entwurf an Herrn Herpe mit diesen Fragen: `docs/mails/2026-11-schulleitung-impressum-datenschutz.md`.

- **Schulleiter als V.i.S.d.P.:** Die alte Seite nannte nur „Bildungszentrum Stübenhofer Weg“; Matthias Herpe stand
  dort nur in den Metadaten. Wir nennen ihn als Vertreter der Schule und als Verantwortlichen nach § 18 MStV. Bitte
  von Herrn Herpe bestätigen lassen. Stelle: `principal`.
- **Datenschutzbeauftragte(r):** Name und Kontakt der/des zuständigen Datenschutzbeauftragten fehlen; bis dahin
  verweisen wir auf das Schulbüro. Stelle: `datenschutz` → „Verantwortliche Stelle“.
- **Anschrift der BSFB:** „Hamburger Straße 31, 22083 Hamburg“ ist die bekannte Behördenadresse – nach der
  Umbenennung in BSFB bitte prüfen. Stelle: `impressum` → „Aufsichtsbehörde“.
- **Hosting:** Die Erklärung beschreibt schon den Betrieb bei Hetzner (Hetzner Online GmbH, Gunzenhausen), solange
  die Vorschau noch auf Vercel läuft. Vor dem Start auf Hetzner erledigen, damit der Text stimmt: Server in einem
  deutschen Rechenzentrum wählen (Nürnberg oder Falkenstein, nicht Helsinki), den Vertrag zur Auftragsverarbeitung
  (Art. 28 DSGVO) in der Hetzner-Konsole abschließen und die Server-Protokolle nach 7 Tagen löschen lassen (z. B.
  logrotate). Ändert sich etwas davon: `hosting` in `src/content/rechtliches.ts`.
- **Rechtsgrundlagen:** Art. 6 Abs. 1 lit. e DSGVO mit dem HmbDSG (Server-Protokolle), § 25 Abs. 2 Nr. 2 TDDDG
  (Hell/Dunkel im localStorage) und Einwilligung für Fotos – bitte fachlich bestätigen.
- **Bildnachweis:** „Fotos: Schule Stübenhofer Weg, Schulbroschüre und Archiv der Schule“. Gibt es Fotos von
  Fotografen, die namentlich genannt werden müssen? Stelle: `impressum` → „Urheberrecht“.

## Weiterleitungen von der alten Seite

Für diese alten Seiten gibt es auf der neuen Website keine eigene Seite. Sie leiten deshalb auf die
nächstliegende Seite weiter. Stelle: `src/content/alte-seite-weiterleitungen.ts` → `toReview`.
Soll eine davon anders weiterleiten oder fehlt der Inhalt auf der neuen Seite?

- `presse` → `/news`
- `auszeichnungen-preise` → `/vision` (Preise stehen nirgends gesammelt)
- `wir-ueber-uns/regeln` → `/vision` (Schulregeln fehlen auf der neuen Seite)
- `wir-ueber-uns/allgemein/arbeitsplatz-schule`, `kontakt/verwaltung/stellenanzeigen` → `/` (keine Stellenanzeigen)
- `schulverein` → `/#foerderer`
- `elternarbeit` → `/beratung#angebot`
- `kontakt/gremien/schulkonferenz` → `/vision` (Gremien fehlen auf der neuen Seite)
- `bildungswege/eingangsstufe/informationen` → `/grundschule`
- `kontakt/beratung/foerderkoordination` → `/mittelstufe#foerderung`
- `mensaverein` → `/ganztag#mensa`
- `sportfoerderverein` → `/schwerpunkt#sport`
- `lernen/praxis-lernen/luetting`, `schulleben/projekte/luetting` → `/schwerpunkt#mehr` (Lütting gibt es nicht mehr?)
- `lernen/praxis-lernen/schulerzeitung`, `kontakt/beratung/schuelerzeitung` → `/schwerpunkt#mehr` (Schülerzeitung?)
- `schulleben/schulfahrten/sprachreisen` → `/termine#jahreslauf`
- `schulleben/schullandheime/ostseeheim-stein` → `/termine#jahreslauf`
