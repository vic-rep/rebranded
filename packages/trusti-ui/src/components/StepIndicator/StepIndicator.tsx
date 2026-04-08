import * as React from 'react'
import { cn } from '../../lib/utils'

export type StepStatus = 'completed' | 'active' | 'pending'

export interface Step {
  label: string
  description?: string
}

export interface StepIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: Step[]
  currentStep: number  // 0-indexed
  orientation?: 'horizontal' | 'vertical'
}

function StepIndicator({
  steps,
  currentStep,
  orientation = 'horizontal',
  className,
  ...props
}: StepIndicatorProps) {
  const getStatus = (index: number): StepStatus => {
    if (index < currentStep) return 'completed'
    if (index === currentStep) return 'active'
    return 'pending'
  }

  return (
    <div
      className={cn(
        orientation === 'horizontal'
          ? 'flex items-start justify-between w-full'
          : 'flex flex-col gap-0',
        className
      )}
      aria-label="Progress steps"
      {...props}
    >
      {steps.map((step, index) => {
        const status = getStatus(index)
        const isLast = index === steps.length - 1

        return (
          <React.Fragment key={index}>
            {/* Step */}
            <div
              className={cn(
                'flex items-center gap-3',
                orientation === 'horizontal' ? 'flex-col flex-1' : 'flex-row'
              )}
            >
              {/* Circle */}
              <div className="relative flex items-center justify-center">
                <div
                  className={cn(
                    'h-8 w-8 rounded-full flex items-center justify-center shrink-0',
                    'font-[family-name:var(--font-heading)] font-bold text-sm',
                    'border-2 transition-all duration-200',
                    status === 'completed' && 'bg-[var(--primary)] border-[var(--primary)] text-[var(--primary-foreground)]',
                    status === 'active' && 'bg-[var(--background)] border-[var(--primary)] text-[var(--primary)]',
                    status === 'pending' && 'bg-[var(--background)] border-[var(--border)] text-[var(--foreground-subtle)]'
                  )}
                >
                  {status === 'completed' ? (
                    <i className="fa-solid fa-check text-sm" aria-hidden="true" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
              </div>

              {/* Label */}
              <div className={cn(orientation === 'horizontal' ? 'text-center' : 'flex-1')}>
                <p
                  className={cn(
                    'font-[family-name:var(--font-heading)] font-semibold text-sm',
                    status === 'pending' ? 'text-[var(--foreground-subtle)]' : 'text-[var(--foreground)]'
                  )}
                >
                  {step.label}
                </p>
                {step.description && (
                  <p className="text-xs text-[var(--foreground-muted)] font-[family-name:var(--font-body)] mt-0.5">
                    {step.description}
                  </p>
                )}
              </div>
            </div>

            {/* Connector */}
            {!isLast && (
              <div
                className={cn(
                  'transition-colors duration-300',
                  orientation === 'horizontal'
                    ? 'flex-1 h-0.5 mt-4 mx-2'
                    : 'w-0.5 h-8 ml-4 my-1',
                  index < currentStep ? 'bg-[var(--primary)]' : 'bg-[var(--border)]'
                )}
              />
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
}

export { StepIndicator }
