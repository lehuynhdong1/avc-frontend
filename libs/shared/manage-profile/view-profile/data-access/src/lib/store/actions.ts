import { STATE_NAME } from './state.model';
import { ApiProfilePasswordPutRequestParams } from '@shared/api';

const ACTIONS = {
  VIEW_PROFILE: `[${STATE_NAME}] View Profile`,
  CHANGE_PASSWORD: `[${STATE_NAME}] Change Password`
};

export class ViewProfile {
  static readonly type = ACTIONS.VIEW_PROFILE;
}

export class ChangePassword {
  static readonly type = ACTIONS.CHANGE_PASSWORD;
  constructor(public readonly params: ApiProfilePasswordPutRequestParams) {}
}
