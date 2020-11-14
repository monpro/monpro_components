import React from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import Menu from './Menu'
import MenuItem from './Menu/MenuItem'
import SubMenu from './Menu/subMenu'
import Input from './Input/input'
library.add(fas)
const App = () => {
  return (
    <div>
      <Menu
        mode="vertical"
        onSelect={(i) => console.log(i)}
        defaultOpenSubMenus={['2']}
      >
        <MenuItem>link1</MenuItem>
        <MenuItem disabled>link2</MenuItem>
        <SubMenu title="test sub menu">
          <MenuItem>dropdown 1</MenuItem>
          <MenuItem>dropdown 2</MenuItem>
        </SubMenu>
        <MenuItem>link3</MenuItem>
      </Menu>
      <Input prepend="coffee" append="latte" />
    </div>
  )
}

export default App
