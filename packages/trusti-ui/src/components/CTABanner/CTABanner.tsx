import * as React from 'react'
import { cn } from '../../lib/utils'

export interface CTABannerProps extends React.HTMLAttributes<HTMLElement> {
  headline: string
  subtext?: string
  primaryAction: React.ReactNode
  secondaryAction?: React.ReactNode
  variant?: 'dark' | 'green'
}

function CTABanner({
  headline,
  subtext,
  primaryAction,
  secondaryAction,
  variant = 'dark',
  className,
  ...props
}: CTABannerProps) {
  return (
    // Colour philosophy: dark = Olive Black section (standard)
    // green variant uses green as background — only valid when green IS the message (e.g. promo strip)
    // and must still be ≤8% of total page area
    <section
      className={cn(
        'w-full px-6 py-12 md:py-16',
        variant === 'dark' && 'bg-[var(--color-olive-black-900)]',
        variant === 'green' && 'bg-[var(--color-clarity-green-400)]',
        className
      )}
      {...props}
    >
      <div className="mx-auto max-w-4xl flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div className="flex flex-col gap-2">
          <h2
            className={cn(
              'font-[family-name:var(--font-heading)] font-bold text-2xl md:text-3xl leading-tight',
              variant === 'dark' && 'text-[var(--color-porcelain-white-100)]',
              variant === 'green' && 'text-[var(--color-olive-black-900)]'
            )}
          >
            {headline}
          </h2>
          {subtext && (
            <p
              className={cn(
                'font-[family-name:var(--font-body)] text-sm leading-relaxed max-w-lg',
                variant === 'dark' && 'text-[var(--color-porcelain-white-400)]',
                variant === 'green' && 'text-[var(--color-olive-black-700)]'
              )}
            >
              {subtext}
            </p>
          )}
        </div>

        <div className="flex flex-wrap gap-3 items-center justify-center md:justify-end shrink-0">
          {primaryAction}
          {secondaryAction}
        </div>
      </div>
    </section>
  )
}

export { CTABanner }
