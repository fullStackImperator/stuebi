import type { StageContent } from './types'

// Quellen: alte Seiten „Ganztagsschule“, „Kursangebot“ und „Schulbibliothek“. Die Seite zum Mittagessen
// ist nicht mehr erreichbar – Mensa, Brotzeit und Betreuungszeiten bleiben Platzhalter.
export const ganztag: StageContent = {
  id: 'ganztag',
  name: 'Ganztag',
  grades: 'Vorschule bis Klasse 13',
  lead: 'Ein rhythmisierter Schultag mit Zeit zum Lernen, Üben, Essen und Entdecken – und am Nachmittag Kurse, die Ihr Kind selbst wählt.',
  teaser: 'Ein Tag mit Rhythmus: Unterricht, Lernzeiten, gemeinsames Essen und Kurse von Judo bis Songwriting.',
  color: 'surface-ink',
  photo: {
    src: '/images/fotos/greenscreen.jpg',
    alt: 'Schülerinnen und Schüler drehen im Medienkurs vor einem Greenscreen',
    width: 1043,
    height: 960,
    objectPosition: '50% 40%',
  },
  expect: [
    {
      title: 'Lernzeiten statt Hausaufgaben',
      text: 'Geübt wird in der Schule, begleitet von Fachlehrkräften – zu Hause bleibt Zeit für Familie und Freizeit.',
    },
    {
      title: 'Kurse nach Interesse',
      text: 'Sport, Kunst, Musik, Medien und praktisches Arbeiten: Die Kinder und Jugendlichen wählen selbst.',
    },
    {
      title: 'Gemeinsam essen',
      text: 'Eine lange Mittagspause mit Mittagessen, freiem Spiel, Sport und Ruhezonen.',
    },
  ],
  everyday: [
    {
      id: 'tagesrhythmus',
      heading: 'Der Tagesrhythmus',
      intro: 'Der Schultag ist in Bänder gegliedert, damit jedes Kind auf unterschiedliche Weise lernen und seine Stärken entwickeln kann.',
      // Zeiten: TUT-Zeit laut Schule, Blöcke 2–4 aus dem Kursangebot 2024/25, Block 1 und Pausen daraus abgeleitet.
      schedule: [
        { time: '08:00–08:20', kind: 'start', title: 'TUT-Zeit', text: 'Der Tag beginnt in der Klasse: organisieren, Konflikte klären, Vorhaben planen.' },
        { time: '08:20–09:45', kind: 'unterricht', title: '1. Block · Unterrichtsband', text: 'Deutsch, Mathematik, Englisch, Sport, Kunst sowie Natur- und Gesellschaftswissenschaften.' },
        { time: '09:45–10:10', kind: 'pause', title: 'Pause' },
        { time: '10:10–11:35', kind: 'vertiefung', title: '2. Block · Vertiefungsband', text: 'Üben mit den Fachlehrkräften und Fordern-/Fördern-Kurse, um Wissen anzuwenden oder Lücken zu schließen.' },
        { time: '11:35–12:00', kind: 'pause', title: 'Pause' },
        { time: '12:00–13:25', kind: 'unterricht', title: '3. Block · Unterrichtsband', text: 'Unterricht in den Fächern und im Projekt, in dem die Klasse ein Jahrgangsthema erforscht.' },
        { time: '13:25–14:25', kind: 'pause', title: 'Mittagsfreizeit', text: 'Mittagessen, freies Spiel, Sport auf dem Hof oder in der Halle, Brettspiele, Basteln und Ruhezonen.' },
        { time: '14:25–15:55', kind: 'kurse', title: '4. Block · Kurse und AGs', text: 'Wahlkurse nach Interesse und praktisches Arbeiten mit Holz, Metall, Textil und in der Hauswirtschaft.', note: 'Freitags ohne 4. Block' },
      ],
    },
    {
      id: 'kurse',
      heading: 'Kurse und AGs',
      intro: 'Beispiele aus dem Schuljahr 2024/25 für die Jahrgänge 7 bis 9 – das aktuelle Angebot erhalten die Klassen zu Beginn des Halbjahres.',
      // Quelle: alte Seite „Kursangebot“ (1. Halbjahr 2024/25); Kurse in mehreren Jahrgängen stehen nur einmal.
      courses: [
        {
          title: 'Sport',
          courses: [
            { name: 'Basketball mit den Hamburg Towers', grades: 'Jg. 7–9', days: 'Mo · Di · Do' },
            { name: 'Fußball', grades: 'Jg. 7–9', days: 'Mo · Di · Do' },
            { name: 'Judo', grades: 'Jg. 7', days: 'Do' },
            { name: 'Kickboxen', grades: 'Jg. 7–9', days: 'Mo · Di' },
            { name: 'Schwertschaukampf', grades: 'Jg. 7–8', days: 'Mo' },
            { name: 'Hip Hop', grades: 'Jg. 7–8', days: 'Mo' },
            { name: 'Internationale Tänze', grades: 'Jg. 9', days: 'Di' },
          ],
        },
        {
          title: 'Kunst und Musik',
          courses: [
            { name: 'Comic zeichnen', grades: 'Jg. 7', days: 'Do' },
            { name: 'Graffiti', grades: 'Jg. 7–8', days: 'Mo' },
            { name: 'Zeichentrick und Animation', grades: 'Jg. 8', days: 'Do' },
            { name: 'Design your Place', grades: 'Jg. 9', days: 'Di' },
            { name: 'Wie schreibe ich einen Song?', grades: 'Jg. 7–9', days: 'Mo · Di' },
          ],
        },
        {
          title: 'Medien und Alltag',
          courses: [
            { name: 'Medien gestalten', grades: 'Jg. 7', days: 'Do' },
            { name: 'Social Media', grades: 'Jg. 9', days: 'Di' },
            { name: 'MS Office', grades: 'Jg. 7', days: 'Do' },
            { name: 'Küchenzauber', grades: 'Jg. 7–8', days: 'Mo' },
            { name: 'Alltagsprofis', grades: 'Jg. 8–9', days: 'Di · Do' },
          ],
        },
        {
          title: 'Treffpunkte',
          courses: [
            { name: 'Billard und Kicker', grades: 'Jg. 7–8', days: 'Mo' },
            { name: 'Kirchdorf Beats im Jugendzentrum', grades: 'Jg. 8', days: 'Do' },
            { name: 'Mädchenclub', grades: 'Jg. 7–8', days: 'Mo' },
          ],
        },
      ],
    },
  ],
  extra: [
    {
      id: 'bibliothek',
      heading: 'Schulbibliothek',
      photo: {
        src: '/images/ganztag/bibliothek.jpg',
        alt: 'Eine Schülerin schaut in der Schulbibliothek zwischen zwei Bücherregalen hervor',
        width: 1000,
        height: 667,
        objectPosition: '60% 50%',
      },
      paragraphs: [
        'Die Schulbibliothek ist Lese-, Lern- und Ruheort zugleich. Sie begleitet die täglichen Lesezeiten („Lesen macht schlau“) und ist in den Pausen geöffnet.',
        'Rund 2.000 Bücher warten auf Leserinnen und Leser: Romane, Theaterstücke, Sachbücher und Titel auf Englisch und Türkisch. An den Computern üben die Kinder mit Antolin, dem Leseprogramm mit Quiz zu Kinderbüchern.',
      ],
    },
    {
      id: 'mensa',
      heading: 'Mittagessen und Brotzeit',
      intro: 'Alle Kinder bekommen ein kostenloses Frühstück (Brotzeit) und ein gesundes Mittagessen.',
      placeholder: 'Essenszeiten, Kosten, Bestellung und Brotzeit.',
    },
    {
      id: 'koordination',
      heading: 'Ganztagskoordination',
      intro:
        'Die Ganztagskoordination kümmert sich um alles, was den Ganztag ausmacht: Sie plant das Kursangebot, verteilt die Plätze und ist Ansprechpartnerin für Fragen zum Nachmittag.',
      // Quelle: alte Seite „Ganztagskoordination“. Für Frau Rosien gibt es noch kein Foto (Initialen).
      people: [
        { name: 'Anneke Breyer', role: 'Sekundarstufe', email: 'ganztag-sekundarstufe@stuebenhofer-weg.de', image: '/images/ganztag/breyer.jpg' },
        { name: 'Miriam Rosien', role: 'Grundschule', email: 'ganztag-primarstufe@stuebenhofer-weg.de' },
      ],
    },
    {
      id: 'betreuung',
      heading: 'Betreuungszeiten',
      placeholder: 'Betreuungszeiten, Früh- und Spätbetreuung, Ferien.',
    },
  ],
  support: false,
  careers: false,
}
