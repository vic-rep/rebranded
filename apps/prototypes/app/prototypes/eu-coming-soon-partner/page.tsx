'use client'

import * as React from 'react'
import { Button, Icon, ThemeToggle } from 'trusti-ui'

/* ─── Easing ────────────────────────────────────────────────────────────────── */

const EXPO  = 'cubic-bezier(0.16, 1, 0.3, 1)'
const QUINT = 'cubic-bezier(0.22, 1, 0.36, 1)'
const QUART = 'cubic-bezier(0.25, 1, 0.5, 1)'

/* ─── Global styles ─────────────────────────────────────────────────────────── */

const CSS = `
  @keyframes nav-enter {
    from { transform: translateY(-100%); opacity: 0; }
    to   { transform: translateY(0);     opacity: 1; }
  }
  @keyframes fade-up {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fade-in {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes draw-contour {
    from { stroke-dashoffset: 5000; }
    to   { stroke-dashoffset: 0; }
  }
  @keyframes contour-breathe {
    0%, 100% { opacity: 0.52; }
    50%       { opacity: 0.30; }
  }

  .nav-enter    { animation: nav-enter 0.45s cubic-bezier(0.16,1,0.3,1) both; }
  .hero-eyebrow { animation: fade-in  0.5s  cubic-bezier(0.22,1,0.36,1) 0.1s  both; }
  .hero-h1      { animation: fade-up  0.7s  cubic-bezier(0.22,1,0.36,1) 0.22s both; }
  .hero-p       { animation: fade-up  0.65s cubic-bezier(0.22,1,0.36,1) 0.42s both; }
  .hero-tag     { animation: fade-in  0.45s cubic-bezier(0.25,1,0.5,1)  0.62s both; }

  .bento-tile {
    transition: transform 0.22s cubic-bezier(0.25,1,0.5,1), box-shadow 0.22s cubic-bezier(0.25,1,0.5,1);
    cursor: default;
  }
  .bento-tile:hover {
    transform: translateY(-2px) scale(1.01);
    box-shadow: 0 12px 40px rgba(10,21,23,0.10);
  }
  .logo-mark {
    display: inline-flex;
    transition: transform 0.28s cubic-bezier(0.25,1,0.5,1);
    cursor: default;
  }
  .logo-mark:hover { transform: rotate(8deg) scale(1.12); }
  .cta-arrow { display: inline-block; transition: transform 0.22s cubic-bezier(0.25,1,0.5,1); }
  a:hover .cta-arrow, button:hover .cta-arrow { transform: translateX(5px); }

  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
`

/* ─── Hooks ─────────────────────────────────────────────────────────────────── */

function useInView(threshold = 0.1) {
  const ref = React.useRef<HTMLElement>(null)
  const [inView, setInView] = React.useState(false)
  React.useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect() } },
      { threshold },
    )
    obs.observe(el); return () => obs.disconnect()
  }, [threshold])
  return [ref, inView] as const
}

