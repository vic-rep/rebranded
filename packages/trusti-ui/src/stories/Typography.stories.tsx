import type { Meta, StoryObj } from '@storybook/react'

function TypographyScale() {
  return (
    <div style={{ fontFamily: 'Nunito, sans-serif', padding: '2rem', color: 'var(--foreground)', background: 'var(--background)', minHeight: '100vh' }}>
      <h1 style={{ fontFamily: 'Montserrat, sans-serif', marginBottom: '2rem' }}>Typography</h1>

      <section style={{ marginBottom: '3rem' }}>
        <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.5, marginBottom: '1rem' }}>
          Montserrat — Headings
        </p>
        {[
          { label: 'Display', size: '3rem', weight: 700 },
          { label: 'H1', size: '2.25rem', weight: 700 },
          { label: 'H2', size: '1.875rem', weight: 700 },
          { label: 'H3', size: '1.5rem', weight: 600 },
          { label: 'H4', size: '1.25rem', weight: 600 },
        ].map((t) => (
          <div key={t.label} style={{ marginBottom: '1rem' }}>
            <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: t.size, fontWeight: t.weight, lineHeight: 1.2 }}>
              {t.label} — The quick brown fox
            </span>
            <p style={{ fontSize: '0.7rem', opacity: 0.4, margin: '0.25rem 0 0' }}>{t.size} / weight {t.weight}</p>
          </div>
        ))}
      </section>

      <section>
        <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.5, marginBottom: '1rem' }}>
          Nunito — Body
        </p>
        {[
          { label: 'Large', size: '1.125rem', weight: 400 },
          { label: 'Base', size: '1rem', weight: 400 },
          { label: 'Small', size: '0.875rem', weight: 400 },
          { label: 'XSmall', size: '0.75rem', weight: 400 },
        ].map((t) => (
          <div key={t.label} style={{ marginBottom: '0.75rem' }}>
            <span style={{ fontFamily: 'Nunito, sans-serif', fontSize: t.size, fontWeight: t.weight, lineHeight: 1.6 }}>
              {t.label} — Clarity over persuasion. No dark patterns, no urgency tricks.
            </span>
            <p style={{ fontSize: '0.7rem', opacity: 0.4, margin: '0.25rem 0 0' }}>{t.size} / weight {t.weight}</p>
          </div>
        ))}
      </section>
    </div>
  )
}

const meta: Meta = {
  title: 'Foundations/Typography',
  component: TypographyScale,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj

export const Default: Story = {}
