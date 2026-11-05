'use client'

import { useState } from 'react'
import { Camera, Crown, Dices, Dribbble, Goal, HeartHandshake, House, MapPin, Paintbrush, Palette, Scissors, Users, type LucideIcon } from 'lucide-react'
import type { CourseKind, CourseSlot, Weekday } from '@/content/stufen/types'
import { cn } from '@/lib/utils'

// Symbol and area colour per course: Sport pink, Kreativ golden, Spiele mint, Treffpunkte navy.
const kindStyle: Record<CourseKind, { icon: LucideIcon; tile: string }> = {
  fussball: { icon: Goal, tile: 'bg-accent text-white' },
  basketball: { icon: Dribbble, tile: 'bg-accent text-white' },
  design: { icon: Palette, tile: 'bg-golden text-on-bright' },
  mark: { icon: Paintbrush, tile: 'bg-golden text-on-bright' },
  foto: { icon: Camera, tile: 'bg-golden text-on-bright' },
  basteln: { icon: Scissors, tile: 'bg-golden text-on-bright' },
  schach: { icon: Crown, tile: 'bg-mint text-on-bright' },
  spiele: { icon: Dices, tile: 'bg-mint text-on-bright' },
  homeround: { icon: House, tile: 'bg-primary text-white' },
  maedchen: { icon: HeartHandshake, tile: 'bg-primary text-white' },
}

// The chosen Jahrgang's course days light up in its colour in the dark head.
const gradeColor: Record<number, string> = {
  4: 'bg-golden text-on-bright',
  5: 'bg-golden text-on-bright',
  6: 'bg-mint text-on-bright',
  7: 'bg-accent text-white',
  8: 'bg-accent-strong text-white',
  9: 'bg-primary text-white ring-1 ring-white/40',
  10: 'bg-white text-surface-ink',
}

const weekdays: { short: Weekday; long: string }[] = [
  { short: 'Mo', long: 'Montag' },
  { short: 'Di', long: 'Dienstag' },
  { short: 'Mi', long: 'Mittwoch' },
  { short: 'Do', long: 'Donnerstag' },
  { short: 'Fr', long: 'Freitag' },
]

/**
 * Kurse nach Jahrgang: oben ein dunkler Kopf mit den Jahrgängen und den Kurstagen des gewählten Jahrgangs,
 * darunter je Kurstag eine Karte mit allen Kursen (Anbieter und Ort). Donnerstags ist der 4. Block die
 * Förderung nach § 45.
 */
export function CoursePicker({ slots }: { slots: CourseSlot[] }) {
  const grades = [...new Set(slots.flatMap((s) => s.grades))].sort((a, b) => a - b)
  const [grade, setGrade] = useState(grades[0])
  const mine = slots.filter((s) => s.grades.includes(grade)).sort((a, b) => weekdays.findIndex((d) => d.short === a.day) - weekdays.findIndex((d) => d.short === b.day))

  return (
    <div data-course-picker>
      <div className="rounded-3xl bg-surface-ink p-4 text-white sm:p-6 lg:grid lg:grid-cols-[auto_1fr] lg:items-end lg:gap-10 dark:bg-white/10">
        <div>
          <p id="kurse-jahrgang" className="text-sm font-bold text-white/80">
            Mein Kind ist in Jahrgang
          </p>
          <div role="group" aria-labelledby="kurse-jahrgang" className="mt-3 grid grid-cols-7 gap-1 rounded-2xl bg-white/10 p-1 lg:w-[26rem]">
            {grades.map((g) => (
              <button
                key={g}
                type="button"
                data-grade-button
                aria-pressed={g === grade}
                onClick={() => setGrade(g)}
                className={cn(
                  'h-11 rounded-xl text-lg font-black tabular-nums transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white',
                  g === grade ? 'bg-white text-surface-ink shadow-sm dark:bg-white/25 dark:text-white' : 'text-white/70 hover:bg-white/10 hover:text-white',
                )}
              >
                {g}
              </button>
            ))}
          </div>
        </div>
        <div data-course-week className="mt-4 border-t border-white/15 pt-4 lg:mt-0 lg:border-0 lg:pt-0">
          <p className="text-xs font-bold uppercase tracking-widest text-white/60">Kurstage</p>
          <ul className="mt-2 grid grid-cols-5 gap-1.5">
            {weekdays.map((d) => {
              const slot = mine.find((s) => s.day === d.short)
              return (
                <li
                  key={d.short}
                  {...(slot ? { 'data-day-active': '' } : {})}
                  aria-label={slot ? `${d.long}: ${slot.block}. Block` : d.long}
                  className={cn('rounded-xl px-1 py-1.5 text-center', slot ? gradeColor[grade] : 'bg-white/5 text-white/35')}
                >
                  <span className="block text-xs font-black lg:hidden">{d.short}</span>
                  <span className="hidden text-xs font-black lg:block">{d.long}</span>
                  <span className="block text-[11px] font-semibold">{slot ? `${slot.block}. Block` : d.short === 'Do' ? '§ 45' : '–'}</span>
                </li>
              )
            })}
          </ul>
        </div>
      </div>

      <div aria-live="polite" className="mt-4 space-y-4">
        {mine.map((slot) => (
          <section key={slot.day} data-course-day aria-label={weekdays.find((d) => d.short === slot.day)?.long} className="rounded-3xl bg-surface-sand p-4 sm:p-6 in-data-[tone=sand]:bg-surface">
            <p className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <span className="text-xl font-black text-foreground sm:text-2xl">{weekdays.find((d) => d.short === slot.day)?.long}</span>
              <span className="text-sm font-bold text-muted-foreground tabular-nums">
                {slot.block}. Block · {slot.time} Uhr
              </span>
            </p>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {slot.courses.map((c) => {
                const { icon: Icon, tile } = kindStyle[c.kind]
                return (
                  <li key={c.name} data-course className="flex gap-3 rounded-2xl bg-surface p-3 in-data-[tone=sand]:bg-surface-sand">
                    <span className={cn('flex h-11 w-11 shrink-0 items-center justify-center rounded-xl', tile)}>
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <p className="font-extrabold leading-tight text-foreground">{c.name}</p>
                      {c.partner && (
                        <p className="mt-1 flex items-start gap-1.5 text-xs text-muted-foreground">
                          <Users className="mt-px h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                          {c.partner}
                        </p>
                      )}
                      <p className="mt-0.5 flex items-start gap-1.5 text-xs text-muted-foreground">
                        <MapPin className="mt-px h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                        {c.room}
                      </p>
                    </div>
                  </li>
                )
              })}
            </ul>
          </section>
        ))}
        <p className="flex items-center gap-3 rounded-2xl bg-primary/10 p-4 lg:max-w-md dark:bg-white/8">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-lg font-black text-white">§</span>
          <span>
            <span className="block text-sm font-extrabold text-primary dark:text-foreground">Förderung nach § 45</span>
            <span className="block text-xs text-muted-foreground">Donnerstags im 4. Block statt Kursen · freitags keine Kurse</span>
          </span>
        </p>
      </div>
    </div>
  )
}
