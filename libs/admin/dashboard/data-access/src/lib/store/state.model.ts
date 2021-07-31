import { DashBoardDto } from '@shared/api';

export const STATE_NAME = 'Admin_Dashboard';
export const INITIAL_STATE: StateModel = {};
export interface StateModel {
  dashboard?: DashBoardDto;
  errorMessage?: string;
}
