import type { LucideIcon } from 'lucide-react'
import { BookOpen, Briefcase, GraduationCap, Landmark, UserRound } from 'lucide-react'
import { ProfileTiles } from '@/components/stufen/profile-tiles'
import type { ProfilFlyer, ProfilKey } from '@/content/profile'
import { begleitung, kernfaecher, vorstufeFaecher, type SubjectTier } from '@/content/stufen/oberstufe'
import { cn } from '@/lib/utils'

type Segment = { label: string; note: string; start: 1 | 2; span: 1 | 2; tone: 'pre' | 'study' }
type Lane = { name: string; segments: Segment[]; years: 12 | 13 }

// The two routes from the content's intro: Gymnasialzweig with the Studienstufe in grades 11–12,
// Stadtteilschulzweig with the Vorstufe in 11 and the Studienstufe in 12–13.
const lanes: Lane[] = [
  { name: 'Gymnasialzweig', segments: [{ label: 'Studienstufe', note: 'Klasse 11–12', start: 1, span: 2, tone: 'study' }], years: 12 },
  {
    name: 'Stadtteilschulzweig',
    segments: [
      { label: 'Vorstufe', note: 'Klasse 11', start: 1, span: 1, tone: 'pre' },
      { label: 'Studienstufe', note: 'Klasse 12–13', start: 2, span: 2, tone: 'study' },
    ],
    years: 13,
  },
]

// Grades 11–13, then a narrow column that only holds the Abitur label, so the bars get the width.
const columns = 'grid-cols-[repeat(3,minmax(0,1fr))_4.5rem]'

// Literal class names so Tailwind picks them up.
const startClass = { 1: 'col-start-1', 2: 'col-start-2', 3: 'col-start-3', 4: 'col-start-4' } as const
const spanClass = { 1: 'col-span-1', 2: 'col-span-2' } as const
const toneClass = { pre: 'bg-golden text-on-bright', study: 'bg-primary text-primary-foreground' } as const

// Headings for the two stages below the lanes (M3): the short colour rule of the lane,
// the grades small, then the name and one line.
type Step = { rule: string; when: string; title: string; text: string }
const stageSteps: Record<'vorstufe' | 'studienstufe', Step> = {
  vorstufe: {
    rule: 'bg-golden',
    when: 'Klasse 11 · Stadtteilschulzweig',
    title: 'Vorstufe',
    text: 'Für Jugendliche mit MSA die Brücke in die Studienstufe – überwiegend im Klassenverband.',
  },
  studienstufe: {
    rule: 'bg-primary dark:bg-white/60',
    when: 'Stadtteilschulzweig Klasse 12–13 · Gymnasialzweig 11–12',
    title: 'Studienstufe',
    text: 'Kernfächer für alle, dazu eines unserer zwei Profile und das Seminarfach.',
  },
}

function StageStep({ step }: { step: Step }) {
  return (
    <div data-stage-step className="mb-6">
      <span className={cn('mb-3 block h-1.5 w-12 rounded-full', step.rule)} aria-hidden="true" />
      <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">{step.when}</p>
      <h3 className="mt-1 text-2xl font-extrabold leading-tight text-foreground sm:text-3xl">{step.title}</h3>
      <p className="mt-1 text-muted-foreground text-pretty">{step.text}</p>
    </div>
  )
}

