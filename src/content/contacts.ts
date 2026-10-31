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
