import type { Meta, StoryObj } from '@storybook/react'
import { PartnerLogoStrip } from './PartnerLogoStrip'

const logos = [
  { name: 'Allianz' },
  { name: 'Generali' },
  { name: 'Bulstrad' },
  { name: 'DZI' },
  { name: 'Euroins' },
  { name: 'Lev Ins' },
  { name: 'Uniqa' },
]

const meta: Meta<typeof PartnerLogoStrip> = {
  title: 'Trusti Specific/PartnerLogoStrip',
  component: PartnerLogoStrip,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
}
export default meta
type Story = StoryObj<typeof PartnerLogoStrip>

export const Default: Story = {
  render: () => (
    <div style={{ maxWidth: 720 }}>
      <PartnerLogoStrip logos={logos} label="Insurers we compare" />
    </div>
  ),
}
