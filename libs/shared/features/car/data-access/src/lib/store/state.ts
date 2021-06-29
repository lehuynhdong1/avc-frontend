import { State, Selector, Action, StateContext } from '@ngxs/store';
import { STATE_NAME, StateModel, INITIAL_STATE } from './state.model';
import { LoadApprovedCars, LoadUnapprovedCars, LoadCarById } from './actions';
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
  static approvedCars({ approvedListing }: StateModel) {
    return approvedListing;
  }
  @Selector()
  static unapprovedCars({ unapprovedListing }: StateModel) {
    return unapprovedListing;
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

  @Action(LoadApprovedCars) loadApprovedCars(
    { patchState }: StateContext<StateModel>,
    { params }: LoadApprovedCars
  ) {
    return this.carsService
      .apiCarsGet(params)
      .pipe(tap((listing) => patchState({ approvedListing: listing })));
  }

  @Action(LoadUnapprovedCars) loadUnapprovedCars(
    { patchState }: StateContext<StateModel>,
    { params }: LoadUnapprovedCars
  ) {
    return this.carsService
      .apiCarsGet(params)
      .pipe(tap((listing) => patchState({ unapprovedListing: listing })));
  }

  @Action(LoadCarById) loadCarById(
    { patchState }: StateContext<StateModel>,
    { params }: LoadCarById
  ) {
    return this.carsService.apiCarsIdGet(params).pipe(tap((detail) => patchState({ detail })));
  }
}
