import type { Meta, StoryObj } from '@storybook/react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './Card'
import { Button } from '../Button/Button'
import { Badge } from '../Badge/Badge'

const meta: Meta = { title: 'Composition/Card', tags: ['autodocs'], parameters: { layout: 'centered' } }
export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <Card style={{ width: '340px' }}>
      <CardHeader>
        <CardTitle>Motor Insurance</CardTitle>
        <CardDescription>Third party liability cover for your vehicle</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-[var(--foreground-muted)]">Compare quotes from 12 insurers in under 2 minutes.</p>
      </CardContent>
      <CardFooter>
        <Button size="sm">Get a quote</Button>
        <Button size="sm" variant="ghost">Learn more</Button>
      </CardFooter>
    </Card>
  ),
}

export const WithBadge: Story = {
  render: () => (
    <Card style={{ width: '340px' }}>
      <CardHeader>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <CardTitle>Home Insurance</CardTitle>
          <Badge variant="primary" size="sm">Best value</Badge>
        </div>
        <CardDescription>Comprehensive cover for your home and contents</CardDescription>
      </CardHeader>
      <CardContent>
        <p style={{ fontSize: '2rem', fontWeight: 700, fontFamily: 'var(--font-heading)', color: 'var(--foreground)' }}>€14.99<span style={{ fontSize: '0.875rem', fontWeight: 400, color: 'var(--foreground-muted)' }}>/mo</span></p>
      </CardContent>
      <CardFooter>
        <Button>Select plan</Button>
      </CardFooter>
    </Card>
  ),
}

export const DarkSection: Story = {
  render: () => (
    <div className="dark" style={{ background: 'var(--background)', padding: '2rem', borderRadius: '0.5rem' }}>
      <Card style={{ width: '340px' }}>
        <CardHeader>
          <CardTitle>Travel Insurance</CardTitle>
          <CardDescription>Cover for your trips across Europe</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-[var(--foreground-muted)]">Single trip and annual multi-trip options available.</p>
        </CardContent>
        <CardFooter>
          <Button size="sm">Compare quotes</Button>
        </CardFooter>
      </Card>
    </div>
  ),
}
