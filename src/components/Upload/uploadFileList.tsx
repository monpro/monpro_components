import React, { FC } from 'react'
import { UploadFile } from './upload'
import Icon from '../Icon/icon'

interface UploadFileListProps {
  fileList: UploadFile[]
  onRemove: (file: UploadFile) => void
}

export const UploadFileList: FC<UploadFileListProps> = (props) => {
  const { fileList, onRemove } = props

  return (
    <ul className="mon-upload-list">
      {fileList.map((file) => {
        return (
          <li className="mon-upload-list-item" key={file.uuid}>
            <span className={`file-name file-name-${file.status}`}>
              <Icon icon="file-alt" theme="secondary" />
              {file.name}
            </span>
            <span className="file-status">
              {file.status ===  'uploading' && <Icon icon='spinner' spin theme="primary"/>}
              {file.status ===  'success' && <Icon icon='check-circle' spin theme="success"/>}
              {file.status ===  'error' && <Icon icon='times-circle' spin theme="danger"/>}
            </span>
            <span className='file-action'>
              <Icon icon="times" onClick={() => onRemove(file)} />
            </span>
          </li>
        )
      })}
    </ul>
  )
}

export default UploadFileList
