import React, { ChangeEvent, FC, useRef, useState } from 'react'
import axios, { AxiosError, AxiosResponse } from 'axios'
import Button from '../Button/button'
import UploadFileList from './uploadFileList'

export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error'

export interface UploadFile {
  uuid: string
  size: number
  name: string
  status?: UploadFileStatus
  percent?: number
  original?: File
  response?: AxiosResponse
  error?: AxiosError
}

export interface UploadProps {
  action: string
  defaultUploadedFileList?: UploadFile[]
  beforeUpload?: (file: File) => boolean | Promise<File>
  onProgress?: (percentage: number, file: File) => void
  onSuccess?: (data: any, file: File) => void
  onError?: (err: any, file: File) => void
  onChange?: (file: File) => void
  onRemove?: (file: UploadFile) => void
  headers?: { [key: string]: any }
  name?: string
  data?: { [key: string]: any }
  withCredentials?: boolean
  accept?: string
  multiple?: boolean
}
export const Upload: FC<UploadProps> = (props) => {
  const {
    action,
    defaultUploadedFileList,
    beforeUpload,
    onProgress,
    onSuccess,
    onError,
    onChange,
    onRemove,
    headers,
    name,
    data,
    withCredentials,
    accept,
    multiple
  } = props

  const inputRef = useRef<HTMLInputElement>(null)
  const [fileList, setFileList] = useState<UploadFile[]>(
    defaultUploadedFileList || []
  )

  const updateFileList = (
    updateFile: UploadFile,
    updateProps: Partial<UploadFile>
  ) => {
    setFileList((prev) => {
      return prev.map((file) => {
        if (file.uuid === updateFile.uuid) {
          return { ...file, ...updateProps }
        } else {
          return file
        }
      })
    })
  }

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click()
    }
  }

  const uploadFile = (file: File) => {
    const newFile: UploadFile = {
      uuid: Date.now() + 'upload',
      status: 'ready',
      name: file.name,
      size: file.size,
      percent: 0,
      original: file,
    }
    // setFileList([newFile, ...fileList])
    setFileList(prev => {
      return [newFile, ...prev]
    })
    const formData = new FormData()
    formData.append(name || 'default_file', file)
    if (data) {
    }
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key])
    })
    axios
      .post(action, formData, {
        headers: {
          ...headers,
          'Content-Type': 'multipart/form-data',
        },
        withCredentials,
        onUploadProgress: (e) => {
          const percentage = Math.round((e.loaded * 100) / e.total) || 0
          if (percentage < 100) {
            updateFileList(newFile, {
              percent: percentage,
              status: 'uploading',
            })
            onProgress(percentage, file)
          }
        },
      })
      .then((res) => {
        updateFileList(newFile, { response: res, status: 'success' })

        if (onSuccess) {
          onSuccess(res.data, file)
        }
        if (onChange) {
          onChange(file)
        }
      })
      .catch((err) => {
        updateFileList(newFile, { error: err, status: 'error' })
        console.log(err)
        onError(err, file)
        if (onChange) {
          onChange(file)
        }
      })
  }
  const handleRemove = (file: UploadFile) => {
    setFileList((prev) => {
      return prev.filter((item) => item.uuid !== file.uuid)
    })
    if (onRemove) {
      onRemove(file)
    }
  }
  const handleUploadFiles = (files: FileList) => {
    const filesList = Array.from(files)
    filesList.forEach((file) => {
      if (!beforeUpload) {
        uploadFile(file)
      } else {
        const parsedFile = beforeUpload(file)
        if (parsedFile && parsedFile instanceof Promise) {
          parsedFile.then((result) => {
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

  console.log(fileList)
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
        accept={accept}
        multiple
      />
      <UploadFileList fileList={fileList} onRemove={handleRemove} />
    </div>
  )
}

Upload.defaultProps = {
  name: 'default_file',
}

export default Upload
