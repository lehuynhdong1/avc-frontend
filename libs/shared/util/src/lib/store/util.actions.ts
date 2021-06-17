import { TuiNotificationOptions } from '@taiga-ui/core';
import { STATE_NAME } from './util-state.model';

const ACTIONS = {
  SHOW_NOTIFICATION: `${STATE_NAME} Show notification`
};

export class ShowNotification {
  public static readonly type = ACTIONS.SHOW_NOTIFICATION;
  constructor(public readonly payload: { message: string; options: TuiNotificationOptions }) {}
}
