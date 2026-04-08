import * as React from 'react'
import { cn } from '../../lib/utils'
import { Button } from '../Button/Button'
import { Badge } from '../Badge/Badge'
import { RatingDisplay } from '../RatingDisplay/RatingDisplay'

export interface PriceComparisonRowProps extends React.HTMLAttributes<HTMLDivElement> {
  insurerName: string
  insurerLogo?: string
  price: string
  pricePeriod?: string        // e.g. "/year" "/month"
  rating?: number
  reviewCount?: number
  badge?: string
  highlights?: string[]       // e.g. ["24/7 claims", "Digital policy"]
  onSelect?: () => void
  selectLabel?: string
  isRecommended?: boolean
}

function PriceComparisonRow({
  insurerName,
  insurerLogo,
  price,
  pricePeriod = '/year',
  rating,
  reviewCount,
  badge,
  highlights = [],
  onSelect,
  selectLabel = 'Select',
  isRecommended,
  className,
  ...props
}: PriceComparisonRowProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-4 px-4 py-4 rounded-[var(--radius)]',
        'border bg-[var(--background)] transition-colors',
        isRecommended
          ? 'border-[var(--primary)] bg-[var(--primary-subtle)]'
          : 'border-[var(--border)] hover:border-[var(--border-strong)]',
        className
      )}
      {...props}
    >
      {/* Logo / Name */}
      <div className="w-28 shrink-0 flex items-center">
        {insurerLogo ? (
          <img src={insurerLogo} alt={insurerName} className="h-8 w-auto object-contain grayscale" />
        ) : (
          <span className="font-[family-name:var(--font-heading)] font-bold text-sm text-[var(--foreground)] leading-tight">
            {insurerName}
          </span>
        )}
      </div>

      {/* Rating */}
      <div className="hidden sm:flex w-24 shrink-0">
        {rating !== undefined && (
          <RatingDisplay score={rating} reviewCount={reviewCount} size="sm" />
        )}
      </div>

      {/* Highlights */}
      <div className="hidden md:flex flex-1 flex-wrap gap-1.5">
        {highlights.map((h, i) => (
          <Badge key={i} variant="default" size="sm">{h}</Badge>
        ))}
      </div>

      {/* Price */}
      <div className="ml-auto flex items-baseline gap-0.5 shrink-0">
        <span className="font-[family-name:var(--font-heading)] font-bold text-xl text-[var(--foreground)]">
          {price}
        </span>
        <span className="text-xs text-[var(--foreground-subtle)] font-[family-name:var(--font-body)]">
          {pricePeriod}
        </span>
      </div>

      {/* Badge + CTA */}
      <div className="flex flex-col items-end gap-1.5 shrink-0 min-w-[88px]">
        {badge && <Badge variant="primary" size="sm">{badge}</Badge>}
        <Button size="sm" onClick={onSelect}>{selectLabel}</Button>
      </div>
    </div>
  )
}

export { PriceComparisonRow }
