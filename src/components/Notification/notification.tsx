import React from 'react';
import Notification from 'rc-notification';
import { NotificationInstance as RCNotificationInstance } from 'rc-notification/lib/Notification';
export type NotificationLocation = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';

export type IconType = 'success' | 'error' | 'warning' | 'info'

export interface NotificationProps {
  message: React.ReactNode;
  description?: React.ReactNode;
  btn?: React.ReactNode;
  key?: string;
  onClose?: () => void;
  duration?: number | null;
  location?: NotificationLocation;
  style?: React.CSSProperties;
  prefixClasses?: string;
  className?: string;
  onClick?: () => void;
  top?: number;
  bottom?: number;
}

export interface ConfigProps {
  top?: number;
  bottom?: number;
  duration?: number;
  prefixClasses?: string;
  // right to left
  rtl?: boolean;
}

export interface NotificationInstance {
  success(args: NotificationProps):void;
  error(args: NotificationProps):void;
  info(args: NotificationProps):void;
  warning(args: NotificationProps):void;
  open(args: NotificationProps):void;
}


export interface NotificationApi {
  warn(args: NotificationProps): void;
  close(key: string): void;
  config(options: ConfigProps): void;

  useNotification: () => [NotificationInstance, React.ReactElement]
}

const api: any = {
  open: () => {},
  close: (key: string) => {},
  config: () => {},
  destroy: () => {}
}

// promise key-value pairs
const notificationInstance: {
  [key: string]: Promise<RCNotificationInstance>
} = {}




export default api as NotificationApi
