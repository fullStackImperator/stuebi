import { profile } from '@/content/profile'

/** The two Studienstufe profiles as large colour tiles: icon, name, focus, text and what the students do. */
export function ProfileTiles({ heading: Heading = 'h4' }: { heading?: 'h3' | 'h4' }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {profile.map((p) => (
        <div key={p.title} data-profile className={`deco-tile flex flex-col rounded-3xl p-7 sm:p-8 ${p.tile}`}>
          <p.icon className="mb-6 h-10 w-10" strokeWidth={1.75} aria-hidden="true" />
          <Heading className="text-2xl font-extrabold leading-tight">{p.title}</Heading>
          <p className="mt-1 font-semibold opacity-90">{p.subtitle}</p>
          <p className="mt-4 leading-relaxed opacity-90 text-pretty">{p.text}</p>
          <ul className="mt-auto flex flex-wrap gap-2 pt-6">
            {p.doing.map((d) => (
              <li key={d} className="rounded-full bg-white/20 px-3 py-1 text-sm font-semibold">
                {d}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
