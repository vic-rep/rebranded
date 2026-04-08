/**
 * Trusti Motion Presets
 *
 * Animation timings & easing calibrated for the Trusti brand:
 * confident and smooth — never playful, bouncy, or distracting.
 *
 * Hierarchy:
 *   micro     150ms   — hover states, badge flips, icon swaps
 *   standard  300ms   — card reveals, tooltips, drawer headers
 *   reveal    600ms   — hero sections, page-level entrances
 *   spring            — interactive press/hover (physics-based, no duration)
 */

import type { Transition, Variants } from 'motion/react'

// ─── Easings ──────────────────────────────────────────────────────────────────

/** Smooth deceleration — use for entrances */
export const easeOut = [0.25, 0.46, 0.45, 0.94] as const

/** Quick snap then settle — use for exits */
export const easeIn = [0.55, 0, 1, 0.45] as const

/** Symmetrical — use for interactive state changes */
export const easeInOut = [0.45, 0, 0.55, 1] as const

// ─── Transition presets ───────────────────────────────────────────────────────

export const microTransition: Transition = {
  duration: 0.15,
  ease: easeOut,
}

export const standardTransition: Transition = {
  duration: 0.3,
  ease: easeOut,
}

export const revealTransition: Transition = {
  duration: 0.6,
  ease: easeOut,
}

/** Physics spring — for hover/press interactions. Snappy but not bouncy. */
export const springTransition: Transition = {
  type: 'spring',
  stiffness: 400,
  damping: 30,
}

/** Gentler spring — for layout shifts, card lifts */
export const softSpringTransition: Transition = {
  type: 'spring',
  stiffness: 260,
  damping: 24,
}

// ─── Common variant sets ──────────────────────────────────────────────────────

export const fadeInUpVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: standardTransition },
}

export const fadeInDownVariants: Variants = {
  hidden: { opacity: 0, y: -16 },
  visible: { opacity: 1, y: 0, transition: standardTransition },
}

export const fadeInLeftVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: standardTransition },
}

export const fadeInRightVariants: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: standardTransition },
}

export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: standardTransition },
}

/** Stagger container — use as parent wrapping FadeIn children */
export const staggerContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0,
    },
  },
}

export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: standardTransition },
}
