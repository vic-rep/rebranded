import type { Meta, StoryObj } from '@storybook/react'

const steps = [100, 200, 300, 400, 500, 600, 700, 800, 900] as const

const palettes = [
  {
    name: 'Olive Black',
    prefix: 'olive-black',
    base: 900,
    shades: {
      100: '#E6EAEB', 200: '#C2CBCD', 300: '#97A7AA', 400: '#6A8286',
      500: '#435C60', 600: '#2A3D41', 700: '#182628', 800: '#0F1B1D', 900: '#0A1517',
    },
  },
  {
    name: 'Clarity Green',
    prefix: 'clarity-green',
    base: 400,
    shades: {
      100: '#F4FDE0', 200: '#E8FAC2', 300: '#D4F38A', 400: '#B9E856',
      500: '#9DD628', 600: '#7AB31A', 700: '#5A8512', 800: '#3C580B', 900: '#1E2C05',
    },
  },
  {
    name: 'Lavender Purple',
    prefix: 'lavender-purple',
    base: 500,
    shades: {
      100: '#F3EAFD', 200: '#E4CEFB', 300: '#CEABF7', 400: '#B57DF0',
      500: '#9B5DE5', 600: '#7A3DC4', 700: '#5C259A', 800: '#3E1569', 900: '#200838',
    },
  },
  {
    name: 'Porcelain White',
    prefix: 'porcelain-white',
    base: 100,
    shades: {
      100: '#F9FAF5', 200: '#EDEEE9', 300: '#DADBD4', 400: '#C4C5BF',
      500: '#A8A9A4', 600: '#858680', 700: '#616259', 800: '#3E3F38', 900: '#1E1F1A',
    },
  },
]

const semanticTokens = [
  { token: '--background',         role: 'Page background' },
  { token: '--background-subtle',  role: 'Subtle surface (cards, inputs)' },
  { token: '--background-muted',   role: 'Muted surface (dividers, hover)' },
  { token: '--foreground',         role: 'Primary text' },
  { token: '--foreground-muted',   role: 'Secondary text' },
  { token: '--foreground-subtle',  role: 'Placeholder / disabled text' },
  { token: '--primary',            role: 'Primary CTA background' },
  { token: '--primary-hover',      role: 'Primary CTA hover' },
  { token: '--primary-foreground', role: 'Text on primary' },
  { token: '--primary-subtle',     role: 'Tinted primary surface' },
  { token: '--secondary',          role: 'Secondary action background' },
  { token: '--secondary-hover',    role: 'Secondary action hover' },
  { token: '--secondary-foreground', role: 'Text on secondary' },
  { token: '--secondary-subtle',   role: 'Tinted secondary surface' },
  { token: '--border',             role: 'Default border' },
  { token: '--border-strong',      role: 'Emphasis border' },
  { token: '--error',              role: 'Error state' },
  { token: '--error-subtle',       role: 'Error tint surface' },
  { token: '--success',            role: 'Success state' },
  { token: '--success-subtle',     role: 'Success tint surface' },
]

function Swatch({ hex, label, isBase }: { hex: string; label: string; isBase: boolean }) {
  const isDark = parseInt(hex.slice(1), 16) < 0x888888 * 3
  return (
    <div style={{ flex: 1, minWidth: 0 }}>
      <div
        style={{
          backgroundColor: hex,
          height: '64px',
          borderRadius: '6px',
          outline: isBase ? '2px solid #B9E856' : undefined,
          outlineOffset: '2px',
        }}
      />
      <p style={{ fontSize: '11px', margin: '4px 0 0', color: 'var(--foreground)', opacity: 0.7, fontFamily: 'monospace' }}>{label}</p>
      <p style={{ fontSize: '10px', margin: '2px 0 0', color: 'var(--foreground)', opacity: 0.45, fontFamily: 'monospace' }}>{hex}</p>
      {isBase && <p style={{ fontSize: '10px', margin: '2px 0 0', color: '#B9E856', fontFamily: 'monospace' }}>brand</p>}
    </div>
  )
}

const philosophy = [
  { color: '#F9FAF5', label: 'Porcelain White', rule: 'The canvas — dominant background. Use liberally.' },
  { color: '#0A1517', label: 'Olive Black', rule: 'Text + dark sections. Never use as a tint or accent.' },
  { color: '#B9E856', label: 'Clarity Green', rule: '≤ 8% of any screen. One primary CTA or key highlight only.' },
  { color: '#9B5DE5', label: 'Lavender Purple', rule: '≤ 2% of any screen. Badges, tags, micro-accents. 1–2 touches max.' },
]

function ColorScales() {
  return (
    <div style={{ padding: '2rem', background: 'var(--background)', minHeight: '100vh', fontFamily: 'var(--font-body)' }}>
      <h1 style={{ fontFamily: 'var(--font-heading)', color: 'var(--foreground)', marginBottom: '0.5rem' }}>Colour System</h1>
      <p style={{ color: 'var(--foreground-muted)', marginBottom: '2rem', fontSize: '0.875rem' }}>
        Full 100–900 scale for each brand hue. The <span style={{ color: '#B9E856' }}>highlighted</span> swatch is the brand base.
      </p>

      {/* Philosophy */}
      <div style={{ background: 'var(--background-subtle)', borderRadius: '0.5rem', padding: '1.5rem', marginBottom: '3rem', border: '1px solid var(--border)' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--foreground)', fontSize: '0.875rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Design Philosophy
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '0.75rem' }}>
          {philosophy.map(({ color, label, rule }) => (
            <div key={label} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '6px', background: color, flexShrink: 0, border: '1px solid var(--border)' }} />
              <div>
                <p style={{ margin: 0, fontSize: '0.8rem', fontWeight: 700, color: 'var(--foreground)', fontFamily: 'var(--font-heading)' }}>{label}</p>
                <p style={{ margin: '2px 0 0', fontSize: '0.75rem', color: 'var(--foreground-muted)', lineHeight: 1.4 }}>{rule}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {palettes.map((palette) => (
        <div key={palette.prefix} style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--foreground)', fontSize: '1rem', marginBottom: '0.75rem' }}>
            {palette.name}
          </h2>
          <div style={{ display: 'flex', gap: '8px' }}>
            {steps.map((step) => (
              <Swatch
                key={step}
                hex={palette.shades[step]}
                label={String(step)}
                isBase={step === palette.base}
              />
            ))}
          </div>
          <p style={{ fontSize: '11px', color: 'var(--foreground-subtle)', marginTop: '0.5rem', fontFamily: 'monospace' }}>
            --color-{palette.prefix}-[100–900]
          </p>
        </div>
      ))}

      <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '2rem 0' }} />

      <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--foreground)', fontSize: '1rem', marginBottom: '1.5rem' }}>
        Semantic Tokens
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '0.75rem' }}>
        {semanticTokens.map(({ token, role }) => (
          <div key={token} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '6px', flexShrink: 0,
              background: `var(${token})`,
              border: '1px solid var(--border)',
            }} />
            <div>
              <p style={{ fontSize: '11px', fontFamily: 'monospace', color: 'var(--foreground)', margin: 0 }}>{token}</p>
              <p style={{ fontSize: '11px', color: 'var(--foreground-muted)', margin: '2px 0 0' }}>{role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const meta: Meta = {
  title: 'Foundations/Colors',
  component: ColorScales,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
}

export default meta
type Story = StoryObj

export const Primitives: Story = {}
export const Default = Primitives
