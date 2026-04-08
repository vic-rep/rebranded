import type { Meta, StoryObj } from '@storybook/react'
import { Car, Home, Heart, Plane, ShieldCheck } from 'lucide-react'
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
        icon={<Car size={20} />}
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
        { icon: <Car size={20} />, name: 'Motor MTPL', desc: 'Mandatory third-party liability', price: '€189', badge: 'Most popular', rating: 4.8, count: 2341 },
        { icon: <Car size={20} />, name: 'Casco', desc: 'Comprehensive vehicle cover', price: '€340', badge: undefined, rating: 4.6, count: 1204 },
        { icon: <Home size={20} />, name: 'Home Insurance', desc: 'Buildings and contents cover', price: '€14.99', badge: 'Best value', rating: 4.7, count: 876 },
        { icon: <Heart size={20} />, name: 'Health Insurance', desc: 'Private health and dental cover', price: undefined, badge: undefined, rating: 4.5, count: 432 },
        { icon: <Plane size={20} />, name: 'Travel Insurance', desc: 'Single trip and annual options', price: '€9.99', badge: undefined, rating: 4.4, count: 654 },
        { icon: <ShieldCheck size={20} />, name: 'Life Insurance', desc: 'Term and whole of life policies', price: undefined, badge: undefined, rating: 4.6, count: 289 },
      ].map((p) => (
        <InsuranceProductCard
          key={p.name}
          icon={p.icon}
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
