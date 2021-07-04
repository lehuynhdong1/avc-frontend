import { State, Selector, Action, StateContext } from '@ngxs/store';
import { STATE_NAME, StateModel, INITIAL_STATE } from './state.model';
import {
  LoadApprovedCars,
  LoadUnapprovedCars,
  LoadCarById,
  UpdateCarManagedBy,
  ToggleActivation,
  ToggleApprove
} from './actions';
import { CarsService } from '@shared/api';
import { tap, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

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

  @Action(LoadApprovedCars, { cancelUncompleted: true })
  loadApprovedCars({ patchState }: StateContext<StateModel>, { params }: LoadApprovedCars) {
    return this.carsService
      .apiCarsGet({ ...params, isApproved: true })
      .pipe(tap((listing) => patchState({ approvedListing: listing })));
  }

  @Action(LoadUnapprovedCars, { cancelUncompleted: true }) loadUnapprovedCars(
    { patchState }: StateContext<StateModel>,
    { params }: LoadUnapprovedCars
  ) {
    return this.carsService
      .apiCarsGet({ ...params, isApproved: null as never })
      .pipe(tap((listing) => patchState({ unapprovedListing: listing })));
  }

  @Action(LoadCarById, { cancelUncompleted: true }) loadCarById(
    { patchState }: StateContext<StateModel>,
    { params }: LoadCarById
  ) {
    return this.carsService.apiCarsIdGet(params).pipe(tap((detail) => patchState({ detail })));
  }

  @Action(UpdateCarManagedBy, { cancelUncompleted: true })
  updateCarManagedBy({ patchState }: StateContext<StateModel>, { params }: UpdateCarManagedBy) {
    return this.carsService.apiCarsManagedbyPut(params).pipe(
      catchError((error) => {
        console.warn(`[${STATE_NAME}] UpdateCarManagedBy failed with error: `, error);
        const errorMessage = 'Update car failed. Sorry, please try again later.';
        patchState({ errorMessage });
        return throwError(errorMessage);
      })
    );
  }

  @Action(ToggleActivation, { cancelUncompleted: true })
  toggleActivation({ patchState, getState }: StateContext<StateModel>) {
    const { detail } = getState();
    const currentValue = detail?.isAvailable;
    // Fake update immediately
    patchState({
      detail: {
        ...detail,
        isAvailable: !currentValue
      }
    });
    return this.carsService
      .apiCarsIdActivationPut({
        id: detail?.id || 0,
        carActivationDto: { isAvailable: !currentValue || false }
      })
      .pipe(
        catchError((error) => {
          console.warn(`[${STATE_NAME}] ${ToggleActivation.name} failed with error: `, error);
          const errorMessage = `${
            currentValue ? 'Deactivate' : 'Activate'
          } failed. Sorry, please try again later.`;
          patchState({
            detail: {
              ...detail,
              isAvailable: currentValue
            },
            errorMessage
          });
          return throwError(errorMessage);
        })
      );
  }
  @Action(ToggleApprove, { cancelUncompleted: true })
  toggleApprove({ patchState }: StateContext<StateModel>, { params }: ToggleApprove) {
    return this.carsService.apiCarsIdApprovementPut(params).pipe(
      catchError((error) => {
        console.warn(`[${STATE_NAME}] ${ToggleApprove.name} failed with error: `, error);
        const errorMessage = `Processing failed. Sorry, please try again later.`;
        patchState({ errorMessage });
        return throwError(errorMessage);
      })
    );
  }
}