// One tier of Vorstufe subjects: label, chips with an optional note, the rule under the language tier.
function SubjectTierBlock({ tier: t }: { tier: SubjectTier }) {
  return (
    <div data-subject-tier className={cn(t.language && 'rounded-2xl bg-golden/35 p-4 sm:p-5 dark:bg-golden/15')}>
      <p className="mb-2 text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">{t.label}</p>
      <ul className="flex flex-wrap gap-2">
        {t.subjects.map((sub) => (
          <li
            key={sub.name}
            className={cn(
              'rounded-xl px-3 py-1.5 text-sm font-bold',
              t.strong
                ? 'bg-primary px-4 py-2 text-base text-primary-foreground'
                : t.language
                  ? 'bg-surface text-foreground'
                  : 'bg-surface-sand text-foreground in-data-[tone=light]:bg-surface',
            )}
          >
            {sub.name}
            {sub.note && <span className="ml-1.5 font-semibold text-muted-foreground">{sub.note}</span>}
          </li>
        ))}
      </ul>
      {t.rule && <p className="mt-3 text-xs leading-snug text-foreground/75 text-pretty">{t.rule}</p>}
    </div>
  )
}

// Studium, duale Ausbildung, höherer Dienst.
const destinationIcons: LucideIcon[] = [GraduationCap, Briefcase, Landmark]

// A light bar so the coloured profile tiles below stay the eye-catcher: the weekly total large,
// the three subjects between thin rules, the eA rule in a small box. On phones the subjects become rows.
function Kernfaecher() {
  const total = kernfaecher.hours * kernfaecher.subjects.length
  return (
    <div
      data-kernfaecher
      className="rounded-3xl bg-surface p-6 shadow-sm ring-1 ring-foreground/5 md:flex md:items-center md:gap-8 md:p-8 in-data-[tone=light]:bg-surface-sand"
    >
      <div className="flex items-center gap-4 md:shrink-0 md:border-r md:border-foreground/10 md:pr-8">
        <p className="font-heading text-6xl font-black leading-none tabular-nums lining-nums text-primary dark:text-foreground">{total}</p>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">Std pro Woche</p>
          <p className="text-xl font-extrabold leading-tight text-foreground">
            Kernfächer
            <br />
            für alle
          </p>
        </div>
      </div>
      <ul className="mt-5 divide-y divide-foreground/10 md:mt-0 md:flex md:flex-1 md:divide-x md:divide-y-0">
        {kernfaecher.subjects.map((k) => (
          <li key={k} data-kernfach className="flex items-center justify-between py-3 md:block md:flex-1 md:px-4 md:py-0 md:text-center">
            <p className="text-lg font-extrabold text-foreground">{k}</p>
            <p className="text-sm font-semibold text-muted-foreground">{kernfaecher.hours} Std</p>
          </li>
        ))}
      </ul>
      <p className="mt-4 rounded-2xl bg-surface-sand p-3 text-sm font-semibold text-foreground md:mt-0 md:w-44 md:shrink-0 md:p-4 in-data-[tone=light]:bg-surface">
        <span className="font-extrabold text-primary dark:text-foreground">{kernfaecher.count}</span> {kernfaecher.note}
      </p>
    </div>
  )
}

