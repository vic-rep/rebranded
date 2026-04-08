import * as React from 'react'
import { cn } from '../../lib/utils'

export interface PartnerLogo {
  name: string
  src?: string
  width?: number
}

export interface PartnerLogoStripProps extends React.HTMLAttributes<HTMLDivElement> {
  logos: PartnerLogo[]
  label?: string
}

function PartnerLogoStrip({ logos, label, className, ...props }: PartnerLogoStripProps) {
  return (
    <div className={cn('flex flex-col gap-4', className)} {...props}>
      {label && (
        <p className="text-xs font-semibold uppercase tracking-widest text-[var(--foreground-subtle)] font-[family-name:var(--font-heading)] text-center">
          {label}
        </p>
      )}
      <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
        {logos.map((logo) => (
          <div
            key={logo.name}
            className="flex items-center justify-center opacity-40 grayscale hover:opacity-70 hover:grayscale-0 transition-all duration-200"
            title={logo.name}
            style={{ minWidth: logo.width ?? 80 }}
          >
            {logo.src ? (
              <img
                src={logo.src}
                alt={logo.name}
                style={{ maxHeight: 32, width: 'auto', objectFit: 'contain' }}
              />
            ) : (
              // Placeholder when no logo image provided
              <span className="font-[family-name:var(--font-heading)] font-bold text-sm text-[var(--foreground-muted)] tracking-tight">
                {logo.name}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export { PartnerLogoStrip }
