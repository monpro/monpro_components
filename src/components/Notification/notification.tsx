import React from 'react'
import Notification from 'rc-notification'
import { NotificationInstance as RCNotificationInstance } from 'rc-notification/lib/Notification'
import classNames from 'classnames'
import Icon from '../Icon/icon'
import { typeToIcon } from './const'

export type NotificationLocation =
  | 'topLeft'
  | 'topRight'
  | 'bottomLeft'
  | 'bottomRight'

export type IconType = 'success' | 'error' | 'warning' | 'info'

export interface NotificationProps {
  message: React.ReactNode
  description?: React.ReactNode
  btn?: React.ReactNode
  key?: string
  onClose?: () => void
  duration?: number | null
  location?: NotificationLocation
  style?: React.CSSProperties
  prefixClasses?: string
  className?: string
  onClick?: () => void
  top?: number
  bottom?: number
  icon?: React.ReactNode
  closeIcon?: React.ReactNode
  readonly type?: IconType
}

export interface ConfigProps {
  top?: number
  bottom?: number
  duration?: number
  prefixClasses?: string
  location?: NotificationLocation
  closeIcon?: React.ReactNode
  // right to left
  rtl?: boolean
}

export interface NotificationInstance {
  success(args: NotificationProps): void
  error(args: NotificationProps): void
  info(args: NotificationProps): void
  warning(args: NotificationProps): void
  open(args: NotificationProps): void
}

export interface NotificationApi {
  warn(args: NotificationProps): void
  close(key: string): void
  config(options: ConfigProps): void

  useNotification: () => [NotificationInstance, React.ReactElement]
}

// promise key-value pairs
const notificationInstance: {
  [key: string]: Promise<RCNotificationInstance>
} = {}

// default values

let defaultDuration = 3
let defaultTop = 30
let defaultBottom = 30
let defaultPrefixClasses = 'mon-notification'
let defaultLocation: NotificationLocation = 'topRight'
let defaultCloseIcon: React.ReactNode = null
let defaultRtl = false

const setNotificationConfig = (configs: ConfigProps) => {
  const {
    top,
    bottom,
    duration,
    prefixClasses,
    location,
    closeIcon,
    rtl,
  } = configs

  if (top) {
    defaultTop = top
  }
  if (bottom) {
    defaultBottom = bottom
  }
  if (duration) {
    defaultDuration = duration
  }
  if (prefixClasses) {
    defaultPrefixClasses = prefixClasses
  }
  if (rtl) {
    defaultRtl = rtl
  }
  if (location) {
    defaultLocation = location
  }
  if (closeIcon) {
    defaultCloseIcon = closeIcon
  }
}

const getLocationStyle = (
  location: NotificationLocation,
  top: number = defaultTop,
  bottom: number = defaultBottom
) => {
  let style = {}
  switch (location) {
    case 'topLeft':
      style = {
        left: 0,
        top,
        bottom: 'auto',
      }
      break
    case 'topRight':
      style = {
        right: 0,
        top,
        bottom: 'auto',
      }
      break
    case 'bottomLeft':
      style = {
        left: 0,
        top: 'auto',
        bottom,
      }
      break
    case 'bottomRight':
      style = {
        right: 0,
        top: 'auto',
        bottom,
      }
      break
  }
  return style
}

export interface NotificationInfo {
  prefixClasses: string
  instance: RCNotificationInstance
}

const getNotificationInstance = (
  props: NotificationProps,
  callback: (args: NotificationInfo) => void
) => {
  const { location, top, bottom, closeIcon, prefixClasses } = props

  const containerClass = `${prefixClasses || defaultPrefixClasses}-container`
  const cacheKey = `${containerClass}-${location}`
  // single instance design pattern
  const cacheInstance = notificationInstance[cacheKey]

  if (cacheInstance) {
    Promise.resolve(cacheInstance).then((instance) => {
      callback({
        prefixClasses,
        instance,
      })
    })
    return
  }

  const closeIconToBeRendered = (
    <span className={`${containerClass}-close-x`}>
      {closeIcon || (
        <Icon icon="times" className={`${containerClass}-close-icon`} />
      )}
    </span>
  )

  const notificationClass = classNames(`${containerClass}-${location}`, {
    [`${containerClass}-rtl`]: defaultRtl === true,
  })

  // we need create a new single instance with key - cachedKey
  notificationInstance[cacheKey] = new Promise((resolve) => {
    Notification.newInstance(
      {
        prefixCls: containerClass,
        className: notificationClass,
        style: getLocationStyle(location, top, bottom),
        getContainer: () => null,
        closeIcon: closeIconToBeRendered,
      },
      (notification) => {
        resolve(notification)
        callback({
          prefixClasses,
          instance: notification,
        })
      }
    )
  })
}

const openApi = (props: NotificationProps) => {
  getNotificationInstance(props, ({ prefixClasses, instance }) => {
    instance.notice(getNoticeProps(props, prefixClasses))
  })
}

const getNoticeProps = (props: NotificationProps, prefixClasses: string) => {
  const {
    message,
    description,
    btn,
    key,
    onClose,
    duration,
    style,
    className,
    onClick,
    icon,
    type,
  } = props

  const noticeDuration = duration ? duration : defaultDuration
  let noticeIcon: React.ReactNode = null

  if (icon) {
    noticeIcon = <span className={`${prefixClasses}-icon`}>{icon}</span>
  } else if (type) {
    noticeIcon = (
      <span className={`${prefixClasses}-icon ${prefixClasses}-icon-${type}`}>
        {typeToIcon[type] || null}
      </span>
    )
  }

  return {
    content: (
      <div
        className={noticeIcon ? `${prefixClasses}-with-icon` : ''}
        role="alert"
      >
        {noticeIcon}
        <div className={`${prefixClasses}-message`}>{message}</div>
        <div className={`${prefixClasses}-description`}>{description}</div>
        {btn ? <span className={`${prefixClasses}-btn`}>{btn}</span> : null}
      </div>
    ),
    className: className,
    onClose: onClose,
    onClick: onClick,
    key: key,
    style: style || {},
    closable: true,
    duration: noticeDuration,
  }
}

const closeApi = (key: string) => {
  Object.values(notificationInstance).forEach((instance) => {
    Promise.resolve(instance).then((cachedInstance) => {
      cachedInstance.destroy()
      cachedInstance.removeNotice(key)
    })
  })
}

const destroyApi = () => {
  Object.keys(notificationInstance).forEach((cachedKey) => {
    Promise.resolve(notificationInstance[cachedKey]).then((cachedInstance) => {
      cachedInstance.destroy()
    })
    delete notificationInstance[cachedKey]
  })
}

const api: any = {
  open: openApi,
  close: closeApi,
  config: setNotificationConfig,
  destroy: destroyApi,
}
const notificationType: IconType[] = ['success', 'info', 'warning', 'error']
notificationType.forEach((type) => {
  api[type] = (props: NotificationProps) =>
    api.open({
      ...props,
      type,
    })
})

api.warn = api.warning

export default api as NotificationApi
