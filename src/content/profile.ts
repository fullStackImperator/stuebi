import type { LucideIcon } from 'lucide-react'
import { Rocket, Trophy } from 'lucide-react'

// Die zwei Profile der Studienstufe (Broschüre 2026, Fächer von der alten Seite „Profiloberstufe ab Jg. 12“).
// Bildungswege und Oberstufe zeigen sie gleich; nur die Oberstufe zeigt die Fächer dazu.
// `level`: eA = erhöhtes, gA = grundlegendes Anforderungsniveau.
export type ProfilFach = { name: string; hours?: number; level?: 'eA' | 'gA' }
export type Profil = {
  title: string
  subtitle: string
  text: string
  tile: string
  icon: LucideIcon
  doing: string[]
  // `lead`: profilgebende Fächer, `with`: profilbegleitende.
  subjects: { lead: ProfilFach[]; with: ProfilFach[] }
  // Flyer von der alten Seite, mit Vorschau der ersten Seite (public/).
  flyer: { href: string; preview: string; pages: number }
}

export const profile: Profil[] = [
  {
    title: 'Profil „Fair Play“',
    subtitle: 'Sport, Gesundheit & Management',
    text: 'Für sportbegeisterte Jugendliche: Sport, PGW (Politik, Gesellschaft, Wirtschaft) und Biologie greifen ineinander. Die Schülerinnen und Schüler planen echte Sportevents, beschäftigen sich mit Gesundheitsmanagement und setzen sportwissenschaftliche Theorie in die Praxis um. Es geht um Fairness im Sport, in der Gesellschaft und in der Natur.',
    tile: 'bg-accent-strong text-white',
    icon: Trophy,
    doing: ['Sportevents planen', 'Gesundheitsmanagement', 'Sportwissenschaft in der Praxis'],
    subjects: {
      lead: [{ name: 'Sport', hours: 4, level: 'eA' }, { name: 'PGW', hours: 4, level: 'eA' }],
      with: [{ name: 'Biologie', hours: 2, level: 'gA' }, { name: 'Seminar' }],
    },
    flyer: { href: '/downloads/oberstufe/flyer-fair-play.pdf', preview: '/images/flyer/flyer-fair-play.webp', pages: 2 },
  },
  {
    title: 'Profil „Mein Start-Up“',
    subtitle: 'Wirtschaft, Innovation & Management',
    text: 'Hier werden Jugendliche zu Gründerinnen und Gründern: Sie entwickeln eigene Produkte, schreiben Businesspläne und erforschen globale wirtschaftliche Zusammenhänge – von der Geschäftsidee bis zum Finanzierungskonzept, mit Besuchen in Unternehmen und im Parlament.',
    tile: 'bg-mint text-on-bright',
    icon: Rocket,
    doing: ['Eigene Produkte', 'Businesspläne', 'Globale Wirtschaft'],
    subjects: {
      lead: [{ name: 'Wirtschaft', hours: 4, level: 'eA' }, { name: 'PGW', hours: 4, level: 'eA' }],
      with: [{ name: 'Chemie', hours: 2, level: 'gA' }, { name: 'Seminar' }],
    },
    flyer: { href: '/downloads/oberstufe/flyer-mein-start-up.pdf', preview: '/images/flyer/flyer-mein-start-up.webp', pages: 2 },
  },
]
