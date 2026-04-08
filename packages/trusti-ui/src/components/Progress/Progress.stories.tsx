import type { Meta, StoryObj } from '@storybook/react'
import { Progress } from './Progress'

const meta: Meta<typeof Progress> = { title: 'Composition/Progress', component: Progress, tags: ['autodocs'], parameters: { layout: 'centered' } }
export default meta
type Story = StoryObj<typeof Progress>

export const Default: Story = { render: () => <div style={{ width: '320px' }}><Progress value={60} /></div> }
export const WithLabel: Story = { render: () => <div style={{ width: '320px' }}><Progress value={75} showLabel /></div> }
export const Steps: Story = {
  render: () => (
    <div style={{ width: '320px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {[0, 25, 50, 75, 100].map((v) => (
        <div key={v}>
          <Progress value={v} showLabel />
        </div>
      ))}
    </div>
  ),
}
