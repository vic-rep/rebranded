import type { Meta, StoryObj } from '@storybook/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from './Form'
import { Input } from '../Input/Input'
import { Button } from '../Button/Button'

const schema = z.object({
  email: z.string().email('Please enter a valid email address'),
  plate: z.string().min(4, 'Enter a valid plate number').max(10),
})

function QuoteForm() {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { email: '', plate: '' },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(() => {})} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', width: '360px' }}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel required>Email address</FormLabel>
              <FormControl>
                <Input placeholder="you@example.com" error={!!form.formState.errors.email} {...field} />
              </FormControl>
              <FormDescription>We'll send your quote documents here.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="plate"
          render={({ field }) => (
            <FormItem>
              <FormLabel required>Vehicle plate number</FormLabel>
              <FormControl>
                <Input placeholder="e.g. СА 1234 АВ" error={!!form.formState.errors.plate} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">Get my quote</Button>
      </form>
    </Form>
  )
}

const meta: Meta = { title: 'Composition/Form', tags: ['autodocs'], parameters: { layout: 'centered' } }
export default meta
type Story = StoryObj

export const Default: Story = { render: () => <QuoteForm /> }
