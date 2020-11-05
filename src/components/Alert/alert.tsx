import React, { FC, useState } from 'react'
import classnames from 'classnames'
import Transition from '../Transition'
import Icon from "../Icon/icon";

export type AlertType = 'success' | 'default' | 'danger' | 'warning'

export interface AlertProps {
  title: string
  description?: string
  type?: AlertType
  onClose?: () => void
  closable?: boolean
}

export const Alert: FC<AlertProps> = (props) => {
  const [hide, setHide] = useState(false)

  const { title, description, type, onClose, closable } = props

  const classes = classnames('mon-alert', {
    [`mon-alert-${type}`]: type,
  })

  const titleClass = classnames('mon-alert-title', {
    'bold-title': description,
  })

  const handleClose = (e: React.MouseEvent) => {
    if (onClose) {
      onClose()
    }
    setHide(true)
  }

  return (
    <Transition in={!!hide} timeout={300} animation={'zoom-in-top'}>
      <div className={classes}>
        <span className={titleClass}>{title}</span>
        {description && <p className="mon-alert-desc">{{ description }}</p>}
        {closable && (
          <span className="mon-alert-close" onClick={handleClose}>
            <Icon icon="times" />
          </span>
        )}
      </div>
    </Transition>
  )
}

Alert.defaultProps = {
  type: "default",
  closable: true
}

export default Alert
