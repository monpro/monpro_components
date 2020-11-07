import React, { createContext, useState } from 'react'
import classNames from 'classnames'

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
    'menu-vertical': mode === 'vertical',
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

  return (
    <ul className={classes} style={style} data-testid="test-menu">
      <MenuContext.Provider value={menuContextValue}>
        {children}
      </MenuContext.Provider>
    </ul>
  )
}

Menu.defaultProps = {
  defaultIndex: 0,
  mode: 'horizontal',
}

export default Menu
