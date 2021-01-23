import * as React from 'react'
import useRCNotification from 'rc-notification/lib/useNotification'
import {
  NotificationInstance as RCNotificationInstance,
  NoticeContent as RCNoticeContent,
  HolderReadyCallback as RCHolderReadyCallback,
} from 'rc-notification/lib/Notification'

import { NotificationInstance, NotificationProps } from './notification'

type NotificationCallBack = (info: {
  prefixClasses: string
  instance: RCNotificationInstance
}) => void

type GetRCNoticePropsType = (
  args: NotificationProps,
  prefixClasses: string
) => RCNoticeContent

const createUseNotification = (
  getNotificationInstance: (
    props: NotificationProps,
    callback: NotificationCallBack
  ) => void,
  getRCNoticeProps: GetRCNoticePropsType
) => {
  const useNotification = (): [NotificationInstance, React.ReactElement] => {
    let innerInstance: RCNotificationInstance | null = null

    const proxy = {
      add: (
        noticeProps: RCNoticeContent,
        holderCallBack?: RCHolderReadyCallback
      ) => {
        innerInstance?.component.add(noticeProps, holderCallBack)
      },
    } as any

    const [hookNotify, holder] = useRCNotification(proxy)

    const notify = (props: NotificationProps) => {
      const { prefixClasses: customizePrefixCls } = props

      getNotificationInstance(
        {
          ...props,
          prefixClasses: customizePrefixCls,
        },
        ({ prefixClasses, instance }) => {
          innerInstance = instance
          hookNotify(getRCNoticeProps(props, prefixClasses))
        }
      )
    }

    const hookApiRef = React.useRef<any>({})

    hookApiRef.current.open = notify

    ;['success', 'info', 'warning', 'error'].forEach((type) => {
      hookApiRef.current[type] = (props: NotificationProps) =>
        hookApiRef.current.open({
          ...props,
          type,
        })
    })
    // TODO: add context support
    return [hookApiRef.current, null]
  }
  return useNotification
}
