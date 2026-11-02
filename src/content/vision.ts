// Inhalte der Seite „Unsere Vision“. Quellen: Zielbild der Schulleitung, Broschüre 2026, alte Seite
// „Pädagogik und Raum“ und „Kurz und knapp“.

export const leitgedanke = 'Chancen schaffen – Schülerinnen und Schüler stärken!'

// Zielbild der Schulleitung: ein Ziel in der Mitte, vier Richtungen.
export const kompassZiel = 'Ein personalisiertes und zukunftsorientiertes Bildungsangebot für jedes Kind.'

export type KompassRichtung = { direction: 'N' | 'O' | 'S' | 'W'; title: string; text: string }

export const kompassRichtungen: KompassRichtung[] = [
  {
    direction: 'N',
    title: 'Lernwege mitgestalten',
    text: 'Mit Logbuch und Lernzeiten planen die Kinder ihr Lernen selbst. Fordern-/Fördern-Kurse und Wahlkurse lassen eigene Schwerpunkte zu.',
  },
  {
    direction: 'O',
    title: 'Persönlichkeit entwickeln',
    text: 'Feste Bezugspersonen im multiprofessionellen Jahrgangsteam begleiten jedes Kind – fachlich und persönlich.',
  },
  {
    direction: 'S',
    title: 'Aktive Lernkultur',
    text: 'Wissen wird durch echtes Handeln lebendig: im Projekt mit Jahrgangsthema, im Makerspace, beim Sport und in der Schulküche von Abgekocht!',
  },
  {
    direction: 'W',
    title: 'Demokratisch miteinander',
    text: 'Im Klassenrat, im Schülerrat und in der Schulkonferenz gestalten Schülerinnen und Schüler ihre Schule mit.',
  },
]

export const kompassPruefstein = 'Jede Maßnahme und jedes Vorhaben wird daran gemessen, ob es diesem Ziel dient.'

// Die Stübi in Zahlen. Stand: alte Seite „Kurz und knapp“ – Zahlen bitte aktualisieren.
export const visionFacts: { value: string; label: string }[] = [
  { value: '1 Campus', label: 'von der Vorschule bis zum Abitur' },
  { value: '≈ 780', label: 'Schülerinnen und Schüler' },
  { value: '≈ 100', label: 'Kolleginnen und Kollegen aller pädagogischen Berufe' },
  { value: 'seit 2020', label: 'Schwerpunktschule Inklusion' },
]

export const raum = {
  title: 'Der Raum als dritter Pädagoge',
  paragraphs: [
    'Lernen findet bei uns nicht nur im Klassenraum statt, sondern auch in der Halle, auf den Treppen, auf dem Pausenhof und im Gelände.',
    'Raum und Licht, Farbe und Material sind auf Begegnung angelegt: sehen und gesehen werden, sich austauschen und gegenseitig unterstützen.',
  ],
  photo: {
    src: '/images/fotos/schulgebaeude.jpg',
    alt: 'Kinder laufen und spielen auf dem Schulhof vor dem hellen Schulgebäude',
    width: 679,
    height: 848,
    objectPosition: '50% 50%',
  },
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
