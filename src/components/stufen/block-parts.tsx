import Image from 'next/image'
import { Apple, Clock, House, Mail, MonitorSmartphone, Palette, Phone, Trophy, Users, Utensils, type LucideIcon } from 'lucide-react'
import { PortraitFigure } from '@/components/contact/portrait-card'
import { schoolOffices } from '@/content/contacts'
import type { Block, BlockPerson, CourseGroup, ScheduleRow, StudentCompany, Weekday } from '@/content/stufen/types'
import type { Photo } from '@/lib/photo'
import { cn } from '@/lib/utils'

// Bausteine für Abschnitte der Stufenseiten, die mehr als Text und Karten brauchen (vor allem Ganztag).

// Band colours as filled surfaces: navy text on mint/golden, white on pink/navy.
const fill: Record<Exclude<ScheduleRow['kind'], 'pause'>, { box: string; sub: string }> = {
  start: { box: 'bg-accent-strong text-white', sub: 'text-white/85' },
  unterricht: { box: 'bg-primary text-primary-foreground', sub: 'text-primary-foreground/85' },
  vertiefung: { box: 'bg-mint text-on-bright', sub: 'text-on-bright/85' },
  kurse: { box: 'bg-golden text-on-bright', sub: 'text-on-bright/85' },
}


const BreakIcon = ({ row }: { row: ScheduleRow }) => {
  const Icon = row.text ? Utensils : Apple
  return <Icon className="h-4 w-4" aria-hidden="true" />
}

/** Der Schultag als Zeitleiste: Uhrzeiten an einer Linie, Blöcke als Farbkarten, Pausen als kleine Stationen mit Symbol, am Ende der Schulschluss. */
export function Schedule({ rows }: { rows: ScheduleRow[] }) {
  const end = rows[rows.length - 1].time.split('–')[1]
  return (
    <ol data-schedule className="max-w-3xl">
      {rows.map((r, i) => (
        <li key={r.time} className="grid grid-cols-[3.25rem_1.75rem_1fr] gap-x-3 sm:grid-cols-[4rem_2rem_1fr] sm:gap-x-4">
          <span className={cn('pt-5 text-right text-sm tabular-nums', r.kind === 'pause' ? 'pt-3 text-muted-foreground' : 'font-bold text-foreground')}>
            {r.time.split('–')[0]}
          </span>
          {/* The rail: a line through every row, a dot for blocks and a small icon for breaks. */}
          <span className="relative flex justify-center">
            <span aria-hidden="true" className={cn('absolute w-0.5 bg-border', i === 0 ? 'top-6 bottom-0' : 'inset-y-0')} />
            {r.kind === 'pause' ? (
              <span className="relative mt-2 flex h-7 w-7 items-center justify-center rounded-full bg-surface text-muted-foreground ring-2 ring-border in-data-[tone=light]:bg-surface-sand">
                <BreakIcon row={r} />
              </span>
            ) : (
              <span aria-hidden="true" className={cn('relative mt-5 h-4 w-4 rounded-full ring-4 ring-surface in-data-[tone=light]:ring-surface-sand', fill[r.kind].box)} />
            )}
          </span>
          {r.kind === 'pause' ? (
            <div data-schedule-break className="py-3 text-sm text-muted-foreground">
              <span className="font-semibold text-foreground/80">{r.title}</span>
              <span className="tabular-nums"> · bis {r.time.split('–')[1]}</span>
              {r.text && <p className="mt-0.5 text-pretty">{r.text}</p>}
            </div>
          ) : (
            <div className={cn('my-2 rounded-2xl px-5 py-4 sm:px-6', fill[r.kind].box)}>
              <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-extrabold leading-snug">
                {r.title}
                {r.note && <span className="rounded-full bg-white/60 px-2.5 py-0.5 text-xs font-semibold text-on-bright">{r.note}</span>}
              </p>
              <p className={cn('mt-0.5 text-xs font-semibold tabular-nums', fill[r.kind].sub)}>{r.time}</p>
              {r.text && <p className={cn('mt-2 text-sm leading-relaxed text-pretty', fill[r.kind].sub)}>{r.text}</p>}
            </div>
          )}
        </li>
      ))}
      <li data-schedule-end className="grid grid-cols-[3.25rem_1.75rem_1fr] gap-x-3 sm:grid-cols-[4rem_2rem_1fr] sm:gap-x-4">
        <span className="pt-3.5 text-right text-sm font-bold tabular-nums text-foreground">{end}</span>
        <span className="relative flex justify-center">
          <span aria-hidden="true" className="absolute top-0 h-4 w-0.5 bg-border" />
          <span className="relative mt-2 flex h-8 w-8 items-center justify-center rounded-full bg-foreground text-background">
            <House className="h-4 w-4" aria-hidden="true" />
          </span>
        </span>
        <p className="py-3.5 text-sm font-bold text-foreground">Schulschluss</p>
      </li>
    </ol>
  )
}

