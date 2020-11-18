import React, { FC, useState } from 'react'
import classNames from 'classnames'

interface DragAreaProps {
  onDragFiles: (files: FileList) => void
}

export const DragArea: FC<DragAreaProps> = (props) => {
  const { onDragFiles, children } = props
  const [dragOver, setDragOver] = useState(false)
  const classes = classNames('mon-drag', {
    'is-dragover': dragOver,
  })

  const handleDrop = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault()
    setDragOver(false)
    onDragFiles(e.dataTransfer.files)
  }

  const handleDragEvent = (e: React.DragEvent<HTMLElement>, over: boolean) => {
    e.preventDefault()
    setDragOver(over)
  }
  return (
    <div
      className={classes}
      onDragOver={(e) => handleDragEvent(e, true)}
      onDragLeave={(e) => handleDragEvent(e, false)}
      onDrop={handleDrop}
    >
      {children}
    </div>
  )
}
