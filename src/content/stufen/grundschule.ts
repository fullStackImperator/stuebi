import type { StageContent } from './types'

// Quellen: Schulbroschüre 2026, alte Seite „Informationen Jg. 1–4“.
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
      text: 'Tägliche Lesezeiten („Lesen macht schlau“) wecken die Lust auf Bücher. Besonders wissbegierige Kinder fördern wir in Talentgruppen wie „Weichenstellung“ der ZEIT-Stiftung und der „Digitalen Drehtür“.',
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
          text: 'Arbeitsgemeinschaften in Sport, Musik, Handwerk, Kunst und Theater ergänzen den Unterricht.',
        },
        {
          title: 'WIKI – Wissen für Kinder',
          text: 'Die Kinder gestalten Inhalte mit, vertiefen ihr Können und schließen Wissenslücken.',
        },
        {
          title: 'Drei Sportstunden pro Woche',
          text: 'Dazu Bewegungsangebote in Pausen und Mittagsfreizeit, eine offene Sporthalle und Turniere. Ausgewählte Kinder trainieren in der Talentgruppe des Hamburger Sportbundes.',
        },
        {
          title: 'Ein multiprofessionelles Team',
          text: 'Lehrkräfte arbeiten mit Sozialpädagoginnen und -pädagogen, Erzieherinnen und Erziehern und dem Team der Schulbibliothek zusammen.',
        },
      ],
    },
  ],
  support: true,
  careers: false,
  department: 'primarstufe',
  next: 'mittelstufe',
}
