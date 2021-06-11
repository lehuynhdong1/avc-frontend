import { AccountReadDtoPagingResponseDto } from '@shared/api';

export const enum AccountTypes {
  STAFFS = 'staffs',
  MANAGERS = 'managers'
}

export interface StateModel {
  [AccountTypes.STAFFS]: AccountReadDtoPagingResponseDto | null;
  [AccountTypes.MANAGERS]: AccountReadDtoPagingResponseDto | null;
}

export const STATE_NAME = 'Shared_Account_Listing';

export const INITIAL_STATE: StateModel = {
  staffs: null,
  managers: null
};
