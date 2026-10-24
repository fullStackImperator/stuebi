import Link from 'next/link'
import { CalendarDays } from 'lucide-react'
import { getPayloadClient } from '@/lib/get-payload'
import { dateText, nextDates } from '@/lib/next-dates'

// The next three dates across all departments, right below the news. Nothing when none are coming.
// Freshness comes from the home page's revalidate (60 s), so past dates drop off within a minute.
export async function NextDates() {
  const payload = await getPayloadClient()
  const res = await payload.find({ collection: 'departments', limit: 20, depth: 0, overrideAccess: true })
  const dates = nextDates(res.docs)
  if (dates.length === 0) return null

  return (
    <section id="naechste-termine" className="bg-surface-sand py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-6">Nächste Termine</h2>
        <ul className="grid gap-3 sm:grid-cols-3">
          {dates.map((d) => (
            <li key={`${d.department}-${d.id ?? d.title}`}>
              <Link href="/termine" className="flex h-full items-start gap-4 rounded-2xl bg-surface p-5 hover:bg-muted">
                <CalendarDays className="h-5 w-5 mt-0.5 shrink-0 text-accent" />
                <span>
                  <span className="block font-semibold text-foreground">{d.title}</span>
                  <span className="block text-sm text-muted-foreground">
                    {dateText(d)} · {d.department}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
