import { BookOpen, Star } from 'lucide-react'
import { NotchCard } from '@/components/ui/notch-card'
import { HighlightBar } from '@/components/ui/highlight-bar'

// The four pillars of the Leitbild, as in the school brochure 2026.
const pillars = [
  {
    title: 'Vielfalt und Leistung im Einklang',
    description:
      'Ob gezielte Begabtenförderung oder wirksame Lernhilfe – wir holen jedes Kind dort ab, wo es steht, und fordern es passgenau.',
    tone: 'bg-mint text-on-bright',
    image: '/images/fotos/grundschule-lehrer.jpg',
    alt: 'Ein Lehrer lacht mit zwei Kindern im Klassenraum',
    position: '35% 35%',
  },
  {
    title: 'Ein wertschätzendes Miteinander',
    description:
      'Gegenseitiger Respekt, Toleranz und ein starker Gemeinschaftssinn prägen unseren sicheren, offenen Schulalltag.',
    tone: 'bg-accent text-white',
    image: '/images/fotos/papierflieger.jpg',
    alt: 'Kinder liegen im Kreis um bunte Papierflieger',
    position: '50% 50%',
  },
  {
    title: 'Demokratie als gelebte Haltung',
    description: 'Über Klassenrat und Mitbestimmung gestalten Schülerinnen und Schüler ihre Schullaufbahn aktiv mit.',
    tone: 'bg-golden text-on-bright',
    image: '/images/fotos/abschluss-rede.jpg',
    alt: 'Ein Schüler spricht am Mikrofon vor Publikum',
    position: '50% 40%',
  },
  {
    title: 'Strukturierte Selbstständigkeit',
    description:
      'Feste Vorgaben geben zu Beginn verlässliche Orientierung; im Laufe der Zeit werden daraus Schritt für Schritt eigenverantwortliche Freiräume.',
    tone: 'bg-primary text-white',
    image: '/images/fotos/treppe-lesen.jpg',
    alt: 'Kinder lesen selbstständig auf der Sitztreppe im Schulhaus',
    position: '60% 60%',
  },
]

// On /vision itself the cards are not links (they would point to the same page).
export function VisionSection({ linked = true }: { linked?: boolean }) {
  return (
    <section
      id="vision"
      className="py-24 bg-surface-sand relative overflow-hidden"
    >
      {/* Floating decorative badges */}
      <div className="hidden lg:flex absolute top-16 left-[6%] w-12 h-12 rounded-2xl bg-mint items-center justify-center rotate-6 shadow-lg">
        <BookOpen className="h-5 w-5 text-on-bright" />
      </div>
      <div className="hidden lg:flex absolute top-12 right-[7%] w-12 h-12 rounded-2xl bg-golden items-center justify-center -rotate-6 shadow-lg">
        <Star className="h-5 w-5 text-on-bright" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-3 mb-5">
            <span className="w-6 h-px bg-accent" />
            <span className="text-accent text-xs font-bold tracking-[0.2em] uppercase">
              Unsere Leitvision
            </span>
            <span className="w-6 h-px bg-accent" />
          </div>

          <h2 className="text-4xl sm:text-5xl font-extrabold text-foreground mb-5 leading-tight">
            Wofür unser <HighlightBar tone="primary">Campus</HighlightBar> steht.
          </h2>

          <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
            Getreu unserem Leitgedanken – Chancen schaffen, Schülerinnen und Schüler stärken! – begleiten wir
            Ihr Kind verlässlich, wertschätzend und auf Augenhöhe.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-8">
          {pillars.map((pillar) => (
            <NotchCard
              key={pillar.title}
              href={linked ? '/vision' : undefined}
              title={pillar.title}
              image={{ src: pillar.image, alt: pillar.alt, position: pillar.position }}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              aspect="aspect-[100/118]"
              tone={pillar.tone}
              titleSize="text-xl lg:text-lg xl:text-xl"
            >
              {pillar.description}
            </NotchCard>
          ))}
        </div>
      </div>
    </section>
  )
}
