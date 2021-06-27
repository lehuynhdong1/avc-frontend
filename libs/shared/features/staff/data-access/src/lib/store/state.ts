import { State, Selector, Action, StateContext } from '@ngxs/store';
import { STATE_NAME, StateModel, INITIAL_STATE, CreateStatus } from './state.model';
import { LoadStaffs, LoadStaffById, CreateStaff, UpdateStaff } from './actions';
import { AccountsService } from '@shared/api';
import { tap, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ToggleActivation } from '@shared/features/account/data-access';
import { throwError } from 'rxjs';
import { update } from '@rx-angular/state';

@State<StateModel>({
  name: STATE_NAME,
  defaults: INITIAL_STATE
})
@Injectable()
export class StaffState {
  @Selector()
  static staffs({ listing }: StateModel) {
    return listing;
  }
  @Selector()
  static selectedStaff({ detail }: StateModel) {
    return detail;
  }
  @Selector()
  static createdDraft({ create }: StateModel) {
    return create;
  }
  @Selector()
  static errorMessage({ errorMessage }: StateModel) {
    return errorMessage;
  }

  constructor(private accountsService: AccountsService) {}

  @Action(LoadStaffs) loadStaffs({ patchState }: StateContext<StateModel>, { params }: LoadStaffs) {
    return this.accountsService
      .apiAccountsStaffsGet(params)
      .pipe(tap((listing) => patchState({ listing })));
  }
  @Action(LoadStaffById) loadStaffById(
    { patchState }: StateContext<StateModel>,
    { params }: LoadStaffById
  ) {
    return this.accountsService
      .apiAccountsStaffIdGet(params)
      .pipe(tap((detail) => patchState({ detail })));
  }

  @Action(ToggleActivation)
  activate({ getState, patchState }: StateContext<StateModel>, { payload }: ToggleActivation) {
    const { id, currentValue } = payload;
    const setNewStateWith = (isAvailable: boolean) => {
      const { listing, detail } = getState();
      let newState = getState();
      if (listing?.result) {
        const willUpdateManager = listing.result.find((manager) => manager.id === id);
        const updatedManager = { ...willUpdateManager, isAvailable };
        if (willUpdateManager) {
          const newResult = update(listing.result, updatedManager, 'id');
          newState = { ...newState, listing: { ...listing, result: newResult } };
        }
      }
      if (detail) {
        const selectedId = detail?.id;
        if (selectedId === id) {
          newState = { ...newState, detail: { ...detail, isAvailable } };
        }
      }
      patchState(newState);
    };
    setNewStateWith(!currentValue);
    return this.accountsService
      .apiAccountsIdActivationPut({ id, accountActivationDto: { isAvailable: !currentValue } })
      .pipe(
        tap(() => setNewStateWith(!currentValue)),
        catchError((error) => {
          console.warn(
            `[${STATE_NAME}] ToggleActivation Error when currentValue = ${currentValue}, error = ${error}`
          );
          setNewStateWith(currentValue);
          const errorMessage = `${
            currentValue ? 'Deactivate' : 'Activate'
          } has been errorred. Sorry, please try again later.`;
          patchState({ errorMessage });
          return throwError(errorMessage);
        })
      );
  }

  @Action(CreateStaff)
  createStaff({ getState, patchState }: StateContext<StateModel>, { params }: CreateStaff) {
    const { create } = getState();
    return this.accountsService.apiAccountsStaffPost(params).pipe(
      tap(() => patchState({ create: { ...create, status: CreateStatus.SUCCESSFUL } })),
      catchError((error) => {
        console.warn(`[${STATE_NAME}] CreateStaff failed with error: `, error);
        const errorMessage = 'Create staff failed. Sorry, please try again later.';
        patchState({ errorMessage });
        return throwError(errorMessage);
      })
    );
  }

  @Action(UpdateStaff)
  updateStaff({ patchState }: StateContext<StateModel>, { params }: UpdateStaff) {
    return this.accountsService.apiAccountsIdPatch(params).pipe(
      catchError((error) => {
        console.warn(`[${STATE_NAME}] UpdateStaff failed with error: `, error);
        const errorMessage = 'Update staff failed. Sorry, please try again later.';
        patchState({ errorMessage });
        return throwError(errorMessage);
      })
    );
  }
}
