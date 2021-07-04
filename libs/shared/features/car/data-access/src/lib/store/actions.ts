import { STATE_NAME } from './state.model';
import {
  ApiCarsIdGetRequestParams,
  ApiCarsGetRequestParams,
  ApiCarsManagedbyPutRequestParams,
  ApiCarsIdApprovementPutRequestParams
} from '@shared/api';

const ACTIONS = {
  LOAD_APPROVED_CARS: `[${STATE_NAME}] Load approved cars`,
  LOAD_UNAPPROVED_CARS: `[${STATE_NAME}] Load unapproved cars`,
  LOAD_CAR_BY_ID: `[${STATE_NAME}] Load car by ID`,
  UPDATE_CAR_MANAGED_BY: `[${STATE_NAME}] Update car by id & manager id`,
  TOGGLE_ACTIVATION: `[${STATE_NAME}] Toggle activation of a car`,
  TOGGLE_APPROVE: `[${STATE_NAME}] Toggle approve a car`
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
export class UpdateCarManagedBy {
  static readonly type = ACTIONS.UPDATE_CAR_MANAGED_BY;
  constructor(public readonly params: ApiCarsManagedbyPutRequestParams) {}
}

export class ToggleActivation {
  static readonly type = ACTIONS.TOGGLE_ACTIVATION;
}

export class ToggleApprove {
  static readonly type = ACTIONS.TOGGLE_APPROVE;
  constructor(public readonly params: ApiCarsIdApprovementPutRequestParams) {}
}
