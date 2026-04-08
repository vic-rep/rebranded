import type { Meta, StoryObj } from '@storybook/react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from './Tabs'

const meta: Meta = { title: 'Composition/Tabs', tags: ['autodocs'], parameters: { layout: 'centered' } }
export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="motor" style={{ width: '400px' }}>
      <TabsList>
        <TabsTrigger value="motor">Motor</TabsTrigger>
        <TabsTrigger value="home">Home</TabsTrigger>
        <TabsTrigger value="travel">Travel</TabsTrigger>
        <TabsTrigger value="health">Health</TabsTrigger>
      </TabsList>
      <TabsContent value="motor"><p className="text-sm text-[var(--foreground-muted)] p-2">Motor insurance content</p></TabsContent>
      <TabsContent value="home"><p className="text-sm text-[var(--foreground-muted)] p-2">Home insurance content</p></TabsContent>
      <TabsContent value="travel"><p className="text-sm text-[var(--foreground-muted)] p-2">Travel insurance content</p></TabsContent>
      <TabsContent value="health"><p className="text-sm text-[var(--foreground-muted)] p-2">Health insurance content</p></TabsContent>
    </Tabs>
  ),
}
