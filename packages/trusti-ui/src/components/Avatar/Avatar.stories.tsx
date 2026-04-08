import type { Meta, StoryObj } from '@storybook/react'
import { Avatar, AvatarImage, AvatarFallback } from './Avatar'

const meta: Meta = {
  title: 'Primitives/Avatar',
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
}
export default meta
type Story = StoryObj

export const WithImage: Story = {
  render: () => (
    <Avatar className="h-10 w-10">
      <AvatarImage src="https://github.com/shadcn.png" alt="User" />
      <AvatarFallback>VS</AvatarFallback>
    </Avatar>
  ),
}

export const Fallback: Story = {
  render: () => (
    <Avatar className="h-10 w-10">
      <AvatarFallback>VS</AvatarFallback>
    </Avatar>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      {['h-8 w-8', 'h-10 w-10', 'h-12 w-12', 'h-16 w-16'].map((cls) => (
        <Avatar key={cls} className={cls}>
          <AvatarFallback>VS</AvatarFallback>
        </Avatar>
      ))}
    </div>
  ),
}
