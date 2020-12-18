import * as React from 'react';
import useRCNotification from 'rc-notification/lib/useNotification';
import {
  NotificationInstance as RCNotificationInstance,
  NoticeContent as RCNoticeContent,
  HolderReadyCallback as RCHolderReadyCallback,
} from 'rc-notification/lib/Notification';

import {
  NotificationInstance,
  NotificationProps
} from "./notification";


interface GetNotificationInstanceInterface {
  args: NotificationProps,
  callback: (info: {prefixClasses: string, instance: RCNotificationInstance}) => void
}

type GetRCNoticePropsType = (args: NotificationProps, prefixClasses: string) => RCNoticeContent

const createUseNotification = (
  getNotificationInstance: (props: GetNotificationInstanceInterface) => void,
  getRCNoticeProps: GetRCNoticePropsType
) => {
  const useNotification = (): [NotificationInstance, React.ReactElement] => {

    let innerInstance: RCNotificationInstance | null = null;

    const proxy = {
      add: (noticeProps: RCNoticeContent, holderCallBack?: RCHolderReadyCallback) => {
        innerInstance?.component.add(noticeProps, holderCallBack)
      }
    } as any

    const [hookNotify, holder] = useRCNotification(proxy);

    return [
      null,
      null
    ]

  }
}
