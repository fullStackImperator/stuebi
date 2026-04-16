import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Compass, Heart, Sparkles, Users } from 'lucide-react'

const pillars = [
  {
    icon: Compass,
    title: 'Lernwege mitgestalten',
    description:
      'Durch unser schülerzentriertes Lernkonzept der Maker Education und Profile wie Mein Start-Up gestalten unsere Schülerinnen und Schüler ihre Bildung aktiv mit.',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    icon: Heart,
    title: 'Persönlichkeit entwickeln',
    description:
      'Ob in unseren Sportteams mit lizenzierten Trainern oder durch die individuelle Begleitung im multiprofessionellen Jahrgangsteam – wir fördern Stärken gezielt.',
    color: 'text-accent',
    bgColor: 'bg-accent/10',
  },
  {
    icon: Sparkles,
    title: 'Aktive Lernkultur leben',
    description:
      'Wir lernen beim Machen. Im Stübi-Makerspace arbeiten wir mit 3D-Druckern und Robotik und erlernen so spielerisch 21st Century Skills.',
    color: 'text-chart-3',
    bgColor: 'bg-chart-3/10',
  },
  {
    icon: Users,
    title: 'Demokratisches Miteinander',
    description:
      'Verantwortung füreinander steht an oberster Stelle. In Projekten wie Abgekocht!, wo Klassen für die ganze Schule kochen, wird Gemeinschaft praktisch gelebt.',
    color: 'text-chart-4',
    bgColor: 'bg-chart-4/10',
  },
]

export function VisionSection() {
  return (
    <section id="vision" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Unsere Leitvision: Die 4 Säulen der Stübi
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Jede Maßnahme, jedes Vorhaben und jede Entwicklungsinitiative an
            unserer Schule wird daraufhin geprüft, ob sie unserem
            Entwicklungsziel dient.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pillars.map((pillar) => (
            <Card
              key={pillar.title}
              className="group bg-accent-foreground/50 hover:shadow-lg transition-shadow duration-300 border-border/50"
            >
              <CardHeader className="pb-4">
                <div
                  className={`w-12 h-12 rounded-xl ${pillar.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <pillar.icon className={`h-6 w-6 ${pillar.color}`} />
                </div>
                <CardTitle className="text-xl">{pillar.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  {pillar.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
