import React from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import SwitchToggle from "./SwitchToggle/switch";
library.add(fas)
const App = () => {
  return <SwitchToggle name="mike"/>
}

export default App
