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
      cmsPhoto: 'nachmittag',
      intro: 'Der Schultag ist in Bänder gegliedert, damit jedes Kind auf unterschiedliche Weise lernen und seine Stärken entwickeln kann.',
      photo: {
        src: '/images/fotos/treppe-lesen.jpg',
        alt: 'Kinder lesen auf der Sitztreppe im Schulhaus, andere gehen mit Rucksack vorbei',
        width: 1041,
        height: 1196,
        objectPosition: '50% 50%',
      },
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
          icon: 'sport',
          courses: [
            { name: 'Basketball mit den Hamburg Towers', grades: 'Jg. 7–9', days: ['Mo', 'Di', 'Do'] },
            { name: 'Fußball', grades: 'Jg. 7–9', days: ['Mo', 'Di', 'Do'] },
            { name: 'Judo', grades: 'Jg. 7', days: ['Do'] },
            { name: 'Kickboxen', grades: 'Jg. 7–9', days: ['Mo', 'Di'] },
            { name: 'Schwertschaukampf', grades: 'Jg. 7–8', days: ['Mo'] },
            { name: 'Hip Hop', grades: 'Jg. 7–8', days: ['Mo'] },
            { name: 'Internationale Tänze', grades: 'Jg. 9', days: ['Di'] },
          ],
        },
        {
          title: 'Kunst und Musik',
          icon: 'kunst',
          courses: [
            { name: 'Comic zeichnen', grades: 'Jg. 7', days: ['Do'] },
            { name: 'Graffiti', grades: 'Jg. 7–8', days: ['Mo'] },
            { name: 'Zeichentrick und Animation', grades: 'Jg. 8', days: ['Do'] },
            { name: 'Design your Place', grades: 'Jg. 9', days: ['Di'] },
            { name: 'Wie schreibe ich einen Song?', grades: 'Jg. 7–9', days: ['Mo', 'Di'] },
          ],
        },
        {
          title: 'Medien und Alltag',
          icon: 'medien',
          courses: [
            { name: 'Medien gestalten', grades: 'Jg. 7', days: ['Do'] },
            { name: 'Social Media', grades: 'Jg. 9', days: ['Di'] },
            { name: 'MS Office', grades: 'Jg. 7', days: ['Do'] },
            { name: 'Küchenzauber', grades: 'Jg. 7–8', days: ['Mo'] },
            { name: 'Alltagsprofis', grades: 'Jg. 8–9', days: ['Di', 'Do'] },
          ],
        },
        {
          title: 'Treffpunkte',
          icon: 'treffpunkt',
          courses: [
            { name: 'Billard und Kicker', grades: 'Jg. 7–8', days: ['Mo'] },
            { name: 'Kirchdorf Beats im Jugendzentrum', grades: 'Jg. 8', days: ['Do'] },
            { name: 'Mädchenclub', grades: 'Jg. 7–8', days: ['Mo'] },
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
      // Text: Schulleitung (Mail vom 2.11.2026).
      paragraphs: [
        'Die Schulbibliothek ist Lese-, Lern- und Ruheort zugleich. Sie begleitet die täglichen Lesezeiten („Lesen macht schlau“) und ist in den Pausen geöffnet.',
        'Wir haben eine Kinderbibliothek und eine Jugendbibliothek mit rund 2.000 Büchern, die auf Leserinnen und Leser warten: Romane, Theaterstücke, Sachbücher und Titel auf Englisch und Türkisch. An den Computern üben die Kinder mit Antolin, dem Leseprogramm mit Quiz zu Kinderbüchern.',
      ],
      // Fotos: alte Website (2019).
      gallery: [
        { src: '/images/ganztag/bibliothek-leseecke.jpg', alt: 'Leseecke mit Sofa und bunten Sesseln vor den Bücherregalen', width: 1600, height: 1200, objectPosition: '50% 50%' },
        { src: '/images/ganztag/bibliothek-tische.jpg', alt: 'Runder Tisch mit bunten Stühlen vor dem Fenster und Bücherregalen', width: 1600, height: 1200, objectPosition: '50% 50%' },
        { src: '/images/ganztag/bibliothek-kinder.jpg', alt: 'Kinderbibliothek mit Regalen vor einer blauen Wand mit Fischen', width: 1600, height: 1200, objectPosition: '50% 50%' },
      ],
      highlights: [
        { text: 'Kinderbibliothek', color: 'accent' },
        { text: 'Jugendbibliothek', color: 'mint' },
      ],
    },
    {
      id: 'mensa',
      heading: 'Mittagessen und Brotzeit',
      cmsPhoto: 'mensa',
      intro: 'Alle Kinder bekommen ein kostenloses Frühstück (Brotzeit) und ein gesundes Mittagessen.',
      // Quellen: alte Seiten „Mittagessen“ (MensaMax) und „Mensaverein“; Preis und Fristen bei der Schule prüfen.
      photo: {
        src: '/images/fotos/abgekocht-kueche.jpg',
        alt: 'Ein Schüler brät in der Schulküche Fleisch für das Mittagessen, vor ihm stehen gefüllte Teller',
        width: 989,
        height: 1400,
        objectPosition: '50% 35%',
      },
      paragraphs: [
        'Bei uns wird selbst gekocht: Der Schulkoch, sein Team und Schülerinnen und Schüler kochen jeden Tag frisch in der Schulküche – mit regionalen Zutaten, Bio-Gemüse und Halal-Fleisch nach dem Standard der Deutschen Gesellschaft für Ernährung. Im Projekt Abgekocht! lernen die Kinder dabei selbst zu kochen.',
        'Zur Wahl stehen zwei Gerichte oder ein vegetarisches. Ein Essen kostet 4 €, mit dem Bildungs- und Teilhabepaket ist es kostenlos. Bestellt wird über MensaMax bis Dienstag für die folgende Woche, abbestellen geht bis 12 Uhr am Vortag.',
      ],
      highlights: [
        { text: 'Bei uns wird selbst gekocht', color: 'mint' },
        { text: 'Abgekocht!', color: 'accent' },
      ],
      links: [
        { label: 'Mehr zu Abgekocht!', href: '/schwerpunkt#abgekocht', style: 'button' },
        { label: 'Essen bestellen bei MensaMax', href: 'https://mensahaus.de', style: 'outline' },
        { label: 'mensaverein@stuebenhofer-weg.de', href: 'mailto:mensaverein@stuebenhofer-weg.de' },
      ],
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
