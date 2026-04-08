import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
  title: 'Primitives/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
The \`Button\` component is the primary interactive element across all Trusti surfaces.

**Design principles:**
- Use \`primary\` for the single most important action on a page (e.g. "Get a quote")
- Use \`secondary\` for supporting actions that need visual weight
- Use \`ghost\` or \`outline\` for low-hierarchy or repeated actions (e.g. table row actions)
- Use \`destructive\` only for irreversible actions — pair with a confirmation dialog

**Do:**
- Keep button labels short and action-oriented ("Get quote", "Continue", "Save")
- Use sentence case, not ALL CAPS

**Don't:**
- Place two \`primary\` buttons side by side
- Use \`destructive\` for anything reversible
- Hardcode colours — always use the variant system
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'outline', 'destructive'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
    asChild: { table: { disable: true } },
  },
}

export default meta
type Story = StoryObj<typeof Button>

// ─── Default ──────────────────────────────────────────────────────────────────
export const Default: Story = {
  args: {
    children: 'Get a quote',
    variant: 'primary',
    size: 'md',
  },
}

// ─── Variants ─────────────────────────────────────────────────────────────────
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="destructive">Destructive</Button>
    </div>
  ),
  parameters: { controls: { disable: true } },
}

// ─── Sizes ────────────────────────────────────────────────────────────────────
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
  parameters: { controls: { disable: true } },
}

// ─── Disabled ─────────────────────────────────────────────────────────────────
export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
      <Button variant="primary" disabled>Primary</Button>
      <Button variant="secondary" disabled>Secondary</Button>
      <Button variant="ghost" disabled>Ghost</Button>
      <Button variant="outline" disabled>Outline</Button>
      <Button variant="destructive" disabled>Destructive</Button>
    </div>
  ),
  parameters: { controls: { disable: true } },
}

// ─── As link (asChild) ────────────────────────────────────────────────────────
export const AsLink: Story = {
  render: () => (
    <Button asChild variant="primary">
      <a href="#">Go to dashboard</a>
    </Button>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Use `asChild` to render the button as any element (e.g. `<a>`) while keeping all button styles.',
      },
    },
  },
}

// ─── Dark mode ────────────────────────────────────────────────────────────────
export const DarkMode: Story = {
  render: () => (
    <div className="dark" style={{ background: 'var(--color-olive-black)', padding: '2rem', borderRadius: '0.5rem', display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="destructive">Destructive</Button>
    </div>
  ),
  parameters: { controls: { disable: true } },
}
