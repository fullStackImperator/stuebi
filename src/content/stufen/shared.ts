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

// Berufs- und Studienorientierung, nur auf der Seite der Mittelstufe.
export const careersBlock: Block = {
  id: 'berufsorientierung',
  heading: 'Berufsorientierung',
  intro: 'Wir bereiten früh und praxisnah auf Ausbildung, Studium und Beruf vor.',
  points: [
    {
      title: 'Ab Klasse 8',
      text: 'Berufsorientierungstage, Kompetenzanalyse, Werkstatttage und eine Projektwoche zur Berufsinformation.',
    },
    {
      title: 'Ab Klasse 9',
      text: 'Ein zweiwöchiges Betriebspraktikum und jeden Mittwoch ein Praxislerntag im Betrieb oder in einer Schülerfirma.',
    },
    {
      title: 'Schülerfirmen',
      text: 'Barista, Formel 1, Medien-Stübi, Holzwerkstatt, SUO Design, Stübi-Manager und Kazumi – hier wird echtes Arbeiten geübt.',
    },
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
