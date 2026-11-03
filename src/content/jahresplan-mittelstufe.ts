// Jahresplan 2026/27 der Mittelstufe, nach den Listen von Konrad Sens (Abteilungsleitung, November 2026).
// Für Eltern umgeschrieben: ohne interne Konferenzen (Zeugniskonferenzen) und ohne noch offene Termine.
// Jedes Jahr hier ersetzen; vergangene Einträge blendet die Seite selbst aus.

export type PlanEntry = {
  title: string
  /** Erster Tag, YYYY-MM-DD. */
  start: string
  /** Letzter Tag bei Zeiträumen, YYYY-MM-DD. */
  end?: string
  /** Kurze Erklärung für Eltern. */
  text?: string
  /** Für wen, rechts in der Zeile, z. B. „Ausbildungsklasse · rote Gruppe“. */
  who?: string
  /** Prüfungen und Gespräche heben sich farblich ab. */
  type: 'pruefung' | 'gespraech' | 'praxis' | 'schulleben'
}

export type GradePlan = { grade: string; entries: PlanEntry[] }

const leg = (start: string, end: string, extra = ''): PlanEntry => ({
  title: 'Lernentwicklungsgespräch (LEG)',
  start,
  end,
  text: `Eltern, Kind und Klassenleitung sprechen über Lernstand und nächste Ziele.${extra}`,
  type: 'gespraech',
})

const reisezeit: PlanEntry = { title: 'Reisezeit', start: '2027-05-31', end: '2027-06-04', text: 'Klassenreisen des Jahrgangs.', type: 'schulleben' }

const sprachfeststellung = (who: string): PlanEntry => ({
  title: 'Sprachfeststellungsprüfung',
  start: '2027-04-14',
  text: 'Schriftliche Prüfung für Schülerinnen und Schüler, die eine Herkunftssprache anerkennen lassen.',
  who,
  type: 'pruefung',
})

const ausbildungsklasse = (group: 'rote' | 'blaue' | 'rote und blaue', start: string, end: string): PlanEntry => ({
  title: 'Praktikum',
  start,
  end,
  who: `Ausbildungsklasse · ${group} Gruppe`,
  type: 'praxis',
})

export const jahresplanMittelstufe: { schoolYear: string; grades: GradePlan[] } = {
  schoolYear: '2026/27',
  grades: [
    {
      grade: 'Jahrgang 8',
      entries: [
        leg('2027-01-27', '2027-01-28'),
        {
          title: 'Zukunftswerkstatt',
          start: '2027-02-01',
          end: '2027-02-05',
          text: 'Fünf Tage Berufsorientierung: Stärken entdecken und Berufe ausprobieren.',
          who: 'Gruppe I',
          type: 'praxis',
        },
        {
          title: 'Zukunftswerkstatt',
          start: '2027-02-08',
          end: '2027-02-12',
          text: 'Fünf Tage Berufsorientierung: Stärken entdecken und Berufe ausprobieren.',
          who: 'Gruppe II',
          type: 'praxis',
        },
        {
          title: 'KERMIT 8',
          start: '2027-02-08',
          end: '2027-02-19',
          text: 'Hamburger Kompetenztests in Deutsch, Mathematik und Englisch. Die genauen Tage legen die Lehrkräfte in diesem Zeitraum fest.',
          type: 'pruefung',
        },
        reisezeit,
      ],
    },
    {
      grade: 'Jahrgang 9',
      entries: [
        leg('2027-01-27', '2027-01-28'),
        {
          title: 'KERMIT 9',
          start: '2027-02-01',
          end: '2027-02-26',
          text: 'Hamburger Kompetenztests. Die genauen Tage gibt die Schule rechtzeitig bekannt.',
          type: 'pruefung',
        },
        { title: 'ESA-Prüfung Deutsch', start: '2027-04-08', text: 'Schriftliche Prüfung zum Ersten allgemeinbildenden Schulabschluss.', type: 'pruefung' },
        { title: 'ESA-Prüfung Mathematik', start: '2027-04-12', text: 'Schriftliche Prüfung zum Ersten allgemeinbildenden Schulabschluss.', type: 'pruefung' },
        sprachfeststellung('ESA'),
        { title: 'Mündliche ESA-Prüfungen', start: '2027-05-24', end: '2027-05-28', text: 'Wahlprüfung.', type: 'pruefung' },
        reisezeit,
      ],
    },
    {
      grade: 'Jahrgang 10',
      entries: [
        { title: 'Blockpraktikum', start: '2026-10-05', end: '2026-10-16', text: 'Zwei Wochen Praktikum in einem Betrieb.', who: 'Klassen 10a, 10b, 10c', type: 'praxis' },
        ausbildungsklasse('rote', '2026-10-05', '2026-10-16'),
        ausbildungsklasse('blaue', '2026-11-02', '2026-11-13'),
        leg('2026-11-19', '2026-11-20', ' Dabei gibt es die Quartalsnoten.'),
        ausbildungsklasse('rote', '2026-11-23', '2026-12-04'),
        ausbildungsklasse('blaue', '2027-01-11', '2027-01-22'),
        leg('2027-01-27', '2027-01-28'),
        ausbildungsklasse('rote', '2027-02-01', '2027-02-12'),
        ausbildungsklasse('blaue', '2027-02-15', '2027-02-26'),
        ausbildungsklasse('rote und blaue', '2027-03-30', '2027-04-09'),
        { title: 'ESA-Prüfung Deutsch', start: '2027-04-08', text: 'Schriftliche Prüfung zum Ersten allgemeinbildenden Schulabschluss.', type: 'pruefung' },
        { title: 'MSA-Prüfung Deutsch', start: '2027-04-09', text: 'Schriftliche Prüfung zum Mittleren Schulabschluss.', type: 'pruefung' },
        { title: 'ESA-Prüfung Mathematik', start: '2027-04-12', text: 'Schriftliche Prüfung zum Ersten allgemeinbildenden Schulabschluss.', type: 'pruefung' },
        { title: 'MSA-Prüfung Mathematik', start: '2027-04-13', text: 'Schriftliche Prüfung zum Mittleren Schulabschluss.', type: 'pruefung' },
        sprachfeststellung('MSA und ESA'),
        {
          title: 'Mündliche Prüfungen',
          start: '2027-05-24',
          end: '2027-05-28',
          text: 'MSA: Englisch und Wahlprüfung. ESA: Wahlprüfung.',
          type: 'pruefung',
        },
        reisezeit,
        { title: 'Entlassfeier', start: '2027-06-18', text: 'Feierliche Verabschiedung des Abschlussjahrgangs.', type: 'schulleben' },
      ],
    },
  ],
}
