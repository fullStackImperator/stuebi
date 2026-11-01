import Image from 'next/image'
import { Clock, Mail, Phone } from 'lucide-react'
import { PortraitFigure } from '@/components/contact/portrait-card'
import { schoolOffices } from '@/content/contacts'
import type { Block, BlockPerson, CourseGroup, ScheduleRow, StudentCompany } from '@/content/stufen/types'
import type { Photo } from '@/lib/photo'
import { cn } from '@/lib/utils'

// Bausteine für Abschnitte der Stufenseiten, die mehr als Text und Karten brauchen (vor allem Ganztag).

const stripe: Record<Exclude<ScheduleRow['kind'], 'pause'>, string> = {
  start: 'bg-accent',
  unterricht: 'bg-primary',
  vertiefung: 'bg-mint',
  kurse: 'bg-golden',
}

/** Der Schultag als Stundenplan: Zeit links, Blöcke als Zeilen mit Farbstreifen, Pausen als schmale Zeilen. */
export function Schedule({ rows }: { rows: ScheduleRow[] }) {
  return (
    <ol data-schedule className="max-w-4xl space-y-2">
      {rows.map((row) =>
        row.kind === 'pause' ? (
          <li key={row.time} data-schedule-break className="grid items-baseline gap-x-6 gap-y-0.5 px-1 py-2 sm:grid-cols-[8.5rem_1fr]">
            <span className="text-sm tabular-nums text-muted-foreground">{row.time}</span>
            <span className="flex flex-wrap items-baseline gap-x-3 text-sm text-muted-foreground">
              <span className="font-semibold text-foreground/80">{row.title}</span>
              {row.text ? (
                <span className="text-pretty">{row.text}</span>
              ) : (
                <span aria-hidden="true" className="h-px flex-1 translate-y-[-0.25em] border-t border-dashed border-border" />
              )}
            </span>
          </li>
        ) : (
          <li
            key={row.time}
            className="relative grid gap-x-6 gap-y-1 overflow-hidden rounded-2xl bg-surface-sand py-4 pl-5 pr-4 shadow-sm in-data-[tone=sand]:bg-surface sm:grid-cols-[8.5rem_1fr] sm:py-5 sm:pr-6"
          >
            <span aria-hidden="true" className={cn('absolute inset-y-0 left-0 w-1.5', stripe[row.kind])} />
            <span className="text-sm font-bold tabular-nums text-foreground sm:text-base">{row.time}</span>
            <div>
              <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-bold text-foreground leading-snug">
                {row.title}
                {row.note && (
                  <span className="rounded-full bg-golden/25 px-2.5 py-0.5 text-xs font-semibold text-foreground">{row.note}</span>
                )}
              </p>
              {row.text && <p className="mt-1 text-sm leading-relaxed text-muted-foreground text-pretty">{row.text}</p>}
            </div>
          </li>
        ),
      )}
    </ol>
  )
}

/** Kurse in ihren Gruppen, je Kurs eine Zeile mit Jahrgang und Wochentagen. */
const groupColors = ['bg-golden', 'bg-accent', 'bg-mint', 'bg-primary']

