import type { StageContent } from './types'

// Quellen: Schulbroschüre 2026, alte Seite „Vorschulisches Lernen“.
export const vorschule: StageContent = {
  id: 'vorschule',
  name: 'Vorschule',
  grades: 'ab 5 Jahren',
  lead: 'Ein starker Start fürs Leben: In der Vorschule kommt das Beste aus Kita und Schule zusammen. Ihr Kind fühlt sich vom ersten Tag an sicher und geborgen.',
  teaser: 'Spielerisch die Welt entdecken – mit klaren Ritualen, viel Bewegung und wöchentlichen Besuchen auf dem Kinderbauernhof.',
  color: 'golden',
  photo: {
    src: '/images/fotos/vorschule-theater.jpg',
    alt: 'Vorschulkinder im Kostüm bei einer Theateraufführung',
    width: 1043,
    height: 642,
    objectPosition: '40% 35%',
  },
  photoSlot: 'vorschule',
  expect: [
    {
      title: 'Gemeinsam stark durch Regeln und Struktur',
      text: 'Mit klaren Ritualen und spielerischen Übungen lernen die Kinder ein respektvolles Miteinander. Gleichzeitig fördern wir gezielt die Sprache und das Sprechen miteinander.',
    },
    {
      title: 'Bewegung und Kreativität',
      text: 'Viel Raum zum Toben, Klettern und Spielen – und für Malen, Perlenfädeln, Schneiden, Backen und Fingerspiele, die die Feinmotorik stärken.',
    },
    {
      title: 'Entdecken und Natur',
      text: 'Jede Woche besuchen wir den Kinderbauernhof. Dort pflegen und füttern die Kinder Tiere und übernehmen früh Verantwortung.',
    },
  ],
  everyday: [
    {
      id: 'alltag',
      heading: 'So sieht der Alltag aus',
      intro: 'Die Vorschule ist ein geschützter Raum zwischen Kita und Schule. Hier wächst die Welt Ihres Kindes über die Familie hinaus.',
      route: [
        { label: 'Kita' },
        { label: 'Vorschule', note: 'geschützter Raum', current: true },
        { label: 'Klasse 1', note: 'am selben Ort' },
      ],
      points: [
        {
          title: 'Regeln, die Halt geben',
          text: 'Rollenspiele machen die Regeln greifbar.',
          questions: ['Wie verhalte ich mich im Klassenraum?', 'Beim Essen und auf der Toilette?', 'Wie gehe ich sicher über die Straße?'],
        },
        {
          title: 'Sprechen lernen',
          text: 'Die Kinder lernen, gut miteinander zu reden. Feste Sprechzeiten fördern die Sprachentwicklung.',
          tags: ['Wünsche äußern', 'Grenzen setzen', 'Konflikte ruhig lösen'],
        },
        {
          title: 'Gut vorbereitet auf Klasse 1',
          text: 'Der Übergang in die Grundschule geschieht am selben Ort, mit vertrauten Menschen – das nimmt den Druck.',
        },
      ],
    },
  ],
  support: true,
  careers: false,
  department: 'primarstufe',
  next: 'grundschule',
}
