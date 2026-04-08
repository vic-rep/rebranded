import type { Meta, StoryObj } from '@storybook/react'

const colors = [
  { name: 'Olive Black', token: '--color-olive-black', hex: '#0A1517', role: 'Primary background, dark surfaces — 60%' },
  { name: 'Clarity Green', token: '--color-clarity-green', hex: '#B9E856', role: 'Primary accent, CTAs, highlights — 30%' },
  { name: 'Lavender Purple', token: '--color-lavender-purple', hex: '#9B5DE5', role: 'Secondary accent, tags, badges — 8%' },
  { name: 'Porcelain White', token: '--color-porcelain-white', hex: '#F9FAF5', role: 'Text on dark, light backgrounds — 2%' },
]

function ColorPalette() {
  return (
    <div style={{ fontFamily: 'Nunito, sans-serif', padding: '2rem' }}>
      <h1 style={{ fontFamily: 'Montserrat, sans-serif', marginBottom: '2rem' }}>Colour Palette</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.5rem' }}>
        {colors.map((c) => (
          <div key={c.token} style={{ borderRadius: '0.5rem', overflow: 'hidden', border: '1px solid rgba(249,250,245,0.12)' }}>
            <div style={{ backgroundColor: c.hex, height: '120px' }} />
            <div style={{ padding: '1rem', backgroundColor: '#0A1517', color: '#F9FAF5' }}>
              <p style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, margin: '0 0 0.25rem' }}>{c.name}</p>
              <p style={{ fontSize: '0.75rem', margin: '0 0 0.25rem', opacity: 0.6 }}>{c.hex}</p>
              <p style={{ fontSize: '0.75rem', margin: '0 0 0.25rem', opacity: 0.6 }}>{c.token}</p>
              <p style={{ fontSize: '0.75rem', margin: 0, opacity: 0.8 }}>{c.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const meta: Meta = {
  title: 'Foundations/Colors',
  component: ColorPalette,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj

export const Default: Story = {}
