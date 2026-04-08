import type { Meta, StoryObj } from '@storybook/react'
import { Switch } from './Switch'
import { Label } from '../Label/Label'

const meta: Meta<typeof Switch> = {
  title: 'Primitives/Switch',
  component: Switch,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
}
export default meta
type Story = StoryObj<typeof Switch>

export const Default: Story = {}
export const Checked: Story = { args: { defaultChecked: true } }
export const Disabled: Story = { args: { disabled: true } }
export const WithLabel: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
      <Switch id="notifications" defaultChecked />
      <Label htmlFor="notifications">Email notifications</Label>
    </div>
  ),
}
