import type { Photo } from '@/lib/photo'

export type StageId = 'vorschule' | 'grundschule' | 'mittelstufe' | 'oberstufe' | 'ganztag'

export type StageColor = 'golden' | 'mint' | 'accent' | 'primary' | 'surface-ink'

// `figure`: großer Blickfang der Kachel (Zahl wie „3“ oder Kürzel wie „WIKI“), `tags`: Stichworte als Tags,
// `questions`: Fragen der Kinder als Sprechblasen, `steps`: kleiner Tagesablauf mit Symbolen,
// `checks`: Häkchen-Liste; mit `figure` steht die Zahl dann als Baustein daneben, `cards`: Stichworte als
// aufgefächerte Karten mit Symbol, `team`: Berufe eines Teams mit rundem Symbol.
export type StepIcon = 'fruehstueck' | 'mittagessen' | 'spiel'
export type Step = { label: string; note?: string; icon: StepIcon }
export type CardIcon =
  | 'wunsch'
  | 'grenze'
  | 'versoehnen'
  | 'sport'
  | 'musik'
  | 'handwerk'
  | 'kunst'
  | 'theater'
  | 'olympiade'
  | 'informatik'
  | 'papierflieger'
  | 'lehrkraft'
  | 'sozialpaedagogik'
  | 'erzieher'
  | 'bibliothek'
export type Card = { label: string; icon: CardIcon }
// Symbol eines Punkts in „Das erwartet Ihr Kind“.
export type ExpectIcon =
  | 'miteinander'
  | 'kreativ'
  | 'tiere'
  | 'buch'
  | 'lernzeit'
  | 'bewegung'
  | 'foerderung'
  | 'auswahl'
  | 'beobachten'
  | 'kompass'
  | 'zuhause'
  | 'bruecke'
  | 'sprachen'
  | 'forschen'
  | 'essen'
export type Point = {
  title: string
  text: string
  icon?: ExpectIcon
  figure?: string
  tags?: string[]
  questions?: string[]
  steps?: Step[]
  checks?: string[]
  cards?: Card[]
  team?: Card[]
}

// Station eines Wegs, z. B. Kita → Vorschule → Klasse 1; `current` markiert die Stufe der Seite.
export type RouteStation = { label: string; note?: string; current?: boolean }

// Eine Zeile im Stundenplan: ein Block (mit Band) oder eine Pause.
export type ScheduleRow = {
  time: string
  title: string
  text?: string
  // Farbe des Blocks; `pause` wird als schmale Zwischenzeile gezeigt.
  kind: 'start' | 'unterricht' | 'vertiefung' | 'kurse' | 'pause'
  note?: string
}

export type Weekday = 'Mo' | 'Di' | 'Mi' | 'Do' | 'Fr'
// `kind` wählt Symbol und Farbe des Bereichs (Sport, Kreativ, Spiele, Treffpunkte).
export type CourseKind = 'fussball' | 'basketball' | 'design' | 'mark' | 'foto' | 'basteln' | 'schach' | 'spiele' | 'homeround' | 'maedchen'
// `partner`: die Einrichtung, die den Kurs anbietet – keine Namen von Personen.
export type CourseOffer = { name: string; kind: CourseKind; partner?: string; room: string }
// Ein Kurstermin: diese Jahrgänge wählen an diesem Tag in diesem Block aus diesen Kursen.
export type CourseSlot = { grades: number[]; day: Weekday; block: 2 | 3 | 4; time: string; courses: CourseOffer[] }

// `hours`: Sprechzeiten, unter der Mail-Adresse.
export type BlockPerson = { name: string; role: string; email?: string; image?: string; hours?: string }

export type StudentCompany = { name: string; text: string; image: string }

// Ein Abschnitt eines Wegs durch die Klassenstufen, z. B. Klasse 5 und 6 in der Mittelstufe.
export type Phase = { grades: string; title: string; text: string; tags: string[] }

// Ein Abschnitt einer Stufenseite; `id` wird zur Anker-id der Section.
export type Block = {
  id: string
  heading: string
  intro?: string
  points?: Point[]
  // Weg durch die Klassenstufen (statt Punkten), mit Stichworten als Tags.
  phases?: Phase[]
  // Kurzer Weg über dem Abschnitt, z. B. Kita → Vorschule → Klasse 1.
  route?: RouteStation[]
  paragraphs?: string[]
  // Stellen in den Absätzen, die wie mit einem Textmarker hervorgehoben werden.
  highlights?: { text: string; color: 'mint' | 'accent' | 'golden' }[]
  placeholder?: string
  // Tappable contact links (mailto:, tel:) under the text.
  // `button`: als Schaltfläche (gefüllt), `outline`: als umrandete Schaltfläche, sonst Textlink.
  links?: { label: string; href: string; style?: 'button' | 'outline' }[]
  schedule?: ScheduleRow[]
  // Kurstermine je Jahrgang, zum Auswählen nach Jahrgang.
  courseSlots?: CourseSlot[]
  // Foto neben dem Text.
  photo?: Photo
  // CMS-Platz „Seitenbilder → Ganztag“, der dieses Foto ersetzt, sobald dort eines hochgeladen ist.
  cmsPhoto?: 'nachmittag' | 'mensa'
  // CMS-Galerie „Seitenbilder → Ganztag“, die `gallery` ersetzt, sobald dort Fotos hochgeladen sind.
  cmsGallery?: 'mensaGalerie'
  // Weitere Fotos als Reihe unter dem Abschnitt.
  gallery?: Photo[]
  people?: BlockPerson[]
  // Besondere Klassen oder Wege neben einem Foto (Berufsorientierung: Ausbildungs- und Fokusklasse).
  // `facts`: Kennzahlen, groß auf der Kachel.
  tracks?: { heading: string; items: (Point & { facts?: { value: string; label: string }[] })[]; photo: Photo }
  companies?: StudentCompany[]
}

export type StageContent = {
  id: StageId
  name: string
  grades: string
  lead: string
  // Ein Satz für die Kachel auf der Startseite und der Bildungswege-Übersicht.
  teaser: string
  color: StageColor
  photo: Photo
  // Feld im CMS-Global „Seitenbilder → Bildungswege“; ein dort gesetztes Foto hat Vorrang.
  photoSlot?: 'vorschule' | 'grundschule' | 'mittelstufe' | 'oberstufe'
  expect: Point[]
  everyday: Block[]
  extra?: Block[]
  support: boolean
  careers: boolean
  department?: 'primarstufe' | 'mittelstufe' | 'oberstufe'
  next?: StageId
}
