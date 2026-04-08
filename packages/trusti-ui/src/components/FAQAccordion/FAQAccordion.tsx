import * as React from 'react'
import { cn } from '../../lib/utils'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../Accordion/Accordion'
import { SectionHeader } from '../SectionHeader/SectionHeader'

export interface FAQItem {
  question: string
  answer: string
}

export interface FAQAccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  items: FAQItem[]
  title?: string
  subtitle?: string
  type?: 'single' | 'multiple'
  defaultOpen?: string[]
}

function FAQAccordion({
  items,
  title,
  subtitle,
  type = 'single',
  defaultOpen,
  className,
  ...props
}: FAQAccordionProps) {
  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      {title && (
        <SectionHeader
          title={title}
          subtitle={subtitle}
          align="center"
        />
      )}
      <Accordion
        type={type as 'single'}
        collapsible={type === 'single'}
        defaultValue={defaultOpen?.[0]}
      >
        {items.map((item, index) => (
          <AccordionItem key={index} value={`faq-${index}`}>
            <AccordionTrigger className="text-left font-semibold">
              {item.question}
            </AccordionTrigger>
            <AccordionContent>{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

export { FAQAccordion }
