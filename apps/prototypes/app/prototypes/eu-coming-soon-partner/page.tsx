'use client'

import * as React from 'react'
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Icon,
  ThemeToggle,
} from 'trusti-ui'

/* ─── Easing constants ──────────────────────────────────────────────────────── */

const EASE_OUT_EXPO  = 'cubic-bezier(0.16, 1, 0.3, 1)'
const EASE_OUT_QUINT = 'cubic-bezier(0.22, 1, 0.36, 1)'
const EASE_OUT_QUART = 'cubic-bezier(0.25, 1, 0.5, 1)'

/* ─── Animation + delight styles ───────────────────────────────────────────── */

const ANIM_CSS = `
  @keyframes nav-enter {
    from { transform: translateY(-100%); opacity: 0; }
    to   { transform: translateY(0);     opacity: 1; }
  }
  @keyframes fade-up {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0);    }
  }
  @keyframes fade-in {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  /* Contour draw-in — dasharray/offset must accommodate longest path (~3500 units) */
  @keyframes draw-contour {
    from { stroke-dashoffset: 5000; }
    to   { stroke-dashoffset: 0;    }
  }

  /* Accent contour gently breathes after draw-in completes */
  @keyframes contour-breathe {
    0%, 100% { opacity: 0.52; }
    50%       { opacity: 0.32; }
  }

  .nav-enter {
    animation: nav-enter 0.45s ${EASE_OUT_EXPO} both;
  }
  .hero-h1 {
    animation: fade-up 0.65s ${EASE_OUT_QUINT} 0.2s both;
  }
  .hero-p {
    animation: fade-up 0.65s ${EASE_OUT_QUINT} 0.42s both;
  }
  .hero-tag {
    animation: fade-in 0.45s ${EASE_OUT_QUART} 0.65s both;
  }

  /* Pillar card hover lift */
  .pillar-card {
    transition:
      transform 0.22s ${EASE_OUT_QUART},
      box-shadow 0.22s ${EASE_OUT_QUART};
  }
  .pillar-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 36px rgba(0, 0, 0, 0.28);
  }

  /* Logo mark hover — subtle rotation delight */
  .logo-mark {
    display: inline-flex;
    transition: transform 0.28s ${EASE_OUT_QUART};
    cursor: default;
  }
  .logo-mark:hover {
    transform: rotate(8deg) scale(1.12);
  }

  /* CTA arrow drift */
  .cta-arrow {
    display: inline-block;
    transition: transform 0.22s ${EASE_OUT_QUART};
  }
  a:hover .cta-arrow,
  button:hover .cta-arrow {
    transform: translateX(5px);
  }

  @media (prefers-reduced-motion: reduce) {
    .nav-enter, .hero-h1, .hero-p, .hero-tag,
    .logo-mark, .cta-arrow, .pillar-card {
      animation: none !important;
      transition: none !important;
    }
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
`

/* ─── useInView hook ────────────────────────────────────────────────────────── */

function useInView(threshold = 0.12) {
  const ref = React.useRef<HTMLElement>(null)
  const [inView, setInView] = React.useState(false)
  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          obs.disconnect()
        }
      },
      { threshold },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, inView] as const
}

/* ─── useCounter hook ───────────────────────────────────────────────────────── */

