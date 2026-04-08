import type { Meta, StoryObj } from '@storybook/react'
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose } from './Drawer'
import { Button } from '../Button/Button'

const meta: Meta = { title: 'Composition/Drawer', tags: ['autodocs'], parameters: { layout: 'centered' } }
export default meta
type Story = StoryObj

export const Right: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild><Button>Open drawer (right)</Button></DrawerTrigger>
      <DrawerContent side="right">
        <DrawerHeader>
          <DrawerTitle>Policy details</DrawerTitle>
          <DrawerDescription>MTPL — Allianz Bulgaria · Policy #BG-2026-00441</DrawerDescription>
        </DrawerHeader>
        <div style={{ flex: 1 }}>
          <p className="text-sm text-[var(--foreground-muted)]">Policy details content goes here.</p>
        </div>
        <DrawerFooter>
          <Button>Download certificate</Button>
          <DrawerClose asChild><Button variant="ghost">Close</Button></DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
}

export const Left: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild><Button variant="outline">Open drawer (left)</Button></DrawerTrigger>
      <DrawerContent side="left">
        <DrawerHeader>
          <DrawerTitle>Navigation</DrawerTitle>
          <DrawerDescription>Browse your policies and account</DrawerDescription>
        </DrawerHeader>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {['Dashboard', 'My Policies', 'Claims', 'Documents', 'Settings'].map((item) => (
            <a key={item} href="#" style={{ padding: '0.5rem 0.75rem', borderRadius: 'var(--radius)', color: 'var(--foreground)', textDecoration: 'none', fontSize: '0.875rem' }}>{item}</a>
          ))}
        </nav>
      </DrawerContent>
    </Drawer>
  ),
}
