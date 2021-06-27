import { CarListReadDtoPagingResponseDto, CarReadDto } from '@shared/api';

export interface StateModel {
  listing: CarListReadDtoPagingResponseDto | null;
  detail: CarReadDto | null;
  errorMessage?: string;
}

export const STATE_NAME = 'Shared_Car';

export const INITIAL_STATE: StateModel = {
  listing: null,
  detail: null
};
