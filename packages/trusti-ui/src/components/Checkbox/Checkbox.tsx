import * as React from 'react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { cn } from '../../lib/utils'

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      // Visual size: 16×16px. Touch target expanded to 44×44px via relative + after pseudo.
      'peer h-4 w-4 shrink-0 rounded-sm',
      'relative after:absolute after:content-[""] after:inset-[-14px]',
      'border border-[var(--border)]',
      'bg-[color-mix(in_srgb,var(--foreground)_6%,transparent)]',
      'transition-colors duration-150',
      'focus-visible:outline-none focus-visible:ring-2',
      'focus-visible:ring-[var(--primary)]',
      'focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]',
      'data-[state=checked]:bg-[var(--color-clarity-green)]',
      'data-[state=checked]:border-[var(--color-clarity-green)]',
      'disabled:cursor-not-allowed disabled:opacity-50',
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className="flex items-center justify-center text-[var(--color-olive-black)]">
      <i className="fa-solid fa-check text-[0.625rem]" aria-hidden="true" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))

Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
