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
      icon: 'bruecke',
      text: 'Für Jugendliche mit Mittlerem Schulabschluss die Brücke in die Studienstufe – überwiegend im Klassenverband.',
    },
    {
      title: 'Fächerbreite & Sprachen',
      icon: 'sprachen',
      text: 'Neben Deutsch und Mathematik Natur- und Gesellschaftswissenschaften sowie die Künste. Als zweite Fremdsprache Spanisch, Französisch oder Türkisch – auch Unterricht in Herkunftssprachen ist möglich.',
    },
    {
      title: 'Vertrautes Umfeld',
      icon: 'zuhause',
      text: 'Beide Bildungswege der Mittelstufe kommen hier unter einem Dach zusammen. Freundschaften und Bezugspersonen bleiben.',
    },
    {
      title: 'Wissenschaftlich arbeiten',
      icon: 'forschen',
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
    // Gleich nach der Organisation, damit Eltern direkt sehen, was es für die Vorstufe braucht.
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

// „So ist die Oberstufe organisiert“: Fächer der Vorstufe nach Stunden, die Kernfächer, die Anmeldung und wohin die Begleitung führt
// (alte Seite „Vorstufe Jg. 11“, Broschüre 2026).
// `note`: kleiner Zusatz am Fach, `rule`: Satz unter der Stufe; `language` hebt die Fremdsprachen ab.
export type SubjectTier = {
  label: string
  subjects: { name: string; note?: string }[]
  strong?: boolean
  language?: boolean
  rule?: string
}

const names = (...n: string[]) => n.map((name) => ({ name }))

export const vorstufeFaecher: { title: string; tiers: SubjectTier[] } = {
  title: 'Fächer in der Vorstufe',
  tiers: [
    { label: 'Je 4 Wochenstunden', subjects: names('Deutsch', 'Mathematik', 'Englisch'), strong: true },
    { label: 'Je 2 Wochenstunden', subjects: names('PGW', 'Sport', 'Seminar', 'Physik', 'Biologie', 'Chemie', 'Informatik') },
    {
      label: 'Halbjährlich im Wechsel, je 2 Wochenstunden',
      subjects: names('Geographie / Geschichte', 'Religion / Philosophie', 'Kunst / Darstellendes Spiel'),
    },
    {
      label: '2. Fremdsprache',
      subjects: [
        { name: 'Spanisch', note: 'neu · 4 Std' },
        { name: 'Französisch', note: 'neu · 4 Std' },
        { name: 'Türkisch', note: 'weitergeführt · 3 Std' },
      ],
      language: true,
      rule: 'Pflicht, wenn noch keine vier Jahre aufsteigender Unterricht in einer zweiten Fremdsprache besucht wurden.',
    },
  ],
}

// Kernfächer der Studienstufe für alle Profile (alte Seite „Profiloberstufe ab Jg. 12“).
export const kernfaecher = {
  subjects: ['Deutsch', 'Mathematik', 'Englisch'],
  hours: 4,
  note: 'auf erhöhtem Niveau (eA)',
  count: 'Zwei davon',
}

// Anmeldung in die Vorstufe, solange im CMS nichts eingetragen ist (alte Seite „Vorstufe Jg. 11“).
// Ohne Jahreszahl, damit der Text nicht veraltet.
export const anmeldungVorstufe = {
  title: 'In die Vorstufe: so geht’s',
  steps: [
    {
      when: 'Februar – März',
      title: 'Anmeldung',
      text: 'Anmeldebogen abgeben. Von anderen Schulen zusätzlich eine Kopie des Halbjahreszeugnisses und eine Meldebescheinigung.',
    },
    { when: 'ab April', title: 'Anmeldebestätigung', text: 'Sie bekommen Post von uns.' },
    { when: 'Sommer', title: 'Zusage', text: 'Endgültig nach dem bestandenen MSA.' },
  ],
}

export const begleitung = {
  title: 'Persönliche Begleitung',
  text: 'Jede Schülerin und jeder Schüler wird individuell betreut. Neben dem Abschluss zählt die persönliche Perspektive:',
  destinations: ['Studium', 'Duale Ausbildung', 'Ausbildung im höheren Dienst'],
}
