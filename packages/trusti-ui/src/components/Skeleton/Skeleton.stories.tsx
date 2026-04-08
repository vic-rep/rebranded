import type { Meta, StoryObj } from '@storybook/react'
import { Skeleton } from './Skeleton'

const meta: Meta<typeof Skeleton> = {
  title: 'Primitives/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
}
export default meta
type Story = StoryObj<typeof Skeleton>

export const Default: Story = {
  render: () => <Skeleton style={{ width: '200px', height: '20px' }} />,
}

export const CardSkeleton: Story = {
  render: () => (
    <div style={{ width: '300px', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <Skeleton style={{ width: '100%', height: '160px' }} />
      <Skeleton style={{ width: '70%', height: '20px' }} />
      <Skeleton style={{ width: '50%', height: '16px' }} />
      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
        <Skeleton style={{ width: '80px', height: '36px' }} />
        <Skeleton style={{ width: '80px', height: '36px' }} />
      </div>
    </div>
  ),
}

export const ProfileSkeleton: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', width: '300px' }}>
      <Skeleton style={{ width: '48px', height: '48px', borderRadius: '9999px' }} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <Skeleton style={{ width: '60%', height: '16px' }} />
        <Skeleton style={{ width: '40%', height: '12px' }} />
      </div>
    </div>
  ),
}
