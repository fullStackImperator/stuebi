import Image from 'next/image'
import { Download, FileText } from 'lucide-react'
import { profile, type Profil, type ProfilFach, type ProfilFlyer, type ProfilKey } from '@/content/profile'
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
            subject.level === 'eA' ? 'bg-primary text-primary-foreground dark:bg-white/20 dark:text-white' : 'bg-white text-foreground dark:bg-white/10',
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

// The flyer row at the foot of the tile: a small preview of page 1, the label and a download arrow.
function FlyerLink({ p, flyer }: { p: Profil; flyer: ProfilFlyer }) {
  return (
    <a
      href={flyer.href}
      target="_blank"
      rel="noopener"
      data-profile-flyer
      className="group mx-6 mb-6 mt-3 flex items-center gap-4 rounded-2xl bg-white/70 p-3 transition-colors hover:bg-white dark:bg-white/10 dark:hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:mx-7"
    >
      {flyer.preview ? (
        <Image
          src={flyer.preview}
          alt=""
          width={56}
          height={79}
          className="h-20 w-14 shrink-0 rounded-md bg-white object-cover dark:bg-surface-ink object-top shadow-sm ring-1 ring-foreground/10"
        />
      ) : (
        <span className="flex h-20 w-14 shrink-0 items-center justify-center rounded-md bg-white text-primary shadow-sm ring-1 ring-foreground/10">
          <FileText className="h-6 w-6" aria-hidden="true" />
        </span>
      )}
      <span className="min-w-0">
        <span className="block font-extrabold text-foreground">Flyer zum Profil</span>
        <span className="block text-sm text-muted-foreground">
          PDF{flyer.pages ? ` · ${flyer.pages} Seiten` : ''}<span className="sr-only"> – {p.title}</span>
        </span>
      </span>
      <Download className="ml-auto h-5 w-5 shrink-0 text-primary transition-transform group-hover:translate-y-0.5 dark:text-foreground" aria-hidden="true" />
    </a>
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
 * Without `withSubjects` they end in what the students do; with it, a white part lists the subjects with hours
 * and links the profile flyer.
 */
export function ProfileTiles({
  heading: Heading = 'h4',
  withSubjects = false,
  flyers = {},
}: {
  heading?: 'h3' | 'h4'
  withSubjects?: boolean
  // Flyers from the CMS; a profile without one keeps its flyer from the content.
  flyers?: Partial<Record<ProfilKey, ProfilFlyer>>
}) {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {profile.map((p) =>
        withSubjects ? (
          // Both cards stretch to the row height; the coloured head takes the slack, so the heads line up
          // (the white parts below have the same rows in both profiles).
          <div key={p.title} data-profile className={cn('flex flex-col overflow-hidden rounded-3xl', p.soft)}>
            <div data-profile-head className={cn('deco-tile flex-1 p-7 sm:p-8', p.tile)}>
              <ProfileHead p={p} Heading={Heading} />
            </div>
            <div className="pb-1">
              <SubjectGroup label="Profilgebend" subjects={p.subjects.lead} />
              <SubjectGroup label="Dazu" subjects={p.subjects.with} />
            </div>
            <FlyerLink p={p} flyer={flyers[p.key] ?? p.flyer} />
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
