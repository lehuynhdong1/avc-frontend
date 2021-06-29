import { IssueReadDto, IssueReadDtoPagingResponseDto } from '@shared/api';

export interface StateModel {
  listing: IssueReadDtoPagingResponseDto | null;
  detail: IssueReadDto | null;
  errorMessage?: string;
}

export const STATE_NAME = 'Shared_Issue';

export const INITIAL_STATE: StateModel = {
  listing: null,
  detail: null
};
