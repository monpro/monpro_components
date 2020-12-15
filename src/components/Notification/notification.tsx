import React from 'react';


export type NotificationLocation = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';

export type IconType = 'success' | 'error' | 'warning' | 'info'

export interface NotificationInstance {
  success(args: any):void;
  error(args: any):void;
  info(args: any):void;
  warning(args: any):void;
  open(args: any):void;
}



export interface NotificationApi {
  warn(args: any): void;
  close(key: string): void;
  config(options: any): void;

  useNotification: () => [NotificationInstance, React.ReactElement]
}

const api: any = {
  open: () => {},
  close: (key: string) => {},
  config: () => {},
  destroy: () => {}
}

export default api as NotificationApi
