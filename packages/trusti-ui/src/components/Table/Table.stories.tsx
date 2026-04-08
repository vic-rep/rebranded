import type { Meta, StoryObj } from '@storybook/react'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableCaption } from './Table'
import { Badge } from '../Badge/Badge'

const meta: Meta = { title: 'Composition/Table', tags: ['autodocs'], parameters: { layout: 'centered' } }
export default meta
type Story = StoryObj

const quotes = [
  { insurer: 'Allianz Bulgaria', premium: '€189.00', cover: '€2,000,000', rating: 4.8, status: 'Best value' },
  { insurer: 'Generali', premium: '€204.50', cover: '€2,000,000', rating: 4.6, status: null },
  { insurer: 'Bulstrad Vienna Insurance', premium: '€211.00', cover: '€2,500,000', rating: 4.5, status: null },
  { insurer: 'DZI', premium: '€223.00', cover: '€2,000,000', rating: 4.3, status: null },
]

export const Default: Story = {
  render: () => (
    <div style={{ width: '680px' }}>
      <Table>
        <TableCaption>MTPL quotes for Sofia — April 2026</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Insurer</TableHead>
            <TableHead>Annual premium</TableHead>
            <TableHead>Cover limit</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {quotes.map((q) => (
            <TableRow key={q.insurer}>
              <TableCell className="font-medium">{q.insurer}</TableCell>
              <TableCell className="font-[family-name:var(--font-heading)] font-semibold">{q.premium}</TableCell>
              <TableCell>{q.cover}</TableCell>
              <TableCell>★ {q.rating}</TableCell>
              <TableCell>
                {q.status ? <Badge variant="primary" size="sm">{q.status}</Badge> : null}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  ),
}
