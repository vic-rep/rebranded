import type { Meta, StoryObj } from '@storybook/react'
import { FAQAccordion } from './FAQAccordion'

const faqs = [
  { question: 'What is MTPL insurance?', answer: 'Motor Third Party Liability (MTPL) is mandatory insurance in Bulgaria and across the EU. It covers damage you cause to other people or property while driving.' },
  { question: 'How quickly can I get covered?', answer: 'Once you select your plan and complete payment, your policy is active immediately. Your documents are sent to your email within minutes.' },
  { question: 'Is my quote binding?', answer: 'Quotes are valid for 30 days. The price shown is the price you pay — there are no hidden fees or surprises at checkout.' },
  { question: 'Can I cancel my policy?', answer: 'Yes. You can cancel within 14 days for a full refund under the EU cooling-off period, or at any point for a pro-rata refund of unused premium.' },
  { question: 'Which insurers do you compare?', answer: 'We compare all licensed insurers operating in Bulgaria, including Allianz, Generali, Bulstrad Vienna Insurance, DZI, Euroins, and others.' },
]

const meta: Meta<typeof FAQAccordion> = {
  title: 'Trusti Specific/FAQAccordion',
  component: FAQAccordion,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
}
export default meta
type Story = StoryObj<typeof FAQAccordion>

export const Default: Story = {
  render: () => (
    <div style={{ maxWidth: 640 }}>
      <FAQAccordion
        title="Frequently asked questions"
        subtitle="Everything you need to know about comparing insurance with Trusti."
        items={faqs}
      />
    </div>
  ),
}
