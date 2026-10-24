'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { CalendarDays, ClipboardList, Newspaper, Phone } from 'lucide-react'

const offices = [
  { label: 'Schulbüro', number: '040 / 428 76 19 – 10', href: 'tel:+4940428761910' },
  { label: 'Schulbüro Primarstufe', number: '040 / 428 96 66 – 0', href: 'tel:+494042896660' },
]

const action = 'flex min-h-14 flex-1 flex-col items-center justify-center gap-1 text-xs font-semibold text-foreground'

// Quick actions for phones: call, register, dates, news. Hidden from lg up and while the menu is
// open (header sets body[data-menu-open], see globals.css).
export function MobileActionBar() {
  const [callOpen, setCallOpen] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!callOpen) return
    const close = (e: Event) => {
      if (e instanceof KeyboardEvent ? e.key === 'Escape' : !ref.current?.contains(e.target as Node)) setCallOpen(false)
    }
    document.addEventListener('keydown', close)
    document.addEventListener('pointerdown', close)
    return () => {
      document.removeEventListener('keydown', close)
      document.removeEventListener('pointerdown', close)
    }
  }, [callOpen])

  return (
    <nav
      ref={ref}
      aria-label="Schnellzugriff"
      data-action-bar
      className="lg:hidden fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface/95 backdrop-blur pb-[env(safe-area-inset-bottom)]"
    >
      <div className="flex h-[4.5rem] items-stretch">
        <button
          type="button"
          className={action}
          aria-expanded={callOpen}
          aria-controls={callOpen ? 'anrufen-panel' : undefined}
          onClick={() => setCallOpen((open) => !open)}
        >
          <Phone className="h-5 w-5 text-accent" />
          Anrufen
        </button>
        {/* Right after its button in the DOM, so Tab goes from Anrufen into the numbers. */}
        {callOpen && (
          <ul id="anrufen-panel" className="absolute inset-x-3 bottom-full mb-2 overflow-hidden rounded-2xl border border-border bg-surface shadow-lg">
            {offices.map((o) => (
              <li key={o.href} className="border-b border-border last:border-0">
                <a href={o.href} className="flex min-h-14 flex-col justify-center px-5 py-3 hover:bg-muted">
                  <span className="font-semibold text-foreground">{o.label}</span>
                  <span className="text-sm text-muted-foreground">{o.number}</span>
                </a>
              </li>
            ))}
          </ul>
        )}
        <Link href="/anmeldung#ablauf" className={action}>
          <ClipboardList className="h-5 w-5 text-primary" />
          Anmeldung
        </Link>
        <Link href="/termine" className={action}>
          <CalendarDays className="h-5 w-5 text-primary" />
          Termine
        </Link>
        <Link href="/news" className={action}>
          <Newspaper className="h-5 w-5 text-primary" />
          News
        </Link>
      </div>
    </nav>
  )
}
