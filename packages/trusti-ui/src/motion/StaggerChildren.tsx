import * as React from 'react'
import { motion, useReducedMotion } from 'motion/react'
import type { HTMLMotionProps } from 'motion/react'
import { easeOut } from './presets'

export interface StaggerChildrenProps extends HTMLMotionProps<'div'> {
  /** Seconds between each child animation. Default: 0.08 */
  staggerDelay?: number
  /** Delay before the first child starts. Default: 0 */
  delayChildren?: number
  /** Distance children slide in from (px). Default: 12 */
  distance?: number
  /** Duration of each child animation. Default: 0.4 */
  duration?: number
  /** Only trigger once when scrolled into view. Default: true */
  once?: boolean
}

/**
 * StaggerChildren — wraps direct children and animates them in one-by-one.
 * Each child fades up with a configurable stagger delay.
 * Respects `prefers-reduced-motion`.
 *
 * @example
 * <StaggerChildren staggerDelay={0.1}>
 *   <FeatureItem />
 *   <FeatureItem />
 *   <FeatureItem />
 * </StaggerChildren>
 */
function StaggerChildren({
  children,
  staggerDelay = 0.08,
  delayChildren = 0,
  distance = 12,
  duration = 0.4,
  once = true,
  ...props
}: StaggerChildrenProps) {
  const prefersReduced = useReducedMotion()

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: distance },
    visible: { opacity: 1, y: 0, transition: { duration, ease: easeOut } },
  }

  if (prefersReduced) {
    return <div {...(props as React.HTMLAttributes<HTMLDivElement>)}>{children}</div>
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.1 }}
      {...props}
    >
      {React.Children.map(children, (child, i) =>
        child != null ? (
          <motion.div key={i} variants={itemVariants}>
            {child}
          </motion.div>
        ) : null
      )}
    </motion.div>
  )
}

export { StaggerChildren }
