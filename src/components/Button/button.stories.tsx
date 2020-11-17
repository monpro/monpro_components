import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withInfo } from '@storybook/addon-info'
import Button from './button'

const defaultButton = () => (
  <Button onClick={action('clicked')}>Default Button</Button>
)

const sizedButton = () => (
  <>
    <Button size="lg">Large Button</Button>
    <Button size="sm">Small Button</Button>
  </>
)

const typedButton = () => (
  <>
    <Button btnType="primary">Primary Button</Button>
    <Button btnType="danger">Danger Button</Button>
    <Button btnType="link" href="https://www.google.com">
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
