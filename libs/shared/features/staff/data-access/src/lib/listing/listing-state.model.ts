import { AccountStaffReadDtoPagingResponseDto, AccountStaffReadDto } from '@shared/api';

export interface StateModel {
  listing: AccountStaffReadDtoPagingResponseDto | null;
  detail: AccountStaffReadDto | null;
}

export const STATE_NAME = 'Shared_Account_Staffs';

export const INITIAL_STATE: StateModel = {
  listing: null,
  detail: null
};
