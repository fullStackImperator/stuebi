import type { Metadata } from 'next'
import { CalendarDays, Clock, MapPin } from 'lucide-react'
import { NextLink, PageIntro, PageSection, Placeholder } from '@/components/sections/page-parts'

export const metadata: Metadata = {
  title: 'Termine | Stübi Hamburg',
  description: 'Tag der offenen Tür, Infoabende und Anmeldezeiträume an der Stadtteilschule Stübenhofer Weg.',
}

type Termin = {
  title: string
  date: string
  time?: string
  location?: string
  note?: string
}

// Vorläufig fest eingetragen (Angaben der Primarstufe). Sobald die Abteilungsseiten
// im CMS gepflegt werden, sollen die Termine von dort kommen.
const infoTermine: Termin[] = [
  {
    title: 'Marktplatz der Grundschulen',
    date: '19.11.2026',
    time: '15:00–17:00 Uhr',
    location: 'Tor zur Welt',
    note: 'Für Eltern künftiger Vorschul- und Erstklässler',
  },
  { title: 'Winterfest', date: '03.12.2026' },
]

const anmeldeTermine: Termin[] = [
  { title: 'Anmeldung Vorschule', date: 'ab November bis 22.01.2027' },
  { title: 'Anmeldung 1. Klasse', date: '04.01.2027 – 22.01.2027' },
]

function TerminList({ items }: { items: Termin[] }) {
  return (
    <ul className="grid sm:grid-cols-2 gap-5">
      {items.map((t) => (
        <li key={t.title} className="rounded-3xl bg-[#f5f0e8] in-data-[tone=sand]:bg-white p-6 shadow-sm">
          <p className="inline-flex items-center gap-2 text-sm font-semibold text-accent mb-2">
            <CalendarDays className="h-4 w-4" />
            {t.date}
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
      ))}
    </ul>
  )
}

export default function TerminePage() {
  return (
    <>
      <PageIntro
        eyebrow="Termine"
        title="Lernen Sie die Stübi kennen."
        lead="Hier finden Sie den Tag der offenen Tür, Infoabende und die Anmeldezeiträume auf einen Blick."
      />

      <PageSection id="offene-tuer" eyebrow="Tag der offenen Tür" title="Die Stübi von innen sehen.">
        <Placeholder>Datum und Programm des nächsten Tags der offenen Tür.</Placeholder>
      </PageSection>

      <PageSection id="infoabende" eyebrow="Infoabende & Veranstaltungen" title="Kommen Sie vorbei." tone="sand">
        <div className="mb-8">
          <TerminList items={infoTermine} />
        </div>
        <Placeholder>Infoabende für neue 5. Klassen und die Oberstufe.</Placeholder>
      </PageSection>

      <PageSection id="anmeldezeitraeume" eyebrow="Anmeldezeiträume" title="Rechtzeitig anmelden.">
        <TerminList items={anmeldeTermine} />
        <div className="mt-10">
          <NextLink href="/anmeldung">Zur Anmeldung</NextLink>
        </div>
      </PageSection>
    </>
  )
}
