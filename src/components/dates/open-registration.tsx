import { ArrowRight } from 'lucide-react'
import { fullDate } from '@/components/dates/date-row'
import { dayParts, type DateItem } from '@/lib/next-dates'

/** A registration window that runs today: deadline sheet, days left, a bar for how far it has run, and a link on to the registration. */
export function OpenRegistrationBanner({
  item,
  daysLeft,
  percent,
  href,
  linkLabel,
  who,
}: {
  item: DateItem
  daysLeft: number
  percent: number
  href?: string
  linkLabel: string
  // The department, where the page lists several.
  who?: string
}) {
  const end = dayParts(item.endDate!)
  return (
    <div data-open-registration className="rounded-3xl border-2 border-accent/30 bg-accent/10 p-5">
      <div className="flex items-start gap-4">
        <div aria-hidden="true" className="w-16 shrink-0 overflow-hidden rounded-2xl bg-surface text-center shadow-[0_4px_0_rgb(200_40_79/0.25)]">
          <p className="bg-accent-strong py-1 text-[10px] font-black uppercase tracking-widest text-white">Schluss</p>
          <p className="pt-1.5 text-3xl font-black leading-none tabular-nums text-foreground">{end.day}</p>
          <p className="pb-1.5 text-xs font-bold uppercase text-muted-foreground">{end.month}</p>
        </div>
        <div className="min-w-0">
          <p className="inline-flex items-center gap-1.5 rounded-full bg-accent-strong px-2.5 py-0.5 text-xs font-black uppercase tracking-wider text-white">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full rounded-full bg-white/70 motion-safe:animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-white/90" />
            </span>
            Jetzt anmelden
          </p>
          <h4 className="mt-2 text-xl font-extrabold leading-tight text-foreground text-pretty">
            {item.title}
            {who && <span className="text-base font-semibold text-muted-foreground"> · {who}</span>}
          </h4>
          <p data-days-left className="mt-0.5 text-sm text-muted-foreground">
            {daysLeft === 0 ? (
              <strong className="text-foreground">Heute ist der letzte Tag.</strong>
            ) : (
              <>
                Noch <strong className="text-foreground">{daysLeft === 1 ? '1 Tag' : `${daysLeft} Tage`}</strong>, bis {fullDate(item.endDate!)}.
              </>
            )}
          </p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <div aria-hidden="true" className="h-2 min-w-24 flex-1 rounded-full bg-accent/15">
          <div className="h-full rounded-full bg-accent-strong dark:bg-accent" style={{ width: `${percent}%` }} />
        </div>
        {href && (
          <a
            href={href}
            className="inline-flex items-center gap-1.5 rounded-full bg-accent-strong px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-accent-strong/90"
          >
            {linkLabel}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        )}
      </div>
    </div>
  )
}
