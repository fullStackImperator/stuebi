import { BentoGrid } from '@/components/bento/bento-grid'
import { DatesSection, RegistrationSection } from '@/components/departments/department-sections'
import { StageContact } from '@/components/departments/stage-contact'
import { StagePhoto } from '@/components/photos/stage-photo'
import { InfoCard, NextLink, PageIntro, PageSection, Placeholder } from '@/components/sections/page-parts'
import { CourseGroups, People, PhotoBeside, Schedule } from '@/components/stufen/block-parts'
import { StepList } from '@/components/sections/step-list'
import { OberstufeOrganisation } from '@/components/stufen/oberstufe-organisation'
import { PhasePath } from '@/components/stufen/phase-path'
import { SupportBody } from '@/components/stufen/support-section'
import { stageHref, stages, type Block, type StageColor, type StageId } from '@/content/stufen'
import { careersBlock, requirementsPhoto, supportBlock, supportPhotos } from '@/content/stufen/shared'
import { bentoCells } from '@/lib/bento'
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

// Point tiles take the other site colours; navy text on golden/mint, white on the dark ones.
const golden = 'bg-golden text-on-bright'
const mint = 'bg-mint text-on-bright'
const ink = 'bg-surface-ink text-white dark:bg-white/15'
const navy = 'bg-primary text-primary-foreground'
const tileColors: Record<StageColor, string[]> = {
  golden: [mint, ink, navy],
  mint: [golden, ink, navy],
  accent: [golden, mint, ink],
  primary: [golden, mint, ink],
  'surface-ink': [golden, mint, navy],
}

// Connecting line of checklists, a lighter shade of the stage colour.
const railClass: Record<StageColor, string> = {
  golden: 'bg-golden/70',
  mint: 'bg-mint/60',
  accent: 'bg-accent/40',
  primary: 'bg-primary/40',
  'surface-ink': 'bg-surface-ink/30 dark:bg-white/30',
}

// Icon tiles in the stage's own colour (darker pink so white icons stay visible).
const iconTile: Record<StageColor, string> = {
  golden,
  mint,
  accent: 'bg-accent-strong text-white',
  primary: navy,
  'surface-ink': ink,
}

function BlockText({ block }: { block: Block }) {
  return (
    <>
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
    </>
  )
}

function BlockBody({ block, accent, color }: { block: Block; accent: string; color: StageColor }) {
  return (
    <>
      {block.schedule && <Schedule rows={block.schedule} />}
      {block.courses && <CourseGroups groups={block.courses} />}
      {block.points && (
        <div className="grid gap-5 sm:grid-cols-2">
          {block.points.map((p) => (
            <InfoCard key={p.title} title={p.title} accent={accent}>
              <p>{p.text}</p>
            </InfoCard>
          ))}
        </div>
      )}
      {block.photo ? (
        <PhotoBeside photo={block.photo}>
          <BlockText block={block} />
        </PhotoBeside>
      ) : (
        <BlockText block={block} />
      )}
      {block.people && <People people={block.people} officeClass={iconTile[color]} />}
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground leading-tight mb-8">Das erwartet Ihr Kind</h2>
          <BentoGrid
            cells={bentoCells({ title: photo, gallery: [], facts: [], points: stage.expect })}
            tileColors={tileColors[stage.color]}
            quoteColor={iconTile[stage.color]}
            eager
          />
        </div>
      </section>

      {blocks.map((block, i) => (
        <PageSection key={block.id} id={block.id} eyebrow={stage.name} title={block.heading} intro={block.intro} tone={tone(i)}>
          {block.id === supportBlock.id && stage.department ? (
            <SupportBody block={block} photo={supportPhotos[stage.department]} iconTile={iconTile[stage.color]} />
          ) : block.phases ? (
            <PhasePath phases={block.phases} />
          ) : stage.id === 'oberstufe' && block.id === 'alltag' ? (
            <OberstufeOrganisation block={block} iconTile={iconTile[stage.color]} />
          ) : block.id === 'voraussetzungen' && block.points ? (
            // Requirements that all have to be met: a checklist on a rail instead of cards.
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <StepList steps={block.points} marker="check" markerClass={iconTile[stage.color]} railClass={railClass[stage.color]} />
              <div data-requirements-photo>
                <StagePhoto photo={requirementsPhoto} className="aspect-[4/3]" />
              </div>
            </div>
          ) : (
            <BlockBody block={block} accent={accent} color={stage.color} />
          )}
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
          {stage.department && <StageContact slug={stage.department} contact={department.contact} color={stage.color} />}
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
