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
      points: [
        { title: 'TUT-Zeit', text: 'Der Tag beginnt in der Klasse: organisieren, Konflikte klären, Vorhaben planen.' },
        { title: 'Unterrichtsband', text: 'Deutsch, Mathematik, Englisch, Sport, Kunst sowie Natur- und Gesellschaftswissenschaften.' },
        { title: 'Vertiefungsband', text: 'Üben mit den Fachlehrkräften und Fordern-/Fördern-Kurse, um Wissen anzuwenden oder Lücken zu schließen.' },
        { title: 'Mittagsfreizeit', text: 'Mittagessen, freies Spiel, Sport auf dem Hof oder in der Halle, Brettspiele, Basteln und Ruhezonen.' },
        { title: 'Mittags- und Nachmittagsband', text: 'Wahlkurse nach Interesse und praktisches Arbeiten mit Holz, Metall, Textil und in der Hauswirtschaft.' },
      ],
    },
    {
      id: 'kurse',
      heading: 'Kurse und AGs',
      intro: 'Beispiele aus dem Schuljahr 2024/25 – das aktuelle Angebot erhalten die Klassen zu Beginn des Halbjahres.',
      points: [
        { title: 'Sport', text: 'Judo, Fußball, Basketball mit den Hamburg Towers, Kickboxen, Hip Hop und internationale Tänze.' },
        { title: 'Kunst und Musik', text: 'Comic zeichnen, Graffiti, Zeichentrick und Animation, „Wie schreibe ich einen Song?“.' },
        { title: 'Medien und Alltag', text: 'Medien gestalten, Social Media, MS Office, Küchenzauber und „Alltagsprofis“.' },
        { title: 'Treffpunkte', text: 'Billard und Kicker, Kirchdorf Beats im Jugendzentrum und der Mädchenclub.' },
      ],
    },
  ],
  extra: [
    {
      id: 'bibliothek',
      heading: 'Schulbibliothek',
      paragraphs: [
        'Die Schulbibliothek ist Lese-, Lern- und Ruheort zugleich. Sie begleitet die täglichen Lesezeiten („Lesen macht schlau“) und ist in den Pausen geöffnet.',
      ],
    },
    {
      id: 'mensa',
      heading: 'Mittagessen und Brotzeit',
      intro: 'Alle Kinder bekommen ein kostenloses Frühstück (Brotzeit) und ein gesundes Mittagessen.',
      placeholder: 'Essenszeiten, Kosten, Bestellung und Brotzeit.',
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
