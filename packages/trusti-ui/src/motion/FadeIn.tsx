import * as React from 'react'
import { motion, useReducedMotion } from 'motion/react'
import type { HTMLMotionProps } from 'motion/react'
import { easeOut } from './presets'

export type FadeInDirection = 'up' | 'down' | 'left' | 'right' | 'none'

export interface FadeInProps extends HTMLMotionProps<'div'> {
  /** Direction the element slides in from. Default: 'up' */
  direction?: FadeInDirection
  /** Delay in seconds before the animation starts */
  delay?: number
  /** Duration in seconds. Default: 0.5 */
  duration?: number
  /** Only animate once when scrolled into view. Default: true */
  once?: boolean
  /** Distance in px to slide. Default: 16 */
  distance?: number
}

const directionOffset: Record<FadeInDirection, { x?: number; y?: number }> = {
  up:    { y: 16 },
  down:  { y: -16 },
  left:  { x: 20 },
  right: { x: -20 },
  none:  {},
}

/**
 * FadeIn — fades (+ optionally slides) children into view.
 * Triggers on mount or when the element enters the viewport.
 * Automatically disables animation when `prefers-reduced-motion` is set.
 *
 * @example
 * <FadeIn delay={0.1}>
 *   <Card>...</Card>
 * </FadeIn>
 */
function FadeIn({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.5,
  once = true,
  distance,
  ...props
}: FadeInProps) {
  const prefersReduced = useReducedMotion()
  const offset = directionOffset[direction]

  // Apply custom distance override
  const resolvedOffset = distance !== undefined
    ? {
        x: 'x' in offset ? (offset.x! > 0 ? distance : -distance) : undefined,
        y: 'y' in offset ? (offset.y! > 0 ? distance : -distance) : undefined,
      }
    : offset

  if (prefersReduced) {
    return <div {...(props as React.HTMLAttributes<HTMLDivElement>)}>{children}</div>
  }

  return (
    <motion.div
      initial={{ opacity: 0, ...resolvedOffset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount: 0.15 }}
      transition={{ duration, delay, ease: easeOut }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export { FadeIn }
