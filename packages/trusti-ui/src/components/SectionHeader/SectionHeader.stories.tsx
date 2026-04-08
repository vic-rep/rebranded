import type { Meta, StoryObj } from '@storybook/react'
import { SectionHeader } from './SectionHeader'
import { Button } from '../Button/Button'

const meta: Meta<typeof SectionHeader> = {
  title: 'Trusti Specific/SectionHeader',
  component: SectionHeader,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
}
export default meta
type Story = StoryObj<typeof SectionHeader>

export const Default: Story = {
  render: () => (
    <SectionHeader
      title="Compare insurance products"
      subtitle="Choose the cover that's right for you. All prices include tax and are updated daily."
      action={<Button variant="ghost" size="sm">View all →</Button>}
    />
  ),
}
export const Centered: Story = {
  render: () => (
    <SectionHeader
      title="Trusted by thousands"
      subtitle="Over 12,000 customers have found better insurance through Trusti."
      align="center"
    />
  ),
}
