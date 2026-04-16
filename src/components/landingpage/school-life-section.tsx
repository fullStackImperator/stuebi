import { Card, CardContent } from '@/components/ui/card'
import {
  GraduationCap,
  Dumbbell,
  Palette,
  Globe,
  Building2,
  Utensils,
  Microscope,
  Music,
} from 'lucide-react'

const activities = [
  {
    icon: Dumbbell,
    title: 'Sportteams',
    description: 'Basketball, Judo & Fußball mit lizenzierten Trainern',
  },
  {
    icon: Building2,
    title: 'Makerspace',
    description: '3D-Drucker, Robotik & digitales Lernen',
  },
  {
    icon: Utensils,
    title: 'Projekt Abgekocht!',
    description: 'Klassen kochen für die ganze Schule',
  },
  {
    icon: Microscope,
    title: 'Forschen & Staunen',
    description: 'Naturwissenschaften erleben',
  },
  {
    icon: Palette,
    title: 'Kunst & Theater',
    description: 'Kreative AGs am Nachmittag',
  },
  {
    icon: Music,
    title: 'Musik',
    description: 'Chor, Instrumente & mehr',
  },
  {
    icon: Globe,
    title: 'Fremdsprachen',
    description: 'Spanisch, Französisch & Türkisch',
  },
  {
    icon: GraduationCap,
    title: 'Schülerfirmen',
    description: 'Echte Projekte, echte Verantwortung',
  },
]

export function SchoolLifeSection() {
  return (
    <section id="schulleben" className="py-24 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Ein Schulalltag voller Möglichkeiten
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Als Ganztagsschule bieten wir weit mehr als nur Unterricht. Sport,
            Kunst, Technik und soziale Projekte – hier findet jedes Kind seinen
            Platz.
          </p>
        </div>

        {/* Activities Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {activities.map((activity) => (
            <Card
              key={activity.title}
              className="group border-border/50 hover:border-primary/30 hover:bg-card transition-all duration-300"
            >
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <activity.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">
                  {activity.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {activity.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quote */}
        <div className="mt-16 text-center">
          <blockquote className="text-xl italic text-muted-foreground max-w-2xl mx-auto">
            {'"'}Das Leben anzuregen – und es sich dann frei entwickeln zu
            lassen – hierin liegt die erste Aufgabe des Erziehers.{'"'}
          </blockquote>
          <cite className="block mt-4 text-sm font-medium text-foreground">
            — Maria Montessori
          </cite>
        </div>
      </div>
    </section>
  )
}
