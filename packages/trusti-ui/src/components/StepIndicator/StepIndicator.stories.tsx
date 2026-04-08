import type { Meta, StoryObj } from '@storybook/react'
import { StepIndicator } from './StepIndicator'

const steps = [
  { label: 'Your vehicle', description: 'Registration & details' },
  { label: 'Your details', description: 'Driver information' },
  { label: 'Compare quotes', description: '14 plans found' },
  { label: 'Checkout', description: 'Payment & policy' },
]

const meta: Meta<typeof StepIndicator> = {
  title: 'Trusti Specific/StepIndicator',
  component: StepIndicator,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
}
export default meta
type Story = StoryObj<typeof StepIndicator>

export const Step1: Story = { render: () => <StepIndicator steps={steps} currentStep={0} /> }
export const Step2: Story = { render: () => <StepIndicator steps={steps} currentStep={1} /> }
export const Step3: Story = { render: () => <StepIndicator steps={steps} currentStep={2} /> }
export const Completed: Story = { render: () => <StepIndicator steps={steps} currentStep={4} /> }
export const Vertical: Story = {
  render: () => (
    <div style={{ width: 260 }}>
      <StepIndicator steps={steps} currentStep={1} orientation="vertical" />
    </div>
  ),
}
