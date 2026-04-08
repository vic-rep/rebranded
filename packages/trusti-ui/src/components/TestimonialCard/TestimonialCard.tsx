import * as React from 'react'
import { cn } from '../../lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '../Avatar/Avatar'
import { RatingDisplay } from '../RatingDisplay/RatingDisplay'

export interface TestimonialCardProps extends React.HTMLAttributes<HTMLDivElement> {
  quote: string
  authorName: string
  authorTitle?: string
  market?: string              // e.g. "Bulgaria", "Italy"
  avatarSrc?: string
  rating?: number
  source?: string              // e.g. "Trustpilot", "Google"
}

function TestimonialCard({
  quote,
  authorName,
  authorTitle,
  market,
  avatarSrc,
  rating,
  source,
  className,
  ...props
}: TestimonialCardProps) {
  const initials = authorName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <div
      className={cn(
        'flex flex-col gap-4 p-6 rounded-[var(--radius)]',
        'bg-[var(--background-subtle)] border border-[var(--border)]',
        className
      )}
      {...props}
    >
      {/* Rating */}
      {rating !== undefined && (
        <div className="flex items-center justify-between">
          <RatingDisplay score={rating} size="sm" showStars />
          {source && (
            <span className="text-xs text-[var(--foreground-subtle)] font-[family-name:var(--font-body)]">
              via {source}
            </span>
          )}
        </div>
      )}

      {/* Quote */}
      <blockquote className="text-sm text-[var(--foreground)] font-[family-name:var(--font-body)] leading-relaxed italic flex-1">
        "{quote}"
      </blockquote>

      {/* Author */}
      <div className="flex items-center gap-3 pt-2 border-t border-[var(--border)]">
        <Avatar className="h-9 w-9">
          {avatarSrc && <AvatarImage src={avatarSrc} alt={authorName} />}
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col min-w-0">
          <span className="font-[family-name:var(--font-heading)] font-semibold text-sm text-[var(--foreground)] leading-tight truncate">
            {authorName}
          </span>
          <span className="text-xs text-[var(--foreground-muted)] font-[family-name:var(--font-body)]">
            {[authorTitle, market].filter(Boolean).join(' · ')}
          </span>
        </div>
      </div>
    </div>
  )
}

export { TestimonialCard }