function useCounter(target: number, active: boolean, duration = 1200) {
  const [count, setCount] = React.useState(0)
  React.useEffect(() => {
    if (!active) return
    if (typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCount(target)
      return
    }
    let startTime: number | null = null
    const step = (ts: number) => {
      if (!startTime) startTime = ts
      const progress = Math.min((ts - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 4)
      setCount(Math.round(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [active, target, duration])
  return count
}

/* ─── Scroll progress bar ───────────────────────────────────────────────────── */

function ScrollProgress() {
  const [pct, setPct] = React.useState(0)
  React.useEffect(() => {
    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement
      const max = scrollHeight - clientHeight
      setPct(max > 0 ? (scrollTop / max) * 100 : 0)
    }
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])
  return (
    <div
      aria-hidden
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '2px',
        width: `${pct}%`,
        backgroundColor: 'var(--color-clarity-green-400)',
        zIndex: 200,
        pointerEvents: 'none',
        transition: 'width 0.08s linear',
      }}
    />
  )
}

/* ─── Reveal style helper ───────────────────────────────────────────────────── */

function revealStyle(
  inView: boolean,
  delayMs = 0,
  direction: 'up' | 'in' = 'up',
): React.CSSProperties {
  const base = {
    opacity: inView ? 1 : 0,
    transition: `opacity 0.55s ${EASE_OUT_QUINT} ${delayMs}ms, transform 0.55s ${EASE_OUT_QUINT} ${delayMs}ms`,
  }
  if (direction === 'up') {
    return { ...base, transform: inView ? 'translateY(0)' : 'translateY(22px)' }
  }
  return base
}

/* ─── Data ─────────────────────────────────────────────────────────────────── */

const pillars = [
  {
    icon: 'magnifying-glass',
    heading: 'See every offer that exists.',
    body: 'We pull real quotes from leading insurers across your market. All in one place, all at once — so you never have to wonder if you missed something better.',
  },
  {
    icon: 'shield-check',
    heading: 'No broker fees. No hidden conditions.',
    body: 'What you see is what you pay. We make money when you find a policy that fits — not by steering you toward the most expensive one.',
  },
  {
    icon: 'circle-check',
    heading: 'Backed by insurers you already trust.',
    body: 'Every policy on Trusti is issued by licensed, regulated insurers. Fully digital. Fully valid. Real coverage, not a workaround.',
  },
]

const stats = [
  { target: 3,     suffix: '+',  fmt: (n: number) => `${n}`,                 label: 'Markets and growing' },
  { target: 120,   suffix: '+',  fmt: (n: number) => `${n}`,                 label: 'Insurance products available' },
  { target: 10000, suffix: '+',  fmt: (n: number) => n.toLocaleString('en'), label: 'Satisfied customers' },
  { target: 49,    suffix: ' ★', fmt: (n: number) => (n / 10).toFixed(1),    label: 'Google rating' },
]

const vps = [
  {
    icon: 'bullseye',
    heading: 'Qualified distribution, not just traffic.',
    body: 'Our customers arrive with intent. They\'re comparing, choosing, and ready to buy — not browsing out of curiosity.',
  },
  {
    icon: 'bolt',
    heading: 'Digital infrastructure, ready to go.',
    body: 'No complex integrations. No months of onboarding. We handle the customer interface; you handle the product.',
  },
  {
    icon: 'arrow-trend-up',
    heading: 'Performance-based. You pay for results.',
    body: 'No upfront fees for visibility. We grow when you grow. That\'s the only model that makes sense.',
  },
]

const logoPlaceholders = ['Auto', 'Life', 'Travel', 'Property', 'Health', 'Commercial']

const markets = [
  { code: 'BG', flag: '🇧🇬' },
  { code: 'IT', flag: '🇮🇹' },
  { code: 'ES', flag: '🇪🇸' },
  { code: 'FR', flag: '🇫🇷' },
  { code: 'DE', flag: '🇩🇪' },
]

/* ─── Cartographic topological background ──────────────────────────────────── */

// Seeded linear-congruential RNG — deterministic output for stable path generation
function mkRng(seed: number) {
  let s = seed | 0
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) | 0
    return (s >>> 0) / 4294967295
  }
}

