import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { ShieldCheck, Car, Home, Heart, Star, Zap } from 'lucide-react'
import { FadeIn } from './FadeIn'
import { StaggerChildren } from './StaggerChildren'
import { ScaleOnHover } from './ScaleOnHover'
import { AnimatedNumber } from './AnimatedNumber'
import { PresenceTransition } from './PresenceTransition'
import { Button } from '../components/Button/Button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/Card/Card'
import { InsuranceProductCard } from '../components/InsuranceProductCard/InsuranceProductCard'
import { Badge } from '../components/Badge/Badge'
import { Alert, AlertTitle, AlertDescription } from '../components/Alert/Alert'

const meta: Meta = {
  title: 'Motion/Primitives',
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
}
export default meta
type Story = StoryObj

// ─── FadeIn ───────────────────────────────────────────────────────────────────

export const FadeInDemo: Story = {
  name: 'FadeIn — directions',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
      {(['up', 'down', 'left', 'right', 'none'] as const).map((dir) => (
        <FadeIn key={dir} direction={dir} once={false}>
          <Card>
            <CardHeader>
              <CardTitle>Fade {dir}</CardTitle>
              <CardDescription>direction="{dir}"</CardDescription>
            </CardHeader>
          </Card>
        </FadeIn>
      ))}
    </div>
  ),
}

export const FadeInDelays: Story = {
  name: 'FadeIn — staggered delays',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      {[0, 0.1, 0.2, 0.35, 0.5].map((delay, i) => (
        <FadeIn key={i} delay={delay} once={false}>
          <div
            style={{
              padding: '0.75rem 1rem',
              borderRadius: '0.5rem',
              background: 'var(--card)',
              border: '1px solid var(--border)',
              fontSize: '0.875rem',
              color: 'var(--foreground)',
            }}
          >
            Item {i + 1} — delay: {delay}s
          </div>
        </FadeIn>
      ))}
    </div>
  ),
}

// ─── StaggerChildren ──────────────────────────────────────────────────────────

export const StaggerDemo: Story = {
  name: 'StaggerChildren — feature list',
  render: () => (
    <div style={{ maxWidth: 360 }}>
      <StaggerChildren staggerDelay={0.1} once={false}>
        {[
          { icon: <ShieldCheck size={16} />, label: 'FSC Licensed & Regulated' },
          { icon: <Zap size={16} />, label: 'Compare in under 3 minutes' },
          { icon: <Star size={16} />, label: '4.8 Trustpilot rating' },
          { icon: <ShieldCheck size={16} />, label: 'GDPR compliant data handling' },
        ].map((item) => (
          <div
            key={item.label}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.625rem',
              padding: '0.625rem 0',
              borderBottom: '1px solid var(--border)',
              color: 'var(--foreground)',
              fontSize: '0.875rem',
            }}
          >
            <span style={{ color: 'var(--primary)', flexShrink: 0 }}>{item.icon}</span>
            {item.label}
          </div>
        ))}
      </StaggerChildren>
    </div>
  ),
}

export const StaggerCardGrid: Story = {
  name: 'StaggerChildren — card grid',
  render: () => (
    <StaggerChildren
      staggerDelay={0.08}
      once={false}
      style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}
    >
      {[
        { icon: <Car size={20} />,        title: 'Motor',  price: '€89/yr',  badge: 'Most popular' },
        { icon: <Home size={20} />,       title: 'Home',   price: '€120/yr', badge: undefined },
        { icon: <Heart size={20} />,      title: 'Health', price: '€210/yr', badge: 'New' },
      ].map((p) => (
        <InsuranceProductCard
          key={p.title}
          icon={p.icon}
          productName={p.title}
          description={`Comprehensive ${p.title.toLowerCase()} insurance for your needs.`}
          price={p.price}
          badge={p.badge}
          rating={4.7}
          reviewCount={312}
          features={['Online claim filing', '24/7 support']}
        />
      ))}
    </StaggerChildren>
  ),
}

// ─── ScaleOnHover ─────────────────────────────────────────────────────────────

