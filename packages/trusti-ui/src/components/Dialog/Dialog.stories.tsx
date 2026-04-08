import type { Meta, StoryObj } from '@storybook/react'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from './Dialog'
import { Button } from '../Button/Button'

const meta: Meta = { title: 'Composition/Dialog', tags: ['autodocs'], parameters: { layout: 'centered' } }
export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild><Button>Open dialog</Button></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cancel your policy?</DialogTitle>
          <DialogDescription>Your coverage will end immediately and you will receive a pro-rata refund within 5 business days.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild><Button variant="ghost">Keep my policy</Button></DialogClose>
          <Button variant="destructive">Cancel policy</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

export const Form: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild><Button variant="outline">Update contact details</Button></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Contact details</DialogTitle>
          <DialogDescription>Update the email address associated with your policy.</DialogDescription>
        </DialogHeader>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', margin: '1rem 0' }}>
          <input placeholder="Email address" style={{ padding: '0.5rem 0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', background: 'var(--background-subtle)', color: 'var(--foreground)', fontSize: '0.875rem' }} />
        </div>
        <DialogFooter>
          <DialogClose asChild><Button variant="ghost">Cancel</Button></DialogClose>
          <Button>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}
