import type { Meta, StoryObj } from '@storybook/react'
import { Separator } from './Separator'

const meta: Meta<typeof Separator> = {
  title: 'Primitives/Separator',
  component: Separator,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
}
export default meta
type Story = StoryObj<typeof Separator>

export const Horizontal: Story = {
  render: () => (
    <div style={{ width: '300px' }}>
      <p style={{ color: 'var(--foreground)', fontFamily: 'var(--font-body)', marginBottom: '1rem' }}>Above</p>
      <Separator />
      <p style={{ color: 'var(--foreground)', fontFamily: 'var(--font-body)', marginTop: '1rem' }}>Below</p>
    </div>
  ),
}

export const Vertical: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', height: '40px' }}>
      <span style={{ color: 'var(--foreground)', fontFamily: 'var(--font-body)' }}>Left</span>
      <Separator orientation="vertical" />
      <span style={{ color: 'var(--foreground)', fontFamily: 'var(--font-body)' }}>Right</span>
    </div>
  ),
}
