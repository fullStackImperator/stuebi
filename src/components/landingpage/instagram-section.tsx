import { ArrowRight, Camera } from 'lucide-react'
import { getPayloadClient } from '@/lib/get-payload'
import { mediaUrl } from '@/lib/media-url'
import { getInstagramPosts } from '@/lib/social/instagram'
import { INSTAGRAM_PROFILE_URL } from '@/lib/social/instagram-config'

type Tile = { id: string; src: string; alt: string; href: string }

const handle = '@' + (INSTAGRAM_PROFILE_URL.replace(/\/+$/, '').split('/').pop() || 'stuebibloggt')

// Short alt text from the post caption: first line, without hashtags.
function altFrom(caption?: string | null): string {
  const text = (caption ?? '').split('\n')[0].replace(/#\S+/g, '').trim()
  if (!text) return 'Instagram-Beitrag der Stübi'
  return text.length > 120 ? text.slice(0, 117) + '…' : text
}

async function getTiles(): Promise<Tile[]> {
  const posts = await getInstagramPosts()
  if (posts.length > 0) {
    return posts.map((p) => ({
      id: p.id,
      src: `/instagram-bild/${encodeURIComponent(p.id)}`,
      alt: altFrom(p.caption),
      href: p.permalink,
    }))
  }

  // Without a token: tiles kept by hand in the CMS (Social highlights), if there are any.
  try {
    const payload = await getPayloadClient()
    const { docs } = await payload.find({
      collection: 'social-highlights',
      sort: 'sortOrder',
      limit: 6,
      depth: 1,
      overrideAccess: true,
    })
    return docs.flatMap((doc) => {
      const src = typeof doc.image === 'object' && doc.image ? mediaUrl(doc.image) : null
      return src ? [{ id: String(doc.id), src, alt: altFrom(doc.caption), href: doc.link || INSTAGRAM_PROFILE_URL }] : []
    })
  } catch {
    return []
  }
}

export async function InstagramSection() {
  const tiles = await getTiles()
  // Nothing to show yet: leave the section out instead of an empty box.
  if (tiles.length === 0) return null

  return (
    <section id="instagram" aria-labelledby="instagram-title" className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="w-6 h-px bg-accent" />
              <span className="text-accent text-xs font-bold tracking-[0.2em] uppercase">Instagram</span>
            </div>
            <h2 id="instagram-title" className="text-3xl sm:text-4xl font-extrabold text-foreground leading-tight">
              Die Stübi auf Instagram.
            </h2>
          </div>
          <a
            href={INSTAGRAM_PROFILE_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline shrink-0"
          >
            <Camera className="h-4 w-4" />
            {handle} folgen
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          {tiles.slice(0, 6).map((tile) => (
            <li key={tile.id}>
              <a
                href={tile.href}
                target="_blank"
                rel="noreferrer"
                className="group block aspect-square overflow-hidden rounded-3xl bg-surface-sand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                {/* eslint-disable-next-line @next/next/no-img-element -- served by our own route, already sized by Instagram */}
                <img
                  src={tile.src}
                  alt={tile.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
