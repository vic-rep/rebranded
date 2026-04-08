import * as React from 'react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { Check } from 'lucide-react'
import { cn } from '../../lib/utils'

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      'peer h-4 w-4 shrink-0 rounded-sm',
      'border border-[var(--border)]',
      'bg-[color-mix(in_srgb,var(--foreground)_6%,transparent)]',
      'transition-colors duration-150',
      'focus-visible:outline-none focus-visible:ring-2',
      'focus-visible:ring-[var(--color-clarity-green)]',
      'focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]',
      'data-[state=checked]:bg-[var(--color-clarity-green)]',
      'data-[state=checked]:border-[var(--color-clarity-green)]',
      'disabled:cursor-not-allowed disabled:opacity-50',
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className="flex items-center justify-center text-[var(--color-olive-black)]">
      <Check className="h-3 w-3" strokeWidth={3} />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))

Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
