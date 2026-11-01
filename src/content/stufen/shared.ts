import type { Photo } from '@/lib/photo'
import type { Block } from './types'

// Förderung und Beratungsdienst, gleich auf allen Stufenseiten (Quelle: alte Webseite, Beratungsdienst).
// Bewusst ohne Namensliste des Teams – nur Angebote und allgemeiner Kontakt.
export const supportBlock: Block = {
  id: 'foerderung',
  heading: 'Förderung & Beratung',
  intro:
    'Jedes Kind lernt anders. Lehrkräfte, Sozialpädagoginnen und -pädagogen sowie Erzieherinnen und Erzieher begleiten Ihr Kind gemeinsam.',
  points: [
    {
      title: 'Sprachförderung',
      text: 'Gezielte Unterstützung beim Deutschlernen – von der Vorschule bis zum Abschluss.',
    },
    {
      title: 'Lern- und Entwicklungsförderung',
      text: 'Wer mehr Zeit braucht, bekommt sie: in kleinen Gruppen, mit Lernzeiten und individueller Begleitung.',
    },
    {
      title: 'Beratungsdienst',
      text: 'Vertrauliche Beratung bei persönlichen, familiären und schulischen Fragen, Klassenberatung etwa bei Mobbing, Streitschlichtung und das Elterncafé.',
    },
  ],
  paragraphs: [
    'Die Beratungslehrerin hat dienstags in der Mittagsfreizeit Sprechstunde im Beratungsraum neben der Schulbibliothek, weitere Termine nach Vereinbarung.',
  ],
  links: [
    { label: 'beratungsdienst@stuebenhofer-weg.de', href: 'mailto:beratungsdienst@stuebenhofer-weg.de' },
    { label: '040 – 428 7619 42', href: 'tel:+4940428761942' },
  ],
}

