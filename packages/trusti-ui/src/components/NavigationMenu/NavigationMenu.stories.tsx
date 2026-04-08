import type { Meta, StoryObj } from '@storybook/react'
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink, navigationMenuTriggerStyle } from './NavigationMenu'

const meta: Meta = { title: 'Composition/NavigationMenu', tags: ['autodocs'], parameters: { layout: 'centered' } }
export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Insurance</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul style={{ display: 'grid', gap: '0.5rem', padding: '1rem', width: '280px' }}>
              {['Motor (MTPL)', 'Casco', 'Home', 'Health', 'Travel'].map((item) => (
                <li key={item}>
                  <NavigationMenuLink href="#" style={{ display: 'block', padding: '0.5rem 0.75rem', borderRadius: 'var(--radius)', fontSize: '0.875rem', color: 'var(--foreground)', textDecoration: 'none' }}>
                    {item}
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="#" className={navigationMenuTriggerStyle()}>My policies</NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="#" className={navigationMenuTriggerStyle()}>Claims</NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
}
