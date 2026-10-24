import Link from 'next/link'
import { ArrowRight, Newspaper } from 'lucide-react'
import { getPayloadClient } from '@/lib/get-payload'
import { mediaUrl } from '@/lib/media-url'
import type { News } from '@/payload-types'

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
    <section id="news" className="py-20 bg-surface">
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
          <div className="flex items-center gap-3 rounded-3xl bg-surface-sand p-6 text-sm text-muted-foreground">
            <Newspaper className="h-5 w-5 shrink-0" />
            Bald gibt es hier Neuigkeiten aus dem Schulleben.
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {news.map((item) => {
              const img =
                typeof item.featuredImage === 'object' && item.featuredImage
                  ? mediaUrl(item.featuredImage)
                  : null
              return (
                <Link
                  key={item.id}
                  href={`/news/${item.slug}`}
                  className="group rounded-3xl overflow-hidden bg-surface-sand shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                >
                  <div
                    className="aspect-[16/9] bg-primary/10 bg-cover bg-center"
                    style={img ? { backgroundImage: `url(${img})` } : undefined}
                  />
                  <div className="p-6">
                    {item.publishedAt && (
                      <p className="text-xs font-semibold text-accent mb-2">
                        {new Date(item.publishedAt).toLocaleDateString('de-DE')}
                      </p>
                    )}
                    <h3 className="font-bold text-lg text-foreground leading-snug group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    {item.excerpt && (
                      <p className="text-sm text-muted-foreground leading-relaxed mt-2 line-clamp-3">
                        {item.excerpt}
                      </p>
                    )}
                  </div>
                </Link>
              )
            })}
          </div>
        )}

      </div>
    </section>
  )
}
