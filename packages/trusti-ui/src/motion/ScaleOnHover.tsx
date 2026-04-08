import * as React from 'react'
import { motion, useReducedMotion } from 'motion/react'
import type { HTMLMotionProps } from 'motion/react'
import { softSpringTransition } from './presets'

export interface ScaleOnHoverProps extends HTMLMotionProps<'div'> {
  /** Scale factor on hover. Default: 1.02 */
  scale?: number
  /** Vertical lift in px on hover (negative = upward). Default: -3 */
  lift?: number
}

/**
 * ScaleOnHover — adds a subtle scale + vertical lift on hover.
 * Designed for cards, tiles and interactive surfaces.
 * Uses spring physics for a natural feel.
 * Respects `prefers-reduced-motion`.
 *
 * @example
 * <ScaleOnHover>
 *   <InsuranceProductCard ... />
 * </ScaleOnHover>
 */
function ScaleOnHover({
  children,
  scale = 1.02,
  lift = -3,
  style,
  ...props
}: ScaleOnHoverProps) {
  const prefersReduced = useReducedMotion()

  if (prefersReduced) {
    return <div style={style} {...(props as React.HTMLAttributes<HTMLDivElement>)}>{children}</div>
  }

  return (
    <motion.div
      whileHover={{ scale, y: lift }}
      whileTap={{ scale: 0.99, y: 0 }}
      transition={softSpringTransition}
      style={{ willChange: 'transform', ...style }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export { ScaleOnHover }