// Generate a smooth closed organic contour path.
// Uses N anchor points distorted from a tilted ellipse, then converts
// Catmull-Rom control points to cubic bezier curves for smooth interpolation.
function organicEllipse(
  cx: number, cy: number,
  rx: number, ry: number,
  tiltDeg: number,
  wobble: number, // 0 = perfect ellipse, higher = more organic distortion
  seed: number,
  N = 12,
): string {
  const rng = mkRng(seed)
  const tilt = (tiltDeg * Math.PI) / 180

  const pts: [number, number][] = Array.from({ length: N }, (_, i) => {
    const angle = (i / N) * 2 * Math.PI
    const w = 1 + wobble * (rng() * 2 - 1)
    // Distorted ellipse point in local space
    const lx = rx * w * Math.cos(angle)
    const ly = ry * w * Math.sin(angle)
    // Rotate by tilt and translate to center
    return [
      cx + lx * Math.cos(tilt) - ly * Math.sin(tilt),
      cy + lx * Math.sin(tilt) + ly * Math.cos(tilt),
    ]
  })

  // Catmull-Rom → cubic bezier (closed), tension = 1/6
  const d: string[] = [`M ${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`]
  for (let i = 0; i < N; i++) {
    const p0 = pts[(i - 1 + N) % N]
    const p1 = pts[i]
    const p2 = pts[(i + 1) % N]
    const p3 = pts[(i + 2) % N]
    const cp1x = (p1[0] + (p2[0] - p0[0]) / 6).toFixed(1)
    const cp1y = (p1[1] + (p2[1] - p0[1]) / 6).toFixed(1)
    const cp2x = (p2[0] - (p3[0] - p1[0]) / 6).toFixed(1)
    const cp2y = (p2[1] - (p3[1] - p1[1]) / 6).toFixed(1)
    d.push(`C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`)
  }
  d.push('Z')
  return d.join(' ')
}

// Contour line descriptor
interface TopoLine {
  path: string
  stroke: string
  opacity: number
  width: number
  delay: number   // ms before draw-in starts
  breathe: boolean // subtle post-draw opacity pulse (accent line only)
}

// Precomputed at module level — stable, no re-generation on re-render
const TOPO_LINES: TopoLine[] = (() => {
  const OB7 = 'var(--color-olive-black-700)'
  const OB6 = 'var(--color-olive-black-600)'
  const CG4 = 'var(--color-clarity-green-400)'
  const lines: TopoLine[] = []

  // ── Peak A — main prominence, center (1020, 390) ────────────────────────────
  // 8 rings, outer-to-inner ordering (stagger draws outside-in)
  const peakA = { cx: 1020, cy: 390 };
  [
    { rx: 580, ry: 375, tilt:  7, wobble: 0.13, seed: 800,  isIndex: false, isAccent: false },
    { rx: 470, ry: 302, tilt:  8, wobble: 0.12, seed: 700,  isIndex: false, isAccent: false },
    { rx: 372, ry: 240, tilt: 10, wobble: 0.11, seed: 600,  isIndex: true,  isAccent: false },
    { rx: 285, ry: 184, tilt: 12, wobble: 0.10, seed: 500,  isIndex: false, isAccent: true  }, // clarity green
    { rx: 210, ry: 135, tilt: 15, wobble: 0.09, seed: 400,  isIndex: true,  isAccent: false },
    { rx: 145, ry:  96, tilt: 17, wobble: 0.07, seed: 300,  isIndex: false, isAccent: false },
    { rx:  90, ry:  60, tilt: 20, wobble: 0.06, seed: 200,  isIndex: false, isAccent: false },
    { rx:  48, ry:  32, tilt: 22, wobble: 0.04, seed: 100,  isIndex: false, isAccent: false },
  ].forEach((r, i) => {
    lines.push({
      path:    organicEllipse(peakA.cx, peakA.cy, r.rx, r.ry, r.tilt, r.wobble, r.seed),
      stroke:  r.isAccent ? CG4 : r.isIndex ? OB6 : OB7,
      opacity: r.isAccent ? 0.52 : r.isIndex ? 0.44 : 0.28,
      width:   r.isAccent ? 1.5  : r.isIndex ? 1.1  : 0.85,
      delay:   i * 75,   // outer rings start first
      breathe: r.isAccent,
    })
  })

  // ── Peak B — secondary ridge, center (275, 670) ─────────────────────────────
  // 5 rings, outer-to-inner
  const peakB = { cx: 275, cy: 670 };
  [
    { rx: 355, ry: 225, tilt:  -8, wobble: 0.13, seed: 1500, isIndex: false },
    { rx: 268, ry: 170, tilt:  -8, wobble: 0.11, seed: 1400, isIndex: false },
    { rx: 188, ry: 119, tilt: -10, wobble: 0.09, seed: 1300, isIndex: true  },
    { rx: 115, ry:  72, tilt: -12, wobble: 0.07, seed: 1200, isIndex: false },
    { rx:  58, ry:  38, tilt: -14, wobble: 0.05, seed: 1100, isIndex: false },
  ].forEach((r, i) => {
    lines.push({
      path:    organicEllipse(peakB.cx, peakB.cy, r.rx, r.ry, r.tilt, r.wobble, r.seed),
      stroke:  r.isIndex ? OB6 : OB7,
      opacity: r.isIndex ? 0.38 : 0.22,
      width:   r.isIndex ? 1.0  : 0.80,
      delay:   i * 75,
      breathe: false,
    })
  })

  // ── Peak C — off top-right edge, center (1360, -50) ─────────────────────────
  // Only outer 3 rings intersect the viewport — give terrain a sense of extending beyond frame
  const peakC = { cx: 1360, cy: -50 };
  [
    { rx: 380, ry: 270, tilt: -5, wobble: 0.11, seed: 2300, isIndex: false },
    { rx: 272, ry: 193, tilt: -4, wobble: 0.09, seed: 2200, isIndex: true  },
    { rx: 170, ry: 120, tilt: -3, wobble: 0.07, seed: 2100, isIndex: false },
  ].forEach((r, i) => {
    lines.push({
      path:    organicEllipse(peakC.cx, peakC.cy, r.rx, r.ry, r.tilt, r.wobble, r.seed),
      stroke:  r.isIndex ? OB6 : OB7,
      opacity: r.isIndex ? 0.32 : 0.20,
      width:   r.isIndex ? 0.95 : 0.75,
      delay:   i * 75,
      breathe: false,
    })
  })

  return lines
})()

