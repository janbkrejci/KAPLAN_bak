// Pass props to your component by passing an `args` object to your story
//
// ```tsx
// export const Primary: Story = {
//  args: {
//    propName: propValue
//  }
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { Meta, StoryObj } from '@storybook/react'

import { DropDownMenu, MenuItem } from './DropDownMenu'

const meta: Meta<typeof DropDownMenu> = {
  component: DropDownMenu,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof DropDownMenu>

export const Primary: Story = {
  args: {
    name: 'Číselníky',
    childrenAlign: 'left',
    children: () => <div className='py-1'>
      <MenuItem to="javascript:void(0)" label="Zdroje" />
      <MenuItem to="javascript:void(0)" label="Typy zdrojů" />
      <MenuItem to="javascript:void(0)" label="Kompetence zdrojů" />
    </div>
  }
}
