import React from 'react'
import Button, {ButtonSize, ButtonType} from './Button/button'

const App = () => {
  return (
      <Button btnType={ButtonType.Primary} size={ButtonSize.Small}>
        test button
      </Button>
  )
};

export default App
