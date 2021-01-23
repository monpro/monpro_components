import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import SwitchToggle from './switchToggle'

const DefaultSwitchToggle = () => {
  const [checked, useChecked] = useState(false)
  return (
    <SwitchToggle
      id="test"
      checked={checked}
      onChange={(e) => useChecked(e.target.checked)}
    />
  )
}

storiesOf('SwitchToggle', module)
  .addDecorator(withInfo)
  .addParameters({
    info: {
      inline: true,
    },
  })
  .add('SwitchToggle', DefaultSwitchToggle)
