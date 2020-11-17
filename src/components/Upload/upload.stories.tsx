import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withInfo } from '@storybook/addon-info'
import Upload from './upload'

const checkFileSize = (file: File) => {
  if (Math.round(file.size / 1024) > 100) {
    alert('file oversize')
    return false
  }
  return true
}

const filePromise = (file: File) => {
  const newFile = new File([file], 'test_rename.scss', { type: file.type })
  return Promise.resolve(newFile)
}
const DefaultUpload = () => {
  return (
    <Upload
      action="https://jsonplaceholder.typicode.com/posts/"
      onProgress={action('progress')}
      onSuccess={action('success')}
      onError={action('error')}
      onChange={action('changed')}
      beforeUpload={filePromise}
    />
  )
}

storiesOf('Upload', module)
  .addDecorator(withInfo)
  .addParameters({
    info: {
      inline: true,
    },
  })
  .add('Upload', DefaultUpload)
