import { NotificationAlert } from '@taiga-ui/core';

export type StateModel = {
  notiItems: readonly NotificationAlert<any, any>[];
};
export const INITIAL_STATE: StateModel = { notiItems: [] };
export const STATE_NAME = 'Shared_Auth_Util';
