import { oldPageRedirects } from '@/content/alte-seite-weiterleitungen'

/** `/stadtteilschule/Kontakt/BOB-Team/?x=1` → `kontakt/bob-team`: the key the redirect list uses. */
export function normalizeOldPath(path: string) {
  const bare = path.split(/[?#]/)[0]
  let decoded = bare
  try {
    decoded = decodeURIComponent(bare)
  } catch {}
  return decoded
    .toLowerCase()
    .replace(/^\/?stadtteilschule(?=\/|$)/, '')
    .replace(/^\/+|\/+$/g, '')
}

/** Where an address of the old WordPress site lives now; never a dead end. */
export async function resolveOldPath(path: string, hasNews: (slug: string) => Promise<boolean>) {
  const key = normalizeOldPath(path)
  if (Object.hasOwn(oldPageRedirects, key)) return oldPageRedirects[key]

  const article = key.match(/^\d{4}\/\d{2}\/\d{2}\/([^/]+)$/)
  if (article) return (await hasNews(article[1])) ? `/news/${article[1]}` : '/news'

  if (/^(tag|category)\//.test(key)) return '/news'

  // WordPress also answered articles without their date.
  if (/^[a-z0-9-]+$/.test(key) && (await hasNews(key))) return `/news/${key}`

  return '/'
}
