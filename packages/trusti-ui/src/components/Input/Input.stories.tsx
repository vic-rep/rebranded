import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './Input'

const meta: Meta<typeof Input> = {
  title: 'Primitives/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  decorators: [(Story) => <div style={{ width: '320px' }}><Story /></div>],
}
export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = { args: { placeholder: 'Enter your email' } }
export const WithValue: Story = { args: { defaultValue: 'victor@trusti.bg' } }
export const Disabled: Story = { args: { placeholder: 'Disabled input', disabled: true } }
export const Error: Story = { args: { placeholder: 'Invalid email', error: true, defaultValue: 'not-an-email' } }
export const Password: Story = { args: { type: 'password', placeholder: 'Enter password' } }
