import type { RegistrationSteps } from '@/components/departments/department-sections'
import { anmeldungVorstufe } from './oberstufe'
import type { StageId } from './types'

// "So geht’s" per stage page, above the registration text from the CMS. Taken from those CMS texts
// (Abteilungen → Anmeldung); without dates so nothing goes stale – the dates stay in the CMS and under
// "Nächste Termine". If the school changes the procedure in the CMS, adjust the steps here too.
// `form` marks the step that gets the first PDF from Abteilungen → Anmeldung → Downloads, once there is one.
export const anmeldungSchritte: Partial<Record<StageId, RegistrationSteps>> = {
  vorschule: {
    title: 'In die Vorschule: so geht’s',
    steps: [
      {
        when: 'Bei der Vorstellung',
        title: 'Gleich mit anmelden',
        text: 'Bei der Vorstellung der 4,5-Jährigen – auch an einer anderen Schule, etwa der Schule Burgweide. Sie gibt die Anmeldung an uns weiter.',
      },
      { when: 'Bis zum Fristende', title: 'Oder im Schulbüro', text: 'Sie können Ihr Kind jederzeit bis zum Fristende bei uns im Schulbüro anmelden.' },
    ],
  },
  grundschule: {
    title: 'In die 1. Klasse: so geht’s',
    steps: [
      { title: 'Anmeldeformular ausfüllen', text: 'Die Anmeldung zur 1. Klasse läuft über ein Anmeldeformular.', form: true },
      { title: 'Bei der Erstwunschschule abgeben', text: 'Geben Sie das Formular im Schulbüro Ihrer Erstwunschschule ab.' },
      { title: 'Weitere Wünsche', text: 'Die Erstwunschschule trägt auch Ihren Zweit- und Drittwunsch ein.' },
    ],
  },
  mittelstufe: {
    title: 'In die 5. Klasse: so geht’s',
    steps: [
      { when: 'Ab sofort', title: 'Termin vereinbaren', text: 'Mit einem Termin für die Anmeldewoche vermeiden Sie Wartezeit.' },
      {
        when: 'In der Anmeldewoche',
        title: 'Anmeldebogen abgeben',
        text: 'Stübi-Kinder geben den gelben Bogen bei ihrer Klassenleitung ab, alle anderen im Schulbüro, per Post oder über den Hausbriefkasten.',
        form: true,
      },
      { when: 'Beim Termin', title: 'Kennenlernen', text: 'Im Gespräch mit Ihnen und Ihrem Kind schaffen wir die Grundlage für einen guten Übergang.' },
    ],
    note: { title: 'Wechsel in Klasse 7', text: 'Den Anmeldebogen erhalten und abgeben Sie über die jetzige Schule Ihres Kindes.' },
  },
  oberstufe: anmeldungVorstufe,
}

// The Abteilungen on /anmeldung and the stages they register for (CMS slug → stage ids).
const abteilungStufen: Record<string, StageId[]> = {
  primarstufe: ['vorschule', 'grundschule'],
  mittelstufe: ['mittelstufe'],
  oberstufe: ['oberstufe'],
}

export const schritteFuerAbteilung = (slug: string): RegistrationSteps[] =>
  (abteilungStufen[slug] ?? []).flatMap((id) => anmeldungSchritte[id] ?? [])
