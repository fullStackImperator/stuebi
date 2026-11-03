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
      title: 'Fächerbreite & Sprachen',
      text: 'Neben Deutsch und Mathematik Natur- und Gesellschaftswissenschaften sowie die Künste. Als zweite Fremdsprache Spanisch, Französisch oder Türkisch – auch Unterricht in Herkunftssprachen ist möglich.',
    },
    {
      title: 'Vertrautes Umfeld',
      text: 'Beide Bildungswege der Mittelstufe kommen hier unter einem Dach zusammen. Freundschaften und Bezugspersonen bleiben.',
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
  careers: false,
  department: 'oberstufe',
  next: 'ganztag',
}

// „So ist die Oberstufe organisiert“: Fächer der Vorstufe in drei Stufen und wohin die Begleitung führt
// (alte Seite „Vorstufe Jg. 11“, Broschüre 2026).
export const vorstufeFaecher = {
  title: 'Fächer in der Vorstufe',
  tiers: [
    { label: 'Je vier Wochenstunden', subjects: ['Deutsch', 'Mathematik', 'Englisch'], strong: true },
    { label: 'Dazu', subjects: ['PGW', 'Sport', 'Seminar', 'Physik', 'Biologie', 'Chemie', 'Informatik'] },
    { label: 'Halbjährlich im Wechsel', subjects: ['Geographie / Geschichte', 'Religion / Philosophie', 'Kunst / Darstellendes Spiel'] },
  ],
}

export const begleitung = {
  title: 'Persönliche Begleitung',
  text: 'Jede Schülerin und jeder Schüler wird individuell betreut. Neben dem Abschluss zählt die persönliche Perspektive:',
  destinations: ['Studium', 'Duale Ausbildung', 'Ausbildung im höheren Dienst'],
}
