import Image from 'next/image'

import { cn } from '@/lib/utils'
import { PARTNER_GROUPS, type Partner } from '@/content/partners'

export { PARTNER_COUNT } from '@/content/partners'

/**
 * Logo on a light tile. Most logos are JPG/PNG on white, so the tile stays light in both themes;
 * in dark mode it is dimmed a little so it does not glare on the dark page.
 */
export function LogoTile({ partner, sizes, className }: { partner: Partner; sizes: string; className?: string }) {
  return (
    <div
      className={cn('relative aspect-[3/2] w-full overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 dark:bg-slate-200', className)}
      style={partner.tileColor ? { backgroundColor: partner.tileColor } : undefined}
    >
      <div className="absolute inset-3 sm:inset-4">
        <Image src={partner.src} alt={partner.name} fill sizes={sizes} className="object-contain" />
      </div>
    </div>
  )
}

function PartnerTile({ partner }: { partner: Partner }) {
  return (
    <li className="flex flex-col items-center gap-2 text-center">
      <LogoTile partner={partner} sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 220px" />
      <span className="text-xs leading-snug text-muted-foreground text-pretty">
        {partner.name}
        {partner.note && <span className="block text-muted-foreground/70">{partner.note}</span>}
      </span>
    </li>
  )
}

type PartnerLogosProps = {
  className?: string
}

export function PartnerLogos({ className }: PartnerLogosProps) {
  return (
    <div className={cn('space-y-12', className)}>
      <div className="text-center">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Partner & Förderer</p>
        <h3 className="mt-3 text-2xl font-extrabold text-foreground sm:text-3xl text-balance">
          Gemeinsam für Bildung, Kultur & Sport
        </h3>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground text-pretty">
          Die Stadtteilschule Stübenhofer Weg bedankt sich bei ihren Förderern und Kooperationspartnern.
        </p>
      </div>

      {PARTNER_GROUPS.map((group, i) => (
        <section key={group.title} aria-labelledby={`partner-group-${i}`}>
          <div className="mb-5 flex items-center gap-4">
            <h4
              id={`partner-group-${i}`}
              className="text-sm font-bold uppercase tracking-[0.15em] text-foreground"
            >
              {group.title}
            </h4>
            <span className="h-px flex-1 bg-border" aria-hidden="true" />
          </div>
          <ul
            role="list"
            className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 lg:grid-cols-5"
          >
            {group.partners.map((partner) => (
              <PartnerTile key={partner.name} partner={partner} />
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}
