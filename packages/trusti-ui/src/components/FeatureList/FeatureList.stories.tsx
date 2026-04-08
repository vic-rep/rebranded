import type { Meta, StoryObj } from '@storybook/react'
import { FeatureList } from './FeatureList'

const meta: Meta<typeof FeatureList> = {
  title: 'Trusti Specific/FeatureList',
  component: FeatureList,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
}
export default meta
type Story = StoryObj<typeof FeatureList>

export const Default: Story = {
  render: () => (
    <div style={{ width: 300 }}>
      <FeatureList items={[
        { label: 'Instant digital policy', description: 'Issued within seconds of payment' },
        { label: '24/7 claims support' },
        { label: 'EU-wide coverage' },
        { label: 'Cancel anytime' },
        { label: 'Green card included', included: false },
      ]} />
    </div>
  ),
}

export const Small: Story = {
  render: () => (
    <div style={{ width: 260 }}>
      <FeatureList size="sm" items={[
        { label: 'EU-wide coverage' },
        { label: 'Digital policy' },
        { label: '24/7 support' },
      ]} />
    </div>
  ),
}
