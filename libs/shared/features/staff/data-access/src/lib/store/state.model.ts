import {
  AccountStaffReadDtoPagingResponseDto,
  AccountStaffReadDto,
  ApiAccountsStaffPostRequestParams
} from '@shared/api';

export enum CreateStatus {
  PENDING,
  SUCCESSFUL,
  FAILED
}
export interface StateModel {
  listing?: AccountStaffReadDtoPagingResponseDto;
  detail?: AccountStaffReadDto;
  create?: { params?: ApiAccountsStaffPostRequestParams; status: CreateStatus };
  errorMessage?: string;
}

export const STATE_NAME = 'Shared_Account_Staff';

export const INITIAL_STATE: StateModel = {};
