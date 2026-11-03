import { ArrowLeftRight, ArrowUpDown, Check, GraduationCap } from 'lucide-react'
import type { Block } from '@/content/stufen'
import { cn } from '@/lib/utils'

// Grades 5–13 as columns 1–9; column 10 holds the Abitur marker.
const grades = [5, 6, 7, 8, 9, 10, 11, 12, 13]

// Literal class names so Tailwind picks them up.
const colStart: Record<number, string> = {
  1: 'col-start-1', 3: 'col-start-3', 5: 'col-start-5', 6: 'col-start-6', 7: 'col-start-7', 8: 'col-start-8', 9: 'col-start-9', 10: 'col-start-10',
}
const colSpan: Record<number, string> = { 1: 'col-span-1', 2: 'col-span-2', 4: 'col-span-4' }

const shared = 'bg-mint text-on-bright'
const gym = 'bg-primary text-primary-foreground'
const sts = 'bg-golden text-on-bright'
// The Oberstufe is the next stage: outlined, so the Mittelstufe stays in front.
const ober = 'bg-surface text-foreground ring-2 ring-inset ring-foreground/15 in-data-[tone=light]:bg-surface-sand'

type Bar = { label: string; note: string; start: number; span: 1 | 2 | 4; tone: string }
type Lane = { name: string; bars: Bar[]; abitur: 12 | 13; marks?: { label: string; col: number }[] }

const lanes: Lane[] = [
  {
    name: 'Gymnasialzweig',
    bars: [
      { label: 'Gymnasialzweig', note: 'Klasse 7–10', start: 3, span: 4, tone: gym },
      { label: 'Studienstufe', note: 'Klasse 11–12', start: 7, span: 2, tone: ober },
    ],
    abitur: 12,
  },
  {
    name: 'Stadtteilschulzweig',
    bars: [
      { label: 'Stadtteilschulzweig', note: 'Klasse 7–10', start: 3, span: 4, tone: sts },
      { label: 'Vorstufe', note: 'Klasse 11', start: 7, span: 1, tone: ober },
      { label: 'Studienstufe', note: 'Klasse 12–13', start: 8, span: 2, tone: ober },
    ],
    abitur: 13,
    marks: [
      { label: 'ESA', col: 5 },
      { label: 'MSA', col: 6 },
    ],
  },
]

function Bars({ lane, row }: { lane: Lane; row: string }) {
  return (
    <>
      {lane.bars.map((b) => (
        <span
          key={b.label}
          className={cn('relative flex min-h-16 flex-col justify-center rounded-xl py-2 shadow-sm', b.span === 1 ? 'px-3' : 'px-4', row, colStart[b.start], colSpan[b.span], b.tone)}
        >
          <span className={cn('font-bold leading-tight', b.span === 1 ? 'text-sm lg:text-base' : 'text-base')}>{b.label}</span>
          <span className="mt-0.5 text-[13px] leading-tight opacity-85">{b.note}</span>
          {/* The Abitur sits on the end of the last bar, where the branch ends. */}
          {b.start + b.span - 1 === (lane.abitur === 12 ? 8 : 9) && (
            <span data-abitur className="absolute left-full top-1/2 z-10 flex -translate-x-[18px] -translate-y-1/2 items-center gap-1.5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm ring-4 ring-surface-sand dark:bg-white/20 dark:text-white">
                <GraduationCap className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="text-xs font-black leading-tight text-primary dark:text-foreground">
                Abitur<span className="sr-only"> nach {lane.abitur} Jahren</span>
              </span>
            </span>
          )}
        </span>
      ))}
    </>
  )
}

/** Desktop: one shared Beobachtungsstufe that splits at grade 7 into both branches, which meet again in the Oberstufe. */
function RouteMap() {
  return (
    <div data-zweige-map aria-hidden="true" className="hidden md:block">
      <div className="grid grid-cols-10 gap-x-2 gap-y-2">
        {/* Stage names over their grades, then the grade numbers. */}
        <span className="col-span-6 col-start-1 row-start-1 border-b-2 border-accent pb-1 text-xs font-bold uppercase tracking-[0.15em] text-accent-strong dark:text-accent">
          Mittelstufe
        </span>
        <span className="col-span-3 col-start-7 row-start-1 border-b-2 border-foreground/20 pb-1 text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">
          Oberstufe
        </span>
        {grades.map((g) => (
          <span key={g} className="row-start-2 mb-1 mt-2 text-center font-heading text-2xl font-black leading-none tabular-nums lining-nums text-foreground/20 lg:text-3xl dark:text-white/30">
            {g}
          </span>
        ))}

        <span className={cn('col-span-2 col-start-1 row-span-3 row-start-3 flex flex-col justify-center rounded-xl px-4 py-3 shadow-sm', shared)}>
          <span className="text-base font-bold leading-tight">Beobachtungsstufe</span>
          <span className="mt-0.5 text-[13px] leading-tight opacity-85">Klasse 5–6, gemeinsam für alle</span>
        </span>
        <Bars lane={lanes[0]} row="row-start-3" />
        <span className="col-span-4 col-start-3 row-start-4 flex items-center justify-center gap-2 py-1 text-xs font-bold text-foreground">
          <ArrowUpDown className="h-4 w-4 text-accent-strong dark:text-accent" />
          Wechsel möglich – ohne die Schule zu verlassen
        </span>
        <Bars lane={lanes[1]} row="row-start-5" />
        {lanes[1].marks?.map((m) => (
          // A short stem ties the badge to the end of its school year on the bar.
          <span
            key={m.label}
            className={cn(
              'relative row-start-6 -mt-1 justify-self-end rounded-full bg-golden px-2 py-0.5 text-xs font-black text-on-bright shadow-sm before:absolute before:bottom-full before:left-1/2 before:h-2 before:w-0.5 before:bg-golden',
              colStart[m.col],
            )}
          >
            {m.label}
          </span>
        ))}
      </div>
    </div>
  )
}

