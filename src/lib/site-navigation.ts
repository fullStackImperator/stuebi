// Hauptnavigation nach Vorschlag der Schulleitung.
// Jeder Punkt hat eine eigene Unterseite; die Unterpunkte springen dort zu Abschnitten.

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
    desc: 'Pädagogischer Kompass & Werte',
    children: [
      { title: 'Die 4 Säulen', href: '/vision#saeulen', desc: 'Unsere Leitvision' },
      { title: 'Pädagogischer Kompass', href: '/vision#kompass', desc: 'Woran wir uns orientieren' },
      { title: 'Unsere Werte', href: '/vision#werte', desc: 'Was uns im Miteinander wichtig ist' },
    ],
  },
  {
    label: 'Bildungswege',
    href: '/bildungswege',
    desc: 'Stufen, Schullaufbahn & Abschlüsse',
    children: [
      { title: 'Stufen', href: '/bildungswege#stufen', desc: 'Von der Vorschule bis Klasse 13' },
      { title: 'Schullaufbahn', href: '/bildungswege#schullaufbahn', desc: 'Konzept eine Klasse' },
      { title: 'Abschlüsse', href: '/bildungswege#abschluesse', desc: 'ESA, MSA und Abitur' },
    ],
  },
  {
    label: 'Schwerpunkt',
    href: '/schwerpunkt',
    desc: 'Unsere Besonderheiten',
    children: [
      { title: 'Sportteams', href: '/schwerpunkt#sport', desc: 'Basketball, Judo & Fußball' },
      { title: 'Stübi-Makerspace', href: '/schwerpunkt#makerspace', desc: '3D-Druck, Robotik & Coding' },
      { title: 'Projekt Abgekocht!', href: '/schwerpunkt#abgekocht', desc: 'Kochen für die Gemeinschaft' },
      { title: 'Individuelle Förderung', href: '/schwerpunkt#foerderung', desc: 'Lernzeiten statt Hausaufgaben' },
    ],
  },
  {
    label: 'Ganztag',
    href: '/ganztag',
    desc: 'Betreuung, Nachmittag & Mensa',
    children: [
      { title: 'Betreuung', href: '/ganztag#betreuung', desc: 'Zeiten und Ansprechpartner' },
      { title: 'Nachmittag', href: '/ganztag#nachmittag', desc: 'Kurse von Kunst bis Sport' },
      { title: 'Mensa', href: '/ganztag#mensa', desc: 'Frühstück und Mittagessen' },
    ],
  },
  {
    label: 'Termine',
    href: '/termine',
    desc: 'Tag der offenen Tür & Infoabende',
    children: [
      { title: 'Tag der offenen Tür', href: '/termine#offene-tuer', desc: 'Die Stübi kennenlernen' },
      { title: 'Infoabende', href: '/termine#infoabende', desc: 'Für Eltern neuer Klassen' },
    ],
  },
  {
    label: 'Anmeldung & Kontakt',
    href: '/anmeldung',
    desc: 'Formulare, Schulbüro & Ansprechpartner',
    children: [
      { title: 'Anmeldung & Formulare', href: '/anmeldung#formulare', desc: 'So melden Sie Ihr Kind an' },
      { title: 'Schulbüro', href: '/anmeldung#schulbuero', desc: 'Adresse, Telefon & E-Mail' },
      { title: 'Ansprechpartner', href: '/anmeldung#ansprechpartner', desc: 'Ihre Kontakte an der Stübi' },
    ],
  },
]
