import { AccountCarReadDtoPagingResponseDto, AccountCarReadDto } from '@shared/api';

export interface StateModel {
  listing: AccountCarReadDtoPagingResponseDto | null;
  detail: AccountCarReadDto | null;
}

export const STATE_NAME = 'Shared_Account_Car';

export const INITIAL_STATE: StateModel = {
  listing: null,
  detail: null
};
