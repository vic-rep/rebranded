import type { Meta, StoryObj } from '@storybook/react'
import { InsuranceProductCard } from './InsuranceProductCard'

const meta: Meta<typeof InsuranceProductCard> = {
  title: 'Trusti Specific/InsuranceProductCard',
  component: InsuranceProductCard,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
}
export default meta
type Story = StoryObj<typeof InsuranceProductCard>

export const Motor: Story = {
  render: () => (
    <div style={{ width: 300 }}>
      <InsuranceProductCard
        icon={<i className="fa-solid fa-car" style={{ fontSize: 20 }} aria-hidden="true" />}
        productName="Motor MTPL"
        description="Mandatory third-party liability cover. Compare 14 insurers instantly."
        price="€189"
        priceLabel="from"
        rating={4.8}
        reviewCount={2341}
        badge="Most popular"
        features={['Instant digital policy', 'EU-wide coverage', '24/7 claims support']}
      />
    </div>
  ),
}

export const AllProducts: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 280px)', gap: '1rem' }}>
      {[
        { icon: 'car',           name: 'Motor MTPL',      desc: 'Mandatory third-party liability',   price: '€189',   badge: 'Most popular', rating: 4.8, count: 2341 },
        { icon: 'car',           name: 'Casco',           desc: 'Comprehensive vehicle cover',        price: '€340',   badge: undefined,      rating: 4.6, count: 1204 },
        { icon: 'house',         name: 'Home Insurance',  desc: 'Buildings and contents cover',       price: '€14.99', badge: 'Best value',   rating: 4.7, count: 876  },
        { icon: 'heart',         name: 'Health Insurance',desc: 'Private health and dental cover',    price: undefined,badge: undefined,      rating: 4.5, count: 432  },
        { icon: 'plane',         name: 'Travel Insurance',desc: 'Single trip and annual options',     price: '€9.99',  badge: undefined,      rating: 4.4, count: 654  },
        { icon: 'shield-check',  name: 'Life Insurance',  desc: 'Term and whole of life policies',    price: undefined,badge: undefined,      rating: 4.6, count: 289  },
      ].map((p) => (
        <InsuranceProductCard
          key={p.name}
          icon={<i className={`fa-solid fa-${p.icon}`} style={{ fontSize: 20 }} aria-hidden="true" />}
          productName={p.name}
          description={p.desc}
          price={p.price}
          badge={p.badge}
          rating={p.rating}
          reviewCount={p.count}
        />
      ))}
    </div>
  ),
}
