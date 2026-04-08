import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full font-[family-name:var(--font-body)] font-semibold transition-colors',
  {
    variants: {
      variant: {
        default:     'bg-[color-mix(in_srgb,var(--foreground)_12%,transparent)] text-[var(--foreground)]',
        primary:     'bg-[var(--color-clarity-green)] text-[var(--color-olive-black)]',
        secondary:   'bg-[var(--color-lavender-purple)] text-[var(--color-porcelain-white)]',
        outline:     'border border-[var(--border)] text-[var(--foreground)] bg-transparent',
        destructive: 'bg-red-600 text-white',
      },
      size: {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-2.5 py-0.5 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant, size }), className)} {...props} />
}

export { Badge, badgeVariants }
