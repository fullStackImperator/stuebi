import type { Metadata } from 'next'
import { DateRow, loadDepartments } from '@/components/dates/date-row'
import { NextLink, PageIntro, PageSection, Placeholder } from '@/components/sections/page-parts'
import { loadSchoolCalendar } from '@/lib/iserv-calendar'
import { datesByKind, type DateItem } from '@/lib/next-dates'

export const metadata: Metadata = {
  title: 'Termine | Stübi Hamburg',
  description: 'Tag der offenen Tür, Infoabende und Anmeldezeiträume an der Stadtteilschule Stübenhofer Weg.',
}

// Dates come from the CMS (Abteilungen → Termine) and the public IServ calendar (cached for an hour);
// refresh at most a minute after an editor changes them, so past dates drop off within a minute too.
export const revalidate = 60

function DateList({ items, empty }: { items: (DateItem & { department?: string })[]; empty: string }) {
  if (items.length === 0) return <p className="text-lg text-muted-foreground">{empty}</p>
  return (
    <ul className="max-w-4xl border-b border-border">
      {items.map((d) => (
        <DateRow key={`${d.department}-${d.id ?? d.title}`} item={d} showKind={false} />
      ))}
    </ul>
  )
}

// The IServ entries by month, e.g. „Dezember 2026“, in date order.
function byMonth(items: DateItem[]) {
  const months = new Map<string, DateItem[]>()
  for (const item of items) {
    const label = new Date(item.startDate).toLocaleDateString('de-DE', { month: 'long', year: 'numeric', timeZone: 'Europe/Berlin' })
    months.set(label, [...(months.get(label) ?? []), item])
  }
  return [...months]
}

export default async function TerminePage() {
  const [departments, iserv] = await Promise.all([loadDepartments(), loadSchoolCalendar()])
  const dates = datesByKind(departments)
  // Every upcoming IServ entry, also those the CMS features above (e.g. the Tag der offenen Tür).
  const schoolCalendar = byMonth(iserv)

  return (
    <>
      <PageIntro
        motif="kalender"
        eyebrow="Termine"
        color="secondary"
        title="Lernen Sie die Stübi kennen."
        lead="Hier finden Sie den Tag der offenen Tür, Infoabende und die Anmeldezeiträume auf einen Blick."
      />

      <PageSection id="offene-tuer" eyebrow="Tag der offenen Tür" title="Die Stübi von innen sehen.">
        {dates.openDay.length > 0 ? (
          <DateList items={dates.openDay} empty="" />
        ) : (
          <Placeholder>Datum und Programm des nächsten Tags der offenen Tür.</Placeholder>
        )}
      </PageSection>

      <PageSection id="anmeldezeitraeume" eyebrow="Anmeldezeiträume" title="Rechtzeitig anmelden." tone="sand">
        <DateList items={dates.registration} empty="Aktuell läuft keine Anmeldung. Neue Zeiträume folgen." />
        <div className="mt-10">
          <NextLink href="/anmeldung">Zur Anmeldung</NextLink>
        </div>
      </PageSection>

      <PageSection id="infoabende" eyebrow="Infoabende & Infoveranstaltungen" title="Kommen Sie vorbei.">
        <DateList items={dates.info} empty="Aktuell stehen keine Infoveranstaltungen an. Neue Termine folgen." />
      </PageSection>

      <PageSection id="veranstaltungen" eyebrow="Feste & Veranstaltungen" title="Feiern Sie mit uns." tone="sand">
        <DateList items={dates.event} empty="Aktuell stehen keine Veranstaltungen an. Neue Termine folgen." />
      </PageSection>

      <PageSection
        id="schulkalender"
        eyebrow="Schulkalender"
        title="Alle weiteren Termine."
        intro="Elternabende, Klassenaktionen und mehr – direkt aus dem öffentlichen Kalender der Schule in IServ."
      >
        {schoolCalendar.length === 0 ? (
          <p data-calendar-empty className="text-lg text-muted-foreground">
            Im Schulkalender stehen gerade keine weiteren Termine an.
          </p>
        ) : (
          <div className="space-y-10">
            {schoolCalendar.map(([month, items]) => (
              <div key={month}>
                <h3 className="mb-2 text-sm font-bold uppercase tracking-[0.15em] text-accent">{month}</h3>
                <DateList items={items} empty="" />
              </div>
            ))}
          </div>
        )}
      </PageSection>
    </>
  )
}
