import type { Meta, StoryObj } from '@storybook/react'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './Accordion'

const faqs = [
  { q: 'What is MTPL insurance?', a: 'Motor Third Party Liability (MTPL) is mandatory insurance in Bulgaria and across the EU. It covers damage you cause to other people or their property while driving.' },
  { q: 'How quickly can I get covered?', a: 'Once you select your plan and complete payment, your policy is active immediately. Your documents are sent to your email within minutes.' },
  { q: 'Can I cancel my policy?', a: 'Yes. You can cancel within 14 days for a full refund under the EU cooling-off period, or at any point for a pro-rata refund of unused premium.' },
]

const meta: Meta = { title: 'Composition/Accordion', tags: ['autodocs'], parameters: { layout: 'centered' } }
export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <Accordion type="single" collapsible style={{ width: '480px' }}>
      {faqs.map((faq, i) => (
        <AccordionItem key={i} value={`item-${i}`}>
          <AccordionTrigger>{faq.q}</AccordionTrigger>
          <AccordionContent>{faq.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  ),
}

export const Multiple: Story = {
  render: () => (
    <Accordion type="multiple" style={{ width: '480px' }}>
      {faqs.map((faq, i) => (
        <AccordionItem key={i} value={`item-${i}`}>
          <AccordionTrigger>{faq.q}</AccordionTrigger>
          <AccordionContent>{faq.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  ),
}
