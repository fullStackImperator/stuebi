import type { Fact } from '@/content/schwerpunkte'
import type { Photo } from '@/lib/photo'

// Die drei kleineren Schwerpunkte aus dem Menü „Schwerpunkte“ der alten Webseite: MINTprax, Zweite
// Fremdsprache und Projektlernen. Quellen: alte Seiten „MINTprax“, „Zweite Fremdsprache“, „Projektlernen“
// und „Wettbewerbe“.

const photo = (src: string, alt: string, width: number, height: number, objectPosition = '50% 50%'): Photo => ({
  src: `/images/fotos/${src}`,
  alt,
  width,
  height,
  objectPosition,
})

export const mintprax = {
  intro:
    'MINT steht für Mathematik, Informatik, Naturwissenschaften und Technik, „prax“ für Praxis: Diese Fächer lernt man am besten, indem man sie anwendet – im Experiment, in der Werkstatt und im Betrieb.',
  facts: [
    { value: '10–12', label: 'Kinder pro Gruppe beim Experimentieren in Biologie, Chemie und Physik' },
    { value: '4 Räume', label: 'für die Naturwissenschaften, dazu der Makerspace' },
    { value: 'Klasse 1–13', label: 'ein MINT-Konzept vom Sachunterricht bis zur Informatik in der Oberstufe' },
  ] satisfies Fact[],
  points: [
    'Technik und Informatik im Sachunterricht, in Naturwissenschaften/Technik (5–6), im Fach Projekt (5–8), in Arbeit und Beruf (7–10) und in Informatik (11–13)',
    'Lernen an außerschulischen Orten wie Minitopia, MINTarium, ZSU und DESY@school',
    'Die Ausstellung „Stübi-Mini-Phänomenta“ zum Staunen und Ausprobieren',
    'Lehrkräfte mit Berufserfahrung, zum Beispiel als Industriemechaniker, Bankkauffrau oder Ingenieur',
  ],
  projects: [
    {
      title: 'Nachwuchscampus der TUHH',
      text: 'Eine achte Klasse baut ein Elektro-Automodell, lötet Schaltungen und programmiert Mikrocontroller – mit Werksbesuch bei Mercedes-Benz in Harburg.',
    },
    {
      title: 'Aurubis im Profil- und Praxistag',
      text: 'Ein Schuljahr lang besuchen Schülerinnen und Schüler das Unternehmen und arbeiten in der Schule an Projekten in Chemie und Technik.',
    },
  ],
  photos: [
    photo('mint-schaltung.jpg', 'Eine selbst gesteckte Schaltung mit bunten Kabeln und leuchtenden LEDs', 1620, 1080),
    photo('mint-labor.jpg', 'Ein Schüler im Laborkittel arbeitet an einem Versuch im Chemieraum', 720, 1080, '50% 35%'),
  ],
}

export const fremdsprachen = {
  intro:
    'Neben Englisch wählen Schülerinnen und Schüler ab Klasse 7 eine zweite Fremdsprache – im Wahlpflichtunterricht bis Klasse 10.',
  languages: [
    { name: 'Spanisch', greeting: '¡Hola!', note: 'neu ab Klasse 7', tile: 'bg-golden text-on-bright' },
    { name: 'Französisch', greeting: 'Bonjour !', note: 'neu ab Klasse 7', tile: 'bg-primary text-primary-foreground' },
    { name: 'Türkisch', greeting: 'Merhaba!', note: 'als Herkunftssprache', tile: 'bg-accent-strong text-white' },
  ],
  points: [
    'Voraussetzung ist mindestens die Note 3 in Deutsch und Englisch; Ausnahmen sind nach Absprache möglich.',
    'Wer in Klasse 7 bis 10 keine zweite Sprache belegt, holt sie in der Oberstufe innerhalb von drei Jahren nach – für das Abitur ist sie nötig.',
    'Eine Abiturprüfung ist in allen drei Sprachen möglich.',
  ],
}

export const projektlernen = {
  intro:
    'Wer schaltet eigentlich das Licht im Kühlschrank an und aus? Im Fach Projekt gehen Kinder Fragen aus ihrem Alltag nach – und lernen so, die Welt zu begreifen.',
  points: [
    {
      title: 'Das Fach Projekt',
      text: 'In Klasse 5 bis 8 stellen die Kinder eigene Fragen, suchen Lösungswege und entdecken ihre Lebenswelt.',
    },
    { title: 'Projektwochen', text: 'Ganze Wochen für größere Zusammenhänge – über die Grenzen der Fächer hinweg.' },
    {
      title: 'Stübi-Assistenten',
      text: 'Schülerinnen und Schüler aus Jahrgang 8 bieten in der Mittagsfreizeit Tanzen, Basteln, Spieleverleih und Turniere für die Jüngeren an.',
    },
  ],
  award: {
    title: '1. Platz für das Hörspiel „Reisender“',
    text: 'Die Schülerfirma Medien-Stübi gewann 2019 den Hamburger Schulwettbewerb von AudiYou und Hinz&Kunzt – unter rund 25 Beiträgen, dazu einen Sonderpreis für die Produktion.',
  },
  photo: photo('projekt-garten.jpg', 'Zwei Schülerinnen zeigen lachend ihre erdigen Hände nach der Arbeit im Garten', 759, 450),
}
