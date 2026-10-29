import Link from 'next/link'
import { ArrowRight, Clock, MapPin } from 'lucide-react'
import { getPayloadClient } from '@/lib/get-payload'
import { nextDates, type DateItem } from '@/lib/next-dates'
import { cn } from '@/lib/utils'

// The next dates across all departments, right below the news. Nothing when none are coming.
// Freshness comes from the home page's revalidate (60 s), so past dates drop off within a minute.
async function loadDepartments() {
  try {
    const payload = await getPayloadClient()
    return (await payload.find({ collection: 'departments', limit: 20, depth: 0, overrideAccess: true })).docs
  } catch (err) {
    // Ohne Datenbank (z. B. beim Build) entfällt der Streifen einfach.
    console.error('NextDates: Termine konnten nicht geladen werden', err)
    return []
  }
}

// The calendar tile's band takes the colour of the kind, like the badges on /anmeldung.
const kindStyle: Record<DateItem['kind'], { label: string; band: string }> = {
  registration: { label: 'Anmeldezeitraum', band: 'bg-accent text-white' },
  info: { label: 'Infoveranstaltung', band: 'bg-golden text-on-bright' },
  event: { label: 'Veranstaltung', band: 'bg-mint text-on-bright' },
}

const TIME_ZONE = 'Europe/Berlin'
const part = (iso: string, opts: Intl.DateTimeFormatOptions) =>
  new Date(iso).toLocaleDateString('de-DE', { ...opts, timeZone: TIME_ZONE })
const short = (iso: string) => part(iso, { day: 'numeric', month: 'short' })

// What the tile can't show: the editor's own label, or the end of a range.
function dateDetail(item: DateItem) {
  if (item.dateLabel) return item.dateLabel
  if (item.endDate) return `bis ${short(item.endDate)}`
  return null
}

// A tear-off calendar sheet: month in the kind colour, day number below.
function CalendarTile({ item }: { item: DateItem }) {
  return (
    <div aria-hidden="true" className="w-16 shrink-0 overflow-hidden rounded-2xl bg-surface-sand text-center">
      <p className={cn('py-1 text-xs font-bold', kindStyle[item.kind].band)}>
        {part(item.startDate, { month: 'short' }).replace(/\.$/, '')}
      </p>
      <p className="py-2 text-3xl font-extrabold leading-none tabular-nums text-foreground">
        {part(item.startDate, { day: 'numeric' })}
      </p>
    </div>
  )
}

// Intro on the left, the list of dates on the right (after the design draft "Was als Nächstes ansteht").
export async function NextDates() {
  const dates = nextDates(await loadDepartments(), 5)
  if (dates.length === 0) return null

  return (
    <section id="naechste-termine" aria-labelledby="naechste-termine-title" className="bg-surface py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="inline-flex items-center gap-3 mb-5">
            <span className="w-6 h-px bg-accent" />
            <span className="text-accent text-xs font-bold tracking-[0.2em] uppercase">Termine</span>
          </div>
          <h2 id="naechste-termine-title" className="text-3xl sm:text-4xl font-extrabold text-foreground leading-tight mb-4">
            Was als Nächstes ansteht
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed text-pretty mb-8">
            Anmeldungen, Feste und Infoabende im Überblick.
          </p>
          <Link
            href="/termine"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            Alle Termine
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <ul className="border-b border-border lg:col-span-8">
          {dates.map((d) => {
            const detail = dateDetail(d)
            return (
              <li
                key={`${d.department}-${d.id ?? d.title}`}
                className="flex items-start gap-4 border-t border-border py-5 sm:gap-6"
              >
                <CalendarTile item={d} />
                <div className="min-w-0 flex-1 pt-0.5 sm:flex sm:items-baseline sm:justify-between sm:gap-6">
                  <div className="min-w-0">
                    <h3 className="text-lg sm:text-xl font-bold leading-snug text-foreground text-pretty">{d.title}</h3>
                    {/* Screen readers get the full date here, since the tile is decorative. */}
                    <p className="sr-only">{part(d.startDate, { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                    <p className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                      <span>{kindStyle[d.kind].label}</span>
                      {detail && <span>{detail}</span>}
                      {d.time && (
                        <span className="inline-flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                          {d.time}
                        </span>
                      )}
                      {d.location && (
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                          {d.location}
                        </span>
                      )}
                    </p>
                    {d.note && <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{d.note}</p>}
                  </div>
                  <p className="mt-2 text-sm font-semibold text-foreground sm:mt-0 sm:shrink-0 sm:text-right">
                    {d.audience || d.department}
                  </p>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
