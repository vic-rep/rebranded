import type { Meta, StoryObj } from '@storybook/react'
import { Alert, AlertTitle, AlertDescription } from './Alert'
import { Info, CheckCircle, AlertTriangle, XCircle } from 'lucide-react'

const meta: Meta = { title: 'Composition/Alert', tags: ['autodocs'], parameters: { layout: 'centered' } }
export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <div style={{ width: '420px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Alert variant="info" icon={<Info size={16} />}>
        <AlertTitle>Your quote is ready</AlertTitle>
        <AlertDescription>We found 14 matching plans based on your profile.</AlertDescription>
      </Alert>
      <Alert variant="success" icon={<CheckCircle size={16} />}>
        <AlertTitle>Payment confirmed</AlertTitle>
        <AlertDescription>Your policy is now active and documents have been sent to your email.</AlertDescription>
      </Alert>
      <Alert variant="warning" icon={<AlertTriangle size={16} />}>
        <AlertTitle>Documents expiring soon</AlertTitle>
        <AlertDescription>Your vehicle registration expires in 14 days.</AlertDescription>
      </Alert>
      <Alert variant="error" icon={<XCircle size={16} />}>
        <AlertTitle>Verification failed</AlertTitle>
        <AlertDescription>We could not verify your identity. Please check your details and try again.</AlertDescription>
      </Alert>
    </div>
  ),
}

export const NoIcon: Story = {
  render: () => (
    <Alert variant="info" style={{ width: '420px' }}>
      <AlertTitle>Scheduled maintenance</AlertTitle>
      <AlertDescription>Our systems will be unavailable on Saturday 12 April from 02:00–04:00 CET.</AlertDescription>
    </Alert>
  ),
}
