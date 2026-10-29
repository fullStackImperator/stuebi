// Slugs, die CMS-Seiten nicht verwenden dürfen: eigene Routen der Webseite und der Payload-Admin.
export const RESERVED: ReadonlySet<string> = new Set([
  'news',
  'admin',
  'api',
  'graphql',
  'graphql-playground',
  'abteilungen',
  'vorschule',
  'grundschule',
  'mittelstufe',
  'oberstufe',
  'ganztag',
])
