import Image from 'next/image'
import { pillars } from '@/components/landingpage/vision-section'
import { beispiele } from '@/components/vision/saeulen-beispiele'
import { cn } from '@/lib/utils'

// The bright pink only reaches 3.6:1 with white text, so the example box uses the darker pink.
const box = (tone: string) => tone.replace('bg-accent ', 'bg-accent-strong ')

/** The four pillars as alternating rows: a large photo on one side, the text and an example on the other. */
export function Saeulen() {
  return (
    <section id="vision" className="bg-surface-sand py-20 sm:py-24" data-tone="sand">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 max-w-3xl">
          <div className="mb-5 inline-flex items-center gap-3">
            <span className="h-px w-6 bg-accent" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Unsere Leitvision</span>
          </div>
          <h2 className="text-4xl font-extrabold leading-tight text-foreground sm:text-5xl">Wofür unser Campus steht.</h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground text-pretty">Vier Säulen tragen unser Leitbild.</p>
        </div>

        <ol className="space-y-14 lg:space-y-20">
          {pillars.map((p, i) => (
            <li key={p.title} data-saeule className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
              <div className={cn('relative aspect-[4/3] overflow-hidden rounded-3xl', i % 2 === 1 && 'lg:order-2')}>
                <Image src={p.image} alt={p.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" style={{ objectPosition: p.position }} />
              </div>
              <div>
                <span aria-hidden="true" className={cn('mb-5 block h-1.5 w-14 rounded-full', p.tone.split(' ')[0])} />
                <h3 className="text-3xl font-extrabold leading-tight text-foreground sm:text-4xl">{p.title}</h3>
                <p className="mt-4 text-lg leading-relaxed text-muted-foreground text-pretty">{p.description}</p>
                <p className={cn('mt-6 inline-block rounded-2xl px-5 py-4 text-base font-semibold leading-snug text-pretty', box(p.tone))}>
                  <span className="opacity-75">Zum Beispiel: </span>
                  {beispiele[i]}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
