import type { Metadata } from 'next'
import type { LucideIcon } from 'lucide-react'
import { Baby, BookMarked, GraduationCap, School } from 'lucide-react'
import { InfoCard, NextLink, PageIntro, PageSection, Placeholder } from '@/components/sections/page-parts'
import { cn } from '@/lib/utils'
import { PhotoBand } from '@/components/photos/photo-band'
import { StagePhoto } from '@/components/photos/stage-photo'
import { getPageImages } from '@/lib/page-images'
import { toPhoto } from '@/lib/photo'

export const metadata: Metadata = {
  title: 'Bildungswege | Stübi Hamburg',
  description: 'Vorschule, Grundschule, Mittelstufe, Oberstufe und Abschlüsse an der Stadtteilschule Stübenhofer Weg – von der Vorschule bis zum Abitur.',
}

const degrees = [
  { title: 'Erster allgemeinbildender Schulabschluss (ESA)', when: 'nach Klasse 9', accent: 'bg-golden' },
  { title: 'Mittlerer Schulabschluss (MSA)', when: 'nach Klasse 10', accent: 'bg-mint' },
  { title: 'Abitur', when: 'nach Klasse 13 in der Oberstufe', accent: 'bg-primary' },
]

// One section per Stufe; without a photo the coloured icon tile stands in.
function StageSection({
  id,
  name,
  years,
  icon: Icon,
  color,
  iconColor,
  registerHref,
  registerLabel,
  tone,
  photo,
  children,
}: {
  id: string
  name: string
  years: string
  icon: LucideIcon
  color: string
  iconColor: string
  registerHref: string
  registerLabel: string
  tone: 'light' | 'sand'
  photo?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <section
      id={id}
      data-tone={tone}
      className={cn('scroll-mt-20 md:scroll-mt-24 py-14 sm:py-20', tone === 'sand' ? 'bg-surface-sand' : 'bg-surface')}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-8 lg:grid-cols-2 lg:items-center">
        {photo ?? (
          <div className="rounded-3xl bg-surface-ink p-8 flex items-center gap-5">
            <div className={`w-16 h-16 rounded-2xl ${color} flex items-center justify-center shrink-0`}>
              <Icon className={`h-7 w-7 ${iconColor}`} />
            </div>
            <div>
              <p className="text-white text-2xl font-bold">{name}</p>
              <p className="text-white/60 mt-1">{years}</p>
            </div>
          </div>
        )}
        <div>
          <p className="text-accent font-semibold mb-2">{years}</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground leading-tight mb-4">{name}</h2>
          <div className="text-base sm:text-lg text-muted-foreground leading-relaxed text-pretty space-y-4 mb-8">{children}</div>
          <NextLink href={registerHref}>{registerLabel}</NextLink>
        </div>
      </div>
    </section>
  )
}

// Photo slots come from the CMS; refresh at most a minute after an editor changes them.
export const revalidate = 60

export default async function BildungswegePage() {
  const { bildungswege: img } = await getPageImages()
  const stagePhoto = (media: Parameters<typeof toPhoto>[0]) => {
    const photo = toPhoto(media)
    return photo ? <StagePhoto photo={photo} /> : undefined
  }

  return (
    <>
      <PageIntro
        eyebrow="Bildungswege"
        title="Gemeinsam von der Vorschule bis zum Abitur."
        lead="An der Stübi können Kinder ihre ganze Schulzeit an einem Ort verbringen: von der Vorschule über Grund- und Mittelstufe bis zur Oberstufe. Mit unserem Konzept eine Klasse bleiben sie dabei weitestgehend im selben Klassenverband – das gibt Sicherheit und Zugehörigkeit."
      />

      <StageSection
        id="vorschule"
        photo={stagePhoto(img?.vorschule)}
        name="Vorschule"
        years="ab 5 Jahren"
        icon={Baby}
        color="bg-golden"
        iconColor="text-on-bright"
        registerHref="/anmeldung#primarstufe"
        registerLabel="Primarstufe anmelden"
        tone="light"
      >
        <Placeholder>Was die Vorschule an der Stübi besonders macht (2–3 Sätze).</Placeholder>
      </StageSection>

      <StageSection
        id="grundschule"
        photo={stagePhoto(img?.grundschule)}
        name="Grundschule"
        years="Klasse 1–4"
        icon={School}
        color="bg-mint"
        iconColor="text-on-bright"
        registerHref="/anmeldung#primarstufe"
        registerLabel="Primarstufe anmelden"
        tone="sand"
      >
        <Placeholder>Was die Grundschule an der Stübi besonders macht (2–3 Sätze).</Placeholder>
      </StageSection>

      <StageSection
        id="mittelstufe"
        photo={stagePhoto(img?.mittelstufe)}
        name="Mittelstufe"
        years="Klasse 5–10"
        icon={BookMarked}
        color="bg-accent"
        iconColor="text-white"
        registerHref="/anmeldung#mittelstufe"
        registerLabel="Mittelstufe anmelden"
        tone="light"
      >
        <Placeholder>Was die Mittelstufe an der Stübi besonders macht (2–3 Sätze).</Placeholder>
      </StageSection>

      <StageSection
        id="oberstufe"
        photo={stagePhoto(img?.oberstufe)}
        name="Oberstufe"
        years="Klasse 11–13"
        icon={GraduationCap}
        color="bg-primary"
        iconColor="text-white"
        registerHref="/anmeldung#oberstufe"
        registerLabel="Oberstufe anmelden"
        tone="sand"
      >
        <p>
          Die gymnasiale Oberstufe führt sicher zum Abitur – nach 12 Jahren im Gymnasialzweig oder nach 13 Jahren im
          Stadtteilschulzweig.
        </p>
      </StageSection>

      <PhotoBand photo={toPhoto(img?.band?.image)} caption={img?.band?.caption} />

      <PageSection id="abschluesse" eyebrow="Abschlüsse" title="Alle Abschlüsse an einer Schule.">
        <div className="grid sm:grid-cols-3 gap-5 mb-8">
          {degrees.map((d) => (
            <InfoCard key={d.title} title={d.title} accent={d.accent}>
              <p>{d.when}</p>
            </InfoCard>
          ))}
        </div>
        <Placeholder>Profile der Oberstufe und Voraussetzungen für den Übergang.</Placeholder>
        <div className="mt-10">
          <NextLink href="/schwerpunkt">Weiter zu unseren Schwerpunkten</NextLink>
        </div>
      </PageSection>
    </>
  )
}
