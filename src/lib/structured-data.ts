// Structured data (schema.org JSON-LD), so search engines recognise the school, its articles and its dates.
import { partnerEmail, schoolOffices } from '@/content/contacts'
import type { DateItem } from '@/lib/next-dates'
import { SITE_URL } from '@/lib/site'

const SCHOOL_NAME = 'Stadtteilschule Stübenhofer Weg'

/** Publisher and organiser on articles and events. */
export const SCHOOL_REF = { '@type': 'School', name: SCHOOL_NAME, url: SITE_URL }

/** `schoolAddress` from contacts.ts, split into its parts. */
export const SCHOOL_ADDRESS = { '@type': 'PostalAddress', streetAddress: 'Stübenhofer Weg 20a', postalCode: '21109', addressLocality: 'Hamburg', addressCountry: 'DE' }

export function schoolJsonLd(): Record<string, unknown> {
  const sameAs = [process.env.NEXT_PUBLIC_FACEBOOK_PAGE_URL, process.env.NEXT_PUBLIC_INSTAGRAM_URL].filter(Boolean)
  return {
    '@context': 'https://schema.org',
    ...SCHOOL_REF,
    alternateName: 'Stübi',
    logo: `${SITE_URL}/images/stuebi-logo-brand.svg`,
    image: `${SITE_URL}/images/vorschau.jpg`,
    telephone: schoolOffices.main.tel.replace('tel:', ''),
    email: partnerEmail,
    address: SCHOOL_ADDRESS,
    ...(sameAs.length ? { sameAs } : {}),
  }
}

export function newsArticleJsonLd(doc: { title: string; slug: string; publishedAt?: string | null; updatedAt: string; excerpt?: string | null; image?: string | null }): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: doc.title,
    ...(doc.excerpt ? { description: doc.excerpt } : {}),
    datePublished: doc.publishedAt ?? doc.updatedAt,
    dateModified: doc.updatedAt,
    image: doc.image ?? `${SITE_URL}/images/vorschau.jpg`,
    mainEntityOfPage: `${SITE_URL}/news/${doc.slug}`,
    author: SCHOOL_REF,
    publisher: { ...SCHOOL_REF, logo: { '@type': 'ImageObject', url: `${SITE_URL}/images/stuebi-logo-brand.svg` } },
  }
}

const TIME_ZONE = 'Europe/Berlin'

/** „15:00 – 17:00 Uhr“ → 15:00 to 17:00; „ab 9.30 Uhr“ → 09:30; free text without a time → null. */
export function parseTimeRange(time?: string | null): { start: string; end?: string } | null {
  const times = [...(time ?? '').matchAll(/\b(\d{1,2})[:.](\d{2})\b/g)].map((m) => `${m[1].padStart(2, '0')}:${m[2]}`)
  if (!times.length) return null
  return times[1] ? { start: times[0], end: times[1] } : { start: times[0] }
}

/** A Hamburg date, with the time and the summer or winter offset of that day when a time is given. */
export function berlinIso(date: string, time?: string) {
  if (!time) return date
  const offset = new Intl.DateTimeFormat('en-US', { timeZone: TIME_ZONE, timeZoneName: 'longOffset' })
    .formatToParts(new Date(`${date}T12:00:00Z`))
    .find((p) => p.type === 'timeZoneName')!
    .value.replace('GMT', '')
  return `${date}T${time}:00${offset || '+00:00'}`
}

/** The calendar day of a CMS timestamp in Hamburg, not in UTC. */
const berlinDay = (iso: string) => new Date(iso).toLocaleDateString('en-CA', { timeZone: TIME_ZONE })

/** A festival, open day or info evening from the CMS as a schema.org Event. */
export function eventJsonLd(item: DateItem): Record<string, unknown> {
  const range = parseTimeRange(item.time)
  const day = berlinDay(item.startDate)
  const endDate = item.endDate ? berlinIso(berlinDay(item.endDate), range?.end) : range?.end ? berlinIso(day, range.end) : undefined
  const description = item.note || item.dateLabel
  return {
    '@type': 'Event',
    name: item.title,
    startDate: berlinIso(day, range?.start),
    ...(endDate ? { endDate } : {}),
    ...(description ? { description } : {}),
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    location: { '@type': 'Place', name: item.location || SCHOOL_NAME, address: item.location ? `${item.location}, Hamburg` : SCHOOL_ADDRESS },
    organizer: SCHOOL_REF,
  }
}
