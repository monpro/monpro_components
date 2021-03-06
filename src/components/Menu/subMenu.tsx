import React, { useContext, useState } from 'react'
import classNames from 'classnames'
import { MenuContext } from './menu'
import { MenuItemProps } from './menuItem'

export interface SubMenuProps {
  index?: string
  title: string
  className?: string
}

const SubMenu: React.FC<SubMenuProps> = ({
  index,
  title,
  children,
  className,
}) => {
  const context = useContext(MenuContext)
  const openedSubMenus = context.defaultOpenSubMenus as Array<string>
  const isOpened =
    index && context.mode === 'vertical'
      ? openedSubMenus.indexOf(index) !== -1
      : false
  const [menuOpen, setMenuOpen] = useState(isOpened)

  const classes = classNames('mon-menu-item mon-submenu-item', className, {
    'is-active': context.index === index,
  })
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setMenuOpen(!menuOpen)
  }

  const handleMouseMove = (e: React.MouseEvent, toggle: boolean) => {
    e.preventDefault()
    setMenuOpen(toggle)
  }

  const clickEvents =
    context.mode === 'vertical'
      ? {
          onClick: handleClick,
        }
      : {}

  const hoverEvents =
    context.mode !== 'vertical'
      ? {
          onMouseEnter: (e: React.MouseEvent) => {
            handleMouseMove(e, true)
          },
          onMouseLeave: (e: React.MouseEvent) => {
            handleMouseMove(e, false)
          },
        }
      : {}

  const renderChildren = () => {
    const childrenClasses = classNames('mon-submenu', {
      'menu-opened': menuOpen,
    })
    const childrenComponent = React.Children.map(children, (child, i) => {
      const childElement = child as React.FunctionComponentElement<
        MenuItemProps
      >
      const { displayName } = childElement.type
      if (displayName === 'MenuItem') {
        return React.cloneElement(childElement, {
          index: `${index}-${i}`,
        })
      } else {
        console.error('submenu has a child which is not MenuItem')
      }
    })
    return <ul className={childrenClasses}>{childrenComponent}</ul>
  }
  return (
    <li key={index} className={classes} {...hoverEvents}>
      <div className="submenu-title" {...clickEvents}>
        {title}
      </div>
      {renderChildren()}
    </li>
  )
}

SubMenu.displayName = 'SubMenu'

export default SubMenu
