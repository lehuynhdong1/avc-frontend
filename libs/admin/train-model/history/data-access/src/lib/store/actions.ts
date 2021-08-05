import { STATE_NAME } from './state.model';
import {
  ApiModelGetRequestParams,
  ApiModelIdApplyingPutRequestParams,
  ApiModelIdGetRequestParams
} from '@shared/api';

const ACTIONS = {
  LOAD_MODELS: `[${STATE_NAME}] Load models`,
  LOAD_MODEL_BY_ID: `[${STATE_NAME}] Load model by ID`,
  LOAD_APPLYING_MODEL: `[${STATE_NAME}] Load applying model`,
  APPLY_MODEL_BY_ID: `[${STATE_NAME}] Apply model by ID`,
  LOAD_LOG_MODEL_BY_ID: `[${STATE_NAME}] Load log of selected model`,
  DOWNLOAD_IMAGES: `[${STATE_NAME}] Download images of selected model`,
  DOWNLOAD_LOG: `[${STATE_NAME}] Download log of selected model`
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

export class LoadLogModelById {
  static readonly type = ACTIONS.LOAD_LOG_MODEL_BY_ID;
}

export class DownloadImages {
  static readonly type = ACTIONS.DOWNLOAD_IMAGES;
}

export class DownloadLog {
  static readonly type = ACTIONS.DOWNLOAD_LOG;
}

export class LoadApplyingModel {
  static readonly type = ACTIONS.LOAD_APPLYING_MODEL;
}
