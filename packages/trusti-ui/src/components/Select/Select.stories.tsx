import type { Meta, StoryObj } from '@storybook/react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup, SelectLabel } from './Select'

const meta: Meta = {
  title: 'Primitives/Select',
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  decorators: [(Story) => <div style={{ width: '280px' }}><Story /></div>],
}
export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Select insurance type" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="mtpl">Motor Third Party Liability</SelectItem>
        <SelectItem value="casco">Casco</SelectItem>
        <SelectItem value="home">Home Insurance</SelectItem>
        <SelectItem value="health">Health Insurance</SelectItem>
        <SelectItem value="travel">Travel Insurance</SelectItem>
      </SelectContent>
    </Select>
  ),
}

export const WithGroups: Story = {
  render: () => (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Select product" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Motor</SelectLabel>
          <SelectItem value="mtpl">Third Party Liability</SelectItem>
          <SelectItem value="casco">Casco</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Property</SelectLabel>
          <SelectItem value="home">Home</SelectItem>
          <SelectItem value="commercial">Commercial</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
}

export const Disabled: Story = {
  render: () => (
    <Select disabled>
      <SelectTrigger>
        <SelectValue placeholder="Disabled select" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="a">Option A</SelectItem>
      </SelectContent>
    </Select>
  ),
}

export const Error: Story = {
  render: () => (
    <Select>
      <SelectTrigger error>
        <SelectValue placeholder="Please select a value" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="a">Option A</SelectItem>
      </SelectContent>
    </Select>
  ),
}
