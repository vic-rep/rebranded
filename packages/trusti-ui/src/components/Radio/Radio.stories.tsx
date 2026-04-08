import type { Meta, StoryObj } from '@storybook/react'
import { RadioGroup, RadioGroupItem } from './Radio'
import { Label } from '../Label/Label'

const meta: Meta = {
  title: 'Primitives/Radio',
  component: RadioGroup,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
}
export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="annual">
      {[
        { value: 'monthly', label: 'Monthly' },
        { value: 'annual', label: 'Annual (save 20%)' },
      ].map(({ value, label }) => (
        <div key={value} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <RadioGroupItem value={value} id={value} />
          <Label htmlFor={value}>{label}</Label>
        </div>
      ))}
    </RadioGroup>
  ),
}

export const Disabled: Story = {
  render: () => (
    <RadioGroup defaultValue="a" disabled>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <RadioGroupItem value="a" id="a" />
        <Label htmlFor="a">Option A</Label>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <RadioGroupItem value="b" id="b" />
        <Label htmlFor="b">Option B</Label>
      </div>
    </RadioGroup>
  ),
}
