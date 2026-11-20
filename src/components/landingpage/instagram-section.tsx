import { ArrowRight, Camera } from 'lucide-react'
import { getPayloadClient } from '@/lib/get-payload'
import { mediaUrl } from '@/lib/media-url'
import { getInstagramPosts } from '@/lib/social/instagram'
import { INSTAGRAM_PROFILE_URL } from '@/lib/social/instagram-config'

type Tile = { id: string; src: string; alt: string; text: string; date?: string; href: string }

const handle = '@' + (INSTAGRAM_PROFILE_URL.replace(/\/+$/, '').split('/').pop() || 'stuebibloggt')

// Caption without hashtags at the end and without empty lines, for the text below a picture.
function textFrom(caption?: string | null): string {
  return (caption ?? '')
    .replace(/(\s*#[^\s#]+)+\s*$/u, '')
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
    .join(' ')
}

// Short alt text: first sentence of the caption.
function altFrom(text: string): string {
  if (!text) return 'Instagram-Beitrag der Stübi'
  const first = text.split(/(?<=[.!?])\s/)[0]
  return first.length > 120 ? first.slice(0, 117) + '…' : first
}

function dateFrom(timestamp?: string): string | undefined {
  if (!timestamp) return undefined
  const d = new Date(timestamp)
  return Number.isNaN(d.getTime()) ? undefined : d.toLocaleDateString('de-DE', { day: 'numeric', month: 'long' })
}

async function getTiles(): Promise<Tile[]> {
  const posts = await getInstagramPosts()
  if (posts.length > 0) {
    return posts.map((p) => {
      const text = textFrom(p.caption)
      return {
        id: p.id,
        src: `/instagram-bild/${encodeURIComponent(p.id)}`,
        alt: altFrom(text),
        text,
        date: dateFrom(p.timestamp),
        href: p.permalink,
      }
    })
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
      const text = textFrom(doc.caption)
      return src ? [{ id: String(doc.id), src, alt: altFrom(text), text, href: doc.link || INSTAGRAM_PROFILE_URL }] : []
    })
  } catch {
    return []
  }
}

const focusRing = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring'

function Picture({ tile, className = '' }: { tile: Tile; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-3xl bg-surface-sand ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element -- served by our own route, already sized by Instagram */}
      <img
        src={tile.src}
        alt={tile.alt}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
    </div>
  )
}

function DateLine({ tile }: { tile: Tile }) {
  return tile.date ? <p className="text-xs font-semibold text-accent">{tile.date}</p> : null
}

// One row of cards to swipe through on the phone, four in a row on the desktop.
function Cards({ tiles }: { tiles: Tile[] }) {
  return (
    <ul className="-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-4 sm:-mx-6 sm:scroll-px-6 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-4 lg:overflow-visible lg:px-0">
      {tiles.slice(0, 4).map((tile) => (
        <li key={tile.id} className="w-[78%] shrink-0 snap-start sm:w-[45%] lg:w-auto">
          <a
            href={tile.href}
            target="_blank"
            rel="noreferrer"
            className={`group flex h-full flex-col overflow-hidden rounded-3xl bg-surface-sand ${focusRing}`}
          >
            <Picture tile={tile} className="aspect-[4/5] rounded-b-none" />
            <div className="flex flex-1 flex-col gap-2 p-5">
              <DateLine tile={tile} />
              <p className="line-clamp-4 text-sm leading-relaxed text-foreground/80">{tile.text}</p>
              <span className="mt-auto pt-2 text-sm font-semibold text-primary group-hover:underline">Auf Instagram ansehen</span>
            </div>
          </a>
        </li>
      ))}
    </ul>
  )
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

        <Cards tiles={tiles} />
      </div>
    </section>
  )
}