// Berufs- und Studienorientierung, nur auf der Seite der Mittelstufe. Quellen: Schulbroschüre 2026 (Klasse 8
// und 9), alte Seiten „Unser Ziel“, „Betriebspraktikum“, „Beratung Berufsorientierung“ und die Schülerfirmen.
export const careersBlock: Block = {
  id: 'berufsorientierung',
  heading: 'Berufsorientierung',
  intro:
    'Wir bereiten früh und praxisnah auf Ausbildung, Studium und Beruf vor. Unser Ziel: Jede Schülerin und jeder Schüler verlässt Klasse 10 mit einem konkreten Anschluss.',
  phases: [
    {
      grades: 'Klasse 8',
      title: 'Stärken entdecken',
      text: 'Berufsorientierungstage, Kompetenzanalyse und Werkstatttage zeigen, welche Berufe zu wem passen.',
      tags: ['Berufsorientierungstage', 'Kompetenzanalyse', 'Werkstatttage', 'Projektwoche Berufsinformation'],
    },
    {
      grades: 'Klasse 9',
      title: 'Praxis erleben',
      text: 'Ein zweiwöchiges Betriebspraktikum und jeden Mittwoch ein Praxislerntag – im Betrieb oder in einer Schülerfirma.',
      tags: ['Betriebspraktikum', 'Praxislerntag', 'Schülerfirmen'],
    },
    {
      grades: 'Klasse 10',
      title: 'Übergang planen',
      text: 'Wir begleiten die Bewerbungen und gleichen Berufswünsche mit den Anforderungen der Betriebe ab – bis der Weg in Ausbildung, Berufsschule oder Oberstufe steht.',
      tags: ['Bewerbungen', 'Betriebsbesichtigungen', 'Anschlussplan'],
    },
  ],
  tracks: {
    heading: 'Zwei besondere Klassen im 10. Jahrgang',
    photo: {
      src: '/images/berufsorientierung/betriebsbesichtigung.jpg',
      alt: 'Schüler in Arbeitskleidung machen bei einer Betriebsbesichtigung in einer Werkstatt ein Gruppenfoto',
      width: 1400,
      height: 933,
      objectPosition: '50% 40%',
    },
    items: [
      {
        title: 'Ausbildungsklasse',
        text: 'Kleine Lerngruppe mit vier Blockpraktika im Jahr, wöchentlichem Coaching und Theorieblöcken in Deutsch, Mathematik und Englisch – als Vorbereitung auf eESA oder MSA.',
      },
      {
        title: 'Fokusklasse',
        text: 'Höchstens 15 Schülerinnen und Schüler, die teils im Haus der Jugend Kirchdorf lernen – mit täglichem Coaching, sozialpädagogischer Begleitung und Praktika.',
      },
    ],
  },
  companies: [
    { name: 'Barista', text: 'Kaffeespezialitäten und ein kleiner Mittagstisch – vom Einkauf bis zum Service.', image: '/images/berufsorientierung/barista.jpg' },
    { name: 'Medien-Stübi', text: 'Logos, Flyer, Fotos und Videos für die Schule – und Hilfe bei der Schul-IT.', image: '/images/berufsorientierung/medien-stuebi.jpg' },
    { name: 'Holzwerkstatt', text: 'Möbel, Spielzeug und Deko aus Holz, gebaut in der Makerspace-Werkstatt.', image: '/images/berufsorientierung/holzwerkstatt.jpg' },
    { name: 'SUO Design', text: 'Taschen und Textilien entwerfen, nähen, kalkulieren und verkaufen.', image: '/images/berufsorientierung/suo-design.jpg' },
    { name: 'Stübi-Manager', text: 'Die Finanzabteilung der Schülerfirmen – und Unterstützung für den Schulverein.', image: '/images/berufsorientierung/stuebi-manager.jpg' },
    { name: 'Kazumi', text: 'Naturkosmetik wie Seifen, Salben und Badekugeln aus natürlichen Zutaten.', image: '/images/berufsorientierung/kazumi.jpg' },
  ],
  people: [
    { name: 'Konrad Sens', role: 'Koordination', email: 'konrad.sens@stuebenhofer-weg.de', image: '/images/schulleitung/konrad.jpg', hours: 'Nach Vereinbarung' },
    { name: 'Heike Lammerding', role: 'Berufsschule BS 08', email: 'heike.lammerding@stuebenhofer-weg.de', image: '/images/berufsorientierung/lammerding.jpg', hours: 'Mi und Do, 8:20–13:20 Uhr' },
    { name: 'Sabine Henkel', role: 'Berufsschule BS 08', email: 'sabine.henkel@stuebenhofer-weg.de', image: '/images/berufsorientierung/henkel.jpg', hours: 'Mi und Do, 8:20–13:20 Uhr' },
    { name: 'Sabine Nieden', role: 'Elternmentorin', email: 'sabine.nieden@stuebenhofer-weg.de', image: '/images/berufsorientierung/nieden.jpg', hours: 'Nach Vereinbarung' },
  ],
}

// Foto im Abschnitt „Förderung & Beratung“, je Abteilung ein anderes.
export const supportPhotos: Record<'primarstufe' | 'mittelstufe' | 'oberstufe', Photo> = {
  primarstufe: {
    src: '/images/fotos/grundschule-lehrer.jpg',
    alt: 'Ein Lehrer arbeitet mit zwei Grundschulkindern an einem Lernspiel',
    width: 1440,
    height: 782,
    objectPosition: '50% 40%',
  },
  mittelstufe: {
    src: '/images/fotos/lernbuero.jpg',
    alt: 'Schülerinnen arbeiten mit einer Lehrerin im Lernbüro am Laptop',
    width: 1052,
    height: 429,
    objectPosition: '45% 50%',
  },
  oberstufe: {
    src: '/images/fotos/lernen-laptop.jpg',
    alt: 'Zwei Schülerinnen arbeiten nebeneinander am Laptop',
    width: 1578,
    height: 419,
    objectPosition: '50% 50%',
  },
}

// Foto neben „Voraussetzungen für die Vorstufe“ (Oberstufe): Abiturjahrgang 2025 mit Zeugnissen.
export const requirementsPhoto: Photo = {
  src: '/images/fotos/abitur-2025.jpg',
  alt: 'Der Abiturjahrgang 2025 jubelt mit Zeugnissen und Rosen in den Händen',
  width: 1400,
  height: 933,
  objectPosition: '35% 55%',
}
