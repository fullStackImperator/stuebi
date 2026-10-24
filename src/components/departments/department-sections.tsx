import { CalendarDays, Clock, Download, Mail, MapPin, Phone, User } from 'lucide-react'
import type { SerializedEditorState } from 'lexical'

import { RichContent } from '@/components/rich-content'
import { mediaUrl } from '@/lib/media-url'
import type { Department } from '@/payload-types'

type DateItem = NonNullable<NonNullable<Department['dates']>['items']>[number]

const TIME_ZONE = 'Europe/Berlin'

const kindLabel: Record<DateItem['kind'], { label: string; className: string }> = {
  registration: { label: 'Anmeldezeitraum', className: 'bg-accent text-white' },
  info: { label: 'Infoveranstaltung', className: 'bg-golden text-on-bright' },
  event: { label: 'Veranstaltung', className: 'bg-mint text-on-bright' },
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: TIME_ZONE,
  })
}

function dateText(item: DateItem) {
  if (item.dateLabel) return item.dateLabel
  if (item.endDate) return `${formatDate(item.startDate)} – ${formatDate(item.endDate)}`
  return formatDate(item.startDate)
}

/** Termine whose (end) date lies before today are hidden, sorted by start date. */
export function upcomingDates(items: DateItem[] | null | undefined, now = new Date()) {
  const today = new Date(now.toLocaleDateString('en-CA', { timeZone: TIME_ZONE }))
  return (items ?? [])
    .filter((item) => {
      const last = new Date(new Date(item.endDate ?? item.startDate).toLocaleDateString('en-CA', { timeZone: TIME_ZONE }))
      return last >= today
    })
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
}

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-6">
      <div className="inline-flex items-center gap-3 mb-3">
        <span className="w-6 h-px bg-accent" />
        <span className="text-accent text-xs font-bold tracking-[0.2em] uppercase">{eyebrow}</span>
      </div>
      <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground leading-tight">{title}</h2>
    </div>
  )
}

export function RegistrationSection({ registration }: { registration: Department['registration'] }) {
  const downloads = (registration?.downloads ?? []).flatMap((d) => {
    const url = typeof d.file === 'object' ? mediaUrl(d.file) : null
    return url ? [{ id: d.id ?? url, label: d.label, url }] : []
  })

  return (
    <section id="anmeldung" className="rounded-3xl bg-card border border-border p-6 sm:p-8">
      <SectionHeading eyebrow="Anmeldung" title="Infos zur Anmeldung" />
      {registration?.info ? (
        <RichContent data={registration.info as unknown as SerializedEditorState} />
      ) : (
        <p className="text-muted-foreground">Informationen zur Anmeldung folgen in Kürze.</p>
      )}
      {downloads.length > 0 && (
        <ul className="mt-6 flex flex-wrap gap-3">
          {downloads.map((d) => (
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
    </section>
  )
}

export function DatesSection({ items }: { items: DateItem[] }) {
  return (
    <section id="termine" className="rounded-3xl bg-surface-sand dark:border dark:border-border p-6 sm:p-8">
      <SectionHeading eyebrow="Termine" title="Nächste Termine" />
      {items.length === 0 ? (
        <p className="text-muted-foreground">Aktuell stehen keine Termine an. Neue Termine folgen.</p>
      ) : (
        <ul className="space-y-4">
          {items.map((item) => {
            const kind = kindLabel[item.kind]
            return (
              <li key={item.id ?? `${item.title}-${item.startDate}`} className="rounded-2xl bg-background p-5 shadow-sm">
                <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${kind.className}`}>
                  {kind.label}
                </span>
                <p className="mt-3 font-bold text-foreground">{item.title}</p>
                <div className="mt-2 flex flex-col gap-1.5 text-sm text-muted-foreground sm:flex-row sm:flex-wrap sm:gap-x-5">
                  <span className="inline-flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 shrink-0" />
                    {dateText(item)}
                  </span>
                  {item.time && (
                    <span className="inline-flex items-center gap-2">
                      <Clock className="h-4 w-4 shrink-0" />
                      {item.time}
                    </span>
                  )}
                  {item.location && (
                    <span className="inline-flex items-center gap-2">
                      <MapPin className="h-4 w-4 shrink-0" />
                      {item.location}
                    </span>
                  )}
                </div>
                {item.note && <p className="mt-2 text-sm text-muted-foreground">{item.note}</p>}
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}

function telHref(phone: string) {
  const digits = phone.replace(/[^\d+]/g, '')
  return `tel:${digits.startsWith('0') ? `+49${digits.slice(1)}` : digits}`
}

function ContactCard({
  title,
  name,
  role,
  email,
  phone,
  hours,
}: {
  title: string
  name?: string | null
  role?: string | null
  email?: string | null
  phone?: string | null
  hours?: string | null
}) {
  return (
    <div className="rounded-2xl bg-surface-ink p-6 text-white">
      <p className="text-white/40 text-[10px] font-bold tracking-widest uppercase mb-3">{title}</p>
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-golden flex items-center justify-center shrink-0">
          <User className="h-4 w-4 text-foreground" />
        </div>
        <div className="space-y-1.5 text-sm">
          <p className="font-bold text-base leading-tight">{name || 'Wird ergänzt'}</p>
          {role && <p className="text-white/60">{role}</p>}
          {phone && (
            <a href={telHref(phone)} className="flex items-center gap-2 text-white/80 hover:text-white">
              <Phone className="h-3.5 w-3.5" />
              {phone}
            </a>
          )}
          {email && (
            <a href={`mailto:${email}`} className="flex items-center gap-2 text-white/80 hover:text-white break-all">
              <Mail className="h-3.5 w-3.5 shrink-0" />
              {email}
            </a>
          )}
          {hours && <p className="text-white/60 whitespace-pre-line">{hours}</p>}
        </div>
      </div>
    </div>
  )
}

export function ContactBlock({ contact }: { contact: Department['contact'] }) {
  return (
    <section id="kontakt" className="rounded-3xl bg-card border border-border p-6 sm:p-8">
      <SectionHeading eyebrow="Kontakt" title="Ihre Ansprechpartner" />
      <div className="grid gap-4 sm:grid-cols-2">
        <ContactCard
          title={contact?.head?.role || 'Abteilungsleitung'}
          name={contact?.head?.name}
          email={contact?.head?.email}
          phone={contact?.head?.phone}
        />
        <ContactCard
          title="Schulbüro"
          name={contact?.office?.name || 'Schulbüro'}
          email={contact?.office?.email}
          phone={contact?.office?.phone}
          hours={contact?.office?.hours}
        />
      </div>
    </section>
  )
}
