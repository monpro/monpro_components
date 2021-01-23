import React, { useState } from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import SwitchToggle from './SwitchToggle/switchToggle'
library.add(fas)
const App = () => {
  const [checked, useChecked] = useState(false)
  console.log("this is checked", checked)
  return (
    <SwitchToggle
      checked={checked}
      onChange={(e) => useChecked(e.target.checked)}
      optionalLabels={['t', 's']}
      id="test"
      name="mike"
    />
  )
}

export default App
