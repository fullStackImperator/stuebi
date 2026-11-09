import type { CourseOffer, StageContent } from './types'

// Kurspartner, die in mehreren Jahrgängen vorkommen.
const SVW = 'SV Wilhelmsburg'
const homeround: CourseOffer = { name: 'Homeround', kind: 'homeround', partner: 'Jugendzentrum', room: 'Karl-Arnold-Ring 9' }
const dolleDeerns = { partner: 'Dolle Deerns', room: 'Mädchentreff, Erlerring 9' }

// Quellen: alte Seiten „Ganztagsschule“, „Kursangebot“ und „Schulbibliothek“. Die Seite zum Mittagessen
// ist nicht mehr erreichbar – Mensa, Brotzeit und Betreuungszeiten bleiben Platzhalter.
export const ganztag: StageContent = {
  id: 'ganztag',
  name: 'Ganztag',
  grades: 'Vorschule bis Klasse 13',
  lead: 'Ein rhythmisierter Schultag mit Zeit zum Lernen, Üben, Essen und Entdecken – und am Nachmittag Kurse, die Ihr Kind selbst wählt.',
  teaser: 'Ein Tag mit Rhythmus: Unterricht, Lernzeiten, gemeinsames Essen und Kurse von Fußball bis Stop-Motion.',
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
      icon: 'lernzeit',
      text: 'Geübt wird in der Schule, begleitet von Fachlehrkräften – zu Hause bleibt Zeit für Familie und Freizeit.',
    },
    {
      title: 'Kurse nach Interesse',
      icon: 'auswahl',
      text: 'Sport, Kreatives, Spiele und Treffpunkte im Stadtteil: Die Kinder und Jugendlichen wählen selbst.',
    },
    {
      title: 'Gemeinsam essen',
      icon: 'essen',
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
      // Zeiten: TUT-Zeit laut Schule, Blöcke 2–4 aus dem Kursangebot 2026/27, Block 1 und Pausen daraus abgeleitet.
      // § 45-Förderung am Donnerstag: Mail von Anneke Breyer (Ganztagskoordination), November 2026.
      // Praktisches Arbeiten im 4. Block gibt es nicht mehr: Herr Herpe, November 2026.
      schedule: [
        { time: '08:00–08:20', kind: 'start', title: 'TUT-Zeit', text: 'Der Tag beginnt in der Klasse: organisieren, Konflikte klären, Vorhaben planen.' },
        { time: '08:20–09:45', kind: 'unterricht', title: '1. Block · Unterrichtsband', text: 'Deutsch, Mathematik, Englisch, Sport, Kunst sowie Natur- und Gesellschaftswissenschaften.' },
        { time: '09:45–10:10', kind: 'pause', title: 'Pause' },
        { time: '10:10–11:35', kind: 'vertiefung', title: '2. Block · Vertiefungsband', text: 'Üben mit den Fachlehrkräften und Fordern-/Fördern-Kurse, um Wissen anzuwenden oder Lücken zu schließen.' },
        { time: '11:35–12:00', kind: 'pause', title: 'Pause' },
        { time: '12:00–13:25', kind: 'unterricht', title: '3. Block · Unterrichtsband', text: 'Unterricht in den Fächern und im Projekt, in dem die Klasse ein Jahrgangsthema erforscht.' },
        { time: '13:25–14:25', kind: 'pause', title: 'Mittagsfreizeit', text: 'Mittagessen, freies Spiel, Sport auf dem Hof oder in der Halle, Brettspiele, Basteln und Ruhezonen.' },
        { time: '14:25–15:55', kind: 'kurse', title: '4. Block · Kurse und AGs', text: 'Wahlkurse nach Interesse. Je nach Jahrgang liegen Kurse auch im 2. oder 3. Block. Praktisch gearbeitet wird bei Abgekocht!, mittwochs bei Barista und in den Werkstätten im Profil- und Praxistag und im Wahlpflichtbereich.', note: 'Donnerstags Förderung nach § 45 · freitags ohne 4. Block' },
      ],
    },
    {
      id: 'kurse',
      heading: 'Kurse und AGs',
      intro: 'Das Kursangebot im Schuljahr 2026/27 für die Jahrgänge 4 bis 10. Wählen Sie den Jahrgang Ihres Kindes: Sie sehen, an welchen Tagen es Kurse gibt, wer sie anbietet und wo sie stattfinden.',
      // Quelle: „Übersicht Kurse + Räume 2026/27“ von Anneke Breyer, Stand 2.9.2026. Kursleitungen nur als Einrichtung.
      courseSlots: [
        {
          grades: [10],
          day: 'Mo',
          block: 3,
          time: '12:00–13:25',
          courses: [
            { name: 'Fußball', kind: 'fussball', partner: SVW, room: 'Sporthalle H2' },
            { name: 'Design your place', kind: 'design', room: 'Kunstraum / Makerspace' },
            { name: 'Basketball', kind: 'basketball', partner: SVW, room: 'Sporthalle H1' },
          ],
        },
        {
          grades: [7, 8],
          day: 'Mo',
          block: 4,
          time: '14:25–15:55',
          courses: [
            { name: 'Fußball', kind: 'fussball', partner: SVW, room: 'Sporthalle H3' },
            { name: 'Basketball', kind: 'basketball', partner: 'Hamburg Towers', room: 'Sporthalle H5' },
            homeround,
            { name: 'Mädchenclub', kind: 'maedchen', ...dolleDeerns },
            { name: 'Schach', kind: 'schach', partner: SVW, room: 'Klassenraum 7d' },
            { name: 'Gesellschaftsspiele', kind: 'spiele', partner: SVW, room: 'Klassenraum 7c' },
            { name: 'Bastelwerkstatt', kind: 'basteln', partner: SVW, room: 'Klassenraum 7b' },
          ],
        },
        {
          grades: [9],
          day: 'Di',
          block: 3,
          time: '12:00–13:25',
          courses: [
            { name: 'Fußball', kind: 'fussball', partner: SVW, room: 'Sporthalle H2' },
            homeround,
            { name: 'Make your Mark – Gestalte deine Schule', kind: 'mark', partner: SVW, room: 'Kunstraum / Klassenraum' },
            { name: 'Stop-Motion und Fotografie Club', kind: 'foto', partner: SVW, room: 'Klassenraum 7c' },
          ],
        },
        {
          grades: [6],
          day: 'Di',
          block: 4,
          time: '14:25–15:55',
          courses: [{ name: 'Basketball', kind: 'basketball', partner: 'Hamburg Towers', room: 'Sporthalle H1' }, homeround],
        },
        {
          grades: [4, 5, 6],
          day: 'Mi',
          block: 4,
          time: '14:25–15:55',
          courses: [
            { name: 'Fußball', kind: 'fussball', partner: SVW, room: 'Sporthalle H3' },
            { name: 'Basketball', kind: 'basketball', partner: SVW, room: 'Sporthalle H2' },
            homeround,
            { name: 'Mädchentreff', kind: 'maedchen', ...dolleDeerns },
            { name: 'Schach', kind: 'schach', partner: SVW, room: 'Klassenraum 6a' },
            { name: 'Gesellschaftsspiele', kind: 'spiele', partner: SVW, room: 'Klassenraum 6b' },
          ],
        },
        {
          grades: [8],
          day: 'Do',
          block: 2,
          time: '10:10–11:35',
          courses: [
            { name: 'Fußball', kind: 'fussball', partner: SVW, room: 'Sporthalle H3' },
            { name: 'Basketball', kind: 'basketball', partner: 'Hamburg Towers', room: 'Sporthalle H2' },
            homeround,
          ],
        },
        {
          grades: [7],
          day: 'Do',
          block: 3,
          time: '12:00–13:25',
          courses: [
            { name: 'Fußball', kind: 'fussball', partner: SVW, room: 'Sporthalle H3' },
            homeround,
            { name: 'Bastelwerkstatt', kind: 'basteln', partner: SVW, room: 'Klassenraum 7d' },
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
