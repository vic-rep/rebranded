import type { Meta, StoryObj } from '@storybook/react'
import { HeroSection } from './HeroSection'
import { Button } from '../Button/Button'

const meta: Meta<typeof HeroSection> = {
  title: 'Trusti Specific/HeroSection',
  component: HeroSection,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
}
export default meta
type Story = StoryObj<typeof HeroSection>

export const Default: Story = {
  render: () => (
    <HeroSection
      eyebrow="Compare insurance in minutes"
      headline="The smarter way to protect what matters"
      subheadline="Compare quotes from Bulgaria's leading insurers. Transparent pricing, no hidden fees, instant cover."
      primaryAction={<Button size="lg">Get a free quote</Button>}
      secondaryAction={<Button size="lg" variant="ghost" style={{ color: 'var(--color-porcelain-white-400)' }}>See how it works</Button>}
    />
  ),
}

export const Centered: Story = {
  render: () => (
    <HeroSection
      align="center"
      headline="Insurance you can trust"
      subheadline="Rated 4.8 on Trustpilot by over 12,000 customers across Bulgaria and Europe."
      primaryAction={<Button size="lg">Compare quotes</Button>}
    />
  ),
}
