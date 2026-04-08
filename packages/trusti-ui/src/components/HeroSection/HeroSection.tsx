import * as React from 'react'
import { cn } from '../../lib/utils'

export interface HeroSectionProps extends React.HTMLAttributes<HTMLElement> {
  headline: string
  subheadline?: string
  primaryAction?: React.ReactNode
  secondaryAction?: React.ReactNode
  eyebrow?: string               // Small label above headline
  media?: React.ReactNode        // Right-side image/illustration slot
  align?: 'left' | 'center'
}

function HeroSection({
  headline,
  subheadline,
  primaryAction,
  secondaryAction,
  eyebrow,
  media,
  align = 'left',
  className,
  ...props
}: HeroSectionProps) {
  return (
    // Dark section — Olive Black bg + Porcelain White text (colour philosophy)
    <section
      className={cn(
        'relative w-full bg-[var(--color-olive-black-900)] overflow-hidden',
        'px-6 py-16 md:py-24',
        className
      )}
      {...props}
    >
      <div
        className={cn(
          'relative z-10 mx-auto max-w-6xl flex gap-12',
          media ? 'items-center' : 'items-start',
          align === 'center' && !media ? 'flex-col items-center text-center' : 'flex-col md:flex-row'
        )}
      >
        {/* Text content */}
        <div className={cn('flex flex-col gap-6', media ? 'flex-1' : 'max-w-2xl')}>
          {eyebrow && (
            <span className="inline-flex font-[family-name:var(--font-body)] text-xs font-semibold uppercase tracking-widest text-[var(--color-clarity-green-400)]">
              {eyebrow}
            </span>
          )}

          <h1 className="font-[family-name:var(--font-heading)] font-bold text-4xl md:text-5xl leading-tight text-[var(--color-porcelain-white-100)]">
            {headline}
          </h1>

          {subheadline && (
            <p className="font-[family-name:var(--font-body)] text-base md:text-lg text-[var(--color-porcelain-white-400)] leading-relaxed max-w-lg">
              {subheadline}
            </p>
          )}

          {(primaryAction || secondaryAction) && (
            <div className="flex flex-wrap gap-3 items-center">
              {primaryAction}
              {secondaryAction}
            </div>
          )}
        </div>

        {/* Media slot */}
        {media && (
          <div className="flex-1 flex items-center justify-center md:justify-end">
            {media}
          </div>
        )}
      </div>

      {/* Subtle background accent — single green glow, ≤8% rule */}
      <div
        className="absolute top-0 right-0 w-96 h-96 opacity-[0.06] rounded-full blur-3xl pointer-events-none"
        style={{ background: 'var(--color-clarity-green-400)' }}
        aria-hidden
      />
    </section>
  )
}

export { HeroSection }
