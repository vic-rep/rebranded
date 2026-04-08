import type { Meta, StoryObj } from '@storybook/react'
import { TrustBadge } from './TrustBadge'

const meta: Meta<typeof TrustBadge> = {
  title: 'Trusti Specific/TrustBadge',
  component: TrustBadge,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
}
export default meta
type Story = StoryObj<typeof TrustBadge>

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
      <TrustBadge variant="regulatory" icon={<i className="fa-solid fa-shield-check" style={{ fontSize: 12 }} aria-hidden="true" />} label="FSC Licensed" />
      <TrustBadge variant="regulatory" icon={<i className="fa-solid fa-lock" style={{ fontSize: 12 }} aria-hidden="true" />} label="GDPR Compliant" />
      <TrustBadge variant="rating"     icon={<i className="fa-solid fa-star" style={{ fontSize: 12 }} aria-hidden="true" />} label="4.8 Trustpilot" />
      <TrustBadge variant="neutral" label="14 insurers compared" />
      <TrustBadge variant="neutral" label="Free to use" />
    </div>
  ),
}

export const MarketSpecific: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div>
        <p style={{ fontSize: '0.75rem', opacity: 0.5, marginBottom: '0.5rem', fontFamily: 'monospace' }}>Bulgaria</p>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <TrustBadge variant="regulatory" icon={<i className="fa-solid fa-shield-check" style={{ fontSize: 12 }} aria-hidden="true" />} label="КФН Licensed" />
          <TrustBadge variant="rating"     icon={<i className="fa-solid fa-star" style={{ fontSize: 12 }} aria-hidden="true" />} label="4.8 Trustpilot" />
        </div>
      </div>
      <div>
        <p style={{ fontSize: '0.75rem', opacity: 0.5, marginBottom: '0.5rem', fontFamily: 'monospace' }}>Italy</p>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <TrustBadge variant="regulatory" icon={<i className="fa-solid fa-shield-check" style={{ fontSize: 12 }} aria-hidden="true" />} label="IVASS Registered" />
          <TrustBadge variant="rating"     icon={<i className="fa-solid fa-star" style={{ fontSize: 12 }} aria-hidden="true" />} label="4.7 Trustpilot" />
        </div>
      </div>
    </div>
  ),
}
