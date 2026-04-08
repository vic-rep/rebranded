import * as React from 'react'
import * as ProgressPrimitive from '@radix-ui/react-progress'
import { cn } from '../../lib/utils'

export interface ProgressProps extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  showLabel?: boolean
}

const Progress = React.forwardRef<React.ElementRef<typeof ProgressPrimitive.Root>, ProgressProps>(
  ({ className, value, showLabel, ...props }, ref) => (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between mb-1.5">
          <span className="text-xs font-medium text-[var(--foreground-muted)] font-[family-name:var(--font-body)]">Progress</span>
          <span className="text-xs font-semibold text-[var(--foreground)] font-[family-name:var(--font-heading)]">{value ?? 0}%</span>
        </div>
      )}
      <ProgressPrimitive.Root
        ref={ref}
        className={cn(
          'relative h-2 w-full overflow-hidden rounded-full',
          'bg-[color-mix(in_srgb,var(--foreground)_12%,transparent)]',
          className
        )}
        value={value}
        {...props}
      >
        <ProgressPrimitive.Indicator
          className="h-full bg-[var(--primary)] transition-transform duration-500 ease-out rounded-full"
          style={{ transform: `translateX(-${100 - (value ?? 0)}%)`, willChange: 'transform' }}
        />
      </ProgressPrimitive.Root>
    </div>
  )
)
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
