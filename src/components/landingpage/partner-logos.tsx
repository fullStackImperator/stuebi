import Image from 'next/image'

import { cn } from '@/lib/utils'

type Partner = {
  name: string
  /** Logo under `public/images`. */
  src: string
  /** Optional second caption line, e.g. what the partner supports. */
  note?: string
  /** Tile colour for logos drawn for dark backgrounds (default white). */
  tileColor?: string
}

type PartnerGroup = {
  title: string
  partners: Partner[]
}

/** Logos under `public/images` — keep in sync with filenames on disk. */
export const PARTNER_GROUPS: PartnerGroup[] = [
  {
    title: 'Sport',
    partners: [
      { name: 'Hamburg Towers', src: '/images/towers.svg' },
      { name: 'Hamburger Judo-Verband', src: '/images/hjv_bg.webp' },
      { name: 'Sport ohne Grenzen', src: '/images/sog_bg.png' },
    ],
  },
  {
    title: 'Bildung, Kultur & Technik',
    partners: [
      { name: 'Staatliche Jugendmusikschule Hamburg', src: '/images/partner/jugendmusikschule.png' },
      { name: 'TUSCH – Theater und Schule', src: '/images/partner/tusch.png' },
      { name: 'MITsprache', src: '/images/partner/mitsprache.png' },
      { name: 'lüttIng', src: '/images/partner/luetting.png' },
      { name: 'Mathe sicher können', src: '/images/partner/mathe-sicher-koennen.png' },
      { name: 'SchulMentoren', src: '/images/partner/schulmentoren.png' },
      { name: '23+ Starke Schulen', src: '/images/partner/starke-schulen.png' },
    ],
  },
  {
    title: 'Wirtschaft & Förderer',
    partners: [
      { name: 'Aurubis', src: '/images/logos-aurubis.svg' },
      { name: 'Save the Children', src: '/images/partner/save-the-children.svg' },
      { name: 'MRGE', src: '/images/partner/mrge.svg', note: '30 MacBooks gespendet', tileColor: '#303640' },
      {
        name: 'Stiftung Mutter Boden',
        src: '/images/partner/mutterboden.svg',
        note: 'Unterstützt unseren Schulgarten',
        tileColor: '#2b2b2b',
      },
      { name: 'brotZeit e.V.', src: '/images/partner/brotzeit.png', note: 'Kostenloses Schulfrühstück' },
    ],
  },
]

export const PARTNER_COUNT = PARTNER_GROUPS.reduce((sum, group) => sum + group.partners.length, 0)

function PartnerTile({ partner }: { partner: Partner }) {
  return (
    <li className="flex flex-col items-center gap-2 text-center">
      {/* White card in both themes: most logos are JPG/PNG on white. */}
      <div
        className="relative aspect-[3/2] w-full overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5"
        style={partner.tileColor ? { backgroundColor: partner.tileColor } : undefined}
      >
        <div className="absolute inset-3 sm:inset-4">
          <Image
            src={partner.src}
            alt={partner.name}
            fill
            sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 220px"
            className="object-contain"
          />
        </div>
      </div>
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
