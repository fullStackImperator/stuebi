import { Clock, MapPin } from 'lucide-react'
import { getPayloadClient } from '@/lib/get-payload'
import type { DateItem } from '@/lib/next-dates'
import { cn } from '@/lib/utils'

/** All departments with their dates; an empty list when the database is unreachable (e.g. at build). */
export async function loadDepartments() {
  try {
    const payload = await getPayloadClient()
    return (await payload.find({ collection: 'departments', limit: 20, depth: 0, overrideAccess: true })).docs
  } catch (err) {
    console.error('Termine konnten nicht geladen werden', err)
    return []
  }
}

// The calendar tile's band takes the colour of the kind, like the badges on /anmeldung.
export const kindStyle: Record<DateItem['kind'], { label: string; band: string }> = {
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
    <div aria-hidden="true" className="w-16 shrink-0 overflow-hidden rounded-2xl bg-surface-sand text-center in-data-[tone=sand]:bg-surface">
      <p className={cn('py-1 text-xs font-bold', kindStyle[item.kind].band)}>
        {part(item.startDate, { month: 'short' }).replace(/\.$/, '')}
      </p>
      <p data-calendar-day className="py-2 text-3xl font-extrabold leading-none tabular-nums text-foreground">
        {part(item.startDate, { day: 'numeric' })}
      </p>
    </div>
  )
}

/** One date as a row: calendar sheet, title, kind/time/place, note, and who it is for on the right. */
export function DateRow({ item, showKind = true }: { item: DateItem & { department?: string }; showKind?: boolean }) {
  const detail = dateDetail(item)
  return (
    <li data-date-row className="flex items-start gap-4 border-t border-border py-5 sm:gap-6">
      <CalendarTile item={item} />
      <div className="min-w-0 flex-1 pt-0.5 sm:flex sm:items-baseline sm:justify-between sm:gap-6">
        <div className="min-w-0">
          <h3 className="text-lg sm:text-xl font-bold leading-snug text-foreground text-pretty">{item.title}</h3>
          {/* Screen readers get the full date here, since the tile is decorative. */}
          <p className="sr-only">{part(item.startDate, { day: 'numeric', month: 'long', year: 'numeric' })}</p>
          <p className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
            {showKind && <span>{kindStyle[item.kind].label}</span>}
            {detail && <span>{detail}</span>}
            {item.time && (
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                {item.time}
              </span>
            )}
            {item.location && (
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                {item.location}
              </span>
            )}
          </p>
          {item.note && <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{item.note}</p>}
        </div>
        {(item.audience || item.department) && (
          <p className="mt-2 text-sm font-semibold text-foreground sm:mt-0 sm:shrink-0 sm:text-right">{item.audience || item.department}</p>
        )}
      </div>
    </li>
  )
}