/** „So ist die Oberstufe organisiert“: both routes as lanes over grades 11–13, then Vorstufe, Studienstufe (core subjects, profiles) and support. */
export function OberstufeOrganisation({ iconTile, flyers }: { iconTile: string; flyers?: Partial<Record<ProfilKey, ProfilFlyer>> }) {
  return (
    <>
      {/* The lanes sit on the section itself, with the large light year numbers used on Bildungswege. */}
      <div data-oberstufe-lanes>
        <div aria-hidden="true" className={cn('mb-3 grid gap-2 sm:ml-48', columns)}>
          {[11, 12, 13].map((g) => (
            <span key={g} data-grade className="text-center font-heading text-2xl font-black leading-none tabular-nums lining-nums text-foreground/20 sm:text-3xl dark:text-white/30">
              {g}
            </span>
          ))}
        </div>
        <div className="flex flex-col gap-6 sm:gap-3">
          {lanes.map((lane) => (
            <div key={lane.name} data-abitur-path className="sm:flex sm:items-center">
              <p className="mb-2 font-heading text-lg font-extrabold text-foreground sm:mb-0 sm:w-48 sm:shrink-0">{lane.name}</p>
              <div className={cn('grid flex-1 gap-2', columns)}>
                {lane.segments.map((s) => (
                  <span
                    key={s.label}
                    className={cn(
                      'relative flex min-h-16 flex-col justify-center rounded-xl py-2 shadow-sm',
                      s.span === 1 ? 'px-2 sm:px-4' : 'px-3 sm:px-4',
                      startClass[s.start],
                      spanClass[s.span],
                      toneClass[s.tone],
                    )}
                  >
                    <span data-segment-label className={cn('font-bold leading-tight', s.span === 1 ? 'text-[13px] sm:text-base' : 'text-[15px] sm:text-base')}>
                      {s.label}
                    </span>
                    <span className="mt-0.5 text-[12px] leading-tight opacity-85 sm:text-[13px]">{s.note}</span>
                    {/* The Abitur sits on the end of the last bar, where the branch ends. */}
                    {s.start + s.span - 1 === (lane.years === 12 ? 2 : 3) && s.tone === 'study' && (
                      <span data-abitur className="absolute left-full top-1/2 z-10 flex -translate-x-[18px] -translate-y-1/2 items-center gap-1.5">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm ring-4 ring-surface-sand dark:bg-white/20 dark:text-white">
                          <GraduationCap className="h-5 w-5" aria-hidden="true" />
                        </span>
                        <span className="text-xs font-black leading-tight text-primary dark:text-foreground">
                          Abitur<span className="sr-only"> nach {lane.years} Jahren</span>
                        </span>
                      </span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* In the order the students go: Vorstufe in 11, then the Studienstufe with core subjects and profiles. */}
      <div className="mt-16">
        <StageStep step={stageSteps.vorstufe} />
        <div
          data-vorstufe-faecher
          className="rounded-3xl bg-surface p-6 shadow-sm ring-1 ring-foreground/5 sm:p-8 in-data-[tone=light]:bg-surface-sand"
        >
          <div className="flex items-center gap-3">
            <span className={cn('flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl', iconTile)}>
              <BookOpen className="h-5 w-5" aria-hidden="true" />
            </span>
            <h4 className="text-xl font-extrabold text-foreground">{vorstufeFaecher.title}</h4>
          </div>
          {/* Weekly subjects on the left, the second language as its own box on the right. */}
          <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:items-start">
            <div className="space-y-5">
              {vorstufeFaecher.tiers
                .filter((t) => !t.language)
                .map((t) => (
                  <SubjectTierBlock key={t.label} tier={t} />
                ))}
            </div>
            {vorstufeFaecher.tiers
              .filter((t) => t.language)
              .map((t) => (
                <SubjectTierBlock key={t.label} tier={t} />
              ))}
          </div>
        </div>
      </div>

      <div data-oberstufe-profile className="mt-16">
        <StageStep step={stageSteps.studienstufe} />
        <Kernfaecher />
        <div className="mt-5">
          <ProfileTiles withSubjects flyers={flyers} />
        </div>
      </div>

      {/* Support closes the section: a wide strip, text left, the three destinations side by side. */}
      <div data-begleitung className={cn('mt-16 rounded-3xl p-6 sm:p-8 lg:flex lg:items-center lg:gap-10', iconTile)}>
        <div className="lg:max-w-sm lg:shrink-0">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/15">
              <UserRound className="h-5 w-5" aria-hidden="true" />
            </span>
            <h3 className="text-xl font-extrabold">{begleitung.title}</h3>
          </div>
          <p className="mt-4 leading-relaxed opacity-90 text-pretty">{begleitung.text}</p>
        </div>
        <ul className="mt-5 grid flex-1 gap-2 sm:grid-cols-3 sm:gap-3 lg:mt-0">
          {begleitung.destinations.map((d, i) => {
            const Icon = destinationIcons[i % destinationIcons.length]
            return (
              <li key={d} data-destination className="flex items-center gap-3 rounded-2xl bg-white/12 px-4 py-3 font-bold">
                <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
                {d}
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}
