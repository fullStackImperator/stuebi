import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, BookOpen, Clock, GraduationCap, Languages, Music, Palette, Users } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { NextLink, PageIntro, PageSection } from '@/components/sections/page-parts'
import { StagePhoto } from '@/components/photos/stage-photo'
import { ProfileTiles } from '@/components/stufen/profile-tiles'
import { SchwerpunktFeature } from '@/components/schwerpunkt/schwerpunkt-feature'
import { Fremdsprachen, Mintprax, Projektlernen } from '@/components/schwerpunkt/weitere-schwerpunkte'
import { schwerpunktOrder, schwerpunkte } from '@/content/schwerpunkte'
import { getPageImages } from '@/lib/page-images'
import { toPhoto, toPhotos, type Photo } from '@/lib/photo'
import { schwerpunktFallbacks, schwerpunktGalleryFallbacks } from '@/lib/fallback-photos'

export const metadata: Metadata = {
  title: 'Schwerpunkt | Stübi Hamburg',
  description: 'Sportbetonte Schule, Stübi-Makerspace, Projekt Abgekocht! und individuelle Förderung – das macht die Stübi besonders.',
}

// What else there is, each with the page that tells more.
const extras = [
  { icon: Palette, label: 'Kunst & Theater', text: 'Im Kursangebot des Ganztags, von Comic bis Graffiti', href: '/ganztag#kurse' },
  { icon: Music, label: 'Musik & Chor', text: 'Songwriting und Beats im Kursangebot des Ganztags', href: '/ganztag#kurse' },
  { icon: GraduationCap, label: 'Schülerfirmen', text: 'Sechs Schülerfirmen von Barista bis SUO Design', href: '/mittelstufe#berufsorientierung' },
]

// Individuelle Förderung, from the stage pages (Grundschule, Ganztag, Förderung & Beratung).
const foerderung: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: BookOpen, title: 'Feste Lesezeiten', text: 'Tägliche Lesezeiten („Lesen macht schlau“) wecken die Lust auf Bücher – begleitet von der Schulbibliothek.' },
  { icon: Clock, title: 'Lernzeiten statt Hausaufgaben', text: 'Geübt wird in der Schule, begleitet von Fachlehrkräften – zu Hause bleibt Zeit für Familie und Freizeit.' },
  { icon: Languages, title: 'Sprachförderung', text: 'Gezielte Unterstützung beim Deutschlernen – von der Vorschule bis zum Abschluss.' },
  { icon: Users, title: 'Begleitet von Profis', text: 'Lehrkräfte, Sozialpädagoginnen und -pädagogen sowie Erzieherinnen und Erzieher begleiten jedes Kind gemeinsam.' },
]

// Each stage page has its own section „Förderung & Beratung“ with the contacts.
const stageLinks = [
  { label: 'Vorschule', href: '/vorschule#foerderung' },
  { label: 'Grundschule', href: '/grundschule#foerderung' },
  { label: 'Mittelstufe', href: '/mittelstufe#foerderung' },
  { label: 'Oberstufe', href: '/oberstufe#foerderung' },
]

// Icon colours for the extras, in turn.
const extraTone = ['bg-accent-strong text-white', 'bg-mint text-on-bright', 'bg-golden text-on-bright', 'bg-primary text-primary-foreground', 'bg-surface-ink text-white dark:bg-white/15']

// No CMS slot for this section; a brochure photo of the Lernbüro.
const foerderungPhoto: Photo = {
  src: '/images/fotos/lernbuero.jpg',
  alt: 'Schülerinnen arbeiten mit einer Lehrerin im Lernbüro am Laptop',
  width: 1052,
  height: 429,
  objectPosition: '45% 50%',
}

// An empty CMS gallery shows brochure photos, like the title photo does.
const galleryOrFallback = (photos: Photo[], fallback: Photo[]) => (photos.length > 0 ? photos : fallback)

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
        lead="Wir lernen beim Machen: als sportbetonte Schule, im Makerspace, in der Schulküche und mit viel Zeit für jedes einzelne Kind."
      />

      {schwerpunktOrder.map((id, i) => (
        <SchwerpunktFeature
          key={id}
          item={schwerpunkte[id]}
          index={i}
          title={toPhoto(img?.[id]) ?? schwerpunktFallbacks[id]}
          gallery={galleryOrFallback(toPhotos(img?.[`${id}Galerie`]), schwerpunktGalleryFallbacks[id])}
        />
      ))}

      {/* The three smaller Schwerpunkte from the old menu, compact. */}
      <Mintprax />
      <Fremdsprachen />
      <Projektlernen />

      <PageSection
        id="foerderung"
        eyebrow="Für jedes Kind"
        title="Individuelle Förderung."
        intro="Jedes Kind lernt anders. Deshalb gibt es feste Zeiten zum Lesen und Üben – und Menschen, die genau hinschauen."
        tone="sand"
      >
        <div className="grid gap-10 lg:grid-cols-[1fr_24rem] lg:items-start lg:gap-14">
          <ul className="grid gap-x-8 gap-y-8 sm:grid-cols-2">
            {foerderung.map((f) => (
              <li key={f.title} data-foerder-point className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-mint text-on-bright">
                  <f.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-lg font-bold leading-tight text-foreground">{f.title}</h3>
                  <p className="mt-1 leading-relaxed text-muted-foreground text-pretty">{f.text}</p>
                </div>
              </li>
            ))}
          </ul>
          <StagePhoto photo={foerderungPhoto} />
        </div>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <span className="font-semibold text-foreground">Förderung &amp; Beratung auf den Seiten der Stufen:</span>
          {stageLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="inline-flex items-center gap-1.5 rounded-full bg-surface-sand px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-mint/30"
            >
              {l.label}
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          ))}
        </div>
      </PageSection>

      <PageSection id="mehr" eyebrow="Und außerdem" title="Noch mehr zu entdecken.">
        <ul className="mb-12 grid gap-3 sm:grid-cols-3">
          {extras.map((e, i) => (
            <li key={e.label} data-extra>
              <Link
                href={e.href}
                className="group flex h-full items-start gap-4 rounded-2xl bg-surface-sand p-5 shadow-sm transition-shadow hover:shadow-md"
              >
                <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${extraTone[i % extraTone.length]}`}>
                  <e.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="flex-1">
                  <span className="block font-bold leading-tight text-foreground">{e.label}</span>
                  <span className="mt-1 block text-sm leading-snug text-muted-foreground text-pretty">{e.text}</span>
                </span>
                <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-primary transition-transform group-hover:translate-x-0.5 dark:text-foreground" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
        <h3 className="mb-5 text-2xl font-extrabold text-foreground">Die Profile der Studienstufe</h3>
        <ProfileTiles />
        <Link
          href="/oberstufe#alltag"
          className="group mt-5 flex items-center justify-between gap-4 rounded-2xl bg-surface px-6 py-5 font-semibold text-foreground transition-shadow hover:shadow-md"
        >
          <span>Mehr zu den Profilen in der Oberstufe</span>
          <ArrowRight className="h-5 w-5 shrink-0 text-primary transition-transform group-hover:translate-x-1 dark:text-foreground" aria-hidden="true" />
        </Link>
        <div className="mt-10">
          <NextLink href="/ganztag">Weiter zum Ganztag</NextLink>
        </div>
      </PageSection>
    </>
  )
}
