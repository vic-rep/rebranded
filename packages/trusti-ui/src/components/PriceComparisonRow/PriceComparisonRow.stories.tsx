import type { Meta, StoryObj } from '@storybook/react'
import { PriceComparisonRow } from './PriceComparisonRow'

const meta: Meta = {
  title: 'Trusti Specific/PriceComparisonRow',
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
}
export default meta
type Story = StoryObj

const quotes = [
  { name: 'Allianz Bulgaria', price: '€189', rating: 4.8, count: 2341, badge: 'Best price', highlights: ['24/7 claims', 'Digital policy', 'EU coverage'], recommended: true },
  { name: 'Generali', price: '€204', rating: 4.6, count: 1102, badge: undefined, highlights: ['Digital policy', 'EU coverage'], recommended: false },
  { name: 'Bulstrad Vienna', price: '€211', rating: 4.5, count: 876, badge: undefined, highlights: ['24/7 claims', 'EU coverage'], recommended: false },
  { name: 'DZI', price: '€223', rating: 4.3, count: 543, badge: undefined, highlights: ['EU coverage'], recommended: false },
]

export const Default: Story = {
  render: () => (
    <div style={{ maxWidth: 720, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      {quotes.map((q) => (
        <PriceComparisonRow
          key={q.name}
          insurerName={q.name}
          price={q.price}
          rating={q.rating}
          reviewCount={q.count}
          badge={q.badge}
          highlights={q.highlights}
          isRecommended={q.recommended}
        />
      ))}
    </div>
  ),
}
