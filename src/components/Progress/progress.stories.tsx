import React from 'react'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import Progress from './progress'

const DefaultProgress = () => {
  return <Progress percent={80} height={10} displayText={true} />
}

storiesOf('Progress', module)
  .addDecorator(withInfo)
  .addParameters({
    info: {
      inline: true,
    },
  })
  .add('Progress', DefaultProgress)
