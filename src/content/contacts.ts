// Ansprechpartner und Schulbüros: Startseite, Anmeldung, Stufenseiten und Schnellzugriff lesen von hier.

export type ContactPersonId = 'otto' | 'sabadija' | 'sens' | 'behrendt'

export type ContactPerson = {
  name: string
  /** Wofür die Person ansprechbar ist, z. B. „Neue 5. Klassen“. */
  topic: string
  image: string
  /** Direkte Durchwahl und E-Mail (alte Seite „Schulleitung“). */
  phone: string
  email: string
}

export const contactPeople: Record<ContactPersonId, ContactPerson> = {
  otto: {
    name: 'Sebastian Otto',
    topic: 'Vorschule & 1. Klassen',
    image: '/images/schulleitung/otto.jpg',
    phone: '040 / 428 96 66 – 0',
    email: 'sebastian.otto@stuebenhofer-weg.de',
  },
  sabadija: {
    name: 'Ljubica Sabadija',
    topic: 'Neue 5. Klassen',
    image: '/images/schulleitung/ljubica.jpg',
    phone: '040 / 428 76 19 – 14',
    email: 'ljubica.sabadija@stuebenhofer-weg.de',
  },
  sens: {
    name: 'Konrad Sens',
    topic: 'Mittelstufe',
    image: '/images/schulleitung/konrad.jpg',
    phone: '040 / 428 76 19 – 54',
    email: 'konrad.sens@stuebenhofer-weg.de',
  },
  behrendt: {
    name: 'Reikya Behrendt',
    topic: 'Oberstufe',
    image: '/images/schulleitung/reikya.jpg',
    phone: '040 / 428 76 19 – 10',
    email: 'reikya.behrendt@stuebenhofer-weg.de',
  },
}

/** Didaktische Leitung und IVK-Koordination (Vision, IVK auf den Bildungswegen). */
export const didacticLead = {
  name: 'Phoebe Lorenz',
  image: '/images/schulleitung/phoebe.jpg',
  phone: '040 / 428 76 19 – 16',
  email: 'phoebe.lorenz@stuebenhofer-weg.de',
}

export const contactPeopleOrder: ContactPersonId[] = ['otto', 'sabadija', 'sens', 'behrendt']

export type SchoolOffice = { label: string; phone: string; tel: string }

export const schoolOffices = {
  main: { label: 'Schulbüro', phone: '040 / 428 76 19 – 10', tel: 'tel:+4940428761910' },
  primary: { label: 'Schulbüro Primarstufe', phone: '040 / 428 96 66 – 0', tel: 'tel:+494042896660' },
} satisfies Record<string, SchoolOffice>

export const schoolEmail = 'schule-stuebenhofer-weg@bsfb.hamburg.de'
// Anliegen für den Betreff, damit das Schulbüro Mails weiterleiten kann (Mail von Phoebe Lorenz).
export const mailTopics = ['Anmeldung', 'Primarstufe', 'Mittelstufe', 'Oberstufe', 'Ganztag', 'IVK', 'Sonstiges'] as const
export type MailTopic = (typeof mailTopics)[number]

/** mailto link to the Schulbüro with the topic in brackets at the start of the subject. */
export const topicMailto = (topic: MailTopic, to: string = schoolEmail) =>
  `mailto:${to}?subject=${encodeURIComponent(`[${topic}] Anfrage über die Website`)}`

export const schoolAddress = 'Stübenhofer Weg 20a, 21109 Hamburg'

/** Who parents of each department talk to, and which Schulbüro answers the phone. */
export const departmentContacts = {
  primarstufe: { people: ['otto'], office: schoolOffices.primary },
  mittelstufe: { people: ['sens', 'sabadija'], office: schoolOffices.main },
  oberstufe: { people: ['behrendt'], office: schoolOffices.main },
} satisfies Record<string, { people: ContactPersonId[]; office: SchoolOffice }>

/** Opening hours of both Schulbüros (old site „Verwaltung / Sekretariat“). */
export const officeHours = 'Mo–Do 7:30–16:00 Uhr · Fr 7:30–13:30 Uhr'

export type OfficeMember = { name: string; role: string; email: string; image: string; /** Nur bei eigener Durchwahl. */ phone?: string }

/** The people behind the Schulbüros, per building (old site „Verwaltung / Sekretariat“, Mail von Eike Hübenthal). */
export const officeTeam: { building: string; members: OfficeMember[] }[] = [
  {
    building: 'Hauptgebäude',
    members: [
      { name: 'Susanne Oehlers', role: 'Verwaltungsleitung', email: 'susanne.oehlers@stuebenhofer-weg.de', image: '/images/schulbuero/oehlers.jpg' },
      { name: 'Judith Wagener', role: 'Jahrgang 5–7', email: 'judith.wagener@stuebenhofer-weg.de', image: '/images/schulbuero/wagener.jpg', phone: '040 / 428 76 19 – 13' },
      { name: 'Anja Grube', role: 'Jahrgang 8–10', email: 'anja.grube@stuebenhofer-weg.de', image: '/images/schulbuero/grube.jpg' },
      { name: 'Yadigar Bayrakdar', role: 'Jahrgang 11–13 · IVK', email: 'yadigar.bayrakdar@stuebenhofer-weg.de', image: '/images/schulbuero/bayrakdar.jpg' },
    ],
  },
  {
    building: 'Grundschulgebäude',
    members: [
      { name: 'Iris Westphal', role: 'Vorschule – Kl. 4', email: 'iris.westphal@stuebenhofer-weg.de', image: '/images/schulbuero/westphal.jpg' },
    ],
  },
]

/** Who in the Schulbüro looks after each department, for the Schulbüro box on the Stufe pages. */
const officeStaffNames: Record<keyof typeof departmentContacts, string[]> = {
  primarstufe: ['Iris Westphal'],
  mittelstufe: ['Judith Wagener', 'Anja Grube'],
  oberstufe: ['Yadigar Bayrakdar'],
}

const allOfficeMembers = officeTeam.flatMap((b) => b.members)

export const officeStaff = (slug: keyof typeof departmentContacts): OfficeMember[] =>
  officeStaffNames[slug].map((name) => allOfficeMembers.find((m) => m.name === name)).filter((m): m is OfficeMember => !!m)
