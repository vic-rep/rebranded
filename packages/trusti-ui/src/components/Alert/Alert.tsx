import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'

const alertVariants = cva(
  'relative w-full rounded-[var(--radius)] border p-4 flex gap-3 items-start text-sm font-[family-name:var(--font-body)]',
  {
    variants: {
      variant: {
        default: 'border-[var(--border)] bg-[var(--background-subtle)] text-[var(--foreground)]',
        info:    'border-[var(--color-lavender-purple-300)] bg-[var(--secondary-subtle)] text-[var(--foreground)]',
        success: 'border-[var(--color-clarity-green-400)] bg-[var(--success-subtle)] text-[var(--foreground)]',
        warning: 'border-yellow-400 bg-[var(--warning-subtle)] text-[var(--foreground)]',
        error:   'border-red-400 bg-[var(--error-subtle)] text-[var(--foreground)]',
      },
    },
    defaultVariants: { variant: 'default' },
  }
)

const iconColor: Record<string, string> = {
  default: 'var(--foreground-muted)',
  info:    'var(--color-lavender-purple-500)',
  success: 'var(--color-clarity-green-600)',
  warning: '#D97706',
  error:   '#DC2626',
}

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  icon?: React.ReactNode
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = 'default', icon, children, ...props }, ref) => (
    <div ref={ref} role="alert" className={cn(alertVariants({ variant }), className)} {...props}>
      {icon && (
        <span style={{ color: iconColor[variant ?? 'default'], flexShrink: 0, marginTop: '1px' }}>
          {icon}
        </span>
      )}
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  )
)
Alert.displayName = 'Alert'

const AlertTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn('font-[family-name:var(--font-heading)] font-semibold text-sm mb-1', className)} {...props} />
  )
)
AlertTitle.displayName = 'AlertTitle'

const AlertDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn('text-sm text-[var(--foreground-muted)] leading-relaxed', className)} {...props} />
  )
)
AlertDescription.displayName = 'AlertDescription'

export { Alert, AlertTitle, AlertDescription, alertVariants }
