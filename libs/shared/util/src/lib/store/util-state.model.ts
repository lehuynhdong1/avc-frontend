import { UserNotificationReadDtoPagingResponseDto } from '@shared/api';

export type StateModel = {
  notifications?: UserNotificationReadDtoPagingResponseDto;
  unreadCount: number;
};
export const INITIAL_STATE: StateModel = {
  unreadCount: 0
};
export const STATE_NAME = 'Shared_Util';
