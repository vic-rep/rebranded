import type { Meta, StoryObj } from '@storybook/react'
import { TestimonialCard } from './TestimonialCard'

const meta: Meta = {
  title: 'Trusti Specific/TestimonialCard',
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
}
export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <div style={{ width: 360 }}>
      <TestimonialCard
        quote="Saved €90 on my MTPL renewal in under 3 minutes. The comparison was completely transparent — no hidden fees, no upselling."
        authorName="Georgi Petrov"
        authorTitle="Sofia"
        market="Bulgaria"
        rating={5}
        source="Trustpilot"
      />
    </div>
  ),
}

export const Grid: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 300px)', gap: '1rem' }}>
      {[
        { quote: "Saved €90 on my MTPL renewal. Completely transparent — no hidden fees.", name: "Georgi Petrov", title: "Sofia", market: "Bulgaria", rating: 5 },
        { quote: "Finally an insurance comparison tool that doesn't trick you into extras.", name: "Maria Ivanova", title: "Plovdiv", market: "Bulgaria", rating: 5 },
        { quote: "Ho trovato un'assicurazione auto 40% più economica in pochi minuti.", name: "Marco Rossi", title: "Milano", market: "Italy", rating: 4.8 },
      ].map((t) => (
        <TestimonialCard
          key={t.name}
          quote={t.quote}
          authorName={t.name}
          authorTitle={t.title}
          market={t.market}
          rating={t.rating}
          source="Trustpilot"
        />
      ))}
    </div>
  ),
}
