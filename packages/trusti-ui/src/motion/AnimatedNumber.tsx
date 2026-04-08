import * as React from 'react'
import { useMotionValue, useSpring, useTransform, motion, useInView, useReducedMotion } from 'motion/react'

export interface AnimatedNumberProps {
  /** The target value to count to */
  value: number
  /** Optional format function. Default: toLocaleString */
  format?: (n: number) => string
  /** Spring stiffness. Default: 80 */
  stiffness?: number
  /** Spring damping. Default: 20 */
  damping?: number
  /** Duration of the count-up (ms). Overrides spring if set. */
  duration?: number
  className?: string
}

/**
 * AnimatedNumber — smoothly counts from 0 to `value` using spring physics.
 * Triggers when the element enters the viewport.
 * Respects `prefers-reduced-motion` (renders plain text instantly).
 *
 * @example
 * <AnimatedNumber value={4.8} format={(n) => n.toFixed(1)} />
 * <AnimatedNumber value={90} format={(n) => `€${Math.round(n)}`} />
 */
function AnimatedNumber({
  value,
  format = (n) => Math.round(n).toLocaleString(),
  stiffness = 80,
  damping = 20,
  className,
}: AnimatedNumberProps) {
  const prefersReduced = useReducedMotion()
  const ref = React.useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, { stiffness, damping })
  const display = useTransform(springValue, (latest) => format(latest))

  React.useEffect(() => {
    if (isInView) {
      motionValue.set(value)
    }
  }, [isInView, value, motionValue])

  if (prefersReduced) {
    return <span className={className}>{format(value)}</span>
  }

  return (
    <motion.span ref={ref} className={className}>
      {display}
    </motion.span>
  )
}

export { AnimatedNumber }
