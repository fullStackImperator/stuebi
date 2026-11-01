import type { Metadata } from 'next'
import { DateRow, loadDepartments } from '@/components/dates/date-row'
import { NextLink, PageIntro, PageSection, Placeholder } from '@/components/sections/page-parts'
import { datesByKind } from '@/lib/next-dates'

export const metadata: Metadata = {
  title: 'Termine | Stübi Hamburg',
  description: 'Tag der offenen Tür, Infoabende und Anmeldezeiträume an der Stadtteilschule Stübenhofer Weg.',
}

// Dates come from the CMS (Abteilungen → Termine); refresh at most a minute after an editor changes them,
// so past dates drop off within a minute too.
export const revalidate = 60

function DateList({ items, empty }: { items: ReturnType<typeof datesByKind>['info']; empty: string }) {
  if (items.length === 0) return <p className="text-lg text-muted-foreground">{empty}</p>
  return (
    <ul className="max-w-4xl border-b border-border">
      {items.map((d) => (
        <DateRow key={`${d.department}-${d.id ?? d.title}`} item={d} showKind={false} />
      ))}
    </ul>
  )
}

export default async function TerminePage() {
  const dates = datesByKind(await loadDepartments())

  return (
    <>
      <PageIntro
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
    </>
  )
}
