import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withInfo } from '@storybook/addon-info'
import Upload from './upload'

const DefaultUpload = () => {
  return <Upload
            action="https://jsonplaceholder.typicode.com/posts/"
            onProgress={action('progress')}
            onSuccess={action('success')}
            onError={action('error')}
          />
}

storiesOf('Upload', module)
  .addDecorator(withInfo)
  .addParameters({
    info: {
      inline: true,
    },
  })
  .add('Upload', DefaultUpload)
