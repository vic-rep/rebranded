import * as React from 'react'
import { cn } from '../../lib/utils'

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-[var(--radius)]',
        'bg-[color-mix(in_srgb,var(--foreground)_10%,transparent)]',
        className
      )}
      aria-hidden="true"
      {...props}
    />
  )
}

export { Skeleton }
