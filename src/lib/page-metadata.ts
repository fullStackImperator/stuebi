import type { Metadata } from 'next'
import { SITE_NAME } from '@/lib/site'

/** Cuts text to at most `max` characters at a word boundary, ending in „…“ when shortened. */
export function shorten(text: string, max = 150) {
  const clean = text.replace(/\s+/g, ' ').trim()
  if (clean.length <= max) return clean
  const cut = clean.slice(0, max - 1)
  const end = cut.lastIndexOf(' ')
  return `${(end > 0 ? cut.slice(0, end) : cut).replace(/[\s,;:–-]+$/, '')}…`
}

/** Title, description, canonical address and link preview for one page; the layout adds „| Stübi Hamburg“ to the title. */
export function pageMetadata({ title, description, path, images }: { title: string; description: string; path: string; images?: string[] }): Metadata {
  return {
    title,
    description: shorten(description),
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description: shorten(description),
      url: path,
      siteName: SITE_NAME,
      locale: 'de_DE',
      type: 'website',
      ...(images?.length ? { images } : {}),
    },
    twitter: { card: 'summary_large_image' },
  }
}
