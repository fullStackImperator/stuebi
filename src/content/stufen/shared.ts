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
    'Kontakt zum Beratungsdienst: beratungsdienst@stuebenhofer-weg.de oder Telefon 040 – 428 7619 42. Die Beratungslehrerin hat dienstags in der Mittagsfreizeit Sprechstunde im Beratungsraum neben der Schulbibliothek, weitere Termine nach Vereinbarung.',
  ],
}

// Berufs- und Studienorientierung, nur Mittel- und Oberstufe.
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
