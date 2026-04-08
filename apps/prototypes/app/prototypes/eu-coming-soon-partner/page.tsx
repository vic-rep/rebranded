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

/* ─── Animation styles ──────────────────────────────────────────────────────── */

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
  @keyframes draw-line {
    from { stroke-dashoffset: 2000; }
    to   { stroke-dashoffset: 0;    }
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
  .pillar-card {
    transition:
      transform 0.22s ${EASE_OUT_QUART},
      box-shadow 0.22s ${EASE_OUT_QUART};
  }
  .pillar-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 36px rgba(0, 0, 0, 0.28);
  }

  @media (prefers-reduced-motion: reduce) {
    .nav-enter, .hero-h1, .hero-p, .hero-tag {
      animation: none !important;
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
  { value: '3+', label: 'Markets and growing' },
  { value: '120+', label: 'Insurance products available' },
  { value: '10,000+', label: 'Satisfied customers' },
  { value: '4.9 ★', label: 'Google rating' },
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

/* ─── Topographic background ────────────────────────────────────────────────── */

function TopoBackground() {
  const lineColor   = 'var(--color-olive-black-700)'
  const midColor    = 'var(--color-olive-black-600)'
  const accentColor = 'var(--color-clarity-green-400)'

  const lines: Array<{ d: string; color: string; opacity: number; width: number }> = [
    { d: 'M-100 45 C 150 32 350 58 600 43 C 850 28 1100 52 1350 40 L 1600 45',   color: lineColor,   opacity: 0.35, width: 1   },
    { d: 'M-100 108 C 200 95 420 118 680 104 C 940 90 1190 114 1440 101 L 1600 108', color: lineColor, opacity: 0.3,  width: 1   },
    { d: 'M-100 170 C 130 157 380 173 630 160 C 880 147 1130 171 1380 158 L 1600 170', color: lineColor, opacity: 0.35, width: 1 },
    { d: 'M-100 232 C 250 219 490 242 750 229 C 1010 216 1250 239 1500 226 L 1600 232', color: midColor, opacity: 0.4, width: 1  },
    { d: 'M-100 294 C 160 281 400 304 660 291 C 920 278 1170 301 1420 288 L 1600 294', color: midColor, opacity: 0.4, width: 1  },
    { d: 'M-100 356 C 230 343 480 366 740 353 C 1000 340 1250 363 1500 350 L 1600 356', color: midColor, opacity: 0.35, width: 1 },
    { d: 'M-100 418 C 140 405 380 428 640 415 C 900 402 1150 425 1400 412 L 1600 418', color: lineColor, opacity: 0.3, width: 1  },
    // Green accent — the single signal line
    { d: 'M-100 480 C 200 467 440 490 700 477 C 960 464 1210 487 1460 474 L 1600 480', color: accentColor, opacity: 0.45, width: 1.5 },
    { d: 'M-100 542 C 170 529 410 552 670 539 C 930 526 1180 549 1430 536 L 1600 542', color: lineColor, opacity: 0.3, width: 1  },
    { d: 'M-100 604 C 240 591 480 614 740 601 C 1000 588 1250 611 1500 598 L 1600 604', color: lineColor, opacity: 0.35, width: 1 },
    { d: 'M-100 666 C 150 653 390 676 650 663 C 910 650 1160 673 1410 660 L 1600 666', color: lineColor, opacity: 0.28, width: 1  },
    { d: 'M-100 728 C 220 715 460 738 720 725 C 980 712 1230 735 1480 722 L 1600 728', color: lineColor, opacity: 0.25, width: 1  },
    { d: 'M-100 790 C 130 777 370 800 630 787 C 890 774 1140 797 1390 784 L 1600 790', color: lineColor, opacity: 0.22, width: 1  },
    { d: 'M-100 852 C 200 839 440 862 700 849 C 960 836 1210 859 1460 846 L 1600 852', color: lineColor, opacity: 0.18, width: 1  },
  ]

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none select-none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      {lines.map((line, i) => (
        <path
          key={i}
          d={line.d}
          fill="none"
          style={{
            stroke: line.color,
            strokeDasharray: '2000',
            animation: `draw-line 1.6s ${EASE_OUT_EXPO} ${i * 65}ms both`,
          }}
          strokeWidth={line.width}
          opacity={line.opacity}
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
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M10 1 L19 10 L10 19 L1 10 Z"
        fill="var(--color-clarity-green-400)"
      />
      <path
        d="M7 8.5 H13 M10 8.5 V13"
        stroke="var(--color-olive-black-900)"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  )
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
              <CardTitle
                style={{ color: 'var(--color-porcelain-white-100)' }}
              >
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
              className="font-[family-name:var(--font-heading)] font-bold leading-none"
              style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                color: 'var(--color-clarity-green-400)',
                letterSpacing: '-0.03em',
              }}
            >
              {s.value}
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
          style={{
            color: 'var(--foreground-subtle)',
            ...revealStyle(inView, 0, 'in'),
          }}
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
        {/* Headline */}
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

        {/* Value props */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 w-full mt-14 text-left"
        >
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
                style={{
                  color: 'color-mix(in srgb, var(--color-porcelain-white-100) 65%, transparent)',
                }}
              >
                {vp.body}
              </p>
            </div>
          ))}
        </div>

        {/* CTA — the single dominant interactive element */}
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
              Partner with Trusti →
            </a>
          </Button>

          <p
            className="font-[family-name:var(--font-body)] text-sm"
            style={{
              color: 'color-mix(in srgb, var(--color-porcelain-white-100) 55%, transparent)',
            }}
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
        {/* Left — brand */}
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

        {/* Right — markets, regulatory, social */}
        <div className="flex flex-col gap-5">
          {/* Market flags */}
          <div className="flex items-center gap-3 flex-wrap">
            {markets.map((m) => (
              <div
                key={m.code}
                className="flex items-center gap-1.5"
                title={m.code}
              >
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

          {/* Regulatory */}
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

          {/* Social + copyright */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <a
                href="#"
                aria-label="Trusti on LinkedIn"
                className="inline-flex items-center justify-center w-8 h-8 rounded-[var(--radius)] transition-colors duration-150"
                style={{ color: 'var(--color-porcelain-white-600)' }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLElement).style.color =
                    'var(--color-porcelain-white-100)'
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLElement).style.color =
                    'var(--color-porcelain-white-600)'
                }}
              >
                <Icon name="linkedin" faStyle="brands" size={16} aria-hidden />
              </a>
              <a
                href="#"
                aria-label="Trusti on Instagram"
                className="inline-flex items-center justify-center w-8 h-8 rounded-[var(--radius)] transition-colors duration-150"
                style={{ color: 'var(--color-porcelain-white-600)' }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLElement).style.color =
                    'var(--color-porcelain-white-100)'
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLElement).style.color =
                    'var(--color-porcelain-white-600)'
                }}
              >
                <Icon name="instagram" faStyle="brands" size={16} aria-hidden />
              </a>
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
  return (
    <div style={{ backgroundColor: 'var(--color-olive-black-900)' }}>
      {/* eslint-disable-next-line react/no-danger */}
      <style dangerouslySetInnerHTML={{ __html: ANIM_CSS }} />
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
