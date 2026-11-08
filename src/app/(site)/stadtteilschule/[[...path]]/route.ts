import { getPayloadClient } from '@/lib/get-payload'
import { resolveOldPath } from '@/lib/old-site-redirect'

// Old articles that are migrated later are found without a deploy.
export const dynamic = 'force-dynamic'

async function hasNews(slug: string) {
  const payload = await getPayloadClient()
  const res = await payload.find({ collection: 'news', where: { slug: { equals: slug }, status: { equals: 'published' } }, limit: 1, depth: 0, overrideAccess: true })
  return res.docs.length > 0
}

/** Addresses of the old WordPress site move permanently to their new page. */
export async function GET(request: Request) {
  const target = await resolveOldPath(new URL(request.url).pathname, hasNews)
  // A relative Location keeps the host the visitor used, also behind the reverse proxy.
  return new Response(null, { status: 308, headers: { Location: target } })
}
