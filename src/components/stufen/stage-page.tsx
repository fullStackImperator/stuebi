import { BentoGrid } from '@/components/bento/bento-grid'
import { DatesSection, RegistrationSection } from '@/components/departments/department-sections'
import { StageContact } from '@/components/departments/stage-contact'
import { StagePhoto } from '@/components/photos/stage-photo'
import { InfoCard, NextLink, PageIntro, PageSection, Placeholder, type Motif } from '@/components/sections/page-parts'
import { CourseGroups, People, PhotoBeside, Schedule } from '@/components/stufen/block-parts'
import { CareersBody } from '@/components/stufen/careers-section'
import { YearPlan } from '@/components/stufen/year-plan'
import { jahresplanMittelstufe } from '@/content/jahresplan-mittelstufe'
import { StepList } from '@/components/sections/step-list'
import { OberstufeOrganisation } from '@/components/stufen/oberstufe-organisation'
import { HighlightTiles } from '@/components/stufen/highlight-tiles'
import { PhasePath } from '@/components/stufen/phase-path'
import { RouteStrip } from '@/components/stufen/route-strip'
import { SupportBody } from '@/components/stufen/support-section'
import { Zweige } from '@/components/stufen/zweige'
import { stageHref, stages, type Block, type StageColor, type StageId } from '@/content/stufen'
import { ArrowRight, ExternalLink } from 'lucide-react'
import { careersBlock, requirementsPhoto, supportBlock, supportPhotos } from '@/content/stufen/shared'
import { anmeldungSchritte } from '@/content/stufen/anmeldung'
import { bentoCells } from '@/lib/bento'
import { loadDepartment } from '@/lib/departments'
import { profileFlyers } from '@/lib/profile-flyers'
import { upcomingDates } from '@/lib/next-dates'
import { getPageImages } from '@/lib/page-images'
import { toPhoto } from '@/lib/photo'
import { cn } from '@/lib/utils'

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

// Marker tints, as soft as the active days in the course week strip.
const markClass: Record<NonNullable<Block['highlights']>[number]['color'], string> = {
  mint: 'bg-mint/35',
  accent: 'bg-accent/20',
  golden: 'bg-golden/40',
}

/** Wraps the block's highlight phrases in a paragraph in <mark>. */
function withHighlights(text: string, highlights: Block['highlights']) {
  if (!highlights?.length) return text
  const escape = (t: string) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const parts = text.split(new RegExp(`(${highlights.map((h) => escape(h.text)).join('|')})`))
  return parts.map((part, i) => {
    const h = highlights.find((x) => x.text === part)
    return h ? (
      <mark key={i} className={cn('rounded-md px-1 py-0.5 font-semibold text-foreground [box-decoration-break:clone]', markClass[h.color])}>
        {part}
      </mark>
    ) : (
      part
    )
  })
}

// Header motif per stage.
const motif: Record<StageId, Motif> = {
  vorschule: 'drachen',
  grundschule: 'ranzen',
  mittelstufe: 'idee',
  oberstufe: 'abitur',
  ganztag: 'tag',
}

function BlockText({ block }: { block: Block }) {
  // Next to a photo the text is larger, so it fills its half instead of sitting small beside the picture.
  const size = block.photo ? 'text-lg' : 'text-base'
  return (
    <>
      {block.paragraphs?.map((text) => (
        <p key={text} className={cn('mt-6 max-w-3xl leading-relaxed text-muted-foreground text-pretty', size)}>
          {withHighlights(text, block.highlights)}
        </p>
      ))}
      {block.links && (
        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-3">
          {block.links.map((l) => {
            const external = /^https?:/.test(l.href)
            return (
              <a
                key={l.href}
                href={l.href}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className={cn(
                  l.style
                    ? 'inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors'
                    : 'font-semibold text-primary underline-offset-4 hover:underline',
                  l.style === 'button' && 'bg-primary text-primary-foreground hover:bg-primary/90',
                  l.style === 'outline' && 'text-primary ring-2 ring-inset ring-primary/30 hover:bg-primary/5',
                )}
              >
                {l.label}
                {l.style && (external ? <ExternalLink className="h-4 w-4" aria-hidden="true" /> : <ArrowRight className="h-4 w-4" aria-hidden="true" />)}
              </a>
            )
          })}
        </div>
      )}
    </>
  )
}

function BlockBody({ block, accent, color }: { block: Block; accent: string; color: StageColor }) {
  return (
    <>
      {block.schedule &&
        (block.photo ? (
          // Timeline with the photo beside it; the photo stays in view while the day scrolls by.
          <div className="grid gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
            <Schedule rows={block.schedule} />
            <div data-schedule-photo className="lg:sticky lg:top-28 lg:self-start">
              <StagePhoto photo={block.photo} className="aspect-[4/5]" />
            </div>
          </div>
        ) : (
          <Schedule rows={block.schedule} />
        ))}
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
      {block.photo && !block.schedule ? (
        <PhotoBeside photo={block.photo}>
          <BlockText block={block} />
        </PhotoBeside>
      ) : (
        <BlockText block={block} />
      )}
      {block.gallery && (
        // More photos of the place as a row below the text.
        <div data-block-gallery className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
          {block.gallery.map((p, i) => (
            <StagePhoto key={p.src} photo={p} className={i === 2 ? 'col-span-2 aspect-[4/3] sm:col-span-1' : 'aspect-[4/3]'} />
          ))}
        </div>
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
      <PageIntro eyebrow={stage.grades} title={`${stage.name}.`} lead={stage.lead} color={stage.color} motif={motif[stage.id]} />

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
          {block.route && (
            <RouteStrip
              stations={block.route}
              currentClass={iconTile[stage.color]}
              nextClass={next ? iconTile[next.color] : 'bg-background text-foreground'}
            />
          )}
          {block.id === supportBlock.id && stage.department ? (
            <SupportBody block={block} photo={supportPhotos[stage.department]} iconTile={iconTile[stage.color]} />
          ) : block.id === 'zweige' ? (
            <Zweige block={block} />
          ) : stage.id === 'mittelstufe' && block.id === 'jahresplan' ? (
            <YearPlan grades={jahresplanMittelstufe.grades} label={`Jahresplan ${jahresplanMittelstufe.schoolYear} nach Jahrgang`} />
          ) : block.id === careersBlock.id ? (
            <CareersBody block={block} accent={accent} />
          ) : block.phases ? (
            <PhasePath phases={block.phases} />
          ) : block.points?.some((p) => p.figure || p.tags || p.questions) ? (
            <HighlightTiles points={block.points} />
          ) : stage.id === 'oberstufe' && block.id === 'alltag' ? (
            <OberstufeOrganisation iconTile={iconTile[stage.color]} flyers={profileFlyers(department)} />
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
              <RegistrationSection registration={department.registration} steps={anmeldungSchritte[stage.id]} />
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
