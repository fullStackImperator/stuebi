// Structured data (schema.org JSON-LD), so search engines recognise the school, its articles and its dates.
import { partnerEmail, schoolOffices } from '@/content/contacts'
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
