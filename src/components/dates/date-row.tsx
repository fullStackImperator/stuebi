import { Clock, MapPin } from 'lucide-react'
import { getPayloadClient } from '@/lib/get-payload'
import { dayParts, openRegistration, type DateItem } from '@/lib/next-dates'
import { cn } from '@/lib/utils'

/** All departments with their dates; `null` when the database is unreachable (e.g. at build or on a network that blocks it). */
export async function loadDepartments() {
  try {
    const payload = await getPayloadClient()
    return (await payload.find({ collection: 'departments', limit: 20, depth: 0, overrideAccess: true })).docs
  } catch (err) {
    console.error('Termine konnten nicht geladen werden', err)
    return null
  }
}

// The kind's label pill, and the big day number in the kind's colour – darkened in light mode so it stays readable.
export const kindStyle: Record<DateItem['kind'], { label: string; pill: string; day: string }> = {
  registration: { label: 'Anmeldezeitraum', pill: 'bg-accent text-white', day: 'text-accent-strong dark:text-accent' },
  info: { label: 'Infoveranstaltung', pill: 'bg-golden text-on-bright', day: 'text-[#9a7300] dark:text-golden' },
  event: { label: 'Veranstaltung', pill: 'bg-mint text-on-bright', day: 'text-[#05795b] dark:text-mint' },
}

export const fullDate = (iso: string) =>
  new Date(iso).toLocaleDateString('de-DE', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/Berlin' })

/** Class for the list around {@link DateRow}s: dashed lines between the dates. */
export const dateListClass = 'divide-y-2 divide-dashed divide-border'

/**
 * One date: the day number large in the kind's colour with month and weekday below; title, kind, time, place
 * and note; who it is for on the right. A registration window that runs today shows its deadline and the days
 * left instead. `tone="school"`: entries of the school calendar, which have no kind – smaller, in school blue.
 */
export function DateRow({
  item,
  showKind = true,
  showAudience = true,
  heading: Heading = 'h3',
  tone,
}: {
  item: DateItem & { department?: string }
  showKind?: boolean
  showAudience?: boolean
  heading?: 'h3' | 'h4'
  tone?: 'school'
}) {
  const open = openRegistration(item)
  const shown = open ? item.endDate! : item.startDate
  const day = dayParts(shown)
  const style = kindStyle[item.kind]
  const end = item.endDate ? dayParts(item.endDate) : null
  const detail = open
    ? open.daysLeft === 0
      ? 'Anmeldung läuft – heute ist der letzte Tag'
      : `Anmeldung läuft – noch ${open.daysLeft === 1 ? '1 Tag' : `${open.daysLeft} Tage`}`
    : (item.dateLabel ?? (end ? `bis ${end.day}. ${end.month}` : null))
  const audience = showAudience ? item.audience || item.department : null
  return (
    <li
      data-date-row
      className={cn('grid items-start gap-3 py-4 sm:gap-5', tone === 'school' ? 'grid-cols-[4.25rem_1fr]' : 'grid-cols-[4.5rem_1fr]')}
    >
      <div aria-hidden="true" className="whitespace-nowrap">
        <p
          data-calendar-day
          className={cn(
            'font-black leading-[0.85] tracking-tight tabular-nums',
            tone === 'school' ? 'text-4xl text-primary dark:text-foreground' : cn('text-6xl', style.day),
          )}
        >
          {day.day}
        </p>
        <p className="mt-1 text-xs font-black uppercase tracking-widest text-foreground">
          {day.month} · {day.weekday}
        </p>
      </div>
      <div className="min-w-0 pt-1 sm:flex sm:items-start sm:justify-between sm:gap-6">
        <div className="min-w-0">
          <Heading className={cn('font-extrabold leading-tight text-foreground text-pretty', tone === 'school' ? 'text-base' : 'text-lg sm:text-xl')}>
            {item.title}
          </Heading>
          {/* Screen readers get the full date here, since the day block is decorative. */}
          <p className="sr-only">
            {open && 'bis '}
            {fullDate(shown)}
          </p>
          {showKind && <p className={cn('mt-1 inline-block rounded-full px-2.5 py-0.5 text-xs font-bold', style.pill)}>{style.label}</p>}
          {(detail || item.time || item.location) && (
            <p className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
              {detail && <span className={cn(open && 'font-semibold text-accent-strong dark:text-accent')}>{detail}</span>}
              {item.time && (
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  {item.time}
                </span>
              )}
              {item.location && (
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  {item.location}
                </span>
              )}
            </p>
          )}
          {item.note && <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground text-pretty">{item.note}</p>}
        </div>
        {audience && <p className="mt-2 text-sm font-semibold text-foreground sm:mt-0 sm:max-w-xs sm:shrink-0 sm:text-right">{audience}</p>}
      </div>
    </li>
  )
}
