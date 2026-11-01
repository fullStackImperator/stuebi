import Link from 'next/link'
import { ArrowRight, CalendarClock } from 'lucide-react'
import type { Department } from '@/payload-types'
import { StepList } from '@/components/sections/step-list'
import { dateText, deadlineTile, registrationDeadlines } from '@/lib/next-dates'
import { cn } from '@/lib/utils'

// Month band of the date tiles in the colour of the Stufe (as on the stage pages); navy for anything else.
const tileClass: Record<string, string> = {
  primarstufe: 'bg-golden text-on-bright',
  mittelstufe: 'bg-accent text-white',
  oberstufe: 'bg-primary text-white',
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
            <li key={row.slug} data-deadline-row className="rounded-3xl bg-surface-sand p-5 sm:p-6 dark:border dark:border-border">
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
                <ul className="space-y-2">
                  {row.windows.map((w) => {
                    const tile = deadlineTile(w)
                    return (
                      <li key={w.id ?? `${w.title}-${w.startDate}`}>
                        <Link
                          href={`/anmeldung#${row.slug}`}
                          data-deadline-window
                          className="group -mx-2 flex items-center gap-4 rounded-2xl p-2 transition-colors hover:bg-background focus-visible:outline-2 focus-visible:outline-ring"
                        >
                          {/* A tear-off calendar sheet like in Termine: month band in the Stufe colour, day below. */}
                          <span aria-hidden="true" className="w-16 shrink-0 overflow-hidden rounded-2xl bg-background text-center shadow-sm">
                            <span className={cn('block py-1 text-xs font-bold', tileClass[row.slug] ?? 'bg-surface-ink text-white')}>
                              {tile.month}
                            </span>
                            <span className="block py-2 text-3xl font-extrabold leading-none tabular-nums text-foreground">{tile.day}</span>
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block font-bold text-foreground group-hover:text-primary">{w.title}</span>
                            <span className="block text-sm text-muted-foreground">{dateText(w)}</span>
                          </span>
                          <ArrowRight
                            className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
                            aria-hidden
                          />
                        </Link>
                      </li>
                    )
                  })}
                </ul>
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
