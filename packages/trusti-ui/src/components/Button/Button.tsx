import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2',
    'font-[family-name:var(--font-heading)] font-semibold',
    'rounded-[var(--radius)] transition-colors duration-150',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'focus-visible:ring-[var(--primary)]',
    'focus-visible:ring-offset-[var(--background)]',
    'disabled:pointer-events-none disabled:opacity-50',
    'cursor-pointer select-none whitespace-nowrap',
  ].join(' '),
  {
    variants: {
      variant: {
        primary: [
          'bg-[var(--color-clarity-green)] text-[var(--color-olive-black)]',
          'hover:bg-[#cff26a]',
        ].join(' '),
        secondary: [
          'bg-[var(--color-lavender-purple)] text-[var(--color-porcelain-white)]',
          'hover:bg-[#b070f0]',
        ].join(' '),
        ghost: [
          'bg-transparent text-[var(--foreground)]',
          'hover:bg-[color-mix(in_srgb,var(--foreground)_8%,transparent)]',
        ].join(' '),
        outline: [
          'bg-transparent text-[var(--foreground)]',
          'border border-[var(--border)]',
          'hover:bg-[color-mix(in_srgb,var(--foreground)_8%,transparent)]',
        ].join(' '),
        destructive: [
          'bg-[var(--error)] text-white',
          'hover:bg-[color-mix(in_srgb,var(--error)_85%,black)]',
        ].join(' '),
      },
      size: {
        sm: 'h-8 px-3 text-xs',
        md: 'h-10 px-4 text-sm',
        lg: 'h-12 px-6 text-base',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button'

export { Button, buttonVariants }
