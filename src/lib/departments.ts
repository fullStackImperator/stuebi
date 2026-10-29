import type { Department } from '@/payload-types'

type DepartmentClient = { find: (args: Record<string, unknown>) => Promise<{ docs: unknown[] }> }

// Lazily loaded so tests can pass their own client without booting Payload.
const defaultClient = async (): Promise<DepartmentClient> =>
  (await import('@/lib/get-payload')).getPayloadClient() as unknown as Promise<DepartmentClient>

/** One department (Abteilung) by slug, or null when it is missing or the database is unreachable. */
export async function loadDepartment(
  slug: string,
  client: () => Promise<DepartmentClient> = defaultClient,
): Promise<Department | null> {
  try {
    const payload = await client()
    const res = await payload.find({
      collection: 'departments',
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 1,
      overrideAccess: true,
    })
    return (res.docs[0] as Department | undefined) ?? null
  } catch (err) {
    // Ohne Datenbank (z. B. beim Build) entfällt der Anmeldeblock einfach.
    console.error(`loadDepartment: Abteilung "${slug}" konnte nicht geladen werden`, err)
    return null
  }
}