function useCounter(target: number, active: boolean, duration = 1200) {
  const [n, setN] = React.useState(0)
  React.useEffect(() => {
    if (!active) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setN(target); return }
    let t0: number | null = null
    const step = (ts: number) => {
      if (!t0) t0 = ts
      const p = Math.min((ts - t0) / duration, 1)
      setN(Math.round((1 - Math.pow(1 - p, 4)) * target))
      if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [active, target, duration])
  return n
}

function reveal(inView: boolean, delay = 0, dir: 'up' | 'in' = 'up'): React.CSSProperties {
  return {
    opacity: inView ? 1 : 0,
    transform: dir === 'up' ? (inView ? 'translateY(0)' : 'translateY(20px)') : undefined,
    transition: `opacity 0.55s ${QUINT} ${delay}ms${dir === 'up' ? `, transform 0.55s ${QUINT} ${delay}ms` : ''}`,
  }
}

/* ─── Scroll progress ───────────────────────────────────────────────────────── */

function ScrollProgress() {
  const [pct, setPct] = React.useState(0)
  React.useEffect(() => {
    const update = () => {
      const { scrollTop: t, scrollHeight: h, clientHeight: c } = document.documentElement
      setPct(h > c ? (t / (h - c)) * 100 : 0)
    }
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])
  return <div aria-hidden style={{ position: 'fixed', top: 0, left: 0, height: '2px', width: `${pct}%`, backgroundColor: 'var(--color-clarity-green-400)', zIndex: 200, pointerEvents: 'none', transition: 'width 0.08s linear' }} />
}

/* ─── Topographic background (cartographic) ─────────────────────────────────── */

function mkRng(seed: number) {
  let s = seed | 0
  return () => { s = (Math.imul(s, 1664525) + 1013904223) | 0; return (s >>> 0) / 4294967295 }
}

function organicEllipse(cx: number, cy: number, rx: number, ry: number, tiltDeg: number, wobble: number, seed: number, N = 12): string {
  const rng = mkRng(seed); const tilt = (tiltDeg * Math.PI) / 180
  const pts: [number, number][] = Array.from({ length: N }, (_, i) => {
    const a = (i / N) * 2 * Math.PI; const w = 1 + wobble * (rng() * 2 - 1)
    const lx = rx * w * Math.cos(a); const ly = ry * w * Math.sin(a)
    return [cx + lx * Math.cos(tilt) - ly * Math.sin(tilt), cy + lx * Math.sin(tilt) + ly * Math.cos(tilt)]
  })
  const d: string[] = [`M ${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`]
  for (let i = 0; i < N; i++) {
    const p0 = pts[(i - 1 + N) % N], p1 = pts[i], p2 = pts[(i + 1) % N], p3 = pts[(i + 2) % N]
    d.push(`C ${(p1[0]+(p2[0]-p0[0])/6).toFixed(1)},${(p1[1]+(p2[1]-p0[1])/6).toFixed(1)} ${(p2[0]-(p3[0]-p1[0])/6).toFixed(1)},${(p2[1]-(p3[1]-p1[1])/6).toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`)
  }
  d.push('Z'); return d.join(' ')
}

interface TopoLine { path: string; stroke: string; opacity: number; width: number; delay: number; breathe: boolean }
const TOPO_LINES: TopoLine[] = (() => {
  const OB7 = 'var(--color-olive-black-700)', OB6 = 'var(--color-olive-black-600)', CG4 = 'var(--color-clarity-green-400)'
  const lines: TopoLine[] = []
  // N=16 anchor points for smoother organic curves
  const add = (cx: number, cy: number, rings: Array<{ rx: number; ry: number; tilt: number; wobble: number; seed: number; idx?: boolean; acc?: boolean }>) => {
    rings.forEach((r, i) => lines.push({ path: organicEllipse(cx, cy, r.rx, r.ry, r.tilt, r.wobble, r.seed, 16), stroke: r.acc ? CG4 : r.idx ? OB6 : OB7, opacity: r.acc ? 0.22 : r.idx ? 0.11 : 0.07, width: r.acc ? 1.6 : r.idx ? 1.1 : 0.8, delay: i * 55, breathe: !!r.acc }))
  }

  // Peak 1 — dominant hill, right of centre
  add(1020, 390, [
    { rx: 630, ry: 406, tilt: 6,  wobble: 0.12, seed: 800  },
    { rx: 545, ry: 352, tilt: 7,  wobble: 0.12, seed: 802  },
    { rx: 464, ry: 299, tilt: 7,  wobble: 0.12, seed: 700  },
    { rx: 390, ry: 252, tilt: 8,  wobble: 0.11, seed: 702  },
    { rx: 324, ry: 209, tilt: 10, wobble: 0.11, seed: 600, idx: true },
    { rx: 264, ry: 170, tilt: 11, wobble: 0.10, seed: 602  },
    { rx: 210, ry: 136, tilt: 13, wobble: 0.09, seed: 500, acc: true },
    { rx: 163, ry: 105, tilt: 15, wobble: 0.09, seed: 502, idx: true },
    { rx: 122, ry: 79,  tilt: 17, wobble: 0.08, seed: 400  },
    { rx: 88,  ry: 57,  tilt: 18, wobble: 0.07, seed: 402  },
    { rx: 60,  ry: 39,  tilt: 20, wobble: 0.06, seed: 300  },
    { rx: 38,  ry: 24,  tilt: 22, wobble: 0.05, seed: 302  },
  ])

  // Peak 2 — secondary hill, lower left
  add(275, 670, [
    { rx: 430, ry: 272, tilt: -7,  wobble: 0.13, seed: 1500 },
    { rx: 348, ry: 220, tilt: -7,  wobble: 0.12, seed: 1502 },
    { rx: 275, ry: 174, tilt: -8,  wobble: 0.11, seed: 1400 },
    { rx: 210, ry: 133, tilt: -10, wobble: 0.10, seed: 1402, idx: true },
    { rx: 154, ry: 97,  tilt: -11, wobble: 0.09, seed: 1300 },
    { rx: 106, ry: 67,  tilt: -12, wobble: 0.08, seed: 1302, acc: true },
    { rx: 66,  ry: 42,  tilt: -14, wobble: 0.07, seed: 1200 },
    { rx: 36,  ry: 23,  tilt: -15, wobble: 0.05, seed: 1202 },
  ])

  // Peak 3 — top-right corner, partially cropped
  add(1395, -45, [
    { rx: 500, ry: 355, tilt: -4, wobble: 0.11, seed: 2300 },
    { rx: 400, ry: 284, tilt: -4, wobble: 0.10, seed: 2302 },
    { rx: 308, ry: 219, tilt: -3, wobble: 0.09, seed: 2200, idx: true },
    { rx: 224, ry: 159, tilt: -2, wobble: 0.08, seed: 2202 },
    { rx: 152, ry: 108, tilt: -2, wobble: 0.07, seed: 2100 },
    { rx: 92,  ry: 65,  tilt: -1, wobble: 0.06, seed: 2102 },
  ])

  // Peak 4 — top-left, partially cropped
  add(118, 105, [
    { rx: 340, ry: 222, tilt: 14, wobble: 0.14, seed: 3100 },
    { rx: 264, ry: 172, tilt: 14, wobble: 0.13, seed: 3102 },
    { rx: 196, ry: 128, tilt: 14, wobble: 0.11, seed: 3200, idx: true },
    { rx: 136, ry: 89,  tilt: 15, wobble: 0.10, seed: 3202 },
    { rx: 84,  ry: 55,  tilt: 16, wobble: 0.08, seed: 3300 },
    { rx: 44,  ry: 29,  tilt: 17, wobble: 0.06, seed: 3302 },
  ])

  // Peak 5 — bottom-right corner, partially cropped
  add(1490, 855, [
    { rx: 380, ry: 242, tilt: -5, wobble: 0.12, seed: 4100 },
    { rx: 292, ry: 186, tilt: -5, wobble: 0.11, seed: 4102 },
    { rx: 212, ry: 135, tilt: -4, wobble: 0.10, seed: 4200, idx: true },
    { rx: 140, ry: 89,  tilt: -4, wobble: 0.09, seed: 4202 },
    { rx: 78,  ry: 50,  tilt: -3, wobble: 0.07, seed: 4300 },
  ])

  return lines
})()

function TopoBackground() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none select-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" aria-hidden>
      {TOPO_LINES.map((l, i) => (
        <path key={i} d={l.path} fill="none" stroke={l.stroke} strokeWidth={l.width} opacity={l.opacity} strokeLinecap="round" strokeLinejoin="round"
          style={{ strokeDasharray: '5000', animation: l.breathe ? `draw-contour 2.2s ${EXPO} ${l.delay}ms both, contour-breathe 7s ease-in-out ${l.delay + 2200}ms infinite` : `draw-contour 2.2s ${EXPO} ${l.delay}ms both` }} />
      ))}
    </svg>
  )
}

