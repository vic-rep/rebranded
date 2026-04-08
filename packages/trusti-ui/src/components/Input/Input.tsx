import * as React from 'react'
import { cn } from '../../lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', error, ...props }, ref) => (
    <input
      type={type}
      ref={ref}
      className={cn(
        'flex h-10 w-full rounded-[var(--radius)] px-3 py-2',
        'font-[family-name:var(--font-body)] text-sm',
        'bg-[color-mix(in_srgb,var(--foreground)_6%,transparent)]',
        'border border-[var(--border)]',
        'text-[var(--foreground)] placeholder:text-[var(--muted)]',
        'transition-colors duration-150',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-clarity-green)]',
        'focus-visible:border-[var(--color-clarity-green)]',
        'disabled:cursor-not-allowed disabled:opacity-50',
        error && 'border-red-500 focus-visible:ring-red-500',
        className
      )}
      aria-invalid={error ? 'true' : undefined}
      {...props}
    />
  )
)

Input.displayName = 'Input'

export { Input }
