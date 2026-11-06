// Hauptnavigation nach Vorschlag der Schulleitung.
// Jeder Punkt hat eine eigene Unterseite; die Unterpunkte springen dort zu Abschnitten –
// außer bei den Bildungswegen, deren Stufen eigene Seiten haben.

// IServ login for students, staff and parents (also linked on the old website). Opens in a new tab.
export const ISERV_URL = 'https://stuebenhofer-weg.de/iserv/'

export type NavLink = {
  title: string
  href: string
  desc: string
}

export type NavItem = {
  label: string
  href: string
  desc: string
  children: NavLink[]
}

export const mainNav: NavItem[] = [
  {
    label: 'Unsere Vision',
    href: '/vision',
    desc: 'Säulen, Prinzipien & Werte',
    children: [
      { title: 'Die 4 Säulen', href: '/vision#saeulen', desc: 'Unsere Leitvision' },
      { title: 'Unsere Prinzipien', href: '/vision#prinzipien', desc: 'Woran wir uns orientieren' },
      { title: 'Unser Campus', href: '/vision#raum', desc: 'Lernen an jedem Ort' },
      { title: 'Unsere Werte', href: '/vision#werte', desc: 'Was uns im Miteinander wichtig ist' },
    ],
  },
  {
    label: 'Bildungswege',
    href: '/bildungswege',
    desc: 'Stufen, Schullaufbahn & Abschlüsse',
    children: [
      { title: 'Vorschule', href: '/vorschule', desc: 'ab 5 Jahren' },
      { title: 'Grundschule', href: '/grundschule', desc: 'Klasse 1–4' },
      { title: 'Mittelstufe', href: '/mittelstufe', desc: 'Klasse 5–10' },
      { title: 'Oberstufe', href: '/oberstufe', desc: 'Klasse 11–13' },
      { title: 'Abschlüsse', href: '/bildungswege#abschluesse', desc: 'ESA, MSA und Abitur' },
      { title: 'IVK', href: '/bildungswege#ivk', desc: 'Internationale Vorbereitungsklassen' },
    ],
  },
  {
    label: 'Schwerpunkt',
    href: '/schwerpunkt',
    desc: 'Unsere Besonderheiten',
    children: [
      { title: 'Sportbetonte Schule', href: '/schwerpunkt#sport', desc: 'Basketball, Judo & Fußball' },
      { title: 'Stübi-Makerspace', href: '/schwerpunkt#makerspace', desc: '3D-Druck, Robotik & Coding' },
      { title: 'Projekt Abgekocht!', href: '/schwerpunkt#abgekocht', desc: 'Kochen für die Gemeinschaft' },
      // The smaller Schwerpunkte and the Förderung share one entry, so the menu stays at four.
      { title: 'Und noch mehr …', href: '/schwerpunkt#mintprax', desc: 'MINTprax, Fremdsprachen, Projektlernen & Förderung' },
    ],
  },
  {
    label: 'Ganztag',
    href: '/ganztag',
    desc: 'Tagesrhythmus, Kurse & Mensa',
    children: [
      { title: 'Tagesrhythmus', href: '/ganztag#tagesrhythmus', desc: 'So ist der Schultag aufgebaut' },
      { title: 'Kurse und AGs', href: '/ganztag#kurse', desc: 'Von Fußball bis Stop-Motion' },
      { title: 'Mensa', href: '/ganztag#mensa', desc: 'Frühstück und Mittagessen' },
    ],
  },
  {
    label: 'Termine',
    href: '/termine',
    desc: 'Feste, Infoabende & schulöffentliche Termine',
    children: [
      { title: 'Tag der offenen Tür & Feste', href: '/termine#feste', desc: 'Die Stübi kennenlernen und mitfeiern' },
      { title: 'Anmeldung & Infoabende', href: '/termine#neue-familien', desc: 'Fristen und Infotermine für neue Familien' },
      { title: 'Ein Jahr an der Stübi', href: '/termine#jahreslauf', desc: 'Was jedes Jahr wiederkommt' },
      { title: 'Schulöffentliche Termine', href: '/termine#schulkalender', desc: 'Aus dem Schulkalender in IServ' },
    ],
  },
  {
    label: 'Anmeldung & Kontakt',
    href: '/anmeldung',
    desc: 'Formulare, Schulbüro & Ansprechpartner',
    children: [
      { title: 'So melden Sie an', href: '/anmeldung#ablauf', desc: 'Ablauf und Fristen' },
      { title: 'Primarstufe', href: '/anmeldung#primarstufe', desc: 'Vorschule bis Klasse 4' },
      { title: 'Mittelstufe', href: '/anmeldung#mittelstufe', desc: 'Klasse 5 bis 10' },
      { title: 'Oberstufe', href: '/anmeldung#oberstufe', desc: 'Klasse 11 bis 13' },
      { title: 'Schulbüro', href: '/anmeldung#schulbuero', desc: 'Adresse, Telefon & E-Mail' },
      { title: 'Ansprechpartner', href: '/anmeldung#ansprechpartner', desc: 'Ihre Kontakte an der Stübi' },
      { title: 'Beratung', href: '/beratung', desc: 'Vertraulich bei Sorgen und Fragen' },
    ],
  },
]
