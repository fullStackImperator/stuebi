import type { Photo } from '@/lib/photo'

// Beratungsdienst (alte Seite „Kontakt → Beratung → BOB-Team“). Teamfoto 2025, Texte teils von 2021:
// vom Beratungsdienst gegenlesen lassen.

export const teamPhoto: Photo = {
  src: '/images/fotos/beratungsteam.jpg',
  alt: 'Das Beratungsteam der Schule Stübenhofer Weg: elf Personen in drei Reihen vor einem Vorhang',
  width: 2560,
  height: 1550,
  objectPosition: '50% 40%',
}

// Namen Reihe für Reihe, jeweils von links.
export const teamRows: { row: string; names: string[] }[] = [
  { row: 'Oben', names: ['Friederike Krinke', 'Brajan Michalski', 'Eric Tété'] },
  { row: 'Mitte', names: ['Jenny Zerbin', 'Rita Rónai', 'Kristina Franke', 'Helena Cvijanovic'] },
  { row: 'Unten', names: ['Arlinda Ibraimi', 'Zehra Tuna', 'Laili Zargapur', 'Muhammed Ali Kurnaz'] },
]

export const offers: { title: string; items: string[] }[] = [
  {
    title: 'Regelmäßig',
    items: [
      'Beratung für Schülerinnen und Schüler, Eltern und Lehrkräfte',
      'Hilfe im Einzelfall, abgestimmt mit der Klassenleitung',
      'Beratung von Klassen, zum Beispiel bei Mobbing',
      'Präventionsarbeit sowie Mädchen- und Jungenarbeit',
      'Beteiligung: Schülersprecherinnen und -sprecher, Stübi-Assistentinnen und -Assistenten',
      'Einzel- und Gruppenangebote in der Lernwerkstatt „Erle“',
      'Soziales Lernen als Unterricht in Klasse 5 und 6, Klassenrat ab Klasse 5',
      'Beratung im Elterncafé und das Projekt „Elternmentoren“',
      'Mitarbeit in Lernentwicklungsgesprächen und Konferenzen',
    ],
  },
  {
    title: 'Von Fall zu Fall',
    items: [
      'Konfliktmoderation',
      'Zusammenarbeit mit Beratungsstellen und Einrichtungen im Stadtteil',
      'Begleitung, wenn Kinder nicht mehr zur Schule kommen',
    ],
  },
  {
    title: 'Zusatzqualifikationen',
    items: ['Gewaltprävention und -intervention', 'Ausbildung von Streitschlichtern', 'No Blame Approach bei Mobbing', 'Kinderschutz', 'Soziales Kompetenztraining', 'Mediation'],
  },
]

// Die Beratungslehrerin.
export const counsellingTeacher = {
  name: 'Marina Merkina',
  role: 'Beratungslehrerin',
  email: 'marina.merkina@stuebenhofer-weg.de',
  // Porträts von der alten Seite (2021), auf 4:5 zugeschnitten.
  image: '/images/fotos/beratung-merkina.jpg',
  intro:
    'Schülerinnen und Schüler, Eltern sowie Lehrkräfte können mit ganz unterschiedlichen Anliegen zu Frau Merkina kommen. Im Gespräch klärt sie mit den Ratsuchenden, worum es geht, und entwickelt mit ihnen Lösungen und nächste Schritte – manchmal in einem, manchmal in mehreren Gesprächen. Bei Bedarf vermittelt sie auch Kontakte zu Beratungsstellen außerhalb der Schule.',
  topics: [
    'Schwierigkeiten beim Lernen, mit Konzentration, Antrieb oder Noten – auch nach einem Schulwechsel',
    'Stress und Krisen wie Mobbing, Ausgrenzung oder Rückzug',
    'Angespannte Situationen in der Familie, die sich auf die Schule auswirken',
    'Sorgen, die schon lange belasten und über die noch nie gesprochen wurde',
    'Angst vor der Schule oder vor Klassenarbeiten',
    'Unterstützung für Klassenleitungen und Moderation von Gesprächen',
    'Hinweise auf weitere Hilfen, etwa Schulpsychologie oder Erziehungsberatung',
  ],
  confidential:
    'Alle Gespräche sind vertraulich – es sei denn, die oder der Ratsuchende entbindet die Beratungslehrerin ausdrücklich von der Schweigepflicht.',
  consultation:
    'Sprechstunde dienstags in der Mittagsfreizeit im Beratungsraum im Mittelgebäude, neben der Schulbibliothek. Weitere Termine nach Vereinbarung.',
  howToReach: [
    'Schülerinnen und Schüler sprechen Frau Merkina in der Pause an, schreiben über IServ oder bitten ihre Klassenleitung um einen Termin.',
    'Eltern erreichen sie per E-Mail oder über das Schulbüro.',
  ],
}

export const contacts = {
  team: {
    email: 'beratungsdienst@stuebenhofer-weg.de',
    phones: [
      { label: '040 – 428 7619 42', tel: 'tel:+4940428761942' },
      { label: '040 – 428 7619 10', tel: 'tel:+4940428761910' },
    ],
  },
  people: [
    { name: 'Jenny Zerbin', role: 'PTF-Koordinatorin', email: 'jenny.zerbin@stuebenhofer-weg.de', image: '/images/fotos/beratung-zerbin.jpg' },
    { name: counsellingTeacher.name, role: counsellingTeacher.role, email: counsellingTeacher.email, image: counsellingTeacher.image },
  ],
}
