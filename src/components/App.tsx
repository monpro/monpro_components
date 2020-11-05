import React from 'react'
import Button, { ButtonSize, ButtonType } from './Button/button'
import Alert from './Alert/alert'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)
const App = () => {
  return (
    <React.Fragment>
      <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>
        test button
      </Button>
      <Button
        btnType={ButtonType.Link}
        href={'www.google.com'}
        size={ButtonSize.Small}
      >
        test button
      </Button>
      <Button
        btnType={ButtonType.Link}
        disabled
        href={'www.google.com'}
        size={ButtonSize.Small}
      >
        test button
      </Button>
      <Button btnType={ButtonType.Link} disabled size={ButtonSize.Small}>
        test button
      </Button>
      <Button btnType={ButtonType.Default} size={ButtonSize.Large}>
        test button
      </Button>
      <Alert title={'alert'} type={'success'} description={'new test'} />
    </React.Fragment>
  )
}

export default App
