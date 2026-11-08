// The live address of the website: canonical links, sitemap, robots.txt and structured data are built from it.

export const SITE_URL = 'https://stuebi-hamburg.de'
export const SITE_NAME = 'Stübi Hamburg'

/** Only the live site may be crawled; previews and local dev servers run under other addresses. */
export const isLiveSite = (serverUrl = process.env.NEXT_PUBLIC_SERVER_URL) => serverUrl?.replace(/\/$/, '') === SITE_URL

/** The fixed pages of the site, for the sitemap and the SEO tests. */
export const STATIC_PATHS = [
  '/',
  '/vision',
  '/bildungswege',
  '/vorschule',
  '/grundschule',
  '/mittelstufe',
  '/oberstufe',
  '/ganztag',
  '/schwerpunkt',
  '/termine',
  '/anmeldung',
  '/beratung',
  '/news',
  '/impressum',
  '/datenschutz',
]
