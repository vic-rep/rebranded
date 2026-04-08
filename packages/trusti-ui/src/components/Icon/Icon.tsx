import * as React from 'react'
import { type LucideIcon, type LucideProps } from 'lucide-react'
import { cn } from '../../lib/utils'

export interface IconProps extends LucideProps {
  icon: LucideIcon
  label?: string
}

function Icon({ icon: LucideIconComponent, label, className, size = 16, ...props }: IconProps) {
  return (
    <LucideIconComponent
      className={cn('shrink-0', className)}
      size={size}
      aria-label={label}
      aria-hidden={!label}
      role={label ? 'img' : undefined}
      {...props}
    />
  )
}

export { Icon }
