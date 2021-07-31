import { STATE_NAME } from './state.model';

const ACTIONS = {
  LOAD_DASHBOARD: `[${STATE_NAME}] Load dashboard`
};

export class LoadDashboard {
  static readonly type = ACTIONS.LOAD_DASHBOARD;
}
