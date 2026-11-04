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
- **„Musik & Chor“ – gibt es einen Chor?** Im Kursangebot des Ganztags stehen Songwriting und Beats, aber kein Chor.
  Stelle: `src/app/(site)/(unterseiten)/schwerpunkt/page.tsx` → `extras`.

## Weitere Seiten

- **Zahlen auf `/vision` veraltet:** Schülerzahl (≈ 780) und Kollegium (≈ 100) stammen von der alten Seite
  „Kurz und knapp“. Stelle: `src/content/vision.ts` → `visionFacts`.
- **Was die Profile machen:** Die Stichworte („Sportevents planen“, „Eigene Produkte“ …) haben wir aus dem
  Profiltext abgeleitet, sie stehen so nicht in der Broschüre. Stelle: `src/content/profile.ts` → `doing`.
