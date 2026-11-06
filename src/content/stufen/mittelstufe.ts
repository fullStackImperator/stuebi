import type { StageContent } from './types'

// Quellen: Schulbroschüre 2026, alte Seite „Informationen Jg. 5–10“.
export const mittelstufe: StageContent = {
  id: 'mittelstufe',
  name: 'Mittelstufe',
  grades: 'Klasse 5–10',
  lead: 'Die Mittelstufe ist die Brücke zwischen Kindheit und Jugend: mit klarer Orientierung, hohem fachlichem Anspruch und der Sicherheit, dass alle Bildungswege offenstehen.',
  teaser: 'Erst gemeinsam ankommen, dann ab Klasse 7 der passende Weg – zum Abitur nach 12 oder 13 Jahren, ohne die Schule zu wechseln.',
  color: 'accent',
  photo: {
    src: '/images/fotos/mittelstufe-daumen.jpg',
    alt: 'Zwei Schüler der Mittelstufe zeigen ein Projekt und lachen',
    width: 1043,
    height: 774,
    objectPosition: '50% 30%',
  },
  photoSlot: 'mittelstufe',
  expect: [
    {
      title: 'Beobachtungsstufe (Klasse 5 und 6)',
      icon: 'beobachten',
      text: 'Nach der Grundschule müssen Sie sich noch nicht festlegen. Wir beobachten gemeinsam in Ruhe, welcher Bildungsweg ab Klasse 7 am besten passt.',
    },
    {
      title: 'Förderung von Anfang an',
      icon: 'foerderung',
      text: 'In Mathematik und Deutsch unterrichten wir ab Klasse 5 in Grund- und Erweiterungskursen.',
    },
    {
      title: 'Neigungen entdecken',
      icon: 'kompass',
      text: 'Eigene Schwerpunkte in Natur- oder Gesellschaftswissenschaften und ein vielfältiger Ganztag mit Kunst, Kultur, Sport, Informatik und Technik.',
    },
    {
      title: 'Kein Kind muss gehen',
      icon: 'zuhause',
      text: 'Ein Wechsel zwischen den Bildungswegen ist möglich, ohne die Schule zu verlassen. Freundschaften und Bezugspersonen bleiben.',
    },
  ],
  everyday: [
    {
      // Broschüre 2026: „Zwei Bildungswege ab Jahrgang 7“. Die Grafik dazu baut src/components/stufen/zweige.tsx.
      id: 'zweige',
      heading: 'Zwei Bildungswege, eine Schule',
      intro:
        'Nach der gemeinsamen Beobachtungsstufe geht es ab Klasse 7 auf einem von zwei Wegen weiter. Alle bleiben dabei in derselben Schulgemeinschaft.',
      points: [
        {
          title: 'Gymnasialzweig',
          figure: 'Abitur nach 12 Jahren',
          text: 'In zügigem Lerntempo geht es direkt in Richtung Allgemeine Hochschulreife.',
          tags: ['Zügiges Lerntempo (G8)', 'Wissenschaftliches Arbeiten und komplexe Themen', '„Campus-Tage“ zur Vorbereitung aufs Studium'],
        },
        {
          title: 'Stadtteilschulzweig',
          figure: 'ESA, MSA oder Abitur nach 13 Jahren',
          text: 'Dieser Weg gibt ein Jahr mehr Zeit zum Üben und Festigen.',
          tags: ['Ein Jahr mehr Zeit (G9)', 'Binnendifferenzierter Unterricht', 'Starke Berufsorientierung für Ausbildung oder Oberstufe'],
        },
      ],
    },
    {
      id: 'alltag',
      heading: 'So sieht der Schulalltag aus',
      phases: [
        {
          grades: 'Klasse 5 und 6',
          title: 'Selbstständig lernen',
          text: 'Grundlagen für selbstständiges Lernen: Arbeitsorganisation mit dem Logbuch, Lerntechniken und kooperatives Arbeiten.',
          tags: [
            'Willkommensnachmittag',
            'Starterwoche',
            'Klassenreise',
            'Fahrrad- und HVV-Projekt',
            'Lese-, Mathe- und Kunsttage',
            'Sport- und Lauftage',
            'MINT-Tag',
            'Girls’ und Boys’ Day',
            'Schnupperkurs 2. Fremdsprache',
          ],
        },
        {
          grades: 'Klasse 7 und 8',
          title: 'Interessen vertiefen',
          text: 'Interessen vertiefen in Technik und Wahlpflichtfächern. Ab Klasse 7 beginnt die zweite Fremdsprache: Französisch, Türkisch oder Spanisch.',
          tags: ['Technik', 'Wahlpflichtfächer', '2. Fremdsprache', 'Schullandheim vor den Herbstferien'],
        },
        {
          grades: 'Klasse 9 und 10',
          title: 'Abschlüsse und Übergang',
          text: 'Im Mittelpunkt stehen gute Abschlüsse und ein gelungener Übergang.',
          tags: ['Praktikum', 'Praxislerntag', 'Zeugnisübergabe'],
        },
      ],
    },
  ],
  extra: [
    {
      id: 'jahresplan',
      heading: 'Jahresplan 2026/27',
      intro: 'Die wichtigsten Termine der Jahrgänge 8 bis 10: Lernentwicklungsgespräche, Kompetenztests, Praktika, Prüfungen und Klassenreisen.',
    },
  ],
  support: true,
  careers: true,
  department: 'mittelstufe',
  next: 'oberstufe',
}
