import { Mail, Phone } from 'lucide-react'
import { PortraitFigure } from '@/components/contact/portrait-card'
import { telHref } from '@/components/departments/department-sections'
import { didacticLead } from '@/content/contacts'
import { didaktikZitat, leitgedanke, prinzipien } from '@/content/vision'
import { cn } from '@/lib/utils'

/**
 * Our principles: the guiding idea as a large quote, the four principles as a numbered list with
 * colour tiles (the pillars' rows, but without photos), and the didactic lead with her sentence.
 */
export function Prinzipien() {
  return (
    <>
      <p data-leitgedanke className="mb-12 max-w-3xl font-quote text-3xl italic leading-snug text-foreground text-pretty sm:text-4xl">
        „{leitgedanke}“
      </p>

      <ol className="grid gap-x-12 border-t border-border md:grid-cols-2">
        {prinzipien.map((p) => (
          <li key={p.title} data-prinzip className="flex gap-5 border-b border-border py-8">
            <span className={cn('flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl', p.tile)}>
              <p.icon className="h-7 w-7" aria-hidden="true" />
            </span>
            <div>
              <h3 className="text-2xl font-extrabold leading-tight text-foreground sm:text-3xl">{p.title}</h3>
              <p className="mt-3 text-lg leading-relaxed text-muted-foreground text-pretty">{p.text}</p>
            </div>
          </li>
        ))}
      </ol>

      {/* The didactic lead with her sentence, on the navy band. */}
      <figure
        data-didaktik
        className="mt-16 grid items-center gap-8 rounded-3xl bg-primary p-6 text-primary-foreground sm:grid-cols-[14rem_1fr] sm:p-10 lg:grid-cols-[16rem_1fr] lg:gap-14"
      >
        <PortraitFigure
          name={didacticLead.name}
          topic="Didaktische Leitung"
          image={didacticLead.image}
          badgeClass="bg-golden text-on-bright"
          sizes="(min-width: 640px) 256px, 100vw"
          className="w-full max-w-xs"
        />
        <div>
          <blockquote className="font-quote text-3xl italic leading-snug text-pretty sm:text-4xl">„{didaktikZitat}“</blockquote>
          <figcaption className="mt-6 max-w-xl text-base leading-relaxed text-primary-foreground/80 text-pretty">
            {didacticLead.name} ist unsere Didaktische Leitung und Ansprechpartnerin für Fragen zu Unterricht und Lernkonzepten.
          </figcaption>
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
            <a href={telHref(didacticLead.phone)} className="inline-flex items-center gap-2 tabular-nums hover:underline">
              <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
              {didacticLead.phone}
            </a>
            <a href={`mailto:${didacticLead.email}`} className="inline-flex items-start gap-2 hover:underline">
              <Mail className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              <span>
                {didacticLead.email.split('@')[0]}@<wbr />
                {didacticLead.email.split('@')[1]}
              </span>
            </a>
          </div>
        </div>
      </figure>
    </>
  )
}
