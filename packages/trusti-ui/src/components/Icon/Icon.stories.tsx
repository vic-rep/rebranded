import type { Meta, StoryObj } from '@storybook/react'
import { Icon } from './Icon'
import { ShieldCheck, Car, Home, Heart, Star, ArrowRight, AlertCircle, CheckCircle } from 'lucide-react'

const meta: Meta = {
  title: 'Primitives/Icon',
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
}
export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => <Icon icon={ShieldCheck} size={24} />,
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      {[12, 16, 20, 24, 32, 40].map((size) => (
        <Icon key={size} icon={ShieldCheck} size={size} />
      ))}
    </div>
  ),
}

export const InsuranceIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
      <Icon icon={Car} size={24} label="Motor insurance" />
      <Icon icon={Home} size={24} label="Home insurance" />
      <Icon icon={Heart} size={24} label="Health insurance" />
      <Icon icon={ShieldCheck} size={24} label="Coverage" />
      <Icon icon={Star} size={24} label="Rating" />
      <Icon icon={ArrowRight} size={24} label="Next" />
      <Icon icon={AlertCircle} size={24} label="Alert" />
      <Icon icon={CheckCircle} size={24} label="Success" />
    </div>
  ),
}

export const Coloured: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Icon icon={ShieldCheck} size={24} color="var(--color-clarity-green)" />
      <Icon icon={ShieldCheck} size={24} color="var(--color-lavender-purple)" />
      <Icon icon={ShieldCheck} size={24} color="var(--color-porcelain-white)" />
    </div>
  ),
}
