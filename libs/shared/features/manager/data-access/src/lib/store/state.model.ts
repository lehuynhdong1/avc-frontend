import { AccountManagerReadDtoPagingResponseDto, AccountManagerReadDto } from '@shared/api';

export interface StateModel {
  listing: AccountManagerReadDtoPagingResponseDto | null;
  detail: AccountManagerReadDto | null;
  errorMessage?: string;
}

export const STATE_NAME = 'Shared_Account_Manager';

export const INITIAL_STATE: StateModel = {
  listing: null,
  detail: null
};
