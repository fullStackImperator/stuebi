import type { LucideIcon } from 'lucide-react'
import { ChefHat, Cog, Trophy } from 'lucide-react'

// Die drei Besonderheiten der Stübi: kurz auf der Startseite, ausführlich auf /schwerpunkt.

export type SchwerpunktId = 'sport' | 'makerspace' | 'abgekocht'
export type SchwerpunktColor = 'accent' | 'mint' | 'golden'
export type Fact = { value: string; label: string }

export type Schwerpunkt = {
  id: SchwerpunktId
  title: string
  color: SchwerpunktColor
  icon: LucideIcon
  /** Startseiten-Karte, 1–2 Sätze. */
  teaser: string
  /** Farbband auf /schwerpunkt, 1–2 Sätze. */
  intro: string
  facts: Fact[]
  quote?: { text: string; author: string }
  points: string[]
  /** „So läuft’s“ */
  howItWorks?: string[]
  partners?: string
  links: { label: string; href: string; external?: boolean }[]
}

export const schwerpunktOrder: SchwerpunktId[] = ['sport', 'makerspace', 'abgekocht']

export const schwerpunkte: Record<SchwerpunktId, Schwerpunkt> = {
  sport: {
    id: 'sport',
    title: 'Sportteams',
    color: 'accent',
    icon: Trophy,
    teaser:
      'Sportbetonte Schule ab Jahrgang 5: Basketball, Judo und Fußball mit lizenzierten Coaches – Schul-, Vereins- und Verbandstraining greifen ineinander.',
    intro:
      'An der Stübi ist Bewegung Teil des Schultags – im Unterricht, in den Pausen und am Nachmittag. Ab Jahrgang 5 trainieren unsere Sportteams in Basketball, Judo und Fußball.',
    facts: [
      { value: '3 Std.', label: 'Sport pro Woche in jedem Jahrgang' },
      { value: 'A- & B-Lizenz', label: 'Coaches für Basketball, Judo und Fußball' },
      { value: '5 Sporthallen', label: 'und ein Schulhof mit Fußball- und Basketballfeldern' },
    ],
    quote: { text: '„Wenn du alles gibst, kannst du dir nichts vorwerfen.“', author: 'Dirk Nowitzki' },
    points: [
      'Wöchentliches Training mit A-, B- und C-lizenzierten Coaches; Schul-, Vereins- und Verbandstraining greifen ineinander',
      'Bewegung auch im Unterricht: bewegliche Möbel und das „bewegte Klassenzimmer“',
      'In der großen Pause: Spielgeräte zum Ausleihen und eine offene Sporthalle',
      'Von der Grundschule bis zum Abitur trainieren alle für das Deutsche Sportabzeichen',
      'Eigene Turniere: Stübi-Cup, Winter-Judo-Cup, Spendenlauf und der Wilhelmsburger Insel-Cup',
      'Hamburger Schulmeisterschaften und „Jugend trainiert für Olympia“',
      'Vor- und Nachschreibtermine, Freistellung für Wettkämpfe und Trainingslager',
      'Sportlich orientierte Klassenreisen; ab Jahrgang 9 Doping-Prävention',
      'Anschlussprofil in der Oberstufe: „Fair Play“ (Sport, Gesundheit & Management)',
      'Seit 2017/18 ausgezeichnet als „sportbetonte Schule“ – Ziel: Partnerschule des Nachwuchsleistungssports',
    ],
    partners:
      'Hamburger Judo-Verband e. V., Hamburger Basketball-Verband e. V., Hamburger Sportbund e. V., Hamburg Towers, Sport ohne Grenzen e. V.',
    links: [{ label: 'Profil „Fair Play“ in der Oberstufe', href: '/oberstufe#erwartet' }],
  },
  makerspace: {
    id: 'makerspace',
    title: 'Makerspace',
    color: 'mint',
    icon: Cog,
    teaser:
      'Der größte Makerspace einer Schule in Deutschland: vom ersten Entwurf bis zum fertigen Produkt, mit eigenem Club und Gürtelsystem.',
    intro:
      'Unsere „Ideen-, Atom- & Bit-Schmiede“: Hier entwerfen Schülerinnen und Schüler eigene Projekte und bauen sie mit Werkzeugen, Maschinen und digitaler Technik – vom ersten Entwurf bis zum fertigen Produkt.',
    facts: [
      { value: 'Nr. 1', label: 'größter Makerspace einer Schule in Deutschland' },
      { value: 'Gürtelsystem', label: 'im Makerspace Club, wie in einer Kung-Fu-Schule' },
    ],
    quote: { text: '„Lernen mit Kopf, Herz und Hand.“', author: 'Johann Heinrich Pestalozzi' },
    points: [
      '3D-Drucker, Laser-Cutter, CNC-Fräsen und digitales Sticken',
      'Holz-, Textil-, Theater- und Metallwerkstatt',
      'Robotik und Programmieren von Mikrocontrollern',
      'Audio und Video, VR/AR, Elektronik und digitale Textiltechnik',
      'Fehler machen schlau: Hakt ein Programm oder klemmt ein Bauteil, ist das ein Lernschritt',
      'Selbstbewusstsein durch eigenständiges Arbeiten und sichtbare Erfolge',
      'Regelmäßige Workshops mit externen Fachleuten, unterstützt vom Schulverein',
    ],
    howItWorks: [
      'Im Unterricht arbeiten Klassen an eigenen Projekten – so üben sie die „21st Century Skills“.',
      'Der Makerspace Club ist freiwillig und offen in den Pausen und nach Schulschluss.',
      'Wer im Club aufsteigt, bekommt den nächsten „Gürtel“ – und mehr Verantwortung für den Makerspace.',
    ],
    links: [
      { label: 'Zur Makerspace-Website', href: 'https://stuebi-makerspace.de/', external: true },
    ],
  },
  abgekocht: {
    id: 'abgekocht',
    title: 'Abgekocht',
    color: 'golden',
    icon: ChefHat,
    teaser:
      'Jede Klasse kocht einmal im Schuljahr eine Woche lang für die ganze Schule – gemeinsam mit einem professionellen Koch.',
    intro:
      'Wir kochen selbst: Jeden Tag gibt es ein frisch gekochtes Mittagessen, das Schülerinnen und Schüler mitgestalten. „Abgekocht!“ ist der praktische Teil unseres Ernährungskonzepts.',
    facts: [
      { value: 'Seit 2017', label: 'kocht die Stübi selbst' },
      { value: '1 Woche', label: 'pro Klasse und Schuljahr in der Lernküche' },
      { value: 'DGE-Standard', label: 'der Deutschen Gesellschaft für Ernährung' },
    ],
    points: [
      'Frisch gekochtes Mittagessen an jedem Schultag',
      'Frische Produkte, Rohkost aus biologischem Anbau oder aus dem eigenen Schulgarten',
      'Halal-zertifiziertes Fleisch von einem regionalen Schlachter',
      'Rücksicht auf die verschiedenen kulturellen Hintergründe unserer Schülerschaft',
      'Verbunden mit dem Oberstufenprofil „Fair Play“ (Sport, Gesundheit & Management)',
      'Weitere Bausteine: gemeinsames Abschlussessen und die Schülerfirma „Barista“',
      'Finanziell unterstützt vom Mensaverein',
    ],
    howItWorks: [
      'Die Klasse wird geteilt: Eine Hälfte kocht mit Koch und Küchenteam in der Lernküche, die andere hat Unterricht zu „Gesunder Ernährung“ – dann wird getauscht.',
      'Mittwochs gibt es passende Ausflüge, zum Beispiel auf einen Bio-Bauernhof.',
      'Jeder Jahrgang hat ein eigenes Thema – von saisonal und regional über Fairtrade bis zur Sporternährung.',
    ],
    links: [],
  },
}
