// Partner und Förderer der Stübi, gruppiert wie auf der Startseite.

export type Partner = {
  name: string
  /** Logo under `public/images`. */
  src: string
  /** Optional second caption line, e.g. what the partner supports. */
  note?: string
  /** Tile colour for logos drawn for dark backgrounds (default white). */
  tileColor?: string
}

export type PartnerGroup = {
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

const allPartners = PARTNER_GROUPS.flatMap((group) => group.partners)

/** Partners with a logo, looked up by name (e.g. for a Schwerpunkt section). */
export function partnersByName(names: string[]): Partner[] {
  return names.flatMap((name) => allPartners.filter((p) => p.name === name))
}
