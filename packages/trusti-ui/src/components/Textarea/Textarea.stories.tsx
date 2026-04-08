import type { Meta, StoryObj } from '@storybook/react'
import { Textarea } from './Textarea'

const meta: Meta<typeof Textarea> = {
  title: 'Primitives/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  decorators: [(Story) => <div style={{ width: '320px' }}><Story /></div>],
}
export default meta
type Story = StoryObj<typeof Textarea>

export const Default: Story = { args: { placeholder: 'Describe your vehicle...' } }
export const Disabled: Story = { args: { placeholder: 'Disabled', disabled: true } }
export const Error: Story = { args: { placeholder: 'Required field', error: true } }
