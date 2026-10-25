import Link from 'next/link'
import { Clock, MapPin } from 'lucide-react'
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
    <div
      aria-hidden="true"
      className="w-16 shrink-0 overflow-hidden rounded-2xl bg-white/10 text-center sm:w-[4.5rem]"
    >
      <p className={cn('py-1 text-xs font-bold', kindStyle[item.kind].band)}>
        {part(item.startDate, { month: 'short' }).replace(/\.$/, '')}
      </p>
      <p className="py-2 text-3xl font-extrabold leading-none tabular-nums sm:text-[2rem]">
        {part(item.startDate, { day: 'numeric' })}
      </p>
    </div>
  )
}

export async function NextDates() {
  const dates = nextDates(await loadDepartments(), 4)
  if (dates.length === 0) return null

  return (
    <section id="naechste-termine" aria-labelledby="naechste-termine-title" className="bg-surface-sand py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-surface-ink px-5 py-8 sm:px-10 sm:py-12 text-white dark:border dark:border-border">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 sm:pb-8">
            <h2 id="naechste-termine-title" className="text-3xl sm:text-4xl font-extrabold leading-tight">
              Nächste Termine
            </h2>
            <Link
              href="/termine"
              className="rounded-full border-2 border-golden px-5 py-2 text-sm font-semibold text-golden transition-colors hover:bg-golden hover:text-on-bright focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-golden"
            >
              Alle Termine
            </Link>
          </div>

          <ul className="grid gap-x-10 lg:grid-cols-2">
            {dates.map((d) => {
              const detail = dateDetail(d)
              return (
                <li
                  key={`${d.department}-${d.id ?? d.title}`}
                  className="flex items-start gap-4 border-t border-white/15 py-5 sm:gap-5 sm:py-6"
                >
                  <CalendarTile item={d} />
                  <div className="min-w-0 pt-0.5">
                    <p className="text-sm text-white/65">
                      {kindStyle[d.kind].label}, {d.department}
                    </p>
                    <h3 className="mt-1 text-lg sm:text-xl font-bold leading-snug text-pretty">{d.title}</h3>
                    {/* Screen readers get the full date here, since the tile is decorative. */}
                    <p className="sr-only">{part(d.startDate, { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                    {(detail || d.time || d.location) && (
                      <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-white/75">
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
                    )}
                    {d.note && <p className="mt-1.5 text-sm text-white/65 leading-relaxed">{d.note}</p>}
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
