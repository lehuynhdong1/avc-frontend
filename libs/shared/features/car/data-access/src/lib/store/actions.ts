import { STATE_NAME } from './state.model';
import { ApiCarsIdGetRequestParams, ApiCarsGetRequestParams } from '@shared/api';

const ACTIONS = {
  LOAD_CARS: `[${STATE_NAME}] Load Cars`,
  LOAD_CAR_BY_ID: `[${STATE_NAME}] Load Car By Id`
};

export class LoadCars {
  static readonly type = ACTIONS.LOAD_CARS;
  constructor(public readonly params: ApiCarsGetRequestParams) {}
}

export class LoadCarById {
  static readonly type = ACTIONS.LOAD_CAR_BY_ID;
  constructor(public readonly params: ApiCarsIdGetRequestParams) {}
}
