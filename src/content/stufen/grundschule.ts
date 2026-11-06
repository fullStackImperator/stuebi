import type { StageContent } from './types'

// Quellen: Schulbroschüre 2026, alte Seiten „Informationen Jg. 1–4“ und „Schwerpunkte Jg. 1–4“.
export const grundschule: StageContent = {
  id: 'grundschule',
  name: 'Grundschule',
  grades: 'Klasse 1–4',
  lead: 'In den Klassen 1 bis 4 legen wir eine starke Basis: Lesen, Schreiben und Rechnen – und eine Klasse, die zu einer echten Gemeinschaft zusammenwächst.',
  teaser: 'Lernzeiten statt Hausaufgaben, ein bewegtes Klassenzimmer und jeden Tag Kurse von Theater bis Sport.',
  color: 'mint',
  photo: {
    src: '/images/fotos/grundschule-spiel.jpg',
    alt: 'Zwei Grundschulkinder spielen gemeinsam ein Lernspiel',
    width: 1043,
    height: 642,
    objectPosition: '50% 40%',
  },
  photoSlot: 'grundschule',
  expect: [
    {
      title: 'Lernzeiten statt Hausaufgaben',
      text: 'Geübt wird in der Schule, begleitet von unserem Team. So bleibt am Nachmittag Zeit für Spiel, Erholung und Familie.',
    },
    {
      title: 'Lernen in Bewegung',
      text: 'Das „bewegte Klassenzimmer“ und aktive Pausen bringen Schwung in den Tag. Als sportbetonte Schule arbeiten wir dafür auch mit den Hamburg Towers zusammen.',
    },
    {
      title: 'Passgenaue Förderung',
      text: 'Tägliche Lesezeiten („Lesen macht schlau“) wecken die Lust auf Bücher. Besonders wissbegierige Kinder fördern wir in Talentgruppen wie „Weichenstellung“ der ZEIT-Stiftung und der „Digitalen Drehtür“. Kinder mit Sprachförderbedarf lernen nach dem MITsprache-Konzept der Stiftung Fairchance.',
    },
    {
      title: 'Jeden Tag wählen',
      text: 'Nach dem Unterricht sucht sich Ihr Kind aus Theater, Kunst, Musik oder Sport täglich das Angebot aus, das ihm Spaß macht.',
    },
  ],
  everyday: [
    {
      id: 'alltag',
      heading: 'So sieht der Schulalltag aus',
      points: [
        {
          title: 'Ganztag mit Zeit für Talente',
          text: 'Arbeitsgemeinschaften ergänzen den Unterricht.',
          cards: [
            { label: 'Sport', icon: 'sport' },
            { label: 'Musik', icon: 'musik' },
            { label: 'Handwerk', icon: 'handwerk' },
            { label: 'Kunst', icon: 'kunst' },
            { label: 'Theater', icon: 'theater' },
          ],
        },
        {
          figure: 'WIKI',
          title: 'Wissen für Kinder',
          text: 'Die Kinder gestalten Inhalte mit, vertiefen ihr Können und schließen Wissenslücken.',
        },
        {
          figure: '3',
          title: 'Sportstunden pro Woche',
          text: 'Dazu Bewegungsangebote in Pausen und Mittagsfreizeit, eine offene Sporthalle und Turniere. Ausgewählte Kinder trainieren in der Talentgruppe des Hamburger Sportbundes.',
        },
        {
          // Letter blocks: letters and numbers at a glance.
          figure: 'A+1',
          title: 'Mehr Deutsch und Mathe',
          text: 'Wir haben die Wochenstunden in Deutsch und Mathematik erhöht. In beiden Fächern lernen die Kinder auch digital, dazu kommen Besuche in der Kinderbibliothek.',
        },
        {
          title: 'Forschen und Denken',
          text: 'Jede Woche erforschen die Kinder in der Mathematikwerkstatt spielerisch die Welt der Zahlen. Jedes Jahr können sie bei Wettbewerben mitmachen.',
          cards: [
            { label: 'Mathematik-Olympiade', icon: 'olympiade' },
            { label: 'Informatik-Biber', icon: 'informatik' },
            { label: 'Papierflieger-Wettbewerb', icon: 'papierflieger' },
          ],
        },
        {
          title: 'Ein festes Jahrgangsteam',
          text: 'Klassenlehrkraft, Fachlehrkräfte und Erzieherinnen und Erzieher begleiten den Jahrgang gemeinsam – für sanfte Übergänge von der Vorschule in Klasse 1 und von Klasse 4 in Klasse 5. Im Alltag arbeiten diese Berufe zusammen:',
          team: [
            { label: 'Lehrkräfte', icon: 'lehrkraft' },
            { label: 'Sozialpädagogik', icon: 'sozialpaedagogik' },
            { label: 'Erzieherinnen und Erzieher', icon: 'erzieher' },
            { label: 'Schulbibliothek', icon: 'bibliothek' },
          ],
        },
      ],
    },
  ],
  support: true,
  careers: false,
  department: 'primarstufe',
  next: 'mittelstufe',
}
