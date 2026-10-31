'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, ChevronLeft, Menu, X } from 'lucide-react'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { mainNav, type NavItem } from '@/lib/site-navigation'
import { cn } from '@/lib/utils'
import { styleFor } from './section-style'

type MobileMenuProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  triggerClassName: string
}

// Phone menu: the "Menü" tab of the action bar opens a bottom drawer with one tile per section;
// a tile slides to that section's pages inside the drawer.
export function MobileMenu({ open, onOpenChange, triggerClassName }: MobileMenuProps) {
  const [section, setSection] = useState<NavItem | null>(null)

  // Reset on open, not on close, so the drawer doesn't jump back to the tiles while sliding away.
  const handleOpenChange = (next: boolean) => {
    if (next) setSection(null)
    onOpenChange(next)
  }
  const close = () => onOpenChange(false)

  return (
    <Drawer open={open} onOpenChange={handleOpenChange} showSwipeHandle>
      <DrawerTrigger className={triggerClassName} aria-label={open ? 'Menü schließen' : 'Menü öffnen'}>
        <span className="relative h-5 w-5">
          <Menu
            className={cn(
              'absolute inset-0 h-5 w-5 text-primary transition-all duration-300 motion-reduce:transition-none',
              open && 'rotate-90 scale-0 opacity-0',
            )}
          />
          <X
            className={cn(
              'absolute inset-0 h-5 w-5 text-accent transition-all duration-300 motion-reduce:transition-none',
              !open && '-rotate-90 scale-0 opacity-0',
            )}
          />
        </span>
        {open ? 'Schließen' : 'Menü'}
      </DrawerTrigger>

      {/* Sits just above the action bar, which stays on top so its tabs remain usable. */}
      <DrawerContent className="data-[swipe-direction=down]:bottom-[calc(4.5rem+env(safe-area-inset-bottom))] bg-background text-sm">
        <DrawerTitle className="sr-only">Menü</DrawerTitle>
        <DrawerDescription className="sr-only">Alle Bereiche der Website</DrawerDescription>

        <div className="max-h-[calc(100dvh-12rem)] overflow-y-auto overscroll-contain px-3 pb-3 pt-3">
          {section ? (
            <SectionView key={section.href} item={section} onBack={() => setSection(null)} onNavigate={close} />
          ) : (
            <div className="grid grid-cols-2 gap-2.5 animate-in fade-in slide-in-from-left-4 duration-300 motion-reduce:animate-none">
              {mainNav.map((item, i) => {
                const s = styleFor(item.href)
                const Icon = s.icon
                return (
                  <button
                    key={item.href}
                    type="button"
                    onClick={() => setSection(item)}
                    style={{ animationDelay: `${i * 40}ms` }}
                    className={cn(
                      'relative flex min-h-24 flex-col items-start justify-between overflow-hidden rounded-2xl p-3.5 text-left',
                      'animate-in fade-in zoom-in-95 fill-mode-both duration-300 motion-reduce:animate-none',
                      'transition-transform active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
                      s.tile,
                    )}
                  >
                    <Icon className="h-5 w-5" aria-hidden />
                    <span>
                      <span className="block text-[15px] font-extrabold leading-tight">{item.label}</span>
                      <span className="mt-0.5 block text-[11.5px] leading-snug opacity-85">{item.desc}</span>
                    </span>
                    {/* Soft circle in the corner, a nod to the round heads of the logo figures */}
                    <span aria-hidden className="pointer-events-none absolute -bottom-5 -right-4 h-14 w-14 rounded-full bg-white/20" />
                  </button>
                )
              })}
            </div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  )
}

function SectionView({ item, onBack, onNavigate }: { item: NavItem; onBack: () => void; onNavigate: () => void }) {
  const s = styleFor(item.href)
  const Icon = s.icon

  return (
    <div className="animate-in fade-in slide-in-from-right-6 duration-300 motion-reduce:animate-none">
      <button
        type="button"
        onClick={onBack}
        className="-ml-1 mb-2 flex min-h-11 items-center gap-1 rounded-lg px-1 text-sm font-semibold text-muted-foreground hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
      >
        <ChevronLeft className="h-4 w-4" aria-hidden />
        Alle Bereiche
      </button>

      <Link
        href={item.href}
        onClick={onNavigate}
        className={cn(
          'group mb-2 flex items-center gap-3 rounded-2xl p-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
          s.tile,
        )}
      >
        <Icon className="h-6 w-6 shrink-0" aria-hidden />
        <span className="min-w-0 flex-1">
          <span className="block text-lg font-extrabold leading-tight">{item.label}</span>
          <span className="block text-xs opacity-85">Übersicht · {item.desc}</span>
        </span>
        <ArrowRight className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-0.5" aria-hidden />
      </Link>

      <ul>
        {item.children.map((link, i) => (
          <li
            key={link.href}
            style={{ animationDelay: `${80 + i * 35}ms` }}
            className="animate-in fade-in slide-in-from-right-3 fill-mode-both duration-300 motion-reduce:animate-none"
          >
            <Link
              href={link.href}
              onClick={onNavigate}
              className="group flex min-h-14 items-center gap-3 rounded-xl px-3 py-2.5 hover:bg-muted focus-visible:outline-2 focus-visible:outline-ring"
            >
              <span className="min-w-0 flex-1">
                <span className="block text-[15px] font-semibold text-foreground">{link.title}</span>
                <span className="block text-xs text-muted-foreground">{link.desc}</span>
              </span>
              <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-foreground" aria-hidden />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
