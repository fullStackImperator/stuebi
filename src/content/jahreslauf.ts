// „Ein Jahr an der Stübi“ auf /termine: was jedes Schuljahr wiederkommt, nach Monat und ohne genaue Daten.
// Quelle: Stübi-Kalender 2025/26 (von Ljubica Sabadija) und die öffentlichen Termine der Mittelstufe 2026/27.
// Nur, was Familien sehen – keine Konferenzen, Zeugniskonferenzen oder Prüfungstage. Jedes Schuljahr prüfen;
// die genauen Tage stehen im Schulkalender (IServ) darunter.

export type YearEventKind = 'sport' | 'fest' | 'lernen' | 'neu'

export type YearEvent = {
  name: string
  /** Eine kurze Zeile für Eltern. */
  text: string
  kind: YearEventKind
  /** Hebt den Termin hervor (Tag der offenen Tür). */
  highlight?: boolean
}

export type YearMonth = { month: string; events: YearEvent[] }

export const jahreslauf: YearMonth[] = [
  { month: 'September', events: [{ name: 'Bundesjugendspiele', text: 'Der Sporttag der Schule.', kind: 'sport' }] },
  {
    month: 'Oktober',
    events: [
      { name: 'Praktikum', text: 'Die Jahrgänge 9 und 10 lernen Betriebe kennen.', kind: 'lernen' },
      { name: 'Klassenfahrten und Projektwoche', text: 'Unterwegs mit der Klasse oder eine Woche an einem Thema.', kind: 'lernen' },
    ],
  },
  {
    month: 'November',
    events: [
      { name: 'Lichterfest', text: 'Laternen und Lichter in der dunklen Jahreszeit.', kind: 'fest' },
      { name: 'Lesewoche', text: 'Eine Woche rund ums Buch.', kind: 'lernen' },
      { name: 'Lesewettbewerb', text: 'Für die 4. Klassen.', kind: 'lernen' },
      { name: 'Marktplatz der Grundschulen', text: 'Infonachmittag im Tor zur Welt.', kind: 'neu' },
    ],
  },
  {
    month: 'Dezember',
    events: [
      { name: 'Winterfest – Tag der offenen Tür', text: 'Die Schule von innen sehen und mitfeiern.', kind: 'neu', highlight: true },
      { name: 'Weihnachtsfeier', text: 'Gemeinsam zum Jahresende.', kind: 'fest' },
    ],
  },
  {
    month: 'Januar',
    events: [
      { name: 'Stübicup', text: 'Turniere in mehreren Sportarten.', kind: 'sport' },
      { name: 'Schulführung', text: 'Für Familien der neuen 5. Klassen.', kind: 'neu' },
    ],
  },
  {
    month: 'Februar',
    events: [
      { name: 'Anmeldewoche', text: 'Anmeldung für die neuen 5. Klassen.', kind: 'neu' },
      { name: 'Fasching', text: 'Verkleiden und feiern in der Primarstufe.', kind: 'fest' },
      { name: 'Projektwoche', text: 'Eine Woche Lernen an einem Thema.', kind: 'lernen' },
    ],
  },
  { month: 'März', events: [{ name: 'Fastenbrechen', text: 'Gemeinsam essen im Ramadan.', kind: 'fest' }] },
  { month: 'April', events: [{ name: 'Girls’ und Boys’ Day', text: 'Einen Tag lang Berufe ausprobieren.', kind: 'lernen' }] },
  { month: 'Mai', events: [{ name: 'Klassenfahrten', text: 'Reisezeit der Jahrgänge.', kind: 'lernen' }] },
  { month: 'Juni', events: [{ name: 'Entlassfeier', text: 'Feierlicher Abschied vom Abschlussjahrgang.', kind: 'fest' }] },
  { month: 'Juli', events: [{ name: 'Einschulungsnachmittag', text: 'Erstes Kennenlernen für die neuen Klassen 1 und 5.', kind: 'neu' }] },
]
