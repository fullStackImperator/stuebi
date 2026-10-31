import type { LucideIcon } from 'lucide-react'
import { ArrowRight, CalendarDays, ClipboardList, Compass, GraduationCap, Sparkles, Sun } from 'lucide-react'

type SectionStyle = {
  icon: LucideIcon
  /** Background and text classes of a section tile. */
  tile: string
  /** The same colours as CSS variables (--nav-bg, --nav-fg) for the desktop menu's hover and open states. */
  vars: string
}

// One site colour per section, matching the page headers (PageIntro) and the stage tiles.
export const sectionStyle: Record<string, SectionStyle> = {
  '/vision': { icon: Compass, tile: 'bg-primary text-white', vars: '[--nav-bg:var(--color-primary)] [--nav-fg:#fff]' },
  '/bildungswege': {
    icon: GraduationCap,
    tile: 'bg-golden text-on-bright',
    vars: '[--nav-bg:var(--color-golden)] [--nav-fg:var(--color-on-bright)]',
  },
  '/schwerpunkt': {
    icon: Sparkles,
    tile: 'bg-mint text-on-bright',
    vars: '[--nav-bg:var(--color-mint)] [--nav-fg:var(--color-on-bright)]',
  },
  // Dark navy would vanish on a dark background, so it lightens there.
  '/ganztag': {
    icon: Sun,
    tile: 'bg-surface-ink text-white dark:bg-white/15',
    vars: '[--nav-bg:var(--color-surface-ink)] [--nav-fg:#fff] dark:[--nav-bg:rgb(255_255_255/0.15)]',
  },
  '/termine': {
    icon: CalendarDays,
    tile: 'bg-secondary text-secondary-foreground',
    vars: '[--nav-bg:var(--color-secondary)] [--nav-fg:var(--color-secondary-foreground)]',
  },
  '/anmeldung': { icon: ClipboardList, tile: 'bg-accent text-white', vars: '[--nav-bg:var(--color-accent)] [--nav-fg:#fff]' },
}

const fallbackStyle: SectionStyle = { ...sectionStyle['/vision'], icon: ArrowRight }

export function styleFor(href: string): SectionStyle {
  return sectionStyle[href] ?? fallbackStyle
}
