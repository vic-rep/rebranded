import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'

const trustBadgeVariants = cva(
  cn(
    'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1',
    'font-[family-name:var(--font-body)] text-xs font-semibold',
    'border transition-colors'
  ),
  {
    variants: {
      variant: {
        // Regulatory / authority — lavender (≤2% rule — one per page max)
        regulatory: 'bg-[var(--secondary-subtle)] border-[var(--color-lavender-purple-300)] text-[var(--color-lavender-purple-700)]',
        // Trust score / rating — subtle green
        rating:     'bg-[var(--primary-subtle)] border-[var(--color-clarity-green-400)] text-[var(--color-clarity-green-700)]',
        // Neutral / info
        neutral:    'bg-[var(--background-subtle)] border-[var(--border)] text-[var(--foreground-muted)]',
      },
    },
    defaultVariants: { variant: 'neutral' },
  }
)

export interface TrustBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof trustBadgeVariants> {
  icon?: React.ReactNode
  label: string
}

function TrustBadge({ className, variant, icon, label, ...props }: TrustBadgeProps) {
  return (
    <span className={cn(trustBadgeVariants({ variant }), className)} {...props}>
      {icon && <span className="shrink-0">{icon}</span>}
      {label}
    </span>
  )
}

export { TrustBadge, trustBadgeVariants }
