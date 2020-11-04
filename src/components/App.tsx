import React from 'react'
import Button, {ButtonSize, ButtonType} from './Button/button'

const App = () => {
  return (
      <React.Fragment>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Small}>
          test button
        </Button>
        <Button btnType={ButtonType.Link} href={'www.google.com'} size={ButtonSize.Small}>
          test button
        </Button>
        <Button btnType={ButtonType.Link} disabled size={ButtonSize.Small}>
          test button
        </Button>
      </React.Fragment>
  )
};

export default App