/* ─── Brand elements ────────────────────────────────────────────────────────── */

function TrustiMark() {
  return (
    <span className="logo-mark" aria-hidden>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 1 L19 10 L10 19 L1 10 Z" fill="var(--color-clarity-green-400)" />
        <path d="M7 8.5 H13 M10 8.5 V13" stroke="var(--color-olive-black-900)" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    </span>
  )
}
function TrustiWordmark() {
  return <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.125rem', color: 'var(--color-olive-black-900)', letterSpacing: '-0.02em' }}>Trusti</span>
}

/* ─── Data ──────────────────────────────────────────────────────────────────── */

const pillars = [
  { n: '01', icon: 'magnifying-glass', heading: 'See every offer that exists.', body: 'We pull real quotes from every licensed insurer in your market — side by side, in seconds. No blind spots, no exclusives.' },
  { n: '02', icon: 'shield-check',     heading: 'No broker fees. No hidden conditions.', body: 'What you see is what you pay. Our revenue comes from helping you find the right policy — not the priciest one.' },
  { n: '03', icon: 'circle-check',     heading: 'Backed by insurers you already trust.', body: 'Every policy on Trusti is issued by a licensed, regulated insurer. Fully digital. Fully valid. Real coverage.' },
]

const stats: Array<{ target: number; suffix: string; fmt: (n: number) => string; label: string }> = [
  { target: 10000, suffix: '+', fmt: (n) => n.toLocaleString('en'), label: 'Satisfied customers' },
  { target: 120,   suffix: '+', fmt: (n) => `${n}`,                 label: 'Insurance products'  },
  { target: 49,    suffix: '',  fmt: (n) => (n / 10).toFixed(1),    label: 'Google rating ★'     },
  { target: 3,     suffix: '+', fmt: (n) => `${n}`,                 label: 'Active markets'      },
]

