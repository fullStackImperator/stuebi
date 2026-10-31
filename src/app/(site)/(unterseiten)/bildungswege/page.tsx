import type { Metadata } from 'next'
import Link from 'next/link'
import { InfoCard, NextLink, PageIntro, PageSection } from '@/components/sections/page-parts'
import { PhotoBand } from '@/components/photos/photo-band'
import { StageTiles } from '@/components/stufen/stage-tiles'
import { stageOrder } from '@/content/stufen'
import { getPageImages } from '@/lib/page-images'
import { toPhoto } from '@/lib/photo'

export const metadata: Metadata = {
  title: 'Bildungswege | Stübi Hamburg',
  description: 'Vorschule, Grundschule, Mittelstufe, Oberstufe, Ganztag und Abschlüsse an der Stadtteilschule Stübenhofer Weg – von der Vorschule bis zum Abitur.',
}

// One tile per degree, in the order they are reached.
const degrees = [
  { short: 'ESA', name: 'Erster allgemeinbildender Schulabschluss', when: 'nach Klasse 9', tile: 'bg-golden text-on-bright' },
  { short: 'MSA', name: 'Mittlerer Schulabschluss', when: 'nach Klasse 10', tile: 'bg-mint text-on-bright' },
  {
    short: 'Abitur',
    name: 'Allgemeine Hochschulreife',
    when: 'nach Klasse 12 im Gymnasialzweig oder nach Klasse 13 im Stadtteilschulzweig',
    tile: 'bg-primary text-primary-foreground',
  },
]

const profiles = [
  {
    title: 'Profil „Fair Play“',
    subtitle: 'Sport, Gesundheit & Management',
    text: 'Für sportbegeisterte Jugendliche: Sport, PGW (Politik, Gesellschaft, Wirtschaft) und Biologie greifen ineinander. Die Schülerinnen und Schüler planen echte Sportevents, beschäftigen sich mit Gesundheitsmanagement und setzen sportwissenschaftliche Theorie in die Praxis um.',
    accent: 'bg-accent',
  },
  {
    title: 'Profil „Mein Start-Up“',
    subtitle: 'Wirtschaft, Innovation & Management',
    text: 'Hier werden Jugendliche zu Gründerinnen und Gründern: Sie entwickeln eigene Produkte, schreiben Businesspläne und erforschen globale wirtschaftliche Zusammenhänge.',
    accent: 'bg-mint',
  },
]

// Photo slots come from the CMS; refresh at most a minute after an editor changes them.
export const revalidate = 60

// Übersicht: jede Stufe hat eine eigene Seite, hier führen Kacheln dorthin.
export default async function BildungswegePage() {
  const { bildungswege: img } = await getPageImages()

  return (
    <>
      <PageIntro
        eyebrow="Bildungswege"
        color="golden"
        title="Gemeinsam von der Vorschule bis zum Abitur."
        lead="An der Stübi können Kinder ihre ganze Schulzeit an einem Ort verbringen: von der Vorschule über Grund- und Mittelstufe bis zur Oberstufe. Mit unserem Konzept eine Klasse bleiben sie dabei weitestgehend im selben Klassenverband – das gibt Sicherheit und Zugehörigkeit."
      />

      <PageSection id="stufen" eyebrow="Unsere Stufen" title="Ein Weg, eine Schule." tone="sand">
        <StageTiles ids={stageOrder} variant="overview" />
      </PageSection>

      <PhotoBand photo={toPhoto(img?.band?.image)} caption={img?.band?.caption} />

      <PageSection id="abschluesse" eyebrow="Abschlüsse" title="Alle Abschlüsse an einer Schule.">
        <ol className="grid sm:grid-cols-3 gap-3 mb-12">
          {degrees.map((d) => (
            <li key={d.short} data-degree className={`flex min-h-44 flex-col justify-end rounded-2xl p-6 ${d.tile}`}>
              <p className="text-4xl font-black leading-none">{d.short}</p>
              <p className="mt-3 font-bold leading-snug">{d.name}</p>
              <p className="mt-1 text-sm leading-snug">{d.when}</p>
            </li>
          ))}
        </ol>
        <h3 id="profile" className="scroll-mt-24 text-2xl font-extrabold text-foreground mb-5">Die Profile der Studienstufe</h3>
        <div className="grid sm:grid-cols-2 gap-5 mb-8">
          {profiles.map((p) => (
            <InfoCard key={p.title} title={p.title} accent={p.accent}>
              <p className="font-semibold text-foreground">{p.subtitle}</p>
              <p>{p.text}</p>
            </InfoCard>
          ))}
        </div>
        <p className="text-muted-foreground">
          Die Voraussetzungen für den Übergang in die Oberstufe stehen auf der{' '}
          <Link href="/oberstufe#voraussetzungen" className="font-semibold text-primary underline-offset-4 hover:underline">
            Seite der Oberstufe
          </Link>
          .
        </p>
        <div className="mt-10">
          <NextLink href="/schwerpunkt">Weiter zu unseren Schwerpunkten</NextLink>
        </div>
      </PageSection>
    </>
  )
}
