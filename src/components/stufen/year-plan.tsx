import { DateRow } from '@/components/dates/date-row'
import { Tabs } from '@/components/ui/tabs'
import type { GradePlan, PlanEntry } from '@/content/jahresplan-mittelstufe'
import { groupByMonth, upcomingDates, type DateItem } from '@/lib/next-dates'

// Days are pinned to noon UTC, like the CMS's day-only dates, so no time zone moves them.
const noon = (day: string) => `${day}T12:00:00.000Z`

// Exams and talks get the golden calendar leaf, everything else mint.
function toDateItem(entry: PlanEntry, i: number): DateItem {
  return {
    id: `${entry.start}-${i}`,
    title: entry.title,
    kind: entry.type === 'pruefung' || entry.type === 'gespraech' ? 'info' : 'event',
    startDate: noon(entry.start),
    endDate: entry.end ? noon(entry.end) : null,
    note: entry.text ?? null,
    audience: entry.who ?? null,
  }
}

function GradeDates({ grade }: { grade: GradePlan }) {
  const months = groupByMonth(upcomingDates(grade.entries.map(toDateItem)))
  if (months.length === 0) return <p className="text-lg text-muted-foreground">Für diesen Jahrgang stehen keine Termine mehr an.</p>
  return (
    <div className="space-y-10">
      {months.map(([month, items]) => (
        <div key={month}>
          <h3 className="mb-2 text-sm font-bold uppercase tracking-[0.15em] text-accent">{month}</h3>
          <ul className="max-w-4xl border-b border-border">
            {items.map((d) => (
              <DateRow key={d.id} item={d} showKind={false} />
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

/** The school year's dates per Jahrgang, as tabs; past dates drop out. */
export function YearPlan({ grades, label }: { grades: GradePlan[]; label: string }) {
  return <Tabs label={label} tabs={grades.map((g) => ({ label: g.grade, content: <GradeDates grade={g} /> }))} />
}
