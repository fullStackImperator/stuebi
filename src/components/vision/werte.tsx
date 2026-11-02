import { InfoCard } from '@/components/sections/page-parts'
import { werteHero } from '@/content/vision'

type Wert = { title: string; text: string; accent: string }

/** One value as a wide colour band with large serif type, the others as quieter cards below. */
export function Werte({ werte }: { werte: Wert[] }) {
  const hero = werte.find((w) => w.title === werteHero.title)
  const rest = werte.filter((w) => w.title !== werteHero.title)
  return (
    <>
      {hero && (
        <div data-wert data-wert-hero className="deco-tile relative grid gap-6 rounded-3xl bg-accent-strong p-8 text-white sm:p-12 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-12">
          <h3 className="font-quote text-4xl italic leading-tight sm:text-5xl">„{hero.title}.“</h3>
          <p className="text-lg leading-relaxed text-white/90 text-pretty">{werteHero.text}</p>
        </div>
      )}
      <div className="mt-5 grid gap-5 sm:grid-cols-3">
        {rest.map((w) => (
          <InfoCard key={w.title} title={w.title} accent={w.accent}>
            <p>{w.text}</p>
          </InfoCard>
        ))}
      </div>
    </>
  )
}
