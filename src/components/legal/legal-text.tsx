import { Mail } from 'lucide-react'
import type { LegalSection } from '@/content/rechtliches'

/** Legal text in one readable column: per section a heading, address lines, a mail link, paragraphs and a list. */
export function LegalText({ sections, updated }: { sections: LegalSection[]; updated: string }) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <div className="space-y-10">
        {sections.map((s) => (
          <section key={s.heading} data-legal-section>
            <h2 className="text-xl font-extrabold text-foreground sm:text-2xl">{s.heading}</h2>
            {s.lines && (
              <p className="mt-3 leading-relaxed text-foreground">
                {s.lines.map((line, i) => (
                  <span key={line} className={i === 0 && s.lines!.length > 2 ? 'block font-bold' : 'block'}>
                    {line}
                  </span>
                ))}
              </p>
            )}
            {s.email && (
              <a href={`mailto:${s.email}`} className="mt-2 inline-flex items-start gap-2 font-semibold text-primary hover:underline dark:text-foreground">
                <Mail className="mt-1 h-4 w-4 shrink-0" aria-hidden="true" />
                {/* Long addresses wrap after the @, never inside a word. */}
                <span>
                  {s.email.split('@')[0]}@<wbr />
                  {s.email.split('@')[1]}
                </span>
              </a>
            )}
            {s.paragraphs?.map((p) => (
              <p key={p} className="mt-3 leading-relaxed text-foreground/85 text-pretty">
                {p}
              </p>
            ))}
            {s.list && (
              <ul className="mt-3 list-disc space-y-1.5 pl-5 leading-relaxed text-foreground/85 marker:text-accent">
                {s.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>
      <p className="mt-14 text-sm text-muted-foreground">Stand: {updated}</p>
    </div>
  )
}
