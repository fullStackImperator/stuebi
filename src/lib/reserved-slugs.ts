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

/** Payload validation for the Pages slug: a reserved slug would publish a page nobody can reach. */
export function validatePageSlug(value: string | null | undefined): true | string {
  if (value && RESERVED.has(value)) return `Der Slug „${value}“ ist für eine eigene Seite der Webseite reserviert.`
  return true
}
