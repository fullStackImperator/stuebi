// Ansprechpartner und Schulbüros: Startseite, Anmeldung, Stufenseiten und Schnellzugriff lesen von hier.

export type ContactPersonId = 'otto' | 'sabadija' | 'sens' | 'behrendt'

export type ContactPerson = {
  name: string
  /** Wofür die Person ansprechbar ist, z. B. „Neue 5. Klassen“. */
  topic: string
  image: string
}

export const contactPeople: Record<ContactPersonId, ContactPerson> = {
  otto: { name: 'Sebastian Otto', topic: 'Vorschule & 1. Klassen', image: '/images/schulleitung/otto.jpg' },
  sabadija: { name: 'Ljubica Sabadija', topic: 'Neue 5. Klassen', image: '/images/schulleitung/ljubica.jpg' },
  sens: { name: 'Konrad Sens', topic: 'Mittelstufe', image: '/images/schulleitung/konrad.jpg' },
  behrendt: { name: 'Reikya Behrendt', topic: 'Oberstufe', image: '/images/schulleitung/reikya.jpg' },
}

export const contactPeopleOrder: ContactPersonId[] = ['otto', 'sabadija', 'sens', 'behrendt']

export type SchoolOffice = { label: string; phone: string; tel: string }

export const schoolOffices = {
  main: { label: 'Schulbüro', phone: '040 / 428 76 19 – 10', tel: 'tel:+4940428761910' },
  primary: { label: 'Schulbüro Primarstufe', phone: '040 / 428 96 66 – 0', tel: 'tel:+494042896660' },
} satisfies Record<string, SchoolOffice>

export const schoolEmail = 'schule-stuebenhofer-weg@bsfb.hamburg.de'
export const schoolAddress = 'Stübenhofer Weg 20a, 21109 Hamburg'

/** Who parents of each department talk to, and which Schulbüro answers the phone. */
export const departmentContacts = {
  primarstufe: { people: ['otto'], office: schoolOffices.primary },
  mittelstufe: { people: ['sens', 'sabadija'], office: schoolOffices.main },
  oberstufe: { people: ['behrendt'], office: schoolOffices.main },
} satisfies Record<string, { people: ContactPersonId[]; office: SchoolOffice }>

/** Opening hours of both Schulbüros (old site „Verwaltung / Sekretariat“). */
export const officeHours = 'Mo–Do 7:30–16:00 Uhr · Fr 7:30–13:30 Uhr'

export type OfficeMember = { name: string; role: string; email: string; image: string }

/** The people behind the Schulbüros, per building (old site „Verwaltung / Sekretariat“, Mail von Eike Hübenthal). */
export const officeTeam: { building: string; members: OfficeMember[] }[] = [
  {
    building: 'Hauptgebäude',
    members: [
      { name: 'Susanne Oehlers', role: 'Verwaltungsleitung', email: 'susanne.oehlers@stuebenhofer-weg.de', image: '/images/schulbuero/oehlers.jpg' },
      { name: 'Judith Wagener', role: 'Jahrgang 5–7', email: 'judith.wagener@stuebenhofer-weg.de', image: '/images/schulbuero/wagener.jpg' },
      { name: 'Anja Grube', role: 'Jahrgang 8–10', email: 'anja.grube@stuebenhofer-weg.de', image: '/images/schulbuero/grube.jpg' },
      { name: 'Yadigar Bayrakdar', role: 'Jahrgang 11–13', email: 'yadigar.bayrakdar@stuebenhofer-weg.de', image: '/images/schulbuero/bayrakdar.jpg' },
    ],
  },
  {
    building: 'Grundschulgebäude',
    members: [
      { name: 'Gabriela Bajohr', role: 'Primarstufe', email: 'gabriela.bajohr@stuebenhofer-weg.de', image: '/images/schulbuero/bajohr.jpg' },
      { name: 'Iris Westphal', role: 'Primarstufe', email: 'iris.westphal@stuebenhofer-weg.de', image: '/images/schulbuero/westphal.jpg' },
    ],
  },
]
