import React, { ChangeEvent, FC, useRef } from 'react'
import axios from 'axios'
import Button from '../Button/button'

export interface UploadProps {
  action: string
  beforeUpload?: (file: File) => boolean | Promise<File>
  onProgress?: (percentage: number, file: File) => void
  onSuccess?: (data: any, file: File) => void
  onError?: (err: any, file: File) => void
  onChange?: (file: File) => void;
}
export const Upload: FC<UploadProps> = (props) => {
  const { action, beforeUpload, onProgress, onSuccess, onError, onChange } = props

  const inputRef = useRef<HTMLInputElement>(null)
  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click()
    }
  }

  const uploadFile = (file: File) => {
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
        if (onChange) {
          onChange(file)
        }
      })
      .catch((err) => {
        console.log(err)
        onError(err, file)
        if (onChange) {
          onChange(file)
        }
      })
  }

  const handleUploadFiles = (files: FileList) => {
    const filesList = Array.from(files)
    filesList.forEach(file => {
      if (!beforeUpload) {
        uploadFile(file)
      } else {
        const parsedFile = beforeUpload(file)
        if (parsedFile && parsedFile instanceof Promise) {
          parsedFile.then(result => {
            uploadFile(result)
          })
        } else if (parsedFile !== false) {
          uploadFile(file)
        }
      }
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
