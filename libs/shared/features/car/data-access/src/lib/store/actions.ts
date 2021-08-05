import { STATE_NAME } from './state.model';
import {
  ApiCarsIdGetRequestParams,
  ApiCarsGetRequestParams,
  ApiCarsManagedbyPutRequestParams,
  ApiCarsIdApprovementPutRequestParams,
  ApiCarsIdPutRequestParams,
  ApiCarsIdAssignPutRequestParams,
  ApiCarsIdConfigurationPutRequestParams,
  ApiCarsIdImagePutRequestParams,
  ApiCarsDefaultconfigPutRequestParams
} from '@shared/api';

const ACTIONS = {
  LOAD_APPROVED_CARS: `[${STATE_NAME}] Load approved cars`,
  LOAD_UNAPPROVED_CARS: `[${STATE_NAME}] Load unapproved cars`,
  LOAD_CAR_BY_ID: `[${STATE_NAME}] Load car by ID`,
  UPDATE_CAR: `[${STATE_NAME}] Update car by id & manager id includes (name, managedBy, assignedTo, config)`,
  TOGGLE_ACTIVATION: `[${STATE_NAME}] Toggle activation of a car`,
  TOGGLE_APPROVE: `[${STATE_NAME}] Toggle approve a car`,
  LOAD_DEFAULT_CONFIG: `[${STATE_NAME}] Load default configuration`,
  UPDATE_DEFAULT_CONFIG: `[${STATE_NAME}] Update default configuration`,
  CLEAR_DEFAULT_CONFIG: `[${STATE_NAME}] Clear default configuration`
};

export class LoadApprovedCars {
  static readonly type = ACTIONS.LOAD_APPROVED_CARS;
  constructor(
    public readonly params: ApiCarsGetRequestParams & { isApproved?: true } = { isApproved: true }
  ) {}
}
export class LoadUnapprovedCars {
  static readonly type = ACTIONS.LOAD_UNAPPROVED_CARS;
  constructor(
    public readonly params: ApiCarsGetRequestParams & { isApproved?: false } = { isApproved: false }
  ) {}
}

export class LoadCarById {
  static readonly type = ACTIONS.LOAD_CAR_BY_ID;
  constructor(public readonly params: ApiCarsIdGetRequestParams) {}
}
export class UpdateCar {
  static readonly type = ACTIONS.UPDATE_CAR;
  constructor(
    public readonly params: {
      managedBy?: ApiCarsManagedbyPutRequestParams;
      name?: ApiCarsIdPutRequestParams;
      assignedTo?: ApiCarsIdAssignPutRequestParams;
      image?: ApiCarsIdImagePutRequestParams;
      config?: ApiCarsIdConfigurationPutRequestParams;
    }
  ) {}
}

export class ToggleActivation {
  static readonly type = ACTIONS.TOGGLE_ACTIVATION;
}

export class ToggleApprove {
  static readonly type = ACTIONS.TOGGLE_APPROVE;
  constructor(public readonly params: ApiCarsIdApprovementPutRequestParams) {}
}

export class LoadDefaultConfig {
  static readonly type = ACTIONS.LOAD_DEFAULT_CONFIG;
}

export class UpdateDefaultConfig {
  static readonly type = ACTIONS.UPDATE_DEFAULT_CONFIG;
  constructor(public readonly params: ApiCarsDefaultconfigPutRequestParams) {}
}

export class ClearDefaultConfig {
  static readonly type = ACTIONS.CLEAR_DEFAULT_CONFIG;
}