const bentoProducts = [
  { name: 'Auto',       icon: 'car',         desc: 'MTPL, Casco & roadside assistance from every carrier.',    col: '1 / 3', row: '1 / 3', accent: false }, // 2×2
  { name: 'Life',       icon: 'heart-pulse', desc: 'Term, whole-life & unit-linked in one comparison.',        col: '3 / 4', row: '1 / 3', accent: false }, // 1×2 tall
  { name: 'Travel',     icon: 'plane',       desc: 'Single trip to annual multi-trip.',                        col: '4 / 5', row: '1 / 2', accent: false }, // 1×1
  { name: 'Property',   icon: 'house',       desc: 'Home, contents & landlord, fully digital.',                col: '4 / 5', row: '2 / 3', accent: false }, // 1×1
  { name: 'Health',     icon: 'stethoscope', desc: 'Private medical & critical illness coverage.',             col: '1 / 3', row: '3 / 4', accent: false }, // 2×1
  { name: 'Commercial', icon: 'briefcase',   desc: 'SME liability, property & fleet — all in one place.',      col: '3 / 5', row: '3 / 4', accent: true  }, // 2×1 dark
]

const vps = [
  { n: '01', heading: 'Qualified buyers, not just visitors.',  body: 'Our customers are actively comparing and ready to purchase — not browsing out of curiosity.' },
  { n: '02', heading: 'Zero infrastructure cost.',             body: 'No complex integrations. No months of onboarding. We handle the interface; you handle the product.' },
  { n: '03', heading: 'You pay for results.',                  body: 'No upfront fees for visibility. Our model only works when you win — so everything stays aligned.' },
]

const markets = [{ code: 'BG', flag: '🇧🇬' }, { code: 'IT', flag: '🇮🇹' }, { code: 'ES', flag: '🇪🇸' }, { code: 'FR', flag: '🇫🇷' }, { code: 'DE', flag: '🇩🇪' }]

function AnimStat({ stat, active }: { stat: typeof stats[number]; active: boolean }) {
  const n = useCounter(stat.target, active, stat.target >= 1000 ? 1400 : 1000)
  return <>{stat.fmt(n)}{stat.suffix}</>
}

/* ─── NavBar ────────────────────────────────────────────────────────────────── */

function NavBar() {
  return (
    <nav className="nav-enter sticky top-0 z-50 w-full" style={{ backgroundColor: 'color-mix(in srgb, var(--color-porcelain-white-100) 95%, transparent)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(10,21,23,0.09)' }}>
      <div className="mx-auto flex items-center justify-between px-6 md:px-10" style={{ maxWidth: '80rem', height: '60px' }}>
        <div className="flex items-center gap-2.5"><TrustiMark /><TrustiWordmark /></div>
        <div className="flex items-center gap-5">
          <a href="#partner" style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', fontWeight: 600, color: 'color-mix(in srgb, var(--color-olive-black-900) 55%, transparent)', letterSpacing: '0.02em', textDecoration: 'none', transition: 'color 0.15s' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-olive-black-900)')} onMouseLeave={e => (e.currentTarget.style.color = 'color-mix(in srgb, var(--color-olive-black-900) 55%, transparent)')}>Partner with us</a>
        </div>
      </div>
    </nav>
  )
}

