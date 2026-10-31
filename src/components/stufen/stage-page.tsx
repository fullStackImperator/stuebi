import { ContactBlock, DatesSection, RegistrationSection } from '@/components/departments/department-sections'
import { StagePhoto } from '@/components/photos/stage-photo'
import { InfoCard, NextLink, PageIntro, PageSection, Placeholder, PointList } from '@/components/sections/page-parts'
import { stageHref, stages, type Block, type StageColor, type StageId } from '@/content/stufen'
import { careersBlock, supportBlock } from '@/content/stufen/shared'
import { loadDepartment } from '@/lib/departments'
import { upcomingDates } from '@/lib/next-dates'
import { getPageImages } from '@/lib/page-images'
import { toPhoto } from '@/lib/photo'

// Literal class names so Tailwind picks them up.
const accentClass: Record<StageColor, string> = {
  golden: 'bg-golden',
  mint: 'bg-mint',
  accent: 'bg-accent',
  primary: 'bg-primary',
  'surface-ink': 'bg-surface-ink dark:bg-white/40',
}

function BlockBody({ block, accent }: { block: Block; accent: string }) {
  return (
    <>
      {block.points && (
        <div className="grid gap-5 sm:grid-cols-2">
          {block.points.map((p) => (
            <InfoCard key={p.title} title={p.title} accent={accent}>
              <p>{p.text}</p>
            </InfoCard>
          ))}
        </div>
      )}
      {block.paragraphs?.map((text) => (
        <p key={text} className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground text-pretty">
          {text}
        </p>
      ))}
      {block.links && (
        <p className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
          {block.links.map((l) => (
            <a key={l.href} href={l.href} className="font-semibold text-primary underline-offset-4 hover:underline">
              {l.label}
            </a>
          ))}
        </p>
      )}
      {block.placeholder && (
        <div className="mt-6">
          <Placeholder>{block.placeholder}</Placeholder>
        </div>
      )}
    </>
  )
}

// Eine Bildungsstufe (oder der Ganztag) als eigene Seite, gebaut aus den Inhalten in src/content/stufen.
export async function StagePage({ id }: { id: StageId }) {
  const stage = stages[id]
  const [images, department] = await Promise.all([
    getPageImages(),
    stage.department ? loadDepartment(stage.department) : Promise.resolve(null),
  ])
  const cmsPhoto = stage.photoSlot ? toPhoto(images.bildungswege?.[stage.photoSlot]) : null
  const photo = cmsPhoto ?? stage.photo
  const accent = accentClass[stage.color]
  const next = stage.next ? stages[stage.next] : null

  const blocks: Block[] = [
    ...stage.everyday,
    ...(stage.support ? [supportBlock] : []),
    ...(stage.careers ? [careersBlock] : []),
    ...(stage.extra ?? []),
  ]
  // Sections alternate light and sand, starting with sand after the light „erwartet“ section.
  const tone = (i: number) => (i % 2 === 0 ? 'sand' : 'light') as 'sand' | 'light'

  return (
    <>
      <PageIntro eyebrow={stage.grades} title={`${stage.name}.`} lead={stage.lead} color={stage.color} />

      <section id="erwartet" className="scroll-mt-20 md:scroll-mt-24 bg-surface py-16 sm:py-20" data-tone="light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-10 lg:grid-cols-2 lg:items-start">
          <StagePhoto photo={photo} />
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground leading-tight mb-6">Das erwartet Ihr Kind</h2>
            <div className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              <PointList items={stage.expect} />
            </div>
          </div>
        </div>
      </section>

      {blocks.map((block, i) => (
        <PageSection key={block.id} id={block.id} eyebrow={stage.name} title={block.heading} intro={block.intro} tone={tone(i)}>
          <BlockBody block={block} accent={accent} />
        </PageSection>
      ))}

      {department && (
        <PageSection
          id="anmeldung-stufe"
          eyebrow="Anmeldung & Kontakt"
          title={`Anmeldung ${department.title}`}
          intro={department.grades ?? undefined}
          tone={tone(blocks.length)}
        >
          <div className="grid gap-6 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <RegistrationSection registration={department.registration} />
            </div>
            <div className="lg:col-span-2">
              <DatesSection items={upcomingDates(department.dates?.items)} />
            </div>
          </div>
          <div className="mt-6">
            <ContactBlock contact={department.contact} />
          </div>
        </PageSection>
      )}

      {next && (
        <PageSection id="weiter" eyebrow="Der nächste Schritt" title={next.name} intro={next.teaser} tone={tone(blocks.length + (department ? 1 : 0))}>
          <NextLink href={stageHref(next.id)}>Weiter zur Seite {next.name}</NextLink>
        </PageSection>
      )}
    </>
  )
}
