import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withInfo } from '@storybook/addon-info'
import Button, { ButtonSize, ButtonType } from './button'

const defaultButton = () => (
  <Button onClick={action('clicked')}>Default Button</Button>
)

const sizedButton = () => (
  <>
    <Button size={ButtonSize.Large}>Large Button</Button>
    <Button size={ButtonSize.Small}>Small Button</Button>
  </>
)

const typedButton = () => (
  <>
    <Button btnType={ButtonType.Primary}>Primary Button</Button>
    <Button btnType={ButtonType.Danger}>Danger Button</Button>
    <Button btnType={ButtonType.Link} href="https://www.google.com">
      Link Button
    </Button>
  </>
)

storiesOf('Button', module)
  .addDecorator(withInfo)
  .addParameters({
    info: {
      inline: true,
    },
  })
  .add('Button', defaultButton)
  .add('Button with Different Sizes', sizedButton)
  .add('Button with different types', typedButton)
