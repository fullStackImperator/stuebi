import type { LucideIcon } from 'lucide-react'
import { Languages, Mail, MessageCircle, Phone, Sprout } from 'lucide-react'
import { StagePhoto } from '@/components/photos/stage-photo'
import type { Block } from '@/content/stufen'
import type { Photo } from '@/lib/photo'
import { cn } from '@/lib/utils'

// One icon per offer, in the order of supportBlock.points.
const icons: LucideIcon[] = [Languages, Sprout, MessageCircle]

/** „Förderung & Beratung“: photo beside the three offers, then the Beratungsdienst contact. */
export function SupportBody({ block, photo, iconTile }: { block: Block; photo: Photo; iconTile: string }) {
  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
      <div data-support-photo>
        <StagePhoto photo={photo} />
      </div>

      <div>
        <ul className="flex flex-col gap-7">
          {block.points?.map((p, i) => {
            const Icon = icons[i % icons.length]
            return (
              <li key={p.title} className="flex gap-4">
                <span className={cn('flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl', iconTile)}>
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-lg font-bold leading-tight text-foreground">{p.title}</h3>
                  <p className="mt-1 leading-relaxed text-foreground/80">{p.text}</p>
                </div>
              </li>
            )
          })}
        </ul>

        {(block.paragraphs || block.links) && (
          <div className="mt-8 border-t border-border pt-6">
            {block.paragraphs?.map((text) => (
              <p key={text} className="leading-relaxed text-foreground/80 text-pretty">
                {text}
              </p>
            ))}
            {block.links && (
              <p className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                {block.links.map((l) => {
                  const Icon = l.href.startsWith('tel:') ? Phone : Mail
                  return (
                    <a key={l.href} href={l.href} className="inline-flex items-center gap-2 break-all font-semibold text-primary underline-offset-4 hover:underline">
                      <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                      {l.label}
                    </a>
                  )
                })}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
