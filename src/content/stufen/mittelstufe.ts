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
      text: 'Nach der Grundschule müssen Sie sich noch nicht festlegen. Wir beobachten gemeinsam in Ruhe, welcher Bildungsweg ab Klasse 7 am besten passt.',
    },
    {
      title: 'Förderung von Anfang an',
      text: 'In Mathematik und Deutsch unterrichten wir ab Klasse 5 in Grund- und Erweiterungskursen.',
    },
    {
      title: 'Gymnasialzweig (Abitur nach 12 Jahren)',
      text: 'In zügigem Tempo zur Allgemeinen Hochschulreife – mit wissenschaftlichem Arbeiten und „Campus-Tagen“.',
    },
    {
      title: 'Stadtteilschulzweig (ESA, MSA oder Abitur nach 13 Jahren)',
      text: 'Ein Jahr mehr Zeit zum Üben und Festigen, mit binnendifferenziertem Unterricht und guter Berufsorientierung.',
    },
    {
      title: 'Kein Kind muss gehen',
      text: 'Ein Wechsel zwischen den Bildungswegen ist möglich, ohne die Schule zu verlassen. Freundschaften und Bezugspersonen bleiben.',
    },
  ],
  everyday: [
    {
      id: 'alltag',
      heading: 'So sieht der Schulalltag aus',
      points: [
        {
          title: 'Klasse 5 und 6',
          text: 'Grundlagen für selbstständiges Lernen: Arbeitsorganisation mit dem Logbuch, Lerntechniken und kooperatives Arbeiten. Dazu Willkommensnachmittag, Starterwoche, Klassenreise, Fahrrad- und HVV-Projekt, MINT-Tag und ein Schnupperkurs in der zweiten Fremdsprache.',
        },
        {
          title: 'Klasse 7 und 8',
          text: 'Interessen vertiefen in Technik und Wahlpflichtfächern. Ab Klasse 7 beginnt die zweite Fremdsprache (Französisch, Türkisch oder Spanisch); vor den Herbstferien geht es zum Kennenlernen ins Schullandheim.',
        },
        {
          title: 'Klasse 9 und 10',
          text: 'Im Mittelpunkt stehen gute Abschlüsse und ein gelungener Übergang. Praktikum und Praxislerntag gehören dazu; zum Abschluss feiern wir gemeinsam die Zeugnisübergabe.',
        },
      ],
    },
  ],
  support: true,
  careers: true,
  department: 'mittelstufe',
  next: 'oberstufe',
}
