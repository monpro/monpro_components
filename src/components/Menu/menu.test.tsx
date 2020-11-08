import React from 'react'
import {
  fireEvent,
  render,
  RenderResult,
  cleanup,
} from '@testing-library/react'
import Menu, { MenuProps } from './menu'
import MenuItem from './menuItem'
import SubMenu from './subMenu'
const testProps: MenuProps = {
  defaultIndex: '0',
  onSelect: jest.fn(),
  className: 'test',
}

const testVerticalProps: MenuProps = {
  defaultIndex: '0',
  mode: 'vertical',
  defaultOpenSubMenus: ['3']
}

const getMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem>active item 1</MenuItem>
      <MenuItem disabled>disabled item 2</MenuItem>
      <MenuItem>test item 3</MenuItem>
      <SubMenu title='test submenu'>
        <MenuItem>
          item 4
        </MenuItem>
      </SubMenu>
    </Menu>
  )
}

const createStyleFiles = () => {
  const cssFile: string = `
    .mon-submenu {
      display: none;
    }
    
    .mon-submenu.menu-opened {
      display: block;
    }
  `
  const style = document.createElement('style')
  style.type = 'text/css'
  style.innerHTML = cssFile
  return style
}

let wrapper: RenderResult,
  menu: HTMLElement,
  activeMenuItem: HTMLElement,
  disabledMenuItem: HTMLElement

describe('test Menu and MenuItem', () => {
  beforeEach(() => {
    wrapper = render(getMenu(testProps))
    wrapper.container.append(createStyleFiles())
    menu = wrapper.getByTestId('test-menu')
    activeMenuItem = wrapper.getByText('active item 1')
    disabledMenuItem = wrapper.getByText('disabled item 2')
  })
  it('should render default Menu and MenuItem', () => {
    expect(menu).toBeInTheDocument()
    expect(menu).toHaveClass('mon-menu test')
    expect(menu.querySelectorAll(':scope > li').length).toEqual(4)
    expect(activeMenuItem).toHaveClass('mon-menu-item is-active')
    expect(disabledMenuItem).toHaveClass('mon-menu-item is-disabled')
  })

  it('click MenuItem should change active and trigger callback', () => {
    const thirdElement = wrapper.getByText('test item 3')
    fireEvent.click(thirdElement)
    expect(thirdElement).toHaveClass('is-active')
    expect(activeMenuItem).not.toHaveClass('is-active')
    expect(testProps.onSelect).toHaveBeenCalledWith('2')
    fireEvent.click(disabledMenuItem)
    expect(disabledMenuItem).not.toHaveClass('is-active')
    expect(testProps.onSelect).not.toHaveBeenCalledWith('1')
  })

  it('Menu should render vertical MenuItems when mode is vertical', () => {
    // remove wrapper with testProps from dom tree
    cleanup()
    const wrapper = render(getMenu(testVerticalProps))
    const menu = wrapper.getByTestId('test-menu')
    expect(menu).toHaveClass('mon-menu-vertical')
  })
  it('Submenu should display items when being hovered on', () => {
    expect(wrapper.queryByText('item 4')).not.toBeVisible()
    const submenuElement = wrapper.getByText('test submenu')
    fireEvent.mouseEnter(submenuElement)
    expect(wrapper.queryByText('item 4')).toBeVisible()
    fireEvent.click(wrapper.getByText('item 4'))
    expect(testProps.onSelect).toHaveBeenCalledWith('3-0')
    fireEvent.mouseLeave(submenuElement)
    expect(wrapper.queryByText('item 4')).not.toBeVisible()
  })
  it('Submenu should behave correctly when mode is vertical', () => {
    cleanup()
    const wrapper = render(getMenu(testVerticalProps))
    wrapper.container.append(createStyleFiles())
    expect(wrapper.queryByText('item 4')).toBeVisible()
    const submenuElement = wrapper.getByText('test submenu')
    fireEvent.click(submenuElement)
    expect(wrapper.queryByText('item 4')).not.toBeVisible()
  })
})
