import type { StageContent } from './types'

// Quellen: Schulbroschüre 2026, alte Seiten „Vorschulisches Lernen“ und „Schwerpunkte“ (Vorschule).
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
      icon: 'miteinander',
      text: 'Mit klaren Ritualen und spielerischen Übungen lernen die Kinder ein respektvolles Miteinander. Gleichzeitig fördern wir gezielt die Sprache und das Sprechen miteinander.',
    },
    {
      title: 'Bewegung und Kreativität',
      icon: 'kreativ',
      text: 'Viel Raum zum Toben, Klettern und Spielen, dazu Sportunterricht mit unseren Sportlehrkräften – und Malen, Perlenfädeln, Schneiden, Backen und Fingerspiele, die die Feinmotorik stärken.',
    },
    {
      title: 'Forschen und Staunen',
      icon: 'tiere',
      text: 'Jede Woche geht es auf den Kinderbauernhof Kirchdorf, wo die Kinder Tiere pflegen und füttern, und in unsere Mathematikwerkstatt. Mit dem „Haus der kleinen Forscher“ experimentieren sie früh selbst.',
    },
    {
      title: 'Sprache von Anfang an',
      icon: 'buch',
      text: 'Jeden Tag wird vorgelesen, regelmäßig besuchen wir die Kinderbibliothek, und die Kinder lernen erste Buchstaben. Kinder mit Sprachförderbedarf fördern wir nach dem MITsprache-Konzept der Stiftung Fairchance.',
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
          cards: [
            { label: 'Wünsche äußern', icon: 'wunsch' },
            { label: 'Grenzen setzen', icon: 'grenze' },
            { label: 'Konflikte ruhig lösen', icon: 'versoehnen' },
          ],
        },
        {
          title: 'Gemeinsam frühstücken',
          text: 'Der Tag beginnt mit einem kostenlosen Frühstück mit der ganzen Klasse. Danach gibt es Mittagessen und ganztägige Betreuung mit Spiel und Spaß.',
          steps: [
            { label: 'Frühstück', note: 'kostenlos', icon: 'fruehstueck' },
            { label: 'Mittagessen', icon: 'mittagessen' },
            { label: 'Spiel und Spaß', note: 'ganztägig', icon: 'spiel' },
          ],
        },
        {
          title: 'Gut vorbereitet auf Klasse 1',
          text: 'Der Übergang in die Grundschule geschieht am selben Ort, mit vertrauten Menschen – das nimmt den Druck.',
          figure: '1',
          checks: ['Am selben Ort', 'Vertraute Menschen'],
        },
      ],
    },
  ],
  support: true,
  careers: false,
  department: 'primarstufe',
  next: 'grundschule',
}
