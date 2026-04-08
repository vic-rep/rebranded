import * as React from 'react'
import { cn } from '../../lib/utils'

export type FaStyle = 'solid' | 'regular' | 'light' | 'thin' | 'duotone' | 'brands'

export interface IconProps extends React.HTMLAttributes<HTMLElement> {
  /** Font Awesome icon name without the 'fa-' prefix. E.g. "shield-check", "car", "house" */
  name: string
  /** Font Awesome style prefix. Default: 'solid' */
  faStyle?: FaStyle
  /** Font size in px, or any valid CSS font-size value. Default: inherits from parent */
  size?: number | string
  /** Accessible label. Omit for decorative icons. */
  label?: string
}

/**
 * Icon — renders a Font Awesome icon via the loaded FA Kit.
 *
 * @example
 * <Icon name="shield-check" size={24} label="Coverage" />
 * <Icon name="car" faStyle="regular" className="text-[var(--primary)]" />
 */
function Icon({ name, faStyle = 'solid', size, label, className, style, ...props }: IconProps) {
  const sizeStyle = size !== undefined
    ? { fontSize: typeof size === 'number' ? `${size}px` : size }
    : {}

  return (
    <i
      className={cn(`fa-${faStyle} fa-${name}`, 'shrink-0', className)}
      style={{ ...sizeStyle, ...style }}
      aria-label={label}
      aria-hidden={!label}
      role={label ? 'img' : undefined}
      {...props}
    />
  )
}

export { Icon }