// The fork between the shared start and the two branches, and where they meet again. Lines in the branch colours.
function Fork({ join = false }: { join?: boolean }) {
  return (
    <svg aria-hidden="true" width="120" height="34" viewBox="0 0 120 34" fill="none" strokeWidth="3" strokeLinecap="round" className="mx-auto block">
      {join ? (
        <>
          <path d="M25 0 C25 18 60 16 60 26 V34" className="stroke-primary dark:stroke-foreground" />
          <path d="M95 0 C95 18 60 16 60 26" className="stroke-golden" />
        </>
      ) : (
        <>
          <path d="M60 0 V8 C60 18 25 16 25 34" className="stroke-primary dark:stroke-foreground" />
          <path d="M60 8 C60 18 95 16 95 34" className="stroke-golden" />
        </>
      )}
    </svg>
  )
}

const tag = 'text-xs font-bold uppercase tracking-[0.15em]'

type Branch = { name: string; years: 12 | 13; detail: string; tile: string; number: string }

// Soft tints of the branch colours: the strong navy and golden stay with the two cards below.
const branches: Branch[] = [
  { name: 'Gymnasial\u00ADzweig', years: 12, detail: 'Studienstufe Kl. 11–12', tile: 'bg-primary/10 dark:bg-primary/25', number: 'text-primary dark:text-foreground' },
  {
    name: 'Stadtteil\u00ADschulzweig',
    years: 13,
    detail: 'ESA · MSA · Vorstufe Kl. 11 · Studienstufe 12–13',
    tile: 'bg-golden/35 dark:bg-golden/20',
    number: 'text-[#9a7300] dark:text-golden',
  },
]

/** Phones: the way as a fork – together in 5–6, two branches from 7 with the switch between them, together again to the Abitur. */
function RouteList() {
  return (
    <div data-zweige-list className="space-y-3 md:hidden">
      <div className="rounded-3xl bg-mint/25 p-5 dark:bg-mint/15">
        <p className={cn(tag, 'text-foreground/70')}>Klasse 5–6</p>
        <p className="mt-1 font-heading text-2xl font-extrabold leading-tight text-foreground">Gemeinsam ankommen</p>
        <p className="mt-1 text-sm font-semibold text-foreground/75">Beobachtungsstufe für alle – dann entscheiden wir in Ruhe.</p>
      </div>
      <Fork />
      <p className={cn(tag, 'text-center text-muted-foreground')}>ab Klasse 7</p>
      <div className="relative grid grid-cols-2 gap-3">
        {branches.map((b) => (
          <div key={b.years} data-branch className={cn('rounded-3xl p-4 text-foreground', b.tile)}>
            <p className={cn('font-heading text-4xl font-black leading-none lining-nums', b.number)}>{b.years}</p>
            <p className="text-xs font-semibold text-foreground/75">Jahre bis zum Abitur</p>
            <p className="mt-3 text-sm font-extrabold leading-tight">{b.name}</p>
            <p className="mt-2 text-xs text-foreground/80">{b.detail}</p>
          </div>
        ))}
        <span
          data-wechsel
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-surface-sand bg-accent-strong text-white"
        >
          <ArrowLeftRight className="h-4 w-4" />
        </span>
      </div>
      <p className="text-center text-xs font-bold text-foreground">Wechsel möglich – ohne die Schule zu verlassen</p>
      <Fork join />
      <div data-abitur className="rounded-3xl bg-surface p-5 ring-2 ring-inset ring-primary/20">
        <p className={cn(tag, 'text-muted-foreground')}>Oberstufe</p>
        <p className="mt-1 flex items-center gap-2 font-heading text-2xl font-extrabold leading-tight text-foreground">
          <GraduationCap className="h-7 w-7 shrink-0 text-primary dark:text-foreground" aria-hidden="true" />
          Gemeinsam zum Abitur
        </p>
        <p className="mt-1 text-sm font-semibold text-muted-foreground">Beide Wege treffen sich wieder unter einem Dach.</p>
      </div>
    </div>
  )
}

const cardTone = [gym, sts]
const checkTone = ['bg-white/15 text-white', 'bg-black/10 text-on-bright']

/** „Zwei Bildungswege, eine Schule“: the route through grades 5–13, then one card per branch. */
export function Zweige({ block }: { block: Block }) {
  return (
    <>
      <RouteMap />
      <RouteList />
      {/* The map is decorative for screen readers; the cards below carry the same facts in text. */}
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {block.points?.map((p, i) => (
          <div key={p.title} data-zweig className={cn('rounded-3xl p-6 sm:p-8', cardTone[i])}>
            <h3 className="text-2xl font-extrabold leading-tight sm:text-3xl">{p.title}</h3>
            <p className="mt-1 text-lg font-bold opacity-90">{p.figure}</p>
            <p className="mt-4 leading-relaxed text-pretty opacity-90">{p.text}</p>
            <ul className="mt-5 space-y-2.5">
              {p.tags?.map((t) => (
                <li key={t} className="flex items-start gap-3 font-semibold">
                  <span className={cn('mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full', checkTone[i])}>
                    <Check className="h-4 w-4" aria-hidden="true" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  )
}