function TopoBackground() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none select-none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      {TOPO_LINES.map((line, i) => (
        <path
          key={i}
          d={line.path}
          fill="none"
          stroke={line.stroke}
          strokeWidth={line.width}
          opacity={line.opacity}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            strokeDasharray: '5000',
            animation: line.breathe
              ? `draw-contour 2.2s ${EASE_OUT_EXPO} ${line.delay}ms both, contour-breathe 7s ease-in-out ${line.delay + 2200}ms infinite`
              : `draw-contour 2.2s ${EASE_OUT_EXPO} ${line.delay}ms both`,
          }}
        />
      ))}
    </svg>
  )
}

/* ─── Trusti wordmark ───────────────────────────────────────────────────────── */

function TrustiWordmark({ size = 'md', onDark = false }: { size?: 'sm' | 'md' | 'lg'; onDark?: boolean }) {
  const sizes = { sm: '1rem', md: '1.125rem', lg: '1.5rem' }
  return (
    <span
      style={{
        fontFamily: 'var(--font-heading)',
        fontWeight: 700,
        fontSize: sizes[size],
        color: onDark ? 'var(--color-porcelain-white-100)' : 'var(--foreground)',
        letterSpacing: '-0.02em',
      }}
    >
      Trusti
    </span>
  )
}

function TrustiMark() {
  return (
    <span className="logo-mark" aria-hidden>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 1 L19 10 L10 19 L1 10 Z" fill="var(--color-clarity-green-400)" />
        <path
          d="M7 8.5 H13 M10 8.5 V13"
          stroke="var(--color-olive-black-900)"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    </span>
  )
}

/* ─── Animated stat value ───────────────────────────────────────────────────── */

function AnimatedStat({ stat, active }: { stat: typeof stats[number]; active: boolean }) {
  const count = useCounter(stat.target, active, stat.target >= 1000 ? 1400 : 1000)
  return <>{stat.fmt(count)}{stat.suffix}</>
}

