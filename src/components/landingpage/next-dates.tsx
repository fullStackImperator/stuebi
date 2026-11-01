import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { DateRow, loadDepartments } from '@/components/dates/date-row'
import { nextDates } from '@/lib/next-dates'

// The next dates across all departments, right below the news. Nothing when none are coming.
// Freshness comes from the home page's revalidate (60 s), so past dates drop off within a minute.

// Intro on the left, the list of dates on the right (after the design draft "Was als Nächstes ansteht").
export async function NextDates() {
  const dates = nextDates(await loadDepartments(), 5)
  if (dates.length === 0) return null

  return (
    <section id="naechste-termine" aria-labelledby="naechste-termine-title" className="bg-surface py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="inline-flex items-center gap-3 mb-5">
            <span className="w-6 h-px bg-accent" />
            <span className="text-accent text-xs font-bold tracking-[0.2em] uppercase">Termine</span>
          </div>
          <h2 id="naechste-termine-title" className="text-3xl sm:text-4xl font-extrabold text-foreground leading-tight mb-4">
            Was als Nächstes ansteht
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed text-pretty mb-8">
            Anmeldungen, Feste und Infoabende im Überblick.
          </p>
          <Link
            href="/termine"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            Alle Termine
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <ul className="border-b border-border lg:col-span-8">
          {dates.map((d) => (
            <DateRow key={`${d.department}-${d.id ?? d.title}`} item={d} />
          ))}
        </ul>
      </div>
    </section>
  )
}
