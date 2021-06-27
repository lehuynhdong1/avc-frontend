import { State, Selector, Action, StateContext } from '@ngxs/store';
import { STATE_NAME, StateModel, INITIAL_STATE } from './state.model';
import { LoadCars, LoadCarById } from './actions';
import { CarsService } from '@shared/api';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@State<StateModel>({
  name: STATE_NAME,
  defaults: INITIAL_STATE
})
@Injectable()
export class CarState {
  @Selector()
  static cars({ listing }: StateModel) {
    return listing;
  }
  @Selector()
  static selectedCar({ detail }: StateModel) {
    return detail;
  }
  @Selector()
  static errorMessage({ errorMessage }: StateModel) {
    return errorMessage;
  }

  constructor(private carsService: CarsService) {}

  @Action(LoadCars) loadCars({ patchState }: StateContext<StateModel>, { params }: LoadCars) {
    return this.carsService.apiCarsGet(params).pipe(tap((listing) => patchState({ listing })));
  }
  @Action(LoadCarById) loadCarById(
    { patchState }: StateContext<StateModel>,
    { params }: LoadCarById
  ) {
    return this.carsService.apiCarsIdGet(params).pipe(tap((detail) => patchState({ detail })));
  }
}
