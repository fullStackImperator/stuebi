import { People, StudentCompanies, Tracks } from '@/components/stufen/block-parts'
import { PhasePath } from '@/components/stufen/phase-path'
import type { Block } from '@/content/stufen'

function SubHeading({ children }: { children: React.ReactNode }) {
  return <h3 className="mb-6 text-2xl font-extrabold text-foreground sm:text-3xl">{children}</h3>
}

/** Berufsorientierung: Weg durch Klasse 8–10, die besonderen Klassen, Schülerfirmen und Ansprechpersonen. */
export function CareersBody({ block, accent }: { block: Block; accent: string }) {
  return (
    <div className="space-y-16 sm:space-y-20">
      {block.phases && <PhasePath phases={block.phases} />}
      {block.tracks && <Tracks tracks={block.tracks} accent={accent} />}
      {block.companies && (
        <div>
          <SubHeading>Unsere Schülerfirmen</SubHeading>
          <StudentCompanies companies={block.companies} />
        </div>
      )}
      {block.people && (
        <div>
          <SubHeading>Ansprechpersonen</SubHeading>
          <People people={block.people} />
        </div>
      )}
    </div>
  )
}
