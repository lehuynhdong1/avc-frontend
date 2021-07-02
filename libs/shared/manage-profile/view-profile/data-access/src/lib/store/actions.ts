import { STATE_NAME } from './state.model';
import { ApiProfilePasswordPutRequestParams, ApiProfilePutRequestParams } from '@shared/api';

const ACTIONS = {
  VIEW_PROFILE: `[${STATE_NAME}] View Profile`,
  CHANGE_PASSWORD: `[${STATE_NAME}] Change Password`,
  UPDATE_PROFILE: `[${STATE_NAME}] Update Profile`
};

export class ViewProfile {
  static readonly type = ACTIONS.VIEW_PROFILE;
}

export class ChangePassword {
  static readonly type = ACTIONS.CHANGE_PASSWORD;
  constructor(public readonly params: ApiProfilePasswordPutRequestParams) {}
}

export class UpdateProfile {
  static readonly type = ACTIONS.UPDATE_PROFILE;
  constructor(public readonly params: ApiProfilePutRequestParams) {}
}
