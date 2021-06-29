import { STATE_NAME } from './state.model';
import { ApiCarsIdGetRequestParams, ApiCarsGetRequestParams } from '@shared/api';

const ACTIONS = {
  LOAD_APPROVED_CARS: `[${STATE_NAME}] Load approved cars`,
  LOAD_UNAPPROVED_CARS: `[${STATE_NAME}] Load unapproved cars`,
  LOAD_CAR_BY_ID: `[${STATE_NAME}] Load car by ID`
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
