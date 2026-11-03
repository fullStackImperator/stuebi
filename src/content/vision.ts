import { Hammer, HeartHandshake, Route, School, Sprout, Users, UsersRound, Vote, type LucideIcon } from 'lucide-react'
import type { Fact } from '@/content/schwerpunkte'
import type { Photo } from '@/lib/photo'

// Inhalte der Seite „Unsere Vision“. Quellen: Zielbild der Schulleitung, Broschüre 2026, alte Seite
// „Pädagogik und Raum“ und „Kurz und knapp“.

export const leitgedanke = 'Chancen schaffen – Schülerinnen und Schüler stärken!'

// Unsere Prinzipien (früher als Kompass gezeigt): vier Haltungen aus dem Zielbild der Schulleitung.
export type Prinzip = { title: string; text: string; icon: LucideIcon; tile: string }

export const prinzipien: Prinzip[] = [
  {
    title: 'Lernwege mitgestalten',
    text: 'Mit Logbuch und Lernzeiten planen die Kinder ihr Lernen selbst. Fordern-/Fördern-Kurse und Wahlkurse lassen eigene Schwerpunkte zu.',
    icon: Route,
    tile: 'bg-primary text-primary-foreground',
  },
  {
    title: 'Persönlichkeit entwickeln',
    text: 'Feste Bezugspersonen im multiprofessionellen Jahrgangsteam begleiten jedes Kind – fachlich und persönlich.',
    icon: Sprout,
    tile: 'bg-mint text-on-bright',
  },
  {
    title: 'Aktive Lernkultur',
    text: 'Wissen wird durch echtes Handeln lebendig: im Projekt mit Jahrgangsthema, im Makerspace, beim Sport und in der Schulküche von Abgekocht!',
    icon: Hammer,
    tile: 'bg-golden text-on-bright',
  },
  {
    title: 'Demokratisch miteinander',
    text: 'Im Klassenrat, im Schülerrat und in der Schulkonferenz gestalten Schülerinnen und Schüler ihre Schule mit.',
    icon: Vote,
    tile: 'bg-accent-strong text-white',
  },
]

// Satz der Didaktischen Leitung (Mail von Phoebe Lorenz).
export const didaktikZitat = 'Bildung bedeutet, Möglichkeiten zu schaffen, nicht Grenzen zu setzen.'

// Die Stübi in Zahlen. Stand: alte Seite „Kurz und knapp“ – Zahlen bitte aktualisieren.
export const visionFacts: Fact[] = [
  { value: '1 Campus', label: 'von der Vorschule bis zum Abitur', icon: School },
  { value: '≈ 780', label: 'Schülerinnen und Schüler', icon: Users },
  { value: '≈ 100', label: 'Kolleginnen und Kollegen aller pädagogischen Berufe', icon: UsersRound },
  { value: 'seit 2020', label: 'Schwerpunktschule Inklusion', icon: HeartHandshake },
]

// Unser Campus: Einleitung, Text-Kachel und Fotos für das Bento (Fotos: Broschüre und alte Website).
export const raum = {
  intro:
    'Lernen findet bei uns nicht nur im Klassenraum statt, sondern auch in der Halle, auf den Treppen, auf dem Pausenhof und im Gelände.',
  point: {
    title: 'Der Raum als dritter Pädagoge',
    text: 'Raum und Licht, Farbe und Material sind auf Begegnung angelegt: sehen und gesehen werden, sich austauschen und gegenseitig unterstützen.',
  },
  photo: {
    src: '/images/fotos/schulgebaeude.jpg',
    alt: 'Kinder laufen und spielen auf dem Schulhof vor dem hellen Schulgebäude',
    width: 679,
    height: 848,
    objectPosition: '50% 50%',
  },
  gallery: [
    { src: '/images/campus/halle-treppe.jpg', alt: 'Die Halle mit der großen Treppe und hellen Fluren', width: 759, height: 450, objectPosition: '50% 50%' },
    { src: '/images/fotos/treppe-lesen.jpg', alt: 'Kinder lesen auf der Sitztreppe, andere gehen vorbei', width: 1041, height: 1196, objectPosition: '50% 60%' },
    { src: '/images/ganztag/bibliothek-sessel.jpg', alt: 'Bunte Sessel und Bücherregale in der Schulbibliothek', width: 1600, height: 1200, objectPosition: '50% 50%' },
    { src: '/images/campus/klassenraum.jpg', alt: 'Ein heller Klassenraum mit großen Fenstern', width: 1098, height: 732, objectPosition: '50% 50%' },
    { src: '/images/fotos/grundschule-spiel.jpg', alt: 'Zwei Kinder bauen gemeinsam an einem Tisch', width: 1043, height: 642, objectPosition: '50% 50%' },
  ] satisfies Photo[],
}

// Der Wert, der groß gezeigt wird, mit dem längeren Text aus der Broschüre.
export const werteHero = {
  title: 'Kein Kind muss gehen',
  text: 'Wenn sich Leistungsbilder oder Interessen wandeln, passen wir den Bildungsweg an. Dank unserer Wege im Stadtteilschul- und Gymnasialzweig bleibt das vertraute Umfeld mit allen gewachsenen Freundschaften erhalten.',
}

// Werte aus der Einleitung der Broschüre.
export const werte: { title: string; text: string; accent: string }[] = [
  {
    title: 'Gemeinschaft auf Augenhöhe',
    text: 'Schule ist ein gemeinsamer Lebens- und Lernort, an dem Eltern, Kinder und unser Team vertrauensvoll Hand in Hand arbeiten.',
    accent: 'bg-primary',
  },
  {
    title: 'Stabilität und Vertrauen',
    text: 'Feste Bezugspersonen schaffen einen geschützten Raum, der Ihrem Kind Kontinuität und passgenaue Förderung gibt.',
    accent: 'bg-mint',
  },
  {
    title: 'Kein Kind muss gehen',
    text: 'Wandeln sich Leistung oder Interessen, passen wir den Bildungsweg an – das vertraute Umfeld und die Freundschaften bleiben.',
    accent: 'bg-accent',
  },
  {
    title: 'Zukunft auf starkem Fundament',
    text: 'Sichere Basiskompetenzen und fundiertes Wissen, verknüpft mit echtem Handeln: Sport, Makerspace und Abgekocht!',
    accent: 'bg-golden',
  },
]
