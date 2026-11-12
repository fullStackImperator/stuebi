import type { MetadataRoute } from 'next'
import { getPayloadClient } from '@/lib/get-payload'
import { RESERVED } from '@/lib/reserved-slugs'
import { SITE_URL, STATIC_PATHS } from '@/lib/site'

// New articles and pages appear within an hour.
export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const fixed = STATIC_PATHS.map((path) => ({ url: `${SITE_URL}${path === '/' ? '' : path}` }))
  // Without the CMS (e.g. a preview build without PAYLOAD_SECRET) list only the fixed pages instead of failing the build.
  let news, pages
  try {
    const payload = await getPayloadClient()
    ;[news, pages] = await Promise.all([
      payload.find({ collection: 'news', where: { status: { equals: 'published' } }, limit: 1000, depth: 0, overrideAccess: true }),
      payload.find({ collection: 'pages', limit: 1000, depth: 0, overrideAccess: true }),
    ])
  } catch (error) {
    console.error('sitemap: CMS nicht erreichbar, nur feste Seiten', error)
    return fixed
  }
  return [
    ...fixed,
    ...news.docs.map((doc) => ({ url: `${SITE_URL}/news/${doc.slug}`, lastModified: doc.updatedAt })),
    // A CMS page under a reserved or fixed path is never shown, so it does not belong in the sitemap.
    ...pages.docs.filter((doc) => !RESERVED.has(doc.slug) && !STATIC_PATHS.includes(`/${doc.slug}`)).map((doc) => ({ url: `${SITE_URL}/${doc.slug}`, lastModified: doc.updatedAt })),
  ]
}
