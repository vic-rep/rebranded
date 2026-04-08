import type { Meta, StoryObj } from '@storybook/react'
import { Alert, AlertTitle, AlertDescription } from './Alert'

const meta: Meta = { title: 'Composition/Alert', tags: ['autodocs'], parameters: { layout: 'centered' } }
export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <div style={{ width: '420px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Alert variant="info" icon={<i className="fa-solid fa-circle-info" style={{ fontSize: 16 }} aria-hidden="true" />}>
        <AlertTitle>Your quote is ready</AlertTitle>
        <AlertDescription>We found 14 matching plans based on your profile.</AlertDescription>
      </Alert>
      <Alert variant="success" icon={<i className="fa-solid fa-circle-check" style={{ fontSize: 16 }} aria-hidden="true" />}>
        <AlertTitle>Payment confirmed</AlertTitle>
        <AlertDescription>Your policy is now active and documents have been sent to your email.</AlertDescription>
      </Alert>
      <Alert variant="warning" icon={<i className="fa-solid fa-triangle-exclamation" style={{ fontSize: 16 }} aria-hidden="true" />}>
        <AlertTitle>Documents expiring soon</AlertTitle>
        <AlertDescription>Your vehicle registration expires in 14 days.</AlertDescription>
      </Alert>
      <Alert variant="error" icon={<i className="fa-solid fa-circle-xmark" style={{ fontSize: 16 }} aria-hidden="true" />}>
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
