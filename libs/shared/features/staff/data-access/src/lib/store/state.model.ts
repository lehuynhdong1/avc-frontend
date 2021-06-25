import { AccountStaffReadDtoPagingResponseDto, AccountStaffReadDto } from '@shared/api';

export interface StateModel {
  listing: AccountStaffReadDtoPagingResponseDto | null;
  detail: AccountStaffReadDto | null;
  errorMessage?: string;
}

export const STATE_NAME = 'Shared_Account_Staff';

export const INITIAL_STATE: StateModel = {
  listing: null,
  detail: null
};
