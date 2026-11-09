import type { LucideIcon } from 'lucide-react'
import type { Photo } from '@/lib/photo'
import { ChefHat, Cog, Trophy } from 'lucide-react'

// Die drei Besonderheiten der Stübi: kurz auf der Startseite, ausführlich auf /schwerpunkt.

export type SchwerpunktId = 'sport' | 'makerspace' | 'abgekocht'
export type SchwerpunktColor = 'accent' | 'mint' | 'golden'
// `icon`: optional line icon at the top right of the tile (e.g. on /vision).
export type Fact = { value: string; label: string; icon?: LucideIcon }

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
  /** Kurzer Hinweis im Farbband, z. B. eine Auszeichnung. */
  badge?: string
  /** Die Einzelheiten, nach Themen gruppiert. */
  groups: { title: string; points: string[] }[]
  /** Fills the empty cell next to an odd last group: a photo and one colour tile. */
  groupAside?: {
    photo: Photo
    fact: Fact
    /** Two more photos beside the tile: the first tall, the second small. */
    more?: Photo[]
    /** Photos still missing, shown as placeholders with what they should show; they fill the spots `more` leaves. */
    missing?: string[]
  }
  /** „So läuft’s“ */
  howItWorks?: string[]
  /** Ein Thema pro Jahrgang (Abgekocht). */
  themes?: { grade: string; topic: string }[]
  /** Partner names whose logo is in PARTNER_GROUPS (src/content/partners.ts). */
  partnerLogos?: string[]
  /** Further partners without a logo. */
  partners?: string
  links: { label: string; href: string; external?: boolean; /** Second line on the link card. */ note?: string }[]
  /** Large image links to the Schwerpunkt's own sites, right under the bento (Makerspace). */
  portals?: { label: string; note: string; href: string; photo: Photo; logo?: { src: string; width: number; height: number } }[]
}

export const schwerpunktOrder: SchwerpunktId[] = ['sport', 'makerspace', 'abgekocht']

