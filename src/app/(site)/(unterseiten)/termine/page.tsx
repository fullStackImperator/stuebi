import type { Metadata } from 'next'
import { connection } from 'next/server'
import { CalendarDays, Clock, MapPin } from 'lucide-react'
import { dateText, kindLabel, upcomingDates, type DateItem } from '@/components/departments/department-sections'
import { NextLink, PageIntro, PageSection, Placeholder } from '@/components/sections/page-parts'
import { getPayloadClient } from '@/lib/get-payload'

export const metadata: Metadata = {
  title: 'Termine | Stübi Hamburg',
  description: 'Tag der offenen Tür, Infoabende und Anmeldezeiträume an der Stadtteilschule Stübenhofer Weg.',
}

type Termin = DateItem & { department: string }

// Termine kommen aus den Abteilungen im CMS (Abteilungen → Termine).
async function getTermine(): Promise<Termin[]> {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'departments',
    sort: 'order',
    limit: 20,
    depth: 0,
    overrideAccess: true,
  })
  const all = res.docs.flatMap((doc) => (doc.dates?.items ?? []).map((item) => ({ ...item, department: doc.title })))
  return upcomingDates(all) as Termin[]
}

function TerminList({ items, empty }: { items: Termin[]; empty: string }) {
  if (items.length === 0) return <p className="text-muted-foreground">{empty}</p>
  return (
    <ul className="grid sm:grid-cols-2 gap-5">
      {items.map((t) => {
        const kind = kindLabel[t.kind]
        return (
          <li
            key={t.id ?? `${t.department}-${t.title}-${t.startDate}`}
            className="rounded-3xl bg-[#f5f0e8] in-data-[tone=sand]:bg-white p-6 shadow-sm"
          >
            <div className="flex flex-wrap gap-2 mb-3">
              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${kind.className}`}>{kind.label}</span>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-muted text-foreground">{t.department}</span>
            </div>
            <p className="inline-flex items-center gap-2 text-sm font-semibold text-accent mb-2">
              <CalendarDays className="h-4 w-4" />
              {dateText(t)}
            </p>
            <h3 className="font-bold text-lg text-foreground leading-snug">{t.title}</h3>
            {(t.time || t.location) && (
              <div className="flex flex-wrap gap-x-5 gap-y-1 mt-2 text-sm text-muted-foreground">
                {t.time && (
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-4 w-4" />
                    {t.time}
                  </span>
                )}
                {t.location && (
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-4 w-4" />
                    {t.location}
                  </span>
                )}
              </div>
            )}
            {t.note && <p className="text-sm text-muted-foreground mt-2">{t.note}</p>}
          </li>
        )
      })}
    </ul>
  )
}

export default async function TerminePage() {
  await connection()
  const termine = await getTermine()
  const veranstaltungen = termine.filter((t) => t.kind !== 'registration')
  const anmeldung = termine.filter((t) => t.kind === 'registration')

  return (
    <>
      <PageIntro
        eyebrow="Termine"
        title="Lernen Sie die Stübi kennen."
        lead="Hier finden Sie den Tag der offenen Tür, Infoabende und die Anmeldezeiträume aller Abteilungen auf einen Blick."
      />

      <PageSection id="offene-tuer" eyebrow="Tag der offenen Tür" title="Die Stübi von innen sehen.">
        <Placeholder>Datum und Programm des nächsten Tags der offenen Tür.</Placeholder>
      </PageSection>

      <PageSection id="infoabende" eyebrow="Infoabende & Veranstaltungen" title="Kommen Sie vorbei." tone="sand">
        <TerminList items={veranstaltungen} empty="Aktuell stehen keine Veranstaltungen an. Neue Termine folgen." />
      </PageSection>

      <PageSection id="anmeldezeitraeume" eyebrow="Anmeldezeiträume" title="Rechtzeitig anmelden.">
        <TerminList items={anmeldung} empty="Die nächsten Anmeldezeiträume werden bald bekanntgegeben." />
        <div className="mt-10">
          <NextLink href="/anmeldung">Zur Anmeldung</NextLink>
        </div>
      </PageSection>
    </>
  )
}
