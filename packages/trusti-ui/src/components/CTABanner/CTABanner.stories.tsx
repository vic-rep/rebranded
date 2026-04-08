import type { Meta, StoryObj } from '@storybook/react'
import { CTABanner } from './CTABanner'
import { Button } from '../Button/Button'

const meta: Meta<typeof CTABanner> = {
  title: 'Trusti Specific/CTABanner',
  component: CTABanner,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
}
export default meta
type Story = StoryObj<typeof CTABanner>

export const Dark: Story = {
  render: () => (
    <CTABanner
      variant="dark"
      headline="Ready to save on your insurance?"
      subtext="Join over 12,000 customers who found a better deal with Trusti. Free to use, no commitment."
      primaryAction={<Button size="lg">Compare quotes now</Button>}
      secondaryAction={<Button size="lg" variant="outline" style={{ borderColor: 'rgba(249,250,245,0.2)', color: 'var(--color-porcelain-white-100)' }}>Learn more</Button>}
    />
  ),
}

export const Green: Story = {
  render: () => (
    <CTABanner
      variant="green"
      headline="Your MTPL renews in 14 days"
      subtext="Don't auto-renew without comparing. Takes 2 minutes."
      primaryAction={<Button size="lg" variant="secondary">Compare now</Button>}
    />
  ),
}
