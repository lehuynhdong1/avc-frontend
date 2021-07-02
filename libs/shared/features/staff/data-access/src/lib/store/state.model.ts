import {
  AccountReadDtoPagingResponseDto,
  AccountStaffDetailReadDto,
  ApiAccountsStaffPostRequestParams
} from '@shared/api';

export enum CreateStatus {
  PENDING,
  SUCCESSFUL,
  FAILED
}
export interface StateModel {
  listing?: AccountReadDtoPagingResponseDto;
  detail?: AccountStaffDetailReadDto;
  create?: { params?: ApiAccountsStaffPostRequestParams; status: CreateStatus };
  errorMessage?: string;
}

export const STATE_NAME = 'Shared_Account_Staff';

export const INITIAL_STATE: StateModel = {};
