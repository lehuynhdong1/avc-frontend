import { UserNotificationReadDto } from '@shared/api';

export type StateModel = {
  notifications: Array<UserNotificationReadDto>;
  unreadCount: number;
};
export const INITIAL_STATE: StateModel = {
  notifications: [],
  unreadCount: 0
};
export const STATE_NAME = 'Shared_Util';
