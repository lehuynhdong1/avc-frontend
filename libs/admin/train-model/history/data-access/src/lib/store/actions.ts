import { STATE_NAME } from './state.model';
import {
  ApiModelGetRequestParams,
  ApiModelIdApplyingPutRequestParams,
  ApiModelIdGetRequestParams
} from '@shared/api';

const ACTIONS = {
  LOAD_MODELS: `[${STATE_NAME}] Load models`,
  LOAD_MODEL_BY_ID: `[${STATE_NAME}] Load model by ID`,
  APPLY_MODEL_BY_ID: `[${STATE_NAME}] Apply model by ID`
};

export class LoadModels {
  static readonly type = ACTIONS.LOAD_MODELS;
  constructor(public readonly params: ApiModelGetRequestParams) {}
}

export class LoadModelById {
  static readonly type = ACTIONS.LOAD_MODEL_BY_ID;
  constructor(public readonly params: ApiModelIdGetRequestParams) {}
}

export class ApplyModelById {
  static readonly type = ACTIONS.APPLY_MODEL_BY_ID;
  constructor(public readonly params: ApiModelIdApplyingPutRequestParams) {}
}
