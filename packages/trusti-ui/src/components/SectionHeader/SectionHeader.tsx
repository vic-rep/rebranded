import * as React from 'react'
import { cn } from '../../lib/utils'

export interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  subtitle?: string
  action?: React.ReactNode
  align?: 'left' | 'center'
}

function SectionHeader({
  title,
  subtitle,
  action,
  align = 'left',
  className,
  ...props
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'flex items-start justify-between gap-4',
        align === 'center' && 'flex-col items-center text-center',
        className
      )}
      {...props}
    >
      <div className={cn('flex flex-col gap-1', align === 'center' && 'items-center')}>
        <h2 className="font-[family-name:var(--font-heading)] font-bold text-2xl text-[var(--foreground)] leading-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="text-sm text-[var(--foreground-muted)] font-[family-name:var(--font-body)] max-w-xl leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
      {action && <div className="shrink-0 mt-1">{action}</div>}
    </div>
  )
}

export { SectionHeader }