/* ─── Page sections ─────────────────────────────────────────────────────────── */

function NavBar() {
  return (
    <nav
      className="nav-enter sticky top-0 z-50 w-full"
      style={{
        backgroundColor: 'color-mix(in srgb, var(--background) 95%, transparent)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div
        className="mx-auto flex items-center justify-between px-6"
        style={{ maxWidth: '80rem', height: '60px' }}
      >
        <div className="flex items-center gap-2.5">
          <TrustiMark />
          <TrustiWordmark size="md" />
        </div>
        <ThemeToggle />
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section
      className="relative w-full overflow-hidden flex items-center"
      style={{
        minHeight: '100svh',
        backgroundColor: 'var(--color-olive-black-900)',
      }}
    >
      <TopoBackground />

      <div
        className="relative z-10 mx-auto w-full px-6 py-24 md:py-32 flex flex-col items-center text-center"
        style={{ maxWidth: '56rem' }}
      >
        <h1
          className="hero-h1 font-[family-name:var(--font-heading)] font-bold leading-tight"
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            color: 'var(--color-porcelain-white-100)',
            letterSpacing: '-0.03em',
          }}
        >
          The insurance market,<br className="hidden sm:block" /> finally on your side.
        </h1>

        <p
          className="hero-p font-[family-name:var(--font-body)] leading-relaxed mt-6"
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            maxWidth: '42rem',
            color: 'color-mix(in srgb, var(--color-porcelain-white-100) 80%, transparent)',
          }}
        >
          Trusti is a licensed European insurance broker and price comparison
          platform. We show you every real offer, side by side, with no pressure
          and nothing hidden — so you can choose what&apos;s right for you.
        </p>

        <p
          className="hero-tag font-[family-name:var(--font-body)] font-semibold tracking-wide mt-5"
          style={{
            fontSize: '0.875rem',
            color: 'var(--color-clarity-green-400)',
            letterSpacing: '0.04em',
          }}
        >
          Coming to more European markets in 2026.
        </p>
      </div>
    </section>
  )
}

