import type { Meta, StoryObj } from '@storybook/react'
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from './Tooltip'
import { Button } from '../Button/Button'

const meta: Meta = {
  title: 'Primitives/Tooltip',
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  decorators: [(Story) => <TooltipProvider><Story /></TooltipProvider>],
}
export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Hover me</Button>
      </TooltipTrigger>
      <TooltipContent>This is a tooltip</TooltipContent>
    </Tooltip>
  ),
}

export const Top: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild><Button variant="outline">Top</Button></TooltipTrigger>
      <TooltipContent side="top">Shown above</TooltipContent>
    </Tooltip>
  ),
}

export const Bottom: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild><Button variant="outline">Bottom</Button></TooltipTrigger>
      <TooltipContent side="bottom">Shown below</TooltipContent>
    </Tooltip>
  ),
}
