import * as React from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import type { HTMLMotionProps } from 'motion/react'
import { standardTransition, easeIn, easeOut } from './presets'

export type PresenceMode = 'fade' | 'slide-up' | 'slide-down' | 'scale'

export interface PresenceTransitionProps extends HTMLMotionProps<'div'> {
  /** Whether the content is visible */
  show: boolean
  /** Animation style. Default: 'fade' */
  mode?: PresenceMode
  /** Unique key for AnimatePresence to track the element */
  presenceKey?: string
}

const modeVariants: Record<
  PresenceMode,
  { initial: object; animate: object; exit: object }
> = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: standardTransition },
    exit:    { opacity: 0, transition: { duration: 0.15, ease: easeIn } },
  },
  'slide-up': {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0, transition: standardTransition },
    exit:    { opacity: 0, y: -8, transition: { duration: 0.2, ease: easeIn } },
  },
  'slide-down': {
    initial: { opacity: 0, y: -12 },
    animate: { opacity: 1, y: 0, transition: standardTransition },
    exit:    { opacity: 0, y: 8, transition: { duration: 0.2, ease: easeIn } },
  },
  scale: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1, transition: standardTransition },
    exit:    { opacity: 0, scale: 0.97, transition: { duration: 0.15, ease: easeIn } },
  },
}

/**
 * PresenceTransition — animates children in and out of the DOM.
 * Wraps AnimatePresence so callers don't need to manage it directly.
 * Respects `prefers-reduced-motion`.
 *
 * @example
 * <PresenceTransition show={isOpen} mode="slide-up">
 *   <Alert>...</Alert>
 * </PresenceTransition>
 */
function PresenceTransition({
  show,
  mode = 'fade',
  presenceKey = 'presence',
  children,
  ...props
}: PresenceTransitionProps) {
  const prefersReduced = useReducedMotion()
  const variants = modeVariants[mode]

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key={presenceKey}
          initial={prefersReduced ? {} : variants.initial}
          animate={prefersReduced ? {} : variants.animate}
          exit={prefersReduced ? {} : variants.exit}
          {...props}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export { PresenceTransition }
