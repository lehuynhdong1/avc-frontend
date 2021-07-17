import {
  ApiUsernotificationsGetRequestParams,
  ApiUsernotificationsReceiverIdCountGetRequestParams
} from '@shared/api';
import { TuiNotificationOptions } from '@taiga-ui/core';
import { STATE_NAME } from './util-state.model';

const ACTIONS = {
  SHOW_NOTIFICATION: `${STATE_NAME} Show notification`,
  LOAD_NOTIFICATIONS: `${STATE_NAME} Load notifications`,
  LOAD_UNREAD_COUNT: `${STATE_NAME} Load unread count`
};

export class ShowNotification {
  public static readonly type = ACTIONS.SHOW_NOTIFICATION;
  constructor(public readonly payload: { message: string; options: TuiNotificationOptions }) {}
}

export class LoadNotifications {
  public static readonly type = ACTIONS.LOAD_NOTIFICATIONS;
  constructor(public readonly params: ApiUsernotificationsGetRequestParams) {}
}

export class LoadUnreadCount {
  public static readonly type = ACTIONS.LOAD_UNREAD_COUNT;
  constructor(public readonly params: ApiUsernotificationsReceiverIdCountGetRequestParams) {}
}
