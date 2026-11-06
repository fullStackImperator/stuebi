import { ChevronDown, Download } from 'lucide-react'
import type { SerializedEditorState } from 'lexical'

import { RichContent } from '@/components/rich-content'
import { cn } from '@/lib/utils'
import { mediaUrl } from '@/lib/media-url'
import { DateRow, dateListClass } from '@/components/dates/date-row'
import { OpenRegistrationBanner } from '@/components/dates/open-registration'
import { openRegistration, type DateItem } from '@/lib/next-dates'
import type { Department } from '@/payload-types'

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-6">
      <div className="inline-flex items-center gap-3 mb-3">
        <span className="w-6 h-px bg-accent" />
        <span className="text-accent text-xs font-bold tracking-[0.2em] uppercase">{eyebrow}</span>
      </div>
      <h3 className="text-xl sm:text-2xl font-extrabold text-foreground leading-tight">{title}</h3>
    </div>
  )
}

export type RegistrationSteps = {
  title: string
  // `form`: the step where the registration form is needed; the first CMS download shows up there.
  steps: { when?: string; title: string; text: string; form?: boolean }[]
  // A short extra case under the steps, e.g. the change into Klasse 7.
  note?: { title: string; text: string }
}

// Numbered steps from code, above the registration text from the CMS.
function StepCards({ steps, form }: { steps: RegistrationSteps['steps']; form?: { label: string; url: string } }) {
  return (
    <ol data-registration-steps className="space-y-3">
      {steps.map((s, i) => (
        <li key={s.title} className="flex gap-4 rounded-2xl bg-surface-sand p-5 dark:bg-background">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary font-black text-primary-foreground" aria-hidden="true">
            {i + 1}
          </span>
          <div className="min-w-0">
            {s.when && <p className="text-xs font-bold uppercase tracking-[0.15em] text-primary dark:text-foreground/80">{s.when}</p>}
            <p className="mt-0.5 text-lg font-extrabold leading-tight text-foreground">{s.title}</p>
            <p className="mt-1 text-sm leading-snug text-foreground/80 text-pretty">{s.text}</p>
            {s.form && form && (
              <a
                data-step-download
                href={form.url}
                download
                className="mt-3 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                {form.label}
              </a>
            )}
          </div>
        </li>
      ))}
    </ol>
  )
}

export function RegistrationSection({
  registration,
  steps,
  id,
}: {
  registration: Department['registration']
  // Anchor for the „So melden Sie an“ button of an open registration in the dates next to it.
  id?: string
  // One list per stage; the Primarstufe on /anmeldung has two (Vorschule and 1. Klasse).
  steps?: RegistrationSteps | RegistrationSteps[]
}) {
  const lists = steps ? [steps].flat() : []
  const downloads = (registration?.downloads ?? []).flatMap((d) => {
    const url = typeof d.file === 'object' ? mediaUrl(d.file) : null
    return url ? [{ id: d.id ?? url, label: d.label, url }] : []
  })
  // The first download is the form: it moves into its step, the rest stay at the end.
  const formList = lists.findIndex((l) => l.steps.some((s) => s.form))
  const form = formList >= 0 ? downloads[0] : undefined
  const rest = form ? downloads.slice(1) : downloads

  return (
    <div id={id} className="scroll-mt-24 rounded-3xl bg-card border border-border p-6 sm:p-8">
      <SectionHeading
        eyebrow="Anmeldung"
        title={lists.length === 1 ? lists[0].title : 'Infos zur Anmeldung'}
      />
      {lists.length > 0 ? (
        <>
          {lists.map((l, i) => (
            <div key={l.title} className={cn(i > 0 && 'mt-8')}>
              {lists.length > 1 && <h4 className="mb-4 text-lg font-extrabold text-foreground">{l.title}</h4>}
              <StepCards steps={l.steps} form={i === formList ? form : undefined} />
              {l.note && (
                <p className="mt-4 text-sm leading-snug text-foreground/80 text-pretty">
                  <strong className="font-bold text-foreground">{l.note.title}:</strong> {l.note.text}
                </p>
              )}
            </div>
          ))}
          {/* The full text from the CMS stays, folded away under the steps. */}
          {registration?.info && (
            <details data-registration-details className="group mt-6 rounded-2xl border border-border">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-semibold text-foreground [&::-webkit-details-marker]:hidden">
                Alle Einzelheiten zur Anmeldung
                <ChevronDown className="h-5 w-5 shrink-0 transition-transform group-open:rotate-180" aria-hidden="true" />
              </summary>
              <div className="px-5 pb-5">
                <RichContent data={registration.info as unknown as SerializedEditorState} />
              </div>
            </details>
          )}
        </>
      ) : registration?.info ? (
        <RichContent data={registration.info as unknown as SerializedEditorState} />
      ) : (
        <p className="text-muted-foreground">Informationen zur Anmeldung folgen in Kürze.</p>
      )}
      {rest.length > 0 && (
        <ul className="mt-6 flex flex-wrap gap-3">
          {rest.map((d) => (
            <li key={d.id}>
              <a
                href={d.url}
                download
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                <Download className="h-4 w-4" />
                {d.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

/**
 * Upcoming dates of a department. A registration window that runs today moves out of the list into a banner on top;
 * `stepsHref` points its button at the registration steps next to it.
 */
export function DatesSection({ items, stepsHref }: { items: DateItem[]; stepsHref?: string }) {
  const open = items.flatMap((item) => {
    const state = openRegistration(item)
    return state ? [{ item, ...state }] : []
  })
  const list = items.filter((item) => !open.some((o) => o.item === item))
  return (
    <div className="rounded-3xl bg-surface-sand in-data-[tone=sand]:bg-surface dark:border dark:border-border p-6 sm:p-8">
      <SectionHeading eyebrow="Termine" title="Nächste Termine" />
      {items.length === 0 ? (
        <p className="text-muted-foreground">Aktuell stehen keine Termine an. Neue Termine folgen.</p>
      ) : (
        <>
          {open.length > 0 && (
            <div className="mb-6 space-y-4">
              {open.map((o) => (
                <OpenRegistrationBanner key={o.item.id ?? o.item.title} {...o} href={stepsHref} linkLabel="So melden Sie an" />
              ))}
            </div>
          )}
          {list.length > 0 && (
            <ul className={dateListClass}>
              {list.map((item) => (
                <DateRow key={item.id ?? `${item.title}-${item.startDate}`} item={item} heading="h4" showAudience={false} />
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  )
}

export function telHref(phone: string) {
  const digits = phone.replace(/[^\d+]/g, '')
  return `tel:${digits.startsWith('0') ? `+49${digits.slice(1)}` : digits}`
}