/** Kurse in ihren Gruppen, je Kurs eine Zeile mit Jahrgang und Wochentagen. */
// Colour per group: a full head, and only a soft tint for the active weekdays so the course name stays in front.
const groupTheme = [
  { head: 'bg-golden text-on-bright', day: 'bg-golden/35' },
  { head: 'bg-accent text-white', day: 'bg-accent/20' },
  { head: 'bg-mint text-on-bright', day: 'bg-mint/30' },
  { head: 'bg-primary text-primary-foreground', day: 'bg-primary/15 dark:bg-primary/30' },
]

const groupIcon: Record<CourseGroup['icon'], LucideIcon> = {
  sport: Trophy,
  kunst: Palette,
  medien: MonitorSmartphone,
  treffpunkt: Users,
}

const weekdays: { short: Weekday; long: string }[] = [
  { short: 'Mo', long: 'Montag' },
  { short: 'Di', long: 'Dienstag' },
  { short: 'Mi', long: 'Mittwoch' },
  { short: 'Do', long: 'Donnerstag' },
  { short: 'Fr', long: 'Freitag' },
]

/** Mo–Fr as small boxes; the course's days are filled in the group colour. */
function WeekStrip({ days, activeClass }: { days: Weekday[]; activeClass: string }) {
  const label = weekdays.filter((d) => days.includes(d.short)).map((d) => d.long).join(', ')
  return (
    <div data-week role="img" aria-label={label} className="flex gap-1">
      {weekdays.map((d) => {
        const active = days.includes(d.short)
        return (
          <span
            key={d.short}
            data-day
            {...(active ? { 'data-day-active': '' } : {})}
            className={cn(
              'flex h-5 w-6 items-center justify-center rounded text-[10px]',
              active ? cn('font-bold text-foreground', activeClass) : 'font-medium text-muted-foreground/40',
            )}
          >
            {d.short}
          </span>
        )
      })}
    </div>
  )
}

/** Kurse in ihren Gruppen: farbiger Kopf mit Symbol, je Kurs eine Zeile mit Jahrgang und Wochenleiste. */
export function CourseGroups({ groups }: { groups: CourseGroup[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {groups.map((group, i) => {
        const theme = groupTheme[i % groupTheme.length]
        const Icon = groupIcon[group.icon]
        return (
          <section
            key={group.title}
            data-course-group
            aria-label={group.title}
            className="overflow-hidden rounded-3xl bg-surface-sand shadow-sm in-data-[tone=sand]:bg-surface"
          >
            <div className={cn('flex items-center gap-3 px-5 py-4', theme.head)}>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/25">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-lg font-extrabold leading-tight">{group.title}</h3>
                <p className="text-xs font-semibold opacity-75">{group.courses.length} Kurse</p>
              </div>
            </div>
            <ul className="divide-y divide-border px-5 py-2">
              {group.courses.map((c) => (
                <li key={c.name} data-course className="py-3">
                  <p className="flex items-baseline justify-between gap-3">
                    <span className="text-base font-bold leading-snug text-foreground">{c.name}</span>
                    <span className="shrink-0 text-xs font-medium text-muted-foreground">{c.grades}</span>
                  </p>
                  <div className="mt-1.5">
                    <WeekStrip days={c.days} activeClass={theme.day} />
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )
      })}
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
