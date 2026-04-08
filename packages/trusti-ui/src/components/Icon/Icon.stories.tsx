import type { Meta, StoryObj } from '@storybook/react'
import { Icon } from './Icon'

const meta: Meta = {
  title: 'Primitives/Icon',
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
}
export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => <Icon name="shield-check" size={24} />,
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      {[12, 16, 20, 24, 32, 40].map((size) => (
        <Icon key={size} name="shield-check" size={size} />
      ))}
    </div>
  ),
}

export const InsuranceIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
      <Icon name="car"                size={24} label="Motor insurance" />
      <Icon name="house"              size={24} label="Home insurance" />
      <Icon name="heart"              size={24} label="Health insurance" />
      <Icon name="shield-check"       size={24} label="Coverage" />
      <Icon name="star"               size={24} label="Rating" />
      <Icon name="arrow-right"        size={24} label="Next" />
      <Icon name="circle-exclamation" size={24} label="Alert" />
      <Icon name="circle-check"       size={24} label="Success" />
      <Icon name="plane"              size={24} label="Travel" />
      <Icon name="umbrella"           size={24} label="Life" />
      <Icon name="bolt"               size={24} label="Energy" />
      <Icon name="lock"               size={24} label="Security" />
    </div>
  ),
}

export const Styles: Story = {
  name: 'Styles — solid / regular / light',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {(['solid', 'regular', 'light'] as const).map((s) => (
        <div key={s} style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <span style={{ width: 64, fontSize: '0.75rem', color: 'var(--foreground-muted)', fontFamily: 'monospace' }}>{s}</span>
          {['shield-check', 'car', 'house', 'heart', 'star', 'lock'].map((name) => (
            <Icon key={name} name={name} faStyle={s} size={20} />
          ))}
        </div>
      ))}
    </div>
  ),
}

export const Coloured: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Icon name="shield-check" size={24} style={{ color: 'var(--color-clarity-green)' }} />
      <Icon name="shield-check" size={24} style={{ color: 'var(--color-lavender-purple)' }} />
      <Icon name="shield-check" size={24} style={{ color: 'var(--color-porcelain-white)' }} />
      <Icon name="shield-check" size={24} style={{ color: 'var(--color-olive-black)' }} />
    </div>
  ),
}

export const UIChrome: Story = {
  name: 'UI chrome icons',
  render: () => (
    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
      {[
        { name: 'chevron-down',         label: 'Expand' },
        { name: 'chevron-up',           label: 'Collapse' },
        { name: 'chevron-left',         label: 'Back' },
        { name: 'chevron-right',        label: 'Forward' },
        { name: 'xmark',                label: 'Close' },
        { name: 'check',                label: 'Confirm' },
        { name: 'ellipsis',             label: 'More' },
        { name: 'circle-info',          label: 'Info' },
        { name: 'triangle-exclamation', label: 'Warning' },
        { name: 'circle-xmark',         label: 'Error' },
        { name: 'circle-check',         label: 'Success' },
      ].map(({ name, label }) => (
        <div key={name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.375rem' }}>
          <Icon name={name} size={20} />
          <span style={{ fontSize: '0.625rem', color: 'var(--foreground-muted)', fontFamily: 'monospace' }}>{name}</span>
        </div>
      ))}
    </div>
  ),
}
