import type { DateItem } from './next-dates'

/**
 * Public IServ calendar (iCal/ICS feed) as extra Termine next to the CMS ones.
 *
 * IServ: Kalender → Kalender verwalten → Freigabe → öffentlicher Link. Its URL goes into
 * ISERV_CALENDAR_URL (it carries a key, so it stays out of the repo). Without it, nothing changes.
 */

export type ExternalDate = DateItem & { department: string }

const TIME_ZONE = 'Europe/Berlin'
/** Shown next to an IServ date where CMS dates show their department. */
export const ISERV_AUDIENCE = 'Ganze Schule'
/** How far ahead recurring events are expanded. */
const HORIZON_DAYS = 400

type Prop = { value: string; params: Record<string, string> }
type RawEvent = Record<string, Prop[]>

/** A calendar day (Berlin) plus an optional wall-clock time. */
type Moment = { y: number; m: number; d: number; time?: string; allDay: boolean }

function unfold(text: string) {
  // RFC 5545: a line starting with a space or tab continues the previous one.
  return text.replace(/\r\n/g, '\n').replace(/\n[ \t]/g, '').split('\n')
}

function unescape(value: string) {
  return value.replace(/\\n/gi, '\n').replace(/\\([,;\\])/g, '$1').trim()
}

function parseLine(line: string): [string, Prop] | null {
  const colon = line.search(/:(?=(?:[^"]*"[^"]*")*[^"]*$)/)
  if (colon < 0) return null
  const [name, ...rawParams] = line.slice(0, colon).split(';')
  const params: Record<string, string> = {}
  for (const p of rawParams) {
    const [k, v = ''] = p.split('=')
    params[k.toUpperCase()] = v.replace(/^"|"$/g, '')
  }
  return [name.toUpperCase(), { value: line.slice(colon + 1), params }]
}

function rawEvents(text: string): RawEvent[] {
  const events: RawEvent[] = []
  let current: RawEvent | null = null
  let depth = 0 // nested blocks such as VALARM inside a VEVENT
  for (const line of unfold(text)) {
    if (line === 'BEGIN:VEVENT') {
      current = {}
      depth = 0
      continue
    }
    if (!current) continue
    if (line.startsWith('BEGIN:')) depth++
    else if (line.startsWith('END:') && depth > 0) depth--
    else if (line === 'END:VEVENT') {
      events.push(current)
      current = null
    } else if (depth === 0) {
      const parsed = parseLine(line)
      if (parsed) (current[parsed[0]] ??= []).push(parsed[1])
    }
  }
  return events
}

/** A DATE or DATE-TIME value as a Berlin calendar day and time. UTC (`Z`) times are converted. */
function toMoment(prop: Prop): Moment | null {
  const m = prop.value.match(/^(\d{4})(\d{2})(\d{2})(?:T(\d{2})(\d{2})(\d{2})(Z)?)?$/)
  if (!m) return null
  const [, y, mo, d, hh, mm, , z] = m
  if (!hh) return { y: +y, m: +mo, d: +d, allDay: true }
  if (!z) return { y: +y, m: +mo, d: +d, time: `${hh}:${mm}`, allDay: false } // floating or TZID: school-local
  const utc = new Date(Date.UTC(+y, +mo - 1, +d, +hh, +mm))
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat('en-CA', {
      timeZone: TIME_ZONE,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23',
    })
      .formatToParts(utc)
      .map((p) => [p.type, p.value]),
  )
  return { y: +parts.year, m: +parts.month, d: +parts.day, time: `${parts.hour}:${parts.minute}`, allDay: false }
}

/** Noon UTC on that day, like the CMS stores its day-only dates, so the day is the same in Berlin. */
const dayIso = (x: Pick<Moment, 'y' | 'm' | 'd'>) => new Date(Date.UTC(x.y, x.m - 1, x.d, 12)).toISOString()
const dayNumber = (x: Pick<Moment, 'y' | 'm' | 'd'>) => Date.UTC(x.y, x.m - 1, x.d) / 86_400_000
const fromDayNumber = (n: number) => {
  const date = new Date(n * 86_400_000)
  return { y: date.getUTCFullYear(), m: date.getUTCMonth() + 1, d: date.getUTCDate() }
}
const addMonths = (x: Pick<Moment, 'y' | 'm' | 'd'>, months: number) => {
  const total = x.y * 12 + (x.m - 1) + months
  return { y: Math.floor(total / 12), m: (total % 12) + 1, d: x.d }
}
const validDay = (x: Pick<Moment, 'y' | 'm' | 'd'>) => fromDayNumber(dayNumber(x)).d === x.d

/** Start days of a simple RRULE (DAILY/WEEKLY/MONTHLY/YEARLY with INTERVAL, COUNT, UNTIL). */
function occurrences(start: Moment, rrule: string | undefined, exdates: Set<number>, today: number): number[] {
  const first = dayNumber(start)
  if (!rrule) return [first]
  const rule = Object.fromEntries(rrule.split(';').map((p) => p.split('=') as [string, string]))
  const interval = Math.max(1, Number(rule.INTERVAL) || 1)
  const count = rule.COUNT ? Number(rule.COUNT) : Infinity
  const untilMoment = rule.UNTIL ? toMoment({ value: rule.UNTIL, params: {} }) : null
  const until = untilMoment ? dayNumber(untilMoment) : today + HORIZON_DAYS
  const end = Math.min(until, today + HORIZON_DAYS)
  const days: number[] = []
  for (let i = 0, n = 0; n < count && i < 5000; i++) {
    let day: number | null
    if (rule.FREQ === 'DAILY') day = first + i * interval
    else if (rule.FREQ === 'WEEKLY') day = first + i * 7 * interval
    else if (rule.FREQ === 'MONTHLY') {
      const x = addMonths(start, i * interval)
      day = validDay(x) ? dayNumber(x) : null
    } else if (rule.FREQ === 'YEARLY') {
      const x = { y: start.y + i * interval, m: start.m, d: start.d }
      day = validDay(x) ? dayNumber(x) : null
    } else return [first] // rules we don't expand: show the first date only
    if (day === null) continue
    if (day > end) break
    n++
    if (!exdates.has(day)) days.push(day)
  }
  return days
}

const INFO = /info|elternabend|beratung/i
const REGISTRATION = /anmeld/i

/** Turns an ICS feed into Termine. Past events are kept; `upcomingDates` drops them later. */
export function parseIcs(text: string, now = new Date()): ExternalDate[] {
  const today = Math.floor(now.getTime() / 86_400_000)
  const out: ExternalDate[] = []
  for (const ev of rawEvents(text)) {
    const get = (key: string) => ev[key]?.[0]
    if (get('STATUS')?.value.toUpperCase() === 'CANCELLED') continue
    if (get('CLASS') && get('CLASS')!.value.toUpperCase() !== 'PUBLIC') continue
    const startProp = get('DTSTART')
    const start = startProp && toMoment(startProp)
    const title = unescape(get('SUMMARY')?.value ?? '')
    if (!start || !title) continue

    const endProp = get('DTEND')
    let end = endProp ? toMoment(endProp) : null
    // All-day DTEND is exclusive: an event on the 3rd ends on the 4th.
    let lengthDays = end ? dayNumber(end) - dayNumber(start) - (end.allDay ? 1 : 0) : 0
    if (end && !end.allDay && end.time === '00:00' && lengthDays > 0) lengthDays-- // ends at midnight
    lengthDays = Math.max(0, lengthDays)
    if (end && lengthDays === 0 && end.allDay) end = null

    const time = start.allDay
      ? null
      : end && !end.allDay && lengthDays === 0 && end.time !== start.time
        ? `${start.time}–${end.time} Uhr`
        : `${start.time} Uhr`

    const exdates = new Set(
      (ev.EXDATE ?? []).flatMap((p) =>
        p.value.split(',').flatMap((v) => {
          const x = toMoment({ value: v, params: p.params })
          return x ? [dayNumber(x)] : []
        }),
      ),
    )
    const uid = get('UID')?.value ?? title
    const kind: DateItem['kind'] = REGISTRATION.test(title) ? 'registration' : INFO.test(title) ? 'info' : 'event'
    const location = get('LOCATION') ? unescape(get('LOCATION')!.value) : null
    const description = get('DESCRIPTION') ? unescape(get('DESCRIPTION')!.value) : ''

    for (const day of occurrences(start, get('RRULE')?.value, exdates, today)) {
      out.push({
        id: `iserv-${uid}-${day}`,
        title,
        kind,
        startDate: dayIso(fromDayNumber(day)),
        endDate: lengthDays > 0 ? dayIso(fromDayNumber(day + lengthDays)) : null,
        time,
        location: location || null,
        note: description ? description.slice(0, 300) : null,
        department: ISERV_AUDIENCE,
      })
    }
  }
  return out
}

/** The IServ dates, or none when the URL is unset or IServ can't be reached (the page still renders). */
export async function loadIservDates(url = process.env.ISERV_CALENDAR_URL): Promise<ExternalDate[]> {
  if (!url) return []
  try {
    const res = await fetch(url, {
      // the page itself revalidates every minute; IServ is asked at most every 10 minutes
      next: { revalidate: 600 },
      signal: AbortSignal.timeout(8000),
      headers: { Accept: 'text/calendar' },
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const text = await res.text()
    if (!text.includes('BEGIN:VCALENDAR')) throw new Error('Antwort ist kein iCal-Kalender')
    return parseIcs(text)
  } catch (err) {
    console.error('IServ-Kalender konnte nicht geladen werden', err)
    return []
  }
}

/** A CMS date wins over an IServ date with the same title on the same day, so nothing shows twice. */
export function withoutDuplicates<T extends ExternalDate>(cms: T[], iserv: T[]) {
  const key = (d: ExternalDate) =>
    `${d.title.trim().toLowerCase()}|${new Date(d.startDate).toLocaleDateString('en-CA', { timeZone: TIME_ZONE })}`
  const seen = new Set(cms.map(key))
  return iserv.filter((d) => !seen.has(key(d)))
}
