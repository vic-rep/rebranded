import type { Meta, StoryObj } from '@storybook/react'
import { Toaster, toast } from './Toast'
import { Button } from '../Button/Button'

const meta: Meta = {
  title: 'Composition/Toast',
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  decorators: [(Story) => <><Story /><Toaster /></>],
}
export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
      <Button onClick={() => toast('Policy updated successfully')}>Default</Button>
      <Button variant="secondary" onClick={() => toast.success('Payment confirmed', { description: 'Your policy is now active.' })}>Success</Button>
      <Button variant="outline" onClick={() => toast.error('Verification failed', { description: 'Please check your details.' })}>Error</Button>
      <Button variant="ghost" onClick={() => toast.warning('Documents expiring', { description: 'Your registration expires in 14 days.' })}>Warning</Button>
      <Button variant="ghost" onClick={() => toast.info('14 quotes found', { description: 'Based on your profile.' })}>Info</Button>
    </div>
  ),
}
