import React, { createContext, useState } from 'react'
import classNames from 'classnames'
import { MenuItemProps } from './menuItem'

type MenuMode = 'horizontal' | 'vertical'
type SelectCb = (selectedIndex: number) => void
export interface MenuProps {
  defaultIndex?: number
  className?: string
  mode?: MenuMode
  style?: React.CSSProperties
  onSelect?: SelectCb
}

interface IMenuContext {
  index: number
  onSelect?: SelectCb
}

export const MenuContext = createContext<IMenuContext>({ index: 0 })

const Menu: React.FC<MenuProps> = (props) => {
  const { className, mode, style, children, defaultIndex, onSelect } = props
  const [activeIndex, setActiveIndex] = useState(defaultIndex)
  const classes = classNames('mon-menu', className, {
    'mon-menu-vertical': mode === 'vertical',
    'mon-menu-horizontal': mode !== 'vertical',
  })

  const handleClick = (index: number) => {
    setActiveIndex(index)
    if (onSelect) {
      onSelect(index)
    }
  }

  const menuContextValue: IMenuContext = {
    index: activeIndex ? activeIndex : 0,
    onSelect: handleClick,
  }

  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<
        MenuItemProps
      >
      const { displayName } = childElement.type
      if (displayName === 'MenuItem' || displayName === 'SubMenu') {
        return React.cloneElement(childElement, {
          index,
        })
      } else {
        console.error('menu has a child which is not MenuItem')
      }
    })
  }

  return (
    <ul className={classes} style={style} data-testid="test-menu">
      <MenuContext.Provider value={menuContextValue}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  )
}

Menu.defaultProps = {
  defaultIndex: 0,
  mode: 'horizontal',
}

export default Menu
