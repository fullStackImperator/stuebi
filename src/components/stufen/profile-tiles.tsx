import { profile, type Profil, type ProfilFach } from '@/content/profile'
import { cn } from '@/lib/utils'

// Hours and level as a fixed pill on the right of the row, so it never wraps; eA navy, gA light.
function SubjectRow({ subject }: { subject: ProfilFach }) {
  return (
    <li data-profile-subject className="flex items-center justify-between gap-3 border-b border-foreground/10 py-2.5 last:border-0">
      <span className="font-bold text-foreground">{subject.name}</span>
      {subject.hours ? (
        <span
          className={cn(
            'shrink-0 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-extrabold',
            subject.level === 'eA' ? 'bg-primary text-primary-foreground dark:bg-white/20 dark:text-white' : 'bg-surface-sand text-foreground',
          )}
        >
          {subject.hours} Std · {subject.level}
        </span>
      ) : (
        <span className="shrink-0 whitespace-nowrap text-xs font-semibold text-muted-foreground">begleitend</span>
      )}
    </li>
  )
}

function SubjectGroup({ label, subjects }: { label: string; subjects: ProfilFach[] }) {
  return (
    <div className="px-6 pt-4 sm:px-7">
      <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">{label}</p>
      <ul>
        {subjects.map((s) => (
          <SubjectRow key={s.name} subject={s} />
        ))}
      </ul>
    </div>
  )
}

function ProfileHead({ p, Heading }: { p: Profil; Heading: 'h3' | 'h4' }) {
  return (
    <>
      <p.icon className="mb-6 h-10 w-10" strokeWidth={1.75} aria-hidden="true" />
      <div data-profile-intro>
        <Heading className="text-2xl font-extrabold leading-tight">{p.title}</Heading>
        <p className="mt-1 font-semibold opacity-90">{p.subtitle}</p>
        <p className="mt-4 leading-relaxed opacity-90 text-pretty">{p.text}</p>
      </div>
    </>
  )
}

/**
 * The two Studienstufe profiles as large colour tiles: icon, name, focus and text.
 * Without `withSubjects` they end in what the students do; with it, a white part lists the subjects with hours.
 */
export function ProfileTiles({ heading: Heading = 'h4', withSubjects = false }: { heading?: 'h3' | 'h4'; withSubjects?: boolean }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {profile.map((p) =>
        withSubjects ? (
          <div key={p.title} data-profile className="flex flex-col overflow-hidden rounded-3xl bg-surface shadow-sm ring-1 ring-foreground/5">
            <div className={cn('deco-tile p-7 sm:p-8', p.tile)}>
              <ProfileHead p={p} Heading={Heading} />
            </div>
            <div className="pb-3">
              <SubjectGroup label="Profilgebend" subjects={p.subjects.lead} />
              <SubjectGroup label="Dazu" subjects={p.subjects.with} />
            </div>
          </div>
        ) : (
          <div key={p.title} data-profile className={cn('deco-tile flex flex-col rounded-3xl p-7 sm:p-8', p.tile)}>
            <ProfileHead p={p} Heading={Heading} />
            <ul className="mt-auto flex flex-wrap gap-2 pt-6">
              {p.doing.map((d) => (
                <li key={d} className="rounded-full bg-white/20 px-3 py-1 text-sm font-semibold">
                  {d}
                </li>
              ))}
            </ul>
          </div>
        ),
      )}
    </div>
  )
}
