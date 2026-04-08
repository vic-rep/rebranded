import type { Meta, StoryObj } from '@storybook/react'
import { RatingDisplay } from './RatingDisplay'

const meta: Meta<typeof RatingDisplay> = {
  title: 'Trusti Specific/RatingDisplay',
  component: RatingDisplay,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
}
export default meta
type Story = StoryObj<typeof RatingDisplay>

export const Default: Story = { render: () => <RatingDisplay score={4.8} reviewCount={2341} /> }
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <RatingDisplay score={4.8} reviewCount={2341} size="sm" />
      <RatingDisplay score={4.8} reviewCount={2341} size="md" />
      <RatingDisplay score={4.8} reviewCount={2341} size="lg" />
    </div>
  ),
}
export const NoReviews: Story = { render: () => <RatingDisplay score={4.5} size="md" /> }
export const NoStars: Story = { render: () => <RatingDisplay score={4.8} reviewCount={2341} showStars={false} /> }