/* ─── Hero — left-aligned split ─────────────────────────────────────────────── */

function Hero() {
  return (
    <section className="relative w-full overflow-hidden" style={{ minHeight: '100svh', backgroundColor: 'var(--color-porcelain-white-100)' }}>
      <TopoBackground />
      <div className="relative z-10 mx-auto flex flex-col justify-center px-6 md:px-10 py-28 md:py-36" style={{ maxWidth: '80rem', minHeight: '100svh' }}>
        <div style={{ maxWidth: '52rem' }}>
          {/* Eyebrow */}
          <div className="hero-eyebrow flex items-center gap-3 mb-8">
            <div style={{ width: '28px', height: '1px', backgroundColor: 'var(--color-olive-black-700)', opacity: 0.5 }} />
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 700, color: 'var(--color-olive-black-700)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>European Insurance Platform</span>
          </div>
          {/* Headline */}
          <h1 className="hero-h1" style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'clamp(2.8rem, 6.5vw, 5.5rem)', lineHeight: 1.05, letterSpacing: '-0.04em', color: 'var(--color-olive-black-900)' }}>
            The insurance<br />
            market,{' '}
            <em style={{ fontStyle: 'italic', fontWeight: 300, color: 'color-mix(in srgb, var(--color-olive-black-900) 42%, transparent)' }}>finally</em>
            <br />on your side.
          </h1>
          {/* Sub */}
          <p className="hero-p" style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)', lineHeight: 1.75, color: 'color-mix(in srgb, var(--color-olive-black-900) 62%, transparent)', maxWidth: '38rem', marginTop: '1.75rem' }}>
            Trusti is a licensed broker and price comparison platform. Every real offer, side by side — no pressure, nothing hidden, so you can choose what's right for you.
          </p>
          {/* Coming soon pill */}
          <div className="hero-tag" style={{ marginTop: '2.25rem', display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', border: '1px solid color-mix(in srgb, var(--color-olive-black-900) 14%, transparent)', borderRadius: '999px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--color-olive-black-700)', display: 'inline-block' }} />
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-olive-black-700)', letterSpacing: '0.04em' }}>Expanding across EU in 2026</span>
          </div>
        </div>
        {/* Bottom market row */}
        <div className="hero-tag" style={{ marginTop: 'auto', paddingTop: '4rem', display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
          {markets.map(m => (
            <div key={m.code} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '0.95rem', lineHeight: 1 }} aria-hidden>{m.flag}</span>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.63rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'color-mix(in srgb, var(--color-olive-black-900) 45%, transparent)' }}>{m.code}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Pillars — editorial numbered rows on white ─────────────────────────────── */

function Pillars() {
  const [ref, inView] = useInView(0.1)
  return (
    <section ref={ref} className="w-full" style={{ backgroundColor: 'var(--color-porcelain-white-100)' }}>
      <div className="mx-auto px-6 md:px-10 py-20 md:py-28" style={{ maxWidth: '80rem' }}>
        {/* Header */}
        <div className="mb-14 md:mb-18" style={reveal(inView, 0)}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'color-mix(in srgb, var(--color-olive-black-900) 40%, transparent)', marginBottom: '10px' }}>What makes Trusti different</p>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3.25rem)', letterSpacing: '-0.03em', color: 'var(--color-olive-black-900)', lineHeight: 1.1, maxWidth: '22ch' }}>Clarity over every alternative.</h2>
        </div>
        {/* Rows */}
        {pillars.map((p, i) => (
          <div key={p.n} style={reveal(inView, 80 + i * 130)}>
            <div style={{ height: '1px', backgroundColor: 'rgba(10,21,23,0.09)' }} />
            <div style={{ display: 'grid', gridTemplateColumns: '56px 1fr', gap: '0 2.5rem', padding: '28px 0' }}>
              {/* Number + icon column */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', paddingTop: '2px' }}>
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', color: 'color-mix(in srgb, var(--color-olive-black-900) 38%, transparent)' }}>{p.n}</span>
                <div style={{ width: '34px', height: '34px', borderRadius: '8px', backgroundColor: '#F0F1EB', border: '1px solid rgba(10,21,23,0.09)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name={p.icon} size={14} style={{ color: 'var(--color-olive-black-900)' }} />
                </div>
              </div>
              {/* Content */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', letterSpacing: '-0.025em', color: 'var(--color-olive-black-900)', lineHeight: 1.25 }}>{p.heading}</h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', lineHeight: 1.8, color: 'color-mix(in srgb, var(--color-olive-black-900) 60%, transparent)', maxWidth: '54ch' }}>{p.body}</p>
              </div>
            </div>
          </div>
        ))}
        <div style={{ height: '1px', backgroundColor: 'rgba(10,21,23,0.09)', ...reveal(inView, 480) }} />
      </div>
    </section>
  )
}

