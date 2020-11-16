import React, { ChangeEvent, FC, useRef } from 'react'
import axios from 'axios'
import Button from '../Button/button'

export interface UploadProps {
  action: string
  onProgress?: (percentage: number, file: File) => void
  onSuccess?: (data: any, file: File) => void
  onError?: (err: any, file: File) => void
}
export const Upload: FC<UploadProps> = (props) => {
  const { action, onProgress, onSuccess, onError } = props

  const inputRef = useRef<HTMLInputElement>(null)
  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click()
    }
  }

  const handleUploadFiles = (files: FileList) => {
    const filesList = Array.from(files)
    filesList.forEach((file) => {
      const formData = new FormData()
      formData.append(file.name, file)
      axios
        .post(action, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (e) => {
            const percentage = Math.round((e.loaded * 100) / e.total) || 0
            if (percentage < 100) {
              onProgress(percentage, file)
            }
          },
        })
        .then((res) => {
          if (onSuccess) {
            onSuccess(res.data, file)
          }
        })
        .catch((err) => {
          console.log(err)
          onError(err, file)
        })
    })
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) {
      return
    }
    handleUploadFiles(files)
    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }
  return (
    <div className="mon-upload-component">
      <Button btnType="primary" onClick={handleClick}>
        Upload File
      </Button>
      <input
        className="mon-file-input"
        style={{ display: 'none' }}
        onChange={handleInputChange}
        type="file"
        ref={inputRef}
      />
    </div>
  )
}

export default Upload