function Pillars() {
  const [ref, inView] = useInView()
  return (
    <section
      ref={ref}
      className="w-full px-6 py-20 md:py-28"
      style={{ backgroundColor: 'var(--color-olive-black-900)' }}
    >
      <div
        className="mx-auto grid grid-cols-1 md:grid-cols-3 gap-6"
        style={{ maxWidth: '72rem' }}
      >
        {pillars.map((p, i) => (
          <Card
            key={p.heading}
            className="pillar-card flex flex-col gap-0"
            style={{
              backgroundColor: 'var(--color-olive-black-800)',
              borderColor: 'var(--color-olive-black-700)',
              ...revealStyle(inView, i * 120),
            }}
          >
            <CardHeader>
              <div
                className="flex items-center justify-center w-10 h-10 mb-4 rounded-[var(--radius)]"
                style={{ backgroundColor: 'var(--color-olive-black-700)' }}
              >
                <Icon
                  name={p.icon}
                  size={17}
                  style={{ color: 'var(--color-porcelain-white-100)' }}
                />
              </div>
              <CardTitle style={{ color: 'var(--color-porcelain-white-100)' }}>
                {p.heading}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p
                className="font-[family-name:var(--font-body)] text-sm leading-relaxed"
                style={{ color: 'var(--color-porcelain-white-400)' }}
              >
                {p.body}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

function Stats() {
  const [ref, inView] = useInView()
  return (
    <section
      ref={ref}
      className="w-full px-6 py-16 md:py-20"
      style={{ backgroundColor: 'var(--color-olive-black-800)' }}
    >
      <div
        className="mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
        style={{ maxWidth: '64rem' }}
      >
        {stats.map((s, i) => (
          <div
            key={s.label}
            className="flex flex-col items-center text-center gap-2"
            style={revealStyle(inView, i * 100)}
          >
            <span
              className="font-[family-name:var(--font-heading)] font-bold leading-none tabular-nums"
              style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                color: 'var(--color-clarity-green-400)',
                letterSpacing: '-0.03em',
              }}
            >
              <AnimatedStat stat={s} active={inView} />
            </span>
            <span
              className="font-[family-name:var(--font-body)] text-sm leading-snug"
              style={{ color: 'var(--color-porcelain-white-400)' }}
            >
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}

function LogoStrip() {
  const [ref, inView] = useInView()
  return (
    <section
      ref={ref}
      className="w-full px-6 py-12 md:py-16"
      style={{ backgroundColor: 'var(--background)' }}
    >
      <div className="mx-auto flex flex-col gap-8" style={{ maxWidth: '64rem' }}>
        <p
          className="font-[family-name:var(--font-body)] text-xs font-semibold uppercase tracking-widest text-center"
          style={{ color: 'var(--foreground-subtle)', ...revealStyle(inView, 0, 'in') }}
        >
          Already trusted by leading European insurers.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
          {logoPlaceholders.map((name, i) => (
            <div
              key={name}
              className="flex items-center justify-center px-6"
              style={{
                height: '40px',
                minWidth: '96px',
                borderRadius: 'var(--radius)',
                backgroundColor: 'var(--background-muted)',
                border: '1px solid var(--border)',
                ...revealStyle(inView, 80 + i * 60, 'in'),
              }}
            >
              <span
                className="font-[family-name:var(--font-body)] text-xs font-semibold tracking-wide"
                style={{ color: 'var(--foreground-subtle)' }}
              >
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function B2BSection() {
  const [ref, inView] = useInView(0.08)
  return (
    <section
      ref={ref}
      id="partner"
      className="w-full px-6 py-20 md:py-28"
      style={{ backgroundColor: 'var(--color-olive-black-900)' }}
    >
      <div
        className="mx-auto flex flex-col items-center text-center"
        style={{ maxWidth: '56rem' }}
      >
        <h2
          className="font-[family-name:var(--font-heading)] font-bold leading-tight"
          style={{
            fontSize: 'clamp(2rem, 4.5vw, 3.25rem)',
            color: 'var(--color-porcelain-white-100)',
            letterSpacing: '-0.03em',
            ...revealStyle(inView, 0),
          }}
        >
          Your products. Our reach. More customers.
        </h2>

        <p
          className="font-[family-name:var(--font-body)] leading-relaxed mt-5"
          style={{
            fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)',
            maxWidth: '40rem',
            color: 'color-mix(in srgb, var(--color-porcelain-white-100) 80%, transparent)',
            ...revealStyle(inView, 120),
          }}
        >
          Trusti gives insurance providers direct access to a growing base of
          digitally-active European buyers — without the infrastructure cost of
          building your own comparison channel.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 w-full mt-14 text-left">
          {vps.map((vp, i) => (
            <div
              key={vp.heading}
              className="flex flex-col gap-3"
              style={revealStyle(inView, 240 + i * 120)}
            >
              <div
                className="flex items-center justify-center w-9 h-9 rounded-[var(--radius)]"
                style={{ backgroundColor: 'var(--color-olive-black-700)' }}
              >
                <Icon
                  name={vp.icon}
                  size={15}
                  style={{ color: 'var(--color-porcelain-white-100)' }}
                />
              </div>
              <h3
                className="font-[family-name:var(--font-heading)] font-semibold text-base leading-snug"
                style={{ color: 'var(--color-porcelain-white-100)' }}
              >
                {vp.heading}
              </h3>
              <p
                className="font-[family-name:var(--font-body)] text-sm leading-relaxed"
                style={{ color: 'color-mix(in srgb, var(--color-porcelain-white-100) 65%, transparent)' }}
              >
                {vp.body}
              </p>
            </div>
          ))}
        </div>

        <div
          className="flex flex-col items-center gap-4 mt-14 w-full"
          style={revealStyle(inView, 600)}
        >
          <Button
            asChild
            variant="primary"
            size="lg"
            className="w-full sm:w-auto sm:px-10 text-base"
            style={{ letterSpacing: '-0.01em' }}
          >
            <a href="mailto:partnerships@trusti.bg">
              Partner with Trusti <span className="cta-arrow">→</span>
            </a>
          </Button>

          <p
            className="font-[family-name:var(--font-body)] text-sm"
            style={{ color: 'color-mix(in srgb, var(--color-porcelain-white-100) 55%, transparent)' }}
          >
            Talk to our partnerships team. No commitment, no sales pressure —
            just a conversation.
          </p>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer
      className="w-full px-6 py-12 md:py-16"
      style={{
        backgroundColor: 'var(--color-olive-black-900)',
        borderTop: '1px solid var(--color-olive-black-700)',
      }}
    >
      <div
        className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16"
        style={{ maxWidth: '72rem' }}
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2.5">
            <TrustiMark />
            <TrustiWordmark size="md" onDark />
          </div>
          <p
            className="font-[family-name:var(--font-body)] font-semibold text-sm tracking-wide"
            style={{ color: 'var(--color-clarity-green-400)' }}
          >
            Insurance without the runaround.
          </p>
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-3 flex-wrap">
            {markets.map((m) => (
              <div key={m.code} className="flex items-center gap-1.5" title={m.code}>
                <span className="text-lg leading-none" aria-hidden>{m.flag}</span>
                <span
                  className="font-[family-name:var(--font-body)] text-xs font-semibold tracking-widest uppercase"
                  style={{ color: 'var(--color-porcelain-white-600)' }}
                >
                  {m.code}
                </span>
              </div>
            ))}
          </div>

          <p
            className="font-[family-name:var(--font-body)] leading-relaxed"
            style={{
              fontSize: '0.7rem',
              color: 'color-mix(in srgb, var(--color-porcelain-white-100) 50%, transparent)',
              maxWidth: '30rem',
            }}
          >
            Trusti is a licensed insurance broker operating under European
            financial services regulation. Active in Bulgaria, Italy, and
            expanding across Europe.
          </p>

          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              {(['linkedin', 'instagram'] as const).map((name) => (
                <a
                  key={name}
                  href="#"
                  aria-label={`Trusti on ${name.charAt(0).toUpperCase() + name.slice(1)}`}
                  className="inline-flex items-center justify-center w-8 h-8 rounded-[var(--radius)] transition-colors duration-150"
                  style={{ color: 'var(--color-porcelain-white-600)' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--color-porcelain-white-100)' }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--color-porcelain-white-600)' }}
                >
                  <Icon name={name} faStyle="brands" size={16} aria-hidden />
                </a>
              ))}
            </div>
            <p
              className="font-[family-name:var(--font-body)]"
              style={{
                fontSize: '0.7rem',
                color: 'color-mix(in srgb, var(--color-porcelain-white-100) 40%, transparent)',
              }}
            >
              © 2026 Trusti. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ─── Page ──────────────────────────────────────────────────────────────────── */

export default function EuComingSoonPartner() {
  React.useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(
      '%c Trusti ',
      'background: #B9E856; color: #0A1517; font-size: 16px; font-weight: 700; padding: 3px 8px; border-radius: 4px;',
    )
    // eslint-disable-next-line no-console
    console.log(
      '%cInsurance without the runaround.\n\nWe\'re building the future of European insurance distribution.\nCurious about what we\'re building? → partnerships@trusti.bg',
      'color: #97A7AA; font-size: 11px; line-height: 1.7;',
    )
  }, [])

  return (
    <div style={{ backgroundColor: 'var(--color-olive-black-900)' }}>
      {/* eslint-disable-next-line react/no-danger */}
      <style dangerouslySetInnerHTML={{ __html: ANIM_CSS }} />
      <ScrollProgress />
      <NavBar />
      <main>
        <Hero />
        <Pillars />
        <Stats />
        <LogoStrip />
        <B2BSection />
      </main>
      <Footer />
    </div>
  )
}
