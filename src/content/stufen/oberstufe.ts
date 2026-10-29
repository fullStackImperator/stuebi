import type { StageContent } from './types'

// Quellen: Schulbroschüre 2026, alte Seite „Vorstufe Jg. 11“.
export const oberstufe: StageContent = {
  id: 'oberstufe',
  name: 'Oberstufe',
  grades: 'Klasse 11–13',
  lead: 'Die gymnasiale Oberstufe führt sicher zum Abitur. Beide Bildungswege der Mittelstufe kommen hier unter einem Dach zusammen – das vertraute Umfeld bleibt für alle erhalten.',
  teaser: 'Zwei praxisnahe Profile, „Fair Play“ und „Mein Start-Up“, und eine gründliche Vorbereitung auf Studium und Ausbildung.',
  color: 'primary',
  photo: {
    src: '/images/fotos/oberstufe-gruppe.jpg',
    alt: 'Eine Gruppe von Oberstufenschülerinnen und -schülern',
    width: 1004,
    height: 582,
    objectPosition: '50% 35%',
  },
  photoSlot: 'oberstufe',
  expect: [
    {
      title: 'Vorstufe (Klasse 11)',
      text: 'Für Jugendliche mit Mittlerem Schulabschluss die Brücke in die Studienstufe – überwiegend im Klassenverband.',
    },
    {
      title: 'Profil „Fair Play“',
      text: 'Sport, Gesundheit & Management: Sport, PGW und Biologie greifen ineinander. Die Jugendlichen planen echte Sportevents und setzen Sportwissenschaft in die Praxis um.',
    },
    {
      title: 'Profil „Mein Start-Up“',
      text: 'Wirtschaft, Innovation & Management: Die Jugendlichen entwickeln eigene Produkte, schreiben Businesspläne und erforschen wirtschaftliche Zusammenhänge.',
    },
    {
      title: 'Wissenschaftlich arbeiten',
      text: 'Im Seminarfach üben die Jugendlichen wissenschaftliche Methoden. Hochschul-Schnuppertage und Betriebsbesichtigungen runden die Vorbereitung ab.',
    },
  ],
  everyday: [
    {
      id: 'alltag',
      heading: 'So ist die Oberstufe organisiert',
      intro:
        'Der Gymnasialzweig macht Abitur nach 12 Jahren (Studienstufe in Klasse 11 und 12), der Stadtteilschulzweig nach 13 Jahren (Vorstufe in Klasse 11, Studienstufe in Klasse 12 und 13).',
      points: [
        {
          title: 'Fächer in der Vorstufe',
          text: 'Je vier Wochenstunden Deutsch, Mathematik und Englisch, dazu PGW, Sport, Seminar, Physik, Biologie, Chemie und Informatik sowie halbjährlich Geographie/Geschichte, Religion/Philosophie und Kunst/Darstellendes Spiel.',
        },
        {
          title: 'Persönliche Begleitung',
          text: 'Jede Schülerin und jeder Schüler wird individuell betreut – neben dem Abschluss zählt die persönliche Perspektive: Studium, duale Ausbildung oder Ausbildung im höheren Dienst.',
        },
      ],
    },
  ],
  extra: [
    {
      id: 'voraussetzungen',
      heading: 'Voraussetzungen für die Vorstufe',
      points: [
        {
          title: 'Mittlerer Schulabschluss',
          text: 'Ein MSA-Durchschnitt von mindestens 3,0 und mindestens 3,0 in den Hauptfächern Deutsch, Englisch und Mathematik.',
        },
        {
          title: 'Zweite Fremdsprache',
          text: 'Pflicht, wenn noch keine vier Jahre aufsteigender Unterricht besucht wurden: Spanisch oder Französisch neu, Türkisch weitergeführt. Auch Unterricht in Herkunftssprachen ist möglich.',
        },
        {
          title: 'Unterlagen',
          text: 'Anmeldebogen; externe Bewerberinnen und Bewerber zusätzlich eine Kopie des Halbjahreszeugnisses und eine Meldebescheinigung. Die endgültige Zusage folgt nach dem bestandenen MSA.',
        },
      ],
    },
  ],
  support: true,
  careers: true,
  department: 'oberstufe',
  next: 'ganztag',
}
