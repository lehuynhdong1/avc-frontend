import { ModelReadDtoPagingResponseDto, ModelReadDto } from '@shared/api';
export const STATE_NAME = 'Admin_TrainModel_History';

export const INITIAL_STATE: StateModel = {};
export interface StateModel {
  listing?: ModelReadDtoPagingResponseDto;
  detail?: { model?: ModelReadDto; jobLog?: string };
  errorMessage?: string;
}
