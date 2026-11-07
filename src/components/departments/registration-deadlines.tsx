import Link from 'next/link'
import { ArrowRight, CalendarClock } from 'lucide-react'
import type { Department } from '@/payload-types'
import { StepList } from '@/components/sections/step-list'
import { DateRow, dateListClass } from '@/components/dates/date-row'
import { OpenRegistrationBanner } from '@/components/dates/open-registration'
import { registrationDeadlines, splitOpenRegistrations, type DateItem } from '@/lib/next-dates'

// The windows of one Stufe as on /termine: a window that runs today as a banner with the way to its registration
// steps further down, the others as date rows.
function RegistrationWindows({ slug, windows }: { slug: string; windows: DateItem[] }) {
  const { open, rest } = splitOpenRegistrations(windows)
  return (
    <>
      {open.length > 0 && (
        <div className="space-y-4">
          {open.map((o) => (
            <OpenRegistrationBanner key={o.item.id ?? o.item.title} {...o} href={`#${slug}-schritte`} linkLabel="So melden Sie an" />
          ))}
        </div>
      )}
      {rest.length > 0 && (
        <ul className={open.length > 0 ? `${dateListClass} mt-4` : dateListClass}>
          {rest.map((w) => (
            <DateRow key={w.id ?? `${w.title}-${w.startDate}`} item={w} heading="h4" showKind={false} showAudience={false} />
          ))}
        </ul>
      )}
    </>
  )
}

const steps = [
  {
    title: 'Stufe wählen',
    text: 'Fristen, Ablauf und Formulare finden Sie weiter unten bei Primarstufe, Mittelstufe und Oberstufe.',
  },
  {
    title: 'Anmeldung abgeben',
    text: 'Bringen Sie die ausgefüllte Anmeldung ins Schulbüro. Die Formulare stehen zum Herunterladen bei der jeweiligen Stufe.',
  },
  {
    title: 'Rückmeldung abwarten',
    text: 'Nach der Anmelderunde erhalten Sie Bescheid. Bei Fragen hilft Ihnen das Schulbüro jederzeit weiter.',
  },
]

// "So melden Sie Ihr Kind an": the open registration windows per Stufe from the CMS, next to the steps.
export function RegistrationDeadlines({ departments }: { departments: Department[] }) {
  const rows = registrationDeadlines(departments)
  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
      <div className="lg:col-span-7">
        <h3 className="mb-5 text-xl font-extrabold text-foreground">Fristen</h3>
        <ul className="space-y-4">
          {rows.map((row) => (
            <li key={row.slug} data-deadline-row data-slug={row.slug} className="rounded-3xl bg-surface-sand p-5 sm:p-6 dark:border dark:border-border">
              <Link
                href={`/anmeldung#${row.slug}`}
                className="group mb-4 flex items-baseline justify-between gap-3 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
              >
                <span>
                  <span className="text-lg font-bold text-foreground group-hover:text-primary">{row.title}</span>
                  {row.grades && <span className="block text-sm text-muted-foreground sm:ml-2 sm:inline">{row.grades}</span>}
                </span>
                <span className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-primary">
                  Formulare
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                </span>
              </Link>

              {row.windows.length === 0 ? (
                <p className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-background">
                    <CalendarClock className="h-6 w-6" aria-hidden />
                  </span>
                  <span>
                    Termine folgen – fragen Sie gern im{' '}
                    <Link href="/anmeldung#schulbuero" className="font-semibold text-primary underline-offset-4 hover:underline">
                      Schulbüro
                    </Link>
                    .
                  </span>
                </p>
              ) : (
                <RegistrationWindows slug={row.slug} windows={row.windows} />
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="lg:col-span-5">
        <h3 className="mb-5 text-xl font-extrabold text-foreground">So geht’s</h3>
        <StepList steps={steps} marker="number" markerClass="bg-accent text-white" railClass="bg-accent/30" />
      </div>
    </div>
  )
}
