import React from 'react'
import Button, { ButtonSize, ButtonType } from './Button/button'
import Alert from './Alert/alert'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import Menu from './Menu'
import MenuItem from './Menu/MenuItem'
import SubMenu from './Menu/subMenu'
library.add(fas)
const App = () => {
  return (
    <div>
      <Menu defaultIndex={0} mode='vertical'>
        <MenuItem>link1</MenuItem>
        <MenuItem disabled>link2</MenuItem>
        <SubMenu title="test sub menu">
          <MenuItem>dropdown 1</MenuItem>
          <MenuItem>dropdown 2</MenuItem>
        </SubMenu>
        <MenuItem>link3</MenuItem>
      </Menu>
    </div>
  )
}

export default App
