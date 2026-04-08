import * as React from 'react'
import { cn } from '../../lib/utils'

export interface FeatureItem {
  icon?: React.ReactNode
  label: string
  description?: string
  included?: boolean  // false = greyed out / not included
}

export interface FeatureListProps extends React.HTMLAttributes<HTMLUListElement> {
  items: FeatureItem[]
  size?: 'sm' | 'md'
}

function FeatureList({ items, size = 'md', className, ...props }: FeatureListProps) {
  return (
    <ul
      className={cn('flex flex-col', size === 'sm' ? 'gap-2' : 'gap-3', className)}
      {...props}
    >
      {items.map((item, index) => {
        const included = item.included !== false
        return (
          <li
            key={index}
            className={cn(
              'flex items-start gap-2.5',
              !included && 'opacity-40'
            )}
          >
            <span
              className={cn(
                'shrink-0 mt-0.5 flex items-center justify-center rounded-full',
                size === 'sm' ? 'h-4 w-4' : 'h-5 w-5',
                included
                  ? 'bg-[var(--primary-subtle)] text-[var(--color-clarity-green-600)]'
                  : 'bg-[var(--background-muted)] text-[var(--foreground-subtle)]'
              )}
            >
              {item.icon ?? (
                <i
                  className={`fa-solid fa-check ${size === 'sm' ? 'text-[0.5rem]' : 'text-[0.625rem]'}`}
                  aria-hidden="true"
                />
              )}
            </span>
            <div className="flex flex-col gap-0.5 min-w-0">
              <span
                className={cn(
                  'font-[family-name:var(--font-body)] font-medium text-[var(--foreground)]',
                  size === 'sm' ? 'text-xs' : 'text-sm'
                )}
              >
                {item.label}
              </span>
              {item.description && (
                <span className="text-xs text-[var(--foreground-muted)] font-[family-name:var(--font-body)]">
                  {item.description}
                </span>
              )}
            </div>
          </li>
        )
      })}
    </ul>
  )
}

export { FeatureList }
