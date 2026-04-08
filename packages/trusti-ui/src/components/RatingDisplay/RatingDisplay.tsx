import * as React from 'react'
import { cn } from '../../lib/utils'

export interface RatingDisplayProps extends React.HTMLAttributes<HTMLDivElement> {
  score: number        // e.g. 4.8
  max?: number         // default 5
  reviewCount?: number
  showStars?: boolean
  size?: 'sm' | 'md' | 'lg'
}

function RatingDisplay({
  score,
  max = 5,
  reviewCount,
  showStars = true,
  size = 'md',
  className,
  ...props
}: RatingDisplayProps) {
  const filled = Math.round((score / max) * 5)

  const sizeMap = {
    sm: { star: 12, score: 'text-xs', review: 'text-xs' },
    md: { star: 14, score: 'text-sm', review: 'text-xs' },
    lg: { star: 18, score: 'text-base', review: 'text-sm' },
  }
  const s = sizeMap[size]

  return (
    <div className={cn('inline-flex items-center gap-1.5', className)} {...props}>
      {showStars && (
        <span className="flex items-center gap-0.5" aria-hidden>
          {Array.from({ length: 5 }).map((_, i) => (
            <svg
              key={i}
              width={s.star}
              height={s.star}
              viewBox="0 0 16 16"
              fill={i < filled ? 'var(--color-clarity-green-400)' : 'var(--border)'}
            >
              <path d="M8 1l1.85 3.75 4.14.6-3 2.92.71 4.13L8 10.35l-3.7 1.95.71-4.13L2 5.35l4.14-.6z" />
            </svg>
          ))}
        </span>
      )}
      <span
        className={cn('font-[family-name:var(--font-heading)] font-bold text-[var(--foreground)]', s.score)}
        aria-label={`Rated ${score} out of ${max}`}
      >
        {score.toFixed(1)}
      </span>
      {reviewCount !== undefined && (
        <span className={cn('text-[var(--foreground-subtle)] font-[family-name:var(--font-body)]', s.review)}>
          ({reviewCount.toLocaleString()})
        </span>
      )}
    </div>
  )
}

export { RatingDisplay }
