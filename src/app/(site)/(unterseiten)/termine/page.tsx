import type { Metadata } from 'next'
import { DateRow, dateListClass, loadDepartments } from '@/components/dates/date-row'
import { OpenRegistrationBanner } from '@/components/dates/open-registration'
import { YearRound } from '@/components/dates/year-round'
import { jahreslauf } from '@/content/jahreslauf'
import { NextLink, PageIntro, PageSection, Placeholder } from '@/components/sections/page-parts'
import { loadSchoolCalendar } from '@/lib/iserv-calendar'
import { datesByKind, groupByMonth, openRegistration, type DateItem } from '@/lib/next-dates'

export const metadata: Metadata = {
  title: 'Termine | Stübi Hamburg',
  description: 'Tag der offenen Tür, Infoabende und Anmeldezeiträume an der Stadtteilschule Stübenhofer Weg.',
}

// Dates come from the CMS (Abteilungen → Termine) and the public IServ calendar (cached for an hour);
// refresh at most a minute after an editor changes them, so past dates drop off within a minute too.
export const revalidate = 60

// Shown instead of a list when its source can't be reached, so "no dates" never stands in for "not loaded".
function Unavailable() {
  return (
    <p data-dates-unavailable className="max-w-2xl rounded-2xl bg-primary/10 p-4 text-lg text-foreground dark:bg-white/8">
      Die Termine konnten gerade nicht geladen werden. Bitte versuchen Sie es in ein paar Minuten noch einmal.
    </p>
  )
}

// An invisible target for an anchor that used to be its own section.
function OldAnchor({ id }: { id: string }) {
  return <span id={id} aria-hidden="true" className="block scroll-mt-20 md:scroll-mt-24" />
}

type ListItem = DateItem & { department?: string }

function DateList({ items, empty, showKind = false, tone }: { items: ListItem[]; empty: string; showKind?: boolean; tone?: 'school' }) {
  if (items.length === 0) return <p className="text-lg text-muted-foreground">{empty}</p>
  return (
    <ul className={`max-w-4xl ${dateListClass}`}>
      {items.map((d) => (
        <DateRow key={`${d.department}-${d.id ?? d.title}`} item={d} showKind={showKind} tone={tone} />
      ))}
    </ul>
  )
}

// Department slugs on /anmeldung, so a banner can link to the right one.
const anmeldungAnchor: Record<string, string> = { Primarstufe: 'primarstufe', Mittelstufe: 'mittelstufe', Oberstufe: 'oberstufe' }

// Registration windows that run today as banners on top, the other registration and info dates below by date.
function NewFamilies({ items }: { items: ListItem[] }) {
  const open = items.flatMap((item) => {
    const state = openRegistration(item)
    return state ? [{ item, ...state }] : []
  })
  const list = items.filter((item) => !open.some((o) => o.item === item))
  return (
    <>
      {open.length > 0 && (
        <div className="mb-6 max-w-4xl space-y-4">
          {open.map((o) => (
            <OpenRegistrationBanner
              key={`${o.item.department}-${o.item.id ?? o.item.title}`}
              {...o}
              who={o.item.department}
              href={`/anmeldung${anmeldungAnchor[o.item.department ?? ''] ? `#${anmeldungAnchor[o.item.department!]}` : ''}`}
              linkLabel="Zur Anmeldung"
            />
          ))}
        </div>
      )}
      {(list.length > 0 || open.length === 0) && (
        <DateList items={list} showKind empty="Aktuell laufen keine Anmeldungen und es stehen keine Infoabende an. Neue Termine folgen." />
      )}
    </>
  )
}

export default async function TerminePage() {
  const [departments, iserv] = await Promise.all([loadDepartments(), loadSchoolCalendar()])
  const dates = datesByKind(departments ?? [])
  // Every upcoming IServ entry, also those the CMS features above (e.g. the Tag der offenen Tür).
  const schoolCalendar = groupByMonth(iserv ?? [])

  return (
    <>
      <PageIntro
        motif="kalender"
        eyebrow="Termine"
        color="secondary"
        title="Lernen Sie die Stübi kennen."
        lead="Tag der offenen Tür, Feste, Anmeldezeiträume, Infoabende und der Schulkalender auf einen Blick."
      />

      <PageSection
        id="feste"
        eyebrow="Tag der offenen Tür & Feste"
        title="Die Stübi kennenlernen und mitfeiern."
        intro="Am Tag der offenen Tür und bei unseren Festen sehen Sie die Schule von innen."
      >
        {/* Earlier sections, so old links and bookmarks still land here. */}
        <OldAnchor id="offene-tuer" />
        <OldAnchor id="veranstaltungen" />
        {departments === null ? (
          <Unavailable />
        ) : dates.openDay.length + dates.event.length > 0 ? (
          // The Tag der offenen Tür comes first, the other festivals follow by date.
          <DateList items={[...dates.openDay, ...dates.event]} empty="" />
        ) : (
          <Placeholder>Datum und Programm des nächsten Tags der offenen Tür.</Placeholder>
        )}
      </PageSection>

      <PageSection
        id="neue-familien"
        eyebrow="Anmeldung & Infoabende"
        title="Rechtzeitig informieren und anmelden."
        intro="Anmeldezeiträume und Infotermine für Familien, die neu an die Stübi kommen."
        tone="sand"
        texture
      >
        <OldAnchor id="anmeldezeitraeume" />
        <OldAnchor id="infoabende" />
        {departments === null ? (
          <Unavailable />
        ) : (
          <NewFamilies items={[...dates.registration, ...dates.info].sort((a, b) => a.startDate.localeCompare(b.startDate))} />
        )}
        <div className="mt-10">
          <NextLink href="/anmeldung">Zur Anmeldung</NextLink>
        </div>
      </PageSection>

      <PageSection
        id="jahreslauf"
        eyebrow="Ein Jahr an der Stübi"
        title="Was jedes Jahr wiederkommt."
        intro="Feste, Turniere und Projektwochen im Lauf des Schuljahres – damit Sie wissen, worauf Sie und Ihr Kind sich freuen können."
        texture
      >
        <YearRound months={jahreslauf} />
      </PageSection>

      <PageSection
        id="schulkalender"
        eyebrow="Schulkalender"
        title="Allgemeine & schulöffentliche Termine."
        intro="Elternabende, Klassenaktionen und mehr – direkt aus dem öffentlichen Kalender der Schule in IServ."
        tone="sand"
        texture
      >
        {iserv === null ? (
          <Unavailable />
        ) : schoolCalendar.length === 0 ? (
          <p data-calendar-empty className="text-lg text-muted-foreground">
            Im Schulkalender stehen gerade keine weiteren Termine an.
          </p>
        ) : (
          <div className="space-y-10">
            {schoolCalendar.map(([month, items]) => (
              <div key={month}>
                <h3 className="mb-2 text-sm font-bold uppercase tracking-[0.15em] text-accent">{month}</h3>
                <DateList items={items} empty="" tone="school" />
              </div>
            ))}
          </div>
        )}
      </PageSection>
    </>
  )
}
