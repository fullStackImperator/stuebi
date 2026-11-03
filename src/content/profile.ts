import type { LucideIcon } from 'lucide-react'
import { Rocket, Trophy } from 'lucide-react'

// Die zwei Profile der Studienstufe (Broschüre 2026). Bildungswege und Oberstufe zeigen sie gleich.
export type Profil = { title: string; subtitle: string; text: string; tile: string; icon: LucideIcon; doing: string[] }

export const profile: Profil[] = [
  {
    title: 'Profil „Fair Play“',
    subtitle: 'Sport, Gesundheit & Management',
    text: 'Für sportbegeisterte Jugendliche: Sport, PGW (Politik, Gesellschaft, Wirtschaft) und Biologie greifen ineinander. Die Schülerinnen und Schüler planen echte Sportevents, beschäftigen sich mit Gesundheitsmanagement und setzen sportwissenschaftliche Theorie in die Praxis um.',
    tile: 'bg-accent-strong text-white',
    icon: Trophy,
    doing: ['Sportevents planen', 'Gesundheitsmanagement', 'Sportwissenschaft in der Praxis'],
  },
  {
    title: 'Profil „Mein Start-Up“',
    subtitle: 'Wirtschaft, Innovation & Management',
    text: 'Hier werden Jugendliche zu Gründerinnen und Gründern: Sie entwickeln eigene Produkte, schreiben Businesspläne und erforschen globale wirtschaftliche Zusammenhänge.',
    tile: 'bg-mint text-on-bright',
    icon: Rocket,
    doing: ['Eigene Produkte', 'Businesspläne', 'Globale Wirtschaft'],
  },
]