export function CourseGroups({ groups }: { groups: CourseGroup[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {groups.map((group, i) => (
        <section
          key={group.title}
          data-course-group
          className="rounded-3xl bg-surface-sand p-6 shadow-sm in-data-[tone=sand]:bg-surface"
          aria-label={group.title}
        >
          <span className={cn('mb-4 block h-1.5 w-10 rounded-full', groupColors[i % groupColors.length])} />
          <h3 className="mb-3 text-lg font-bold leading-snug text-foreground">{group.title}</h3>
          <ul className="divide-y divide-border">
            {group.courses.map((c) => (
              <li key={c.name} className="py-2.5">
                <p className="text-sm font-semibold leading-snug text-foreground">{c.name}</p>
                <p className="mt-1 flex flex-wrap gap-1.5 text-xs text-muted-foreground">
                  <span className="rounded-full bg-foreground/5 px-2 py-0.5">{c.grades}</span>
                  <span className="rounded-full bg-foreground/5 px-2 py-0.5">{c.days}</span>
                </p>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}

/** Foto links, Text rechts (auf Handys untereinander). */
export function PhotoBeside({ photo, children }: { photo: Photo; children: React.ReactNode }) {
  return (
    <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
      <div className="relative aspect-[3/2] overflow-hidden rounded-3xl bg-surface-ink shadow-sm">
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="(min-width: 1024px) 600px, 100vw"
          className="object-cover"
          style={{ objectPosition: photo.objectPosition }}
        />
      </div>
      <div className="[&>p:first-child]:mt-0">{children}</div>
    </div>
  )
}

const personBadge = ['bg-golden text-on-bright', 'bg-mint text-on-bright', 'bg-accent text-white', 'bg-primary text-white']

/**
 * Ansprechpersonen als Porträts mit Mail-Link (und Sprechzeiten). Mit `officeClass` steht daneben das
 * Schulbüro in der Seitenfarbe; ohne teilen sich die Porträts die ganze Breite.
 */
export function People({ people, officeClass }: { people: BlockPerson[]; officeClass?: string }) {
  const office = schoolOffices.main
  return (
    <div className={cn('grid gap-4', officeClass ? 'sm:grid-cols-2 lg:flex' : 'grid-cols-2 gap-y-8 lg:grid-cols-4')}>
      {people.map((p, i) => (
        <div key={p.email} className={cn(officeClass && 'lg:w-64 lg:shrink-0')}>
          <PortraitFigure
            name={p.name}
            topic={p.role}
            image={p.image}
            badgeClass={personBadge[i % personBadge.length]}
            sizes={officeClass ? '(min-width: 1024px) 256px, (min-width: 640px) 50vw, 100vw' : '(min-width: 1024px) 25vw, 50vw'}
          />
          <a href={`mailto:${p.email}`} className="mt-3 flex items-start gap-2 text-sm font-semibold text-primary hover:underline">
            <Mail className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            {/* Long addresses wrap after the @, never inside a word. */}
            <span>
              {p.email.split('@')[0]}@<wbr />
              {p.email.split('@')[1]}
            </span>
          </a>
          {p.hours && (
            <p className="mt-1 flex items-start gap-2 text-sm text-muted-foreground">
              <Clock className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              {p.hours}
            </p>
          )}
        </div>
      ))}
      {officeClass && (
        <div className={cn('flex flex-col justify-center rounded-3xl p-6 sm:col-span-2 sm:p-8 lg:flex-1', officeClass)}>
          <p className="text-xl font-extrabold leading-tight">Allgemeine Fragen</p>
          <p className="mt-2 text-sm opacity-80">Das {office.label} verbindet Sie weiter.</p>
          <a href={office.tel} className="mt-4 flex items-center gap-3 text-2xl font-black tracking-tight underline-offset-4 hover:underline">
            <Phone className="h-6 w-6 shrink-0" aria-hidden="true" />
            {office.phone}
          </a>
        </div>
      )}
    </div>
  )
}

/** Besondere Klassen oder Wege als Karten neben einem Foto. */
export function Tracks({ tracks, accent }: { tracks: NonNullable<Block['tracks']>; accent: string }) {
  return (
    <div data-career-tracks className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
      <div className="relative aspect-[3/2] overflow-hidden rounded-3xl bg-surface-ink shadow-sm">
        <Image
          src={tracks.photo.src}
          alt={tracks.photo.alt}
          fill
          sizes="(min-width: 1024px) 600px, 100vw"
          className="object-cover"
          style={{ objectPosition: tracks.photo.objectPosition }}
        />
      </div>
      <div>
        <h3 className="mb-5 text-2xl font-extrabold text-foreground text-balance">{tracks.heading}</h3>
        <div className="space-y-4">
          {tracks.items.map((t) => (
            <div key={t.title} className="rounded-3xl bg-surface-sand p-6 shadow-sm in-data-[tone=sand]:bg-surface">
              <span className={cn('mb-3 block h-1.5 w-10 rounded-full', accent)} />
              <p className="text-lg font-bold leading-snug text-foreground">{t.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground text-pretty">{t.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/** Schülerfirmen als Fotokacheln mit einer Zeile Text. */
export function StudentCompanies({ companies }: { companies: StudentCompany[] }) {
  return (
    <ul className="grid gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
      {companies.map((c) => (
        <li key={c.name} data-company>
          <div className="relative aspect-[3/2] overflow-hidden rounded-3xl bg-surface-ink shadow-sm">
            <Image src={c.image} alt="" fill sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw" className="object-cover" />
          </div>
          <p className="mt-4 text-lg font-bold leading-snug text-foreground">{c.name}</p>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground text-pretty">{c.text}</p>
        </li>
      ))}
    </ul>
  )
}
