import { cn } from '@/lib/utils'

// Words in a heading set on a flat colour block, like the highlighted lines in the school brochure.
// box-decoration-clone keeps the padding on every line when the phrase wraps.
const tones = {
  golden: 'bg-golden text-on-bright',
  mint: 'bg-mint text-on-bright',
  accent: 'bg-accent text-white',
  primary: 'bg-primary text-primary-foreground',
} as const

export function HighlightBar({
  tone,
  className,
  children,
}: {
  tone: keyof typeof tones
  className?: string
  children: React.ReactNode
}) {
  return (
    <span className={cn('box-decoration-clone rounded-[0.15em] px-[0.35em] pb-[0.04em]', tones[tone], className)}>{children}</span>
  )
}
