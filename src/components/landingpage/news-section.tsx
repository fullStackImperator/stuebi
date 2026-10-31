import Link from 'next/link'
import { ArrowRight, Newspaper } from 'lucide-react'
import { getPayloadClient } from '@/lib/get-payload'
import { mediaUrl } from '@/lib/media-url'
import type { News } from '@/payload-types'
import { NotchCard } from '@/components/ui/notch-card'

// Arrow colours of the three latest news, in the order of our school colours.
const tones = ['bg-golden text-on-bright', 'bg-mint text-on-bright', 'bg-accent text-white']

async function getLatestNews(): Promise<News[]> {
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'news',
      where: { status: { equals: 'published' } },
      sort: '-publishedAt',
      limit: 3,
      depth: 1,
      overrideAccess: true,
    })
    return result.docs
  } catch (err) {
    // Ohne Datenbank (z. B. beim Build) soll die Startseite trotzdem rendern.
    console.error('NewsSection: News konnten nicht geladen werden', err)
    return []
  }
}

export async function NewsSection() {
  const news = await getLatestNews()

  return (
    <section id="news" className="py-20 bg-surface-sand">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="w-6 h-px bg-accent" />
              <span className="text-accent text-xs font-bold tracking-[0.2em] uppercase">
                News
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground leading-tight">
              Neues aus der Stübi.
            </h2>
          </div>
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline shrink-0"
          >
            Alle News
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {news.length === 0 ? (
          <div className="flex items-center gap-3 rounded-3xl bg-surface p-6 text-sm text-muted-foreground">
            <Newspaper className="h-5 w-5 shrink-0" />
            Bald gibt es hier Neuigkeiten aus dem Schulleben.
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-8">
            {news.map((item, i) => {
              const img = typeof item.featuredImage === 'object' ? mediaUrl(item.featuredImage) : null
              return (
                <NotchCard
                  key={item.id}
                  href={`/news/${item.slug}`}
                  title={item.title}
                  image={img ? { src: img, alt: '', unoptimized: true } : null}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  aspect="aspect-[4/3]"
                  tone={tones[i % tones.length]}
                  titleClass="text-lg line-clamp-3"
                  titlePlacement="below"
                  badge={
                    item.publishedAt && (
                      <span className="absolute left-4 top-4 rounded-full bg-surface-ink px-3 py-1 text-xs font-bold text-white shadow-sm">
                        {new Date(item.publishedAt).toLocaleDateString('de-DE')}
                      </span>
                    )
                  }
                >
                  {item.excerpt && <p className="line-clamp-3">{item.excerpt}</p>}
                </NotchCard>
              )
            })}
          </div>
        )}

      </div>
    </section>
  )
}
