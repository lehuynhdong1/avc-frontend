import { CarListReadDtoPagingResponseDto, CarReadDto, DefaultCarConfigDto } from '@shared/api';

export interface StateModel {
  approvedListing: CarListReadDtoPagingResponseDto | null;
  unapprovedListing: CarListReadDtoPagingResponseDto | null;
  detail: CarReadDto | null;
  defaultConfig?: DefaultCarConfigDto;
  errorMessage?: string;
}

export const STATE_NAME = 'Shared_Car';

export const INITIAL_STATE: StateModel = {
  approvedListing: null,
  unapprovedListing: null,
  detail: null
};
