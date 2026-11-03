'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Clock, Mail, MessageCircle, Phone, X } from 'lucide-react'
import { MailTopicMenu } from '@/components/contact/mail-topic-menu'
import { officeHours, schoolEmail, schoolOffices } from '@/content/contacts'
import { cn } from '@/lib/utils'

const offices = [schoolOffices.main, schoolOffices.primary]

/**
 * A contact button that stays at the bottom right while scrolling (Mail von Eike Hübenthal). It opens a
 * small card with both Schulbüros. Large screens only: phones and tablets have the action bar with „Anrufen“.
 */
export function FloatingContact() {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const close = (e: Event) => {
      if (e instanceof KeyboardEvent ? e.key === 'Escape' : !ref.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('keydown', close)
    document.addEventListener('pointerdown', close)
    return () => {
      document.removeEventListener('keydown', close)
      document.removeEventListener('pointerdown', close)
    }
  }, [open])

  return (
    <div ref={ref} data-floating-contact className="fixed bottom-6 right-6 z-40 hidden lg:block">
      {open && (
        <div
          id="kontakt-panel"
          data-floating-contact-panel
          className="absolute bottom-full right-0 mb-3 w-80 rounded-3xl border border-border bg-surface shadow-xl"
        >
          <ul className="divide-y divide-border [&>li:first-child>a]:rounded-t-3xl">
            {offices.map((o) => (
              <li key={o.tel}>
                <a href={o.tel} className="flex items-center gap-3 px-5 py-4 transition-colors hover:bg-muted">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-accent text-white">
                    <Phone className="h-5 w-5" aria-hidden />
                  </span>
                  <span>
                    <span className="block text-xs font-semibold text-muted-foreground">{o.label}</span>
                    <span className="block text-lg font-extrabold tabular-nums text-foreground">{o.phone}</span>
                  </span>
                </a>
              </li>
            ))}
            <li>
              <MailTopicMenu
                side="top"
                align="right"
                triggerClassName="flex w-full items-start gap-3 px-5 py-4 text-sm font-semibold text-primary transition-colors hover:bg-muted dark:text-foreground [&>svg:last-child]:mt-0.5"
              >
                <Mail className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                <span className="flex-1">
                  {schoolEmail.split('@')[0]}@<wbr />
                  {schoolEmail.split('@')[1]}
                </span>
              </MailTopicMenu>
            </li>
          </ul>
          <div className="rounded-b-3xl bg-surface-sand px-5 py-4">
            <p className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="h-3.5 w-3.5 shrink-0" aria-hidden />
              {officeHours}
            </p>
            <Link
              href="/anmeldung#schulbuero"
              onClick={() => setOpen(false)}
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline"
            >
              Alle Ansprechpartner
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      )}

      <button
        type="button"
        aria-expanded={open}
        aria-controls="kontakt-panel"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          'flex items-center gap-2 rounded-full px-5 py-3.5 text-sm font-bold shadow-lg transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
          open ? 'bg-foreground text-background' : 'bg-accent text-white',
        )}
      >
        {open ? <X className="h-5 w-5" aria-hidden /> : <MessageCircle className="h-5 w-5" aria-hidden />}
        Kontakt
      </button>
    </div>
  )
}
