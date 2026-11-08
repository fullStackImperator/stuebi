import type { MetadataRoute } from 'next'
import { isLiveSite, SITE_URL } from '@/lib/site'

/** Crawlers may index the live site except the CMS; previews and dev servers stay out of search results. */
export function robotsFor(live: boolean): MetadataRoute.Robots {
  return {
    rules: live ? { userAgent: '*', allow: '/', disallow: ['/admin', '/api'] } : { userAgent: '*', disallow: '/' },
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}

export default function robots(): MetadataRoute.Robots {
  return robotsFor(isLiveSite())
}
