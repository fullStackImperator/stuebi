'use client'

import { useId, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

/**
 * Accessible tabs (WAI-ARIA tabs pattern): arrow keys move between tabs. Every panel is rendered on the
 * server; inactive ones are only hidden, so their content stays in the page for search engines.
 */
export function Tabs({ tabs, label }: { tabs: { label: string; content: React.ReactNode }[]; label: string }) {
  const [active, setActive] = useState(0)
  const id = useId()
  const refs = useRef<(HTMLButtonElement | null)[]>([])

  const select = (i: number) => {
    const next = (i + tabs.length) % tabs.length
    setActive(next)
    refs.current[next]?.focus()
  }

  return (
    <div>
      <div role="tablist" aria-label={label} className="mb-8 inline-flex flex-wrap gap-2 rounded-full bg-surface-sand p-1.5 in-data-[tone=sand]:bg-surface">
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            ref={(el) => {
              refs.current[i] = el
            }}
            type="button"
            role="tab"
            id={`${id}-tab-${i}`}
            aria-selected={i === active}
            aria-controls={`${id}-panel-${i}`}
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={(e) => {
              if (e.key === 'ArrowRight') select(i + 1)
              else if (e.key === 'ArrowLeft') select(i - 1)
              else if (e.key === 'Home') select(0)
              else if (e.key === 'End') select(tabs.length - 1)
              else return
              e.preventDefault()
            }}
            className={cn(
              'rounded-full px-5 py-2.5 text-sm font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
              i === active ? 'bg-primary text-primary-foreground shadow-sm' : 'text-foreground/70 hover:text-foreground',
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {tabs.map((tab, i) => (
        <div key={tab.label} role="tabpanel" id={`${id}-panel-${i}`} aria-labelledby={`${id}-tab-${i}`} hidden={i !== active} tabIndex={0}>
          {tab.content}
        </div>
      ))}
    </div>
  )
}
