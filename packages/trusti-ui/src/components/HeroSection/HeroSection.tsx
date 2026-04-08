import * as React from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { cn } from '../../lib/utils'
import { easeOut } from '../../motion/presets'

export interface HeroSectionProps extends React.HTMLAttributes<HTMLElement> {
  headline: string
  subheadline?: string
  primaryAction?: React.ReactNode
  secondaryAction?: React.ReactNode
  eyebrow?: string               // Small label above headline
  media?: React.ReactNode        // Right-side image/illustration slot
  align?: 'left' | 'center'
  /** Animate text children in on mount. Default: true */
  animated?: boolean
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
}

const mediaVariants = {
  hidden: { opacity: 0, x: 32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: easeOut, delay: 0.25 } },
}

function HeroSection({
  headline,
  subheadline,
  primaryAction,
  secondaryAction,
  eyebrow,
  media,
  align = 'left',
  animated = true,
  className,
  ...props
}: HeroSectionProps) {
  const prefersReduced = useReducedMotion()
  const shouldAnimate = animated && !prefersReduced

  return (
    // Dark section — Olive Black bg + Porcelain White text (colour philosophy)
    <section
      className={cn(
        'relative w-full bg-[var(--color-olive-black-900)] overflow-hidden',
        'px-6 py-16 md:py-24',
        className
      )}
      {...props}
    >
      <div
        className={cn(
          'relative z-10 mx-auto max-w-6xl flex gap-12',
          media ? 'items-center' : 'items-start',
          align === 'center' && !media ? 'flex-col items-center text-center' : 'flex-col md:flex-row'
        )}
      >
        {/* Text content */}
        <motion.div
          className={cn('flex flex-col gap-6', media ? 'flex-1' : 'max-w-2xl')}
          variants={shouldAnimate ? containerVariants : undefined}
          initial={shouldAnimate ? 'hidden' : undefined}
          animate={shouldAnimate ? 'visible' : undefined}
        >
          {eyebrow && (
            <motion.span
              variants={shouldAnimate ? itemVariants : undefined}
              className="inline-flex font-[family-name:var(--font-body)] text-xs font-semibold uppercase tracking-widest text-[var(--color-clarity-green-400)]"
            >
              {eyebrow}
            </motion.span>
          )}

          <motion.h1
            variants={shouldAnimate ? itemVariants : undefined}
            className="font-[family-name:var(--font-heading)] font-bold text-4xl md:text-5xl leading-tight text-[var(--color-porcelain-white-100)]"
          >
            {headline}
          </motion.h1>

          {subheadline && (
            <motion.p
              variants={shouldAnimate ? itemVariants : undefined}
              className="font-[family-name:var(--font-body)] text-base md:text-lg text-[var(--color-porcelain-white-400)] leading-relaxed max-w-lg"
            >
              {subheadline}
            </motion.p>
          )}

          {(primaryAction || secondaryAction) && (
            <motion.div
              variants={shouldAnimate ? itemVariants : undefined}
              className="flex flex-wrap gap-3 items-center"
            >
              {primaryAction}
              {secondaryAction}
            </motion.div>
          )}
        </motion.div>

        {/* Media slot */}
        {media && (
          <motion.div
            className="flex-1 flex items-center justify-center md:justify-end"
            variants={shouldAnimate ? mediaVariants : undefined}
            initial={shouldAnimate ? 'hidden' : undefined}
            animate={shouldAnimate ? 'visible' : undefined}
          >
            {media}
          </motion.div>
        )}
      </div>

      {/* Subtle background accent — single green glow, ≤8% rule */}
      <div
        className="absolute top-0 right-0 w-96 h-96 opacity-[0.06] rounded-full blur-3xl pointer-events-none"
        style={{ background: 'var(--color-clarity-green-400)' }}
        aria-hidden
      />
    </section>
  )
}

export { HeroSection }