/* ─── Stats — asymmetric editorial split ─────────────────────────────────────── */

function Stats() {
  const [ref, inView] = useInView()
  return (
    <section ref={ref} className="w-full" style={{ backgroundColor: '#ECEEE6' }}>
      <div className="mx-auto px-6 md:px-10 py-20 md:py-28" style={{ maxWidth: '80rem' }}>
        <div className="grid md:grid-cols-2 gap-14 md:gap-20 items-end">
          {/* Left statement */}
          <div style={reveal(inView, 0)}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'color-mix(in srgb, var(--color-olive-black-900) 45%, transparent)', marginBottom: '16px' }}>Built on proof</p>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.04em', lineHeight: 1.05, color: 'var(--color-olive-black-900)' }}>
              Real customers.<br />Real results.<br />
              <em style={{ fontStyle: 'italic', fontWeight: 300, color: 'color-mix(in srgb, var(--color-olive-black-900) 48%, transparent)' }}>Real numbers.</em>
            </h2>
          </div>
          {/* Right stats */}
          <div>
            {/* Hero stat — full width */}
            <div style={{ paddingBottom: '24px', marginBottom: '24px', borderBottom: '1px solid color-mix(in srgb, var(--color-olive-black-900) 12%, transparent)', ...reveal(inView, 120) }}>
              <span className="tabular-nums" style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: 'clamp(3.5rem, 8vw, 6rem)', letterSpacing: '-0.05em', lineHeight: 1, color: 'var(--color-olive-black-900)', display: 'block' }}>
                <AnimStat stat={stats[0]} active={inView} />
              </span>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: 'color-mix(in srgb, var(--color-olive-black-900) 50%, transparent)', marginTop: '4px', display: 'block' }}>{stats[0].label}</span>
            </div>
            {/* Three smaller */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0' }}>
              {stats.slice(1).map((s, i) => (
                <div key={s.label} style={{ padding: '0', paddingRight: i < 2 ? '20px' : '0', paddingLeft: i > 0 ? '20px' : '0', borderRight: i < 2 ? '1px solid color-mix(in srgb, var(--color-olive-black-900) 12%, transparent)' : 'none', ...reveal(inView, 200 + i * 80) }}>
                  <span className="tabular-nums" style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', letterSpacing: '-0.04em', color: 'var(--color-olive-black-900)', display: 'block', lineHeight: 1 }}>
                    <AnimStat stat={s} active={inView} />
                  </span>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: 'color-mix(in srgb, var(--color-olive-black-900) 48%, transparent)', marginTop: '5px', display: 'block', lineHeight: 1.4 }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Bento Grid — 6 product categories ─────────────────────────────────────── */

function BentoGrid() {
  const [ref, inView] = useInView(0.06)
  return (
    <section ref={ref} className="w-full" style={{ backgroundColor: 'var(--color-porcelain-white-100)' }}>
      <div className="mx-auto px-6 md:px-10 py-20 md:py-28" style={{ maxWidth: '80rem' }}>
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12" style={reveal(inView, 0)}>
          <div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'color-mix(in srgb, var(--color-olive-black-900) 40%, transparent)', marginBottom: '10px' }}>Product coverage</p>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', letterSpacing: '-0.03em', color: 'var(--color-olive-black-900)', lineHeight: 1.1 }}>One platform.<br />Every product.</h2>
          </div>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', lineHeight: 1.7, color: 'color-mix(in srgb, var(--color-olive-black-900) 58%, transparent)', maxWidth: '30ch' }}>Your customers compare all six categories in a single Trusti session.</p>
        </div>
        {/* 4-column bento grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gridAutoRows: '158px', gap: '10px', ...reveal(inView, 80, 'in') }}>
          {bentoProducts.map((p, idx) => {
            const isAnchor = p.name === 'Auto'
            const isLarge = isAnchor || p.name === 'Life'
            return (
              <div key={p.name} className="bento-tile" style={{
                gridColumn: p.col, gridRow: p.row,
                borderRadius: '14px',
                padding: isAnchor ? '24px' : '18px',
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                backgroundColor: p.accent ? '#E4E6DE' : '#F0F1EB',
                border: '1px solid rgba(10,21,23,0.08)',
                overflow: 'hidden', position: 'relative',
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(14px)',
                transition: `opacity 0.5s ${QUINT} ${100 + idx * 55}ms, transform 0.5s ${QUINT} ${100 + idx * 55}ms`,
              }}>
                {/* Icon box */}
                <div style={{ width: isAnchor ? '44px' : '32px', height: isAnchor ? '44px' : '32px', borderRadius: '8px', backgroundColor: 'var(--color-porcelain-white-100)', border: '1px solid rgba(10,21,23,0.10)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name={p.icon} size={isAnchor ? 18 : 14} style={{ color: 'var(--color-olive-black-900)' }} />
                </div>
                {/* Text */}
                <div>
                  <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: isAnchor ? '1.2rem' : '0.88rem', letterSpacing: '-0.02em', color: 'var(--color-olive-black-900)', marginBottom: '3px', lineHeight: 1.2 }}>{p.name}</p>
                  {isLarge && <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.76rem', lineHeight: 1.55, color: 'color-mix(in srgb, var(--color-olive-black-900) 58%, transparent)' }}>{p.desc}</p>}
                </div>
                {/* Anchor tile decorative orb */}
                {isAnchor && <div style={{ position: 'absolute', bottom: '-24px', right: '-24px', width: '100px', height: '100px', borderRadius: '50%', backgroundColor: 'var(--color-clarity-green-400)', opacity: 0.30, pointerEvents: 'none' }} />}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ─── B2B Section — split, confident ────────────────────────────────────────── */

function B2BSection() {
  const [ref, inView] = useInView(0.06)
  return (
    <section ref={ref} id="partner" className="w-full" style={{ backgroundColor: '#ECEEE6' }}>
      <div className="mx-auto px-6 md:px-10 py-20 md:py-28" style={{ maxWidth: '80rem' }}>
        <div style={{ height: '1px', backgroundColor: 'color-mix(in srgb, var(--color-olive-black-900) 10%, transparent)', marginBottom: '48px', ...reveal(inView, 0, 'in') }} />
        <div className="grid md:grid-cols-2 gap-16 md:gap-20">
          {/* Left */}
          <div className="flex flex-col justify-between gap-12" style={reveal(inView, 60)}>
            <div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'color-mix(in srgb, var(--color-olive-black-900) 45%, transparent)', marginBottom: '18px' }}>For insurance providers</p>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'clamp(2.2rem, 4.5vw, 3.75rem)', letterSpacing: '-0.04em', lineHeight: 1.05, color: 'var(--color-olive-black-900)' }}>
                Your products.<br />
                <em style={{ fontStyle: 'italic', fontWeight: 300, color: 'color-mix(in srgb, var(--color-olive-black-900) 45%, transparent)' }}>Our</em> reach.<br />
                More customers.
              </h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.92rem', lineHeight: 1.75, color: 'color-mix(in srgb, var(--color-olive-black-900) 62%, transparent)', marginTop: '18px', maxWidth: '36ch' }}>
                Direct access to digitally-active European buyers — without the infrastructure cost of building your own comparison channel.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Button asChild variant="primary" size="lg" style={{ letterSpacing: '-0.01em', alignSelf: 'flex-start' }}>
                <a href="mailto:partnerships@trusti.bg">Partner with Trusti <span className="cta-arrow">→</span></a>
              </Button>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'color-mix(in srgb, var(--color-olive-black-900) 42%, transparent)' }}>No commitment. Just a conversation.</p>
            </div>
          </div>
          {/* Right VP list */}
          <div className="flex flex-col justify-center" style={reveal(inView, 180)}>
            {vps.map((vp, i) => (
              <div key={vp.n}>
                <div style={{ height: '1px', backgroundColor: 'color-mix(in srgb, var(--color-olive-black-900) 10%, transparent)', marginBottom: '22px' }} />
                <div style={{ display: 'grid', gridTemplateColumns: '28px 1fr', gap: '0 18px', paddingBottom: '22px' }}>
                  <span style={{ fontFamily: 'var(--font-heading)', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.08em', color: 'color-mix(in srgb, var(--color-olive-black-900) 30%, transparent)', paddingTop: '3px' }}>{vp.n}</span>
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.98rem', letterSpacing: '-0.02em', color: 'var(--color-olive-black-900)', marginBottom: '5px', lineHeight: 1.3 }}>{vp.heading}</h3>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', lineHeight: 1.7, color: 'color-mix(in srgb, var(--color-olive-black-900) 58%, transparent)' }}>{vp.body}</p>
                  </div>
                </div>
              </div>
            ))}
            <div style={{ height: '1px', backgroundColor: 'color-mix(in srgb, var(--color-olive-black-900) 10%, transparent)' }} />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Footer ────────────────────────────────────────────────────────────────── */

