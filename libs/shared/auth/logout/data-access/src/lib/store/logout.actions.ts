import { STATE_NAME } from './logout-state.model';

const ACTIONS = {
  LOGOUT: `[${STATE_NAME}] Logout`
};

export class Logout {
  static readonly type = ACTIONS.LOGOUT;
}
