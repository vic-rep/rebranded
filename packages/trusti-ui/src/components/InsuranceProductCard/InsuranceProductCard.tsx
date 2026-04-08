import * as React from 'react'
import { cn } from '../../lib/utils'
import { Card, CardContent, CardFooter, CardHeader } from '../Card/Card'
import { Button } from '../Button/Button'
import { Badge } from '../Badge/Badge'
import { RatingDisplay } from '../RatingDisplay/RatingDisplay'
import { ScaleOnHover } from '../../motion/ScaleOnHover'

export interface InsuranceProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: React.ReactNode
  productName: string
  description: string
  price?: string
  priceLabel?: string        // e.g. "from" / "avg. annual"
  rating?: number
  reviewCount?: number
  badge?: string             // e.g. "Most popular"
  badgeVariant?: 'primary' | 'secondary' | 'default'
  ctaLabel?: string
  onCta?: () => void
  features?: string[]
  /** Wrap the card in a ScaleOnHover motion lift. Default: false */
  animated?: boolean
}

function InsuranceProductCard({
  icon,
  productName,
  description,
  price,
  priceLabel = 'from',
  rating,
  reviewCount,
  badge,
  badgeVariant = 'primary',
  ctaLabel = 'Get a quote',
  onCta,
  features,
  className,
  animated = false,
  ...props
}: InsuranceProductCardProps) {
  const card = (
    <Card className={cn('flex flex-col h-full', className)} {...props}>
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-[var(--radius)] bg-[var(--primary-subtle)] flex items-center justify-center text-[var(--color-clarity-green-600)] shrink-0">
              {icon}
            </div>
            <div>
              <h3 className="font-[family-name:var(--font-heading)] font-bold text-base text-[var(--foreground)] leading-tight">
                {productName}
              </h3>
              {rating !== undefined && (
                <RatingDisplay score={rating} reviewCount={reviewCount} size="sm" className="mt-0.5" />
              )}
            </div>
          </div>
          {badge && (
            <Badge variant={badgeVariant} size="sm" className="shrink-0">{badge}</Badge>
          )}
        </div>
        <p className="text-sm text-[var(--foreground-muted)] font-[family-name:var(--font-body)] mt-1 leading-relaxed">
          {description}
        </p>
      </CardHeader>

      <CardContent className="flex-1">
        {features && features.length > 0 && (
          <ul className="flex flex-col gap-1.5">
            {features.map((f, i) => (
              <li key={i} className="flex items-center gap-2 text-xs text-[var(--foreground-muted)] font-[family-name:var(--font-body)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--primary)] shrink-0" />
                {f}
              </li>
            ))}
          </ul>
        )}
      </CardContent>

      <CardFooter className="flex items-center justify-between mt-auto pt-4 border-t border-[var(--border)]">
        {price ? (
          <div>
            <span className="text-xs text-[var(--foreground-subtle)] font-[family-name:var(--font-body)]">{priceLabel} </span>
            <span className="font-[family-name:var(--font-heading)] font-bold text-xl text-[var(--foreground)]">{price}</span>
          </div>
        ) : (
          <span className="text-xs text-[var(--foreground-subtle)]">Price on request</span>
        )}
        <Button size="sm" onClick={onCta}>{ctaLabel}</Button>
      </CardFooter>
    </Card>
  )

  if (animated) {
    return (
      <ScaleOnHover style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {card}
      </ScaleOnHover>
    )
  }

  return card
}

export { InsuranceProductCard }
