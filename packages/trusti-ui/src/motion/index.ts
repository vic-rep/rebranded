// ─── Motion Primitives ────────────────────────────────────────────────────────
export { FadeIn } from './FadeIn'
export type { FadeInProps, FadeInDirection } from './FadeIn'

export { StaggerChildren } from './StaggerChildren'
export type { StaggerChildrenProps } from './StaggerChildren'

export { ScaleOnHover } from './ScaleOnHover'
export type { ScaleOnHoverProps } from './ScaleOnHover'

export { AnimatedNumber } from './AnimatedNumber'
export type { AnimatedNumberProps } from './AnimatedNumber'

export { PresenceTransition } from './PresenceTransition'
export type { PresenceTransitionProps, PresenceMode } from './PresenceTransition'

// ─── Presets (for custom motion compositions) ────────────────────────────────
export {
  easeOut,
  easeIn,
  easeInOut,
  microTransition,
  standardTransition,
  revealTransition,
  springTransition,
  softSpringTransition,
  fadeInUpVariants,
  fadeInDownVariants,
  fadeInLeftVariants,
  fadeInRightVariants,
  fadeInVariants,
  staggerContainerVariants,
  staggerItemVariants,
} from './presets'

// ─── Re-export core motion primitives for convenience ────────────────────────
export { motion, AnimatePresence, useReducedMotion, useInView, useScroll, useTransform, useSpring, useMotionValue } from 'motion/react'