function Footer() {
  return (
    <footer className="w-full" style={{ backgroundColor: '#E6E8DF', borderTop: '1px solid color-mix(in srgb, var(--color-olive-black-900) 10%, transparent)' }}>
      <div className="mx-auto px-6 md:px-10 py-12 md:py-16 grid md:grid-cols-3 gap-10" style={{ maxWidth: '80rem' }}>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2.5"><TrustiMark /><TrustiWordmark /></div>
          <p style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.78rem', color: 'color-mix(in srgb, var(--color-olive-black-900) 55%, transparent)' }}>Insurance without the runaround.</p>
        </div>
        <div className="flex flex-col gap-4">
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'color-mix(in srgb, var(--color-olive-black-900) 38%, transparent)' }}>Active markets</p>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {markets.map(m => (
              <div key={m.code} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <span style={{ fontSize: '0.9rem', lineHeight: 1 }} aria-hidden>{m.flag}</span>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'color-mix(in srgb, var(--color-olive-black-900) 50%, transparent)' }}>{m.code}</span>
              </div>
            ))}
          </div>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', lineHeight: 1.65, color: 'color-mix(in srgb, var(--color-olive-black-900) 48%, transparent)' }}>
            Licensed insurance broker under European financial services regulation. Active in Bulgaria, Italy, and expanding across Europe.
          </p>
        </div>
        <div className="flex flex-col justify-between gap-6">
          <div className="flex items-center gap-3">
            {(['linkedin', 'instagram'] as const).map(name => (
              <a key={name} href="#" aria-label={`Trusti on ${name}`} className="inline-flex items-center justify-center w-8 h-8 rounded-[var(--radius)] transition-colors duration-150"
                style={{ color: 'color-mix(in srgb, var(--color-olive-black-900) 38%, transparent)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--color-olive-black-900)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'color-mix(in srgb, var(--color-olive-black-900) 38%, transparent)' }}>
                <Icon name={name} faStyle="brands" size={15} aria-hidden />
              </a>
            ))}
          </div>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', color: 'color-mix(in srgb, var(--color-olive-black-900) 38%, transparent)' }}>© 2026 Trusti. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

/* ─── Page ──────────────────────────────────────────────────────────────────── */

export default function EuComingSoonPartner() {
  React.useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('%c Trusti ', 'background: #B9E856; color: #0A1517; font-size: 16px; font-weight: 700; padding: 3px 8px; border-radius: 4px;')
    // eslint-disable-next-line no-console
    console.log('%cInsurance without the runaround.\n\nBuilding the future of European insurance distribution.\nInterested? → partnerships@trusti.bg', 'color: #97A7AA; font-size: 11px; line-height: 1.7;')
  }, [])

  return (
    <div style={{ backgroundColor: 'var(--color-porcelain-white-100)' }}>
      {/* eslint-disable-next-line react/no-danger */}
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <ScrollProgress />
      <NavBar />
      <main>
        <Hero />
        <Pillars />
        <Stats />
        <BentoGrid />
        <B2BSection />
      </main>
      <Footer />
    </div>
  )
}
