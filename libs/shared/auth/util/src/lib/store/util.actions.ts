import { TuiNotificationOptions } from '@taiga-ui/core';
import { StateModel, STATE_NAME } from './util-state.model';

const ACTIONS = {
  SHOW_NOTIFICATION: `${STATE_NAME} Show notification`,
  UPDATE_NOTIFICATION_ITEMS: `${STATE_NAME} Update notification items`
};

export class ShowNotification {
  public static readonly type = ACTIONS.SHOW_NOTIFICATION;
  constructor(public readonly payload: { message: string; options: TuiNotificationOptions }) {}
}

export class UpdateNotificationItems {
  public static readonly type = ACTIONS.UPDATE_NOTIFICATION_ITEMS;
  constructor(public readonly payload: StateModel['notiItems']) {}
}
