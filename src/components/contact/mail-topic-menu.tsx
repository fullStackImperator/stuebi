'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { mailTopics, schoolEmail, topicMailto } from '@/content/contacts'
import { cn } from '@/lib/utils'

/**
 * A mail button for the Schulbüro that first asks "Worum geht es?". Each topic opens the mail program
 * with the topic at the start of the subject, so the Schulbüro can forward the mail (Mail von Phoebe Lorenz).
 */
export function MailTopicMenu({
  children,
  to = schoolEmail,
  className,
  triggerClassName,
  align = 'left',
  side = 'bottom',
  chevron = true,
}: {
  children: React.ReactNode
  to?: string
  className?: string
  triggerClassName?: string
  align?: 'left' | 'right'
  side?: 'top' | 'bottom'
  chevron?: boolean
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const items = useRef<(HTMLAnchorElement | null)[]>([])
  const id = useId()

  useEffect(() => {
    if (!open) return
    items.current[0]?.focus()
    const close = (e: Event) => {
      if (e instanceof KeyboardEvent ? e.key === 'Escape' : !ref.current?.contains(e.target as Node)) {
        e.stopPropagation()
        setOpen(false)
      }
    }
    document.addEventListener('keydown', close, true)
    document.addEventListener('pointerdown', close)
    return () => {
      document.removeEventListener('keydown', close, true)
      document.removeEventListener('pointerdown', close)
    }
  }, [open])

  const move = (from: number, by: number) => items.current[(from + by + mailTopics.length) % mailTopics.length]?.focus()

  return (
    <div ref={ref} data-mail-topic-menu className={cn('relative', className)}>
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={`${id}-menu`}
        onClick={() => setOpen((v) => !v)}
        className={cn('cursor-pointer text-left', triggerClassName)}
      >
        {children}
        {chevron && <ChevronDown className={cn('h-4 w-4 shrink-0 transition-transform', open && 'rotate-180')} aria-hidden="true" />}
      </button>
      {open && (
        <div
          id={`${id}-menu`}
          role="menu"
          aria-label="Worum geht es?"
          className={cn(
            'absolute z-50 w-60 rounded-2xl border border-border bg-surface p-2 text-foreground shadow-xl',
            side === 'bottom' ? 'top-full mt-2' : 'bottom-full mb-2',
            align === 'left' ? 'left-0' : 'right-0',
          )}
        >
          <p className="px-3 pb-1.5 pt-1 text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">Worum geht es?</p>
          {mailTopics.map((topic, i) => (
            <a
              key={topic}
              ref={(el) => {
                items.current[i] = el
              }}
              role="menuitem"
              href={topicMailto(topic, to)}
              onClick={() => setOpen(false)}
              onKeyDown={(e) => {
                if (e.key === 'ArrowDown') move(i, 1)
                else if (e.key === 'ArrowUp') move(i, -1)
                else return
                e.preventDefault()
              }}
              className="block rounded-xl px-3 py-2 text-sm font-semibold hover:bg-muted focus-visible:bg-muted focus-visible:outline-none"
            >
              {topic}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
