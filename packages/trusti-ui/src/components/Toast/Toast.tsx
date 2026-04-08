import { Toaster as SonnerToaster, toast } from 'sonner'

// Re-export Sonner's Toaster with Trusti defaults applied
function Toaster() {
  return (
    <SonnerToaster
      position="bottom-right"
      toastOptions={{
        style: {
          background: 'var(--background)',
          color: 'var(--foreground)',
          border: '1px solid var(--border)',
          fontFamily: 'var(--font-body)',
          borderRadius: 'var(--radius)',
        },
        classNames: {
          title: 'font-[family-name:var(--font-heading)] font-semibold text-sm',
          description: 'text-xs text-[var(--foreground-muted)]',
          success: '!border-[var(--color-clarity-green-400)]',
          error: '!border-red-500',
          warning: '!border-yellow-400',
          info: '!border-[var(--color-lavender-purple-500)]',
        },
      }}
      richColors={false}
    />
  )
}

export { Toaster, toast }
