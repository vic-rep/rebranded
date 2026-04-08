'use client'

import * as React from 'react'
import { cn } from '../../lib/utils'
import { Icon } from '../Icon'

export interface ThemeToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

function ThemeToggle({ className, ...props }: ThemeToggleProps) {
  const [isDark, setIsDark] = React.useState(true)

  React.useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'))
  }, [])

  const toggle = () => {
    const root = document.documentElement
    const nowDark = root.classList.toggle('dark')
    setIsDark(nowDark)
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={cn(
        'inline-flex items-center justify-center w-9 h-9',
        'rounded-[var(--radius)] cursor-pointer',
        'text-[var(--foreground-muted)] hover:text-[var(--foreground)]',
        'hover:bg-[color-mix(in_srgb,var(--foreground)_8%,transparent)]',
        'transition-colors duration-150',
        'focus-visible:outline-none focus-visible:ring-2',
        'focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2',
        'focus-visible:ring-offset-[var(--background)]',
        className
      )}
      {...props}
    >
      <Icon name={isDark ? 'sun' : 'moon'} size={15} aria-hidden />
    </button>
  )
}

export { ThemeToggle }