export const ScaleOnHoverDemo: Story = {
  name: 'ScaleOnHover — card lift',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 280px)', gap: '1rem' }}>
      <ScaleOnHover>
        <InsuranceProductCard
          animated={false}
          icon={<Car size={20} />}
          productName="Motor Insurance"
          description="Comprehensive cover for your vehicle."
          price="€89/yr"
          badge="Most popular"
          rating={4.8}
          reviewCount={1240}
          features={['Third party liability', 'Roadside assist']}
        />
      </ScaleOnHover>
      <ScaleOnHover>
        <InsuranceProductCard
          animated={false}
          icon={<Home size={20} />}
          productName="Home Insurance"
          description="Protect your home and contents."
          price="€120/yr"
          rating={4.6}
          reviewCount={890}
          features={['Buildings & contents', 'Accidental damage']}
        />
      </ScaleOnHover>
      <ScaleOnHover scale={1.04} lift={-6}>
        <Card>
          <CardHeader>
            <CardTitle>Custom scale</CardTitle>
            <CardDescription>scale=1.04  lift=6px</CardDescription>
          </CardHeader>
          <CardContent>
            <p style={{ fontSize: '0.875rem', color: 'var(--foreground-muted)' }}>
              Hover to see a stronger lift effect.
            </p>
          </CardContent>
        </Card>
      </ScaleOnHover>
    </div>
  ),
}

// ─── AnimatedNumber ───────────────────────────────────────────────────────────

export const AnimatedNumberDemo: Story = {
  name: 'AnimatedNumber — stat counters',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', textAlign: 'center' }}>
      {[
        { value: 90,   format: (n: number) => `€${Math.round(n)}`,          label: 'avg. savings' },
        { value: 4.8,  format: (n: number) => n.toFixed(1),                 label: 'Trustpilot score' },
        { value: 14,   format: (n: number) => `${Math.round(n)}+`,          label: 'insurers compared' },
        { value: 50000,format: (n: number) => `${Math.round(n / 1000)}k+`,  label: 'policies issued' },
      ].map((stat) => (
        <div
          key={stat.label}
          style={{
            padding: '1.5rem 1rem',
            borderRadius: '0.75rem',
            background: 'var(--card)',
            border: '1px solid var(--border)',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 700,
              fontSize: '2rem',
              color: 'var(--foreground)',
              lineHeight: 1,
            }}
          >
            <AnimatedNumber value={stat.value} format={stat.format} />
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--foreground-muted)', marginTop: '0.375rem' }}>
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  ),
}

// ─── PresenceTransition ───────────────────────────────────────────────────────

export const PresenceTransitionDemo: Story = {
  name: 'PresenceTransition — mount/unmount',
  render: () => {
    const [visible, setVisible] = useState(true)
    const [mode, setMode] = useState<'fade' | 'slide-up' | 'slide-down' | 'scale'>('slide-up')

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: 480 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
          <Button size="sm" onClick={() => setVisible((v) => !v)}>
            {visible ? 'Hide' : 'Show'}
          </Button>
          {(['fade', 'slide-up', 'slide-down', 'scale'] as const).map((m) => (
            <Badge
              key={m}
              variant={mode === m ? 'primary' : 'default'}
              style={{ cursor: 'pointer' }}
              onClick={() => setMode(m)}
            >
              {m}
            </Badge>
          ))}
        </div>

        <div style={{ minHeight: 100 }}>
          <PresenceTransition show={visible} mode={mode} presenceKey={mode}>
            <Alert variant="default">
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>
                Your quote comparison is ready. Mode: <strong>{mode}</strong>
              </AlertDescription>
            </Alert>
          </PresenceTransition>
        </div>
      </div>
    )
  },
}

// ─── Composed pattern ─────────────────────────────────────────────────────────

export const ComposedPattern: Story = {
  name: 'Pattern — animated product listing',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: 960 }}>
      <FadeIn once={false}>
        <div>
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 700,
              fontSize: '1.5rem',
              color: 'var(--foreground)',
              marginBottom: '0.25rem',
            }}
          >
            Compare Motor Insurance
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--foreground-muted)' }}>
            14 insurers · sorted by price
          </p>
        </div>
      </FadeIn>

      <StaggerChildren
        staggerDelay={0.07}
        once={false}
        style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}
      >
        {[
          { name: 'Allianz Motor',  price: '€89/yr',  badge: 'Cheapest',      rating: 4.5 },
          { name: 'AXA Compre.',    price: '€105/yr', badge: 'Best rated',     rating: 4.8 },
          { name: 'Generali Plus',  price: '€118/yr', badge: undefined,        rating: 4.3 },
        ].map((p) => (
          <InsuranceProductCard
            key={p.name}
            animated
            icon={<Car size={20} />}
            productName={p.name}
            description="Motor cover with roadside assistance included."
            price={p.price}
            badge={p.badge}
            rating={p.rating}
            reviewCount={Math.floor(Math.random() * 1000) + 200}
            features={['Third party liability', 'Windscreen cover', 'Claim helpline']}
          />
        ))}
      </StaggerChildren>
    </div>
  ),
}