export const schwerpunkte: Record<SchwerpunktId, Schwerpunkt> = {
  sport: {
    id: 'sport',
    title: 'Sportbetonte Schule',
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
    badge: 'Ausgezeichnet seit 2017/18',
    groups: [
      {
        title: 'Training und Coaches',
        points: [
          'Wöchentliches Training mit A-, B- und C-lizenzierten Coaches; Schul-, Vereins- und Verbandstraining greifen ineinander',
          'Von der Grundschule bis zum Abitur trainieren alle für das Deutsche Sportabzeichen',
          'Anschlussprofil in der Oberstufe: „Fair Play“ (Sport, Gesundheit & Management)',
          'Ziel: Partnerschule des Nachwuchsleistungssports',
        ],
      },
      {
        title: 'Im Schulalltag',
        points: [
          'Bewegung auch im Unterricht: bewegliche Möbel und das „bewegte Klassenzimmer“',
          'In der großen Pause: Spielgeräte zum Ausleihen und eine offene Sporthalle',
          'Bewegtes Lernen: Bewegung zur Auflockerung, Aktivierung und Entspannung',
          'Ein Schulgelände, das zur Bewegung einlädt: Fußball- und Basketballplätze und Tischtennisplatten',
          'Sportlich orientierte Klassenreisen; ab Jahrgang 9 Doping-Prävention',
        ],
      },
      {
        title: 'Wettkämpfe',
        points: [
          'Eigene Turniere: Stübi-Cup, Winter-Judo-Cup und Spendenlauf; wir richten den Wilhelmsburger Insel-Cup und den Tag des Judo aus',
          'Für alle: Bundesjugendspiele, Inselparklauf und Außenmühlenlauf',
          'Hamburger Schulmeisterschaften, Uwe-Seeler-Pokal und „Jugend trainiert für Olympia“',
          'Vor- und Nachschreibtermine, Freistellung für Wettkämpfe und Trainingslager',
        ],
      },
    ],
    groupAside: {
      photo: {
        src: '/images/fotos/sport-basketball-wurf.jpg',
        alt: 'Ein Schüler springt in der Sporthalle zum Korbwurf',
        width: 1200,
        height: 1600,
        objectPosition: '50% 30%',
      },
      fact: { value: 'Stübi-Cup', label: 'Fußball, Streetball und Tischtennis – unser eigenes Turnier', icon: Trophy },
      // Aus dem Bildarchiv der Schule in IServ („Bilder/2026“), von Herrn Herpe dafür freigegeben (Nov. 2026).
      more: [
        {
          src: '/images/fotos/sport-sumoturnier.jpg',
          alt: 'Sumoturnier des Jahrgangs 4 auf der Judomatte: Zwei Kinder ringen, die anderen schauen am Mattenrand zu',
          width: 1600,
          height: 1200,
          objectPosition: '88% 50%',
        },
        {
          src: '/images/fotos/sport-fussballturnier.jpg',
          alt: 'Fußballturnier des Jahrgangs 3 in der Sporthalle, zwei Teams in Trikots und Leibchen',
          width: 1600,
          height: 1200,
          objectPosition: '40% 50%',
        },
      ],
    },
    partnerLogos: ['Hamburg Towers', 'Hamburger Judo-Verband', 'Sport ohne Grenzen'],
    partners: 'Hamburger Basketball-Verband e. V. und Hamburger Sportbund e. V.',
    links: [{ label: 'Profil „Fair Play“ in der Oberstufe', href: '/oberstufe#erwartet', note: 'Sport, Gesundheit & Management' }],
  },
  makerspace: {
    id: 'makerspace',
    title: 'Makerspace',
    color: 'mint',
    icon: Cog,
    teaser:
      'Der größte Makerspace einer Schule in Deutschland: vom ersten Entwurf bis zum fertigen Produkt, mit eigenem Club und Gürtelsystem.',
    intro:
      'Unsere „Ideen-, Atom- & Bit-Schmiede“: Nach dem Konzept der Maker Education entwerfen Schülerinnen und Schüler eigene Projekte und bauen sie mit Werkzeugen, Maschinen und digitaler Technik – vom ersten Entwurf bis zum fertigen Produkt.',
    facts: [
      { value: 'Nr. 1', label: 'größter Makerspace einer Schule in Deutschland' },
      { value: 'Gürtelsystem', label: 'im Makerspace Club, wie in einer Kung-Fu-Schule' },
    ],
    quote: { text: '„Lernen mit Kopf, Herz und Hand.“', author: 'Johann Heinrich Pestalozzi' },
    groups: [
      {
        title: 'Werkstätten und Technik',
        points: [
          '3D-Drucker, Laser-Cutter, CNC-Fräsen und digitales Sticken',
          'Holz-, Textil-, Theater- und Metallwerkstatt',
          'Robotik und Programmieren von Mikrocontrollern',
          'Audio und Video, VR/AR, Elektronik und digitale Textiltechnik',
        ],
      },
      {
        title: 'So lernen wir',
        points: [
          'Fehler machen schlau: Hakt ein Programm oder klemmt ein Bauteil, ist das ein Lernschritt',
          'Selbstbewusstsein durch eigenständiges Arbeiten und sichtbare Erfolge',
          'Regelmäßige Workshops mit externen Fachleuten, unterstützt vom Schulverein',
        ],
      },
    ],
    howItWorks: [
      'Im Unterricht arbeiten Klassen an eigenen Projekten – so üben sie die „21st Century Skills“.',
      'Der Makerspace Club ist freiwillig und offen in den Pausen und nach Schulschluss.',
      'Wer im Club aufsteigt, bekommt den nächsten „Gürtel“ – und mehr Verantwortung für den Makerspace.',
    ],
    links: [],
    portals: [
      {
        label: 'Zur Makerspace-Website',
        note: 'News, Club, Workshops und Equipment',
        href: 'https://stuebi-makerspace.de/',
        photo: {
          src: '/images/fotos/makerspace-holz-team.jpg',
          alt: 'Schüler bauen mit ihrem Lehrer gemeinsam an einer Werkbank in der Holzwerkstatt',
          width: 1620,
          height: 1080,
          objectPosition: '50% 40%',
        },
      },
      {
        label: 'MakerLand spielen',
        note: 'Der virtuelle stübi makerspace – ein Spiel im Browser',
        href: 'https://makerland.stuebi-makerspace.de/',
        // Intro image and logo from MakerLand itself (see docs/offene-fragen.md).
        photo: {
          src: '/images/fotos/makerland.jpg',
          alt: 'Pixelbild aus MakerLand: die Schule in Wilhelmsburg mit Hafenkränen im Sonnenuntergang',
          width: 1404,
          height: 720,
          objectPosition: '50% 60%',
        },
        logo: { src: '/images/makerland-logo.png', width: 529, height: 273 },
      },
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
    groups: [
      {
        title: 'Auf dem Teller',
        points: [
          'Frisch gekochtes Mittagessen an jedem Schultag',
          'Frische Produkte, Rohkost aus biologischem Anbau oder aus dem eigenen Schulgarten',
          'Halal-zertifiziertes Fleisch von einem regionalen Schlachter',
          'Rücksicht auf die verschiedenen kulturellen Hintergründe unserer Schülerschaft',
        ],
      },
      {
        title: 'Rund ums Essen',
        points: [
          'Verbunden mit dem Oberstufenprofil „Fair Play“ (Sport, Gesundheit & Management)',
          'Weitere Bausteine: gemeinsames Abschlussessen und die Schülerfirma „Barista“',
          'Finanziell unterstützt vom Mensaverein',
        ],
      },
    ],
    howItWorks: [
      'Die Klasse wird geteilt: Eine Hälfte kocht mit Koch und Küchenteam in der Lernküche, die andere hat Unterricht zu „Gesunder Ernährung“ – dann wird getauscht.',
      'Mittwochs gibt es passende Ausflüge, zum Beispiel auf einen Bio-Bauernhof.',
      'Jeder Jahrgang hat ein eigenes Thema – von saisonal und regional über Fairtrade bis zur Sporternährung.',
    ],
    themes: [
      { grade: 'Jg. 5', topic: 'Saisonale und regionale Ernährung' },
      { grade: 'Jg. 6', topic: 'Ernährungsformen und Ernährungspyramide' },
      { grade: 'Jg. 7', topic: 'Was ist gesunde Ernährung?' },
      { grade: 'Jg. 8', topic: 'Berufe in der Lebensmittelindustrie' },
      { grade: 'Jg. 9', topic: 'Fairtrade und Gemeinwohlökonomie' },
      { grade: 'Jg. 10', topic: 'Wir erstellen einen Food-Blog' },
      { grade: 'Jg. 11', topic: 'Sporternährung und Nahrungsergänzung' },
      { grade: 'IVK', topic: 'Essen in Deutschland: typische regionale Gerichte' },
    ],
    links: [],
  },
}
