import type { Metadata } from 'next'
import Link from 'next/link'
import { GraduationCap, Globe, Microscope, Music, Palette } from 'lucide-react'
import { InfoCard, NextLink, PageIntro, PageSection } from '@/components/sections/page-parts'
import { StagePhoto } from '@/components/photos/stage-photo'
import { SchwerpunktFeature } from '@/components/schwerpunkt/schwerpunkt-feature'
import { schwerpunktOrder, schwerpunkte } from '@/content/schwerpunkte'
import { getPageImages } from '@/lib/page-images'
import { toPhoto, toPhotos, type Photo } from '@/lib/photo'
import { schwerpunktFallbacks } from '@/lib/fallback-photos'

export const metadata: Metadata = {
  title: 'Schwerpunkt | Stübi Hamburg',
  description: 'Sportteams, Stübi-Makerspace, Projekt Abgekocht! und individuelle Förderung – das macht die Stübi besonders.',
}

const extras = [
  { icon: Palette, label: 'Kunst & Theater' },
  { icon: Music, label: 'Musik & Chor' },
  { icon: Globe, label: 'Fremdsprachen' },
  { icon: GraduationCap, label: 'Schülerfirmen' },
  { icon: Microscope, label: 'Forschen & Staunen' },
]

// No CMS slot for this section; a brochure photo of the Lernbüro.
const foerderungPhoto: Photo = {
  src: '/images/fotos/lernbuero.jpg',
  alt: 'Schülerinnen arbeiten mit einer Lehrerin im Lernbüro am Laptop',
  width: 1052,
  height: 429,
  objectPosition: '45% 50%',
}

// Photo slots come from the CMS; refresh at most a minute after an editor changes them.
export const revalidate = 60

export default async function SchwerpunktPage() {
  const { schwerpunkt: img } = await getPageImages()

  return (
    <>
      <PageIntro
        eyebrow="Schwerpunkt"
        color="mint"
        title="Das macht die Stübi besonders."
        lead="Wir lernen beim Machen: mit Sportteams, im Makerspace, in der Schulküche und mit viel Zeit für jedes einzelne Kind."
      />

      {schwerpunktOrder.map((id, i) => (
        <SchwerpunktFeature
          key={id}
          item={schwerpunkte[id]}
          index={i}
          title={toPhoto(img?.[id]) ?? schwerpunktFallbacks[id]}
          gallery={toPhotos(img?.[`${id}Galerie`])}
        />
      ))}

      <PageSection
        id="foerderung"
        eyebrow="Für jedes Kind"
        title="Individuelle Förderung."
        intro="Feste Lesezeiten und Lernzeiten statt klassischer Hausaufgaben – begleitet von Profis."
      >
        <StagePhoto photo={foerderungPhoto} className="max-w-3xl" />
      </PageSection>

      <PageSection id="mehr" eyebrow="Und außerdem" title="Noch mehr zu entdecken." tone="sand">
        <div className="flex flex-wrap gap-3 mb-8">
          {extras.map((e) => (
            <span key={e.label} className="inline-flex items-center gap-2 rounded-full bg-surface px-4 py-2 text-sm font-medium shadow-sm">
              <e.icon className="h-4 w-4 text-accent" />
              {e.label}
            </span>
          ))}
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          <InfoCard title="Profil „Fair Play“ in der Oberstufe" accent="bg-accent">
            <p>Sport, Gesundheit & Management: Jugendliche planen echte Sportevents und verbinden Sportwissenschaft mit der Praxis.</p>
          </InfoCard>
          <InfoCard title="Profil „Mein Start-Up“ in der Oberstufe" accent="bg-mint">
            <p>Wirtschaft, Innovation & Management: Jugendliche entwickeln eigene Produkte und schreiben Businesspläne.</p>
          </InfoCard>
        </div>
        <p className="mt-5 text-sm">
          <Link href="/oberstufe#erwartet" className="font-semibold text-primary underline-offset-4 hover:underline">
            Mehr zu den Profilen der Studienstufe
          </Link>
        </p>
        <div className="mt-10">
          <NextLink href="/ganztag">Weiter zum Ganztag</NextLink>
        </div>
      </PageSection>
    </>
  )
}
