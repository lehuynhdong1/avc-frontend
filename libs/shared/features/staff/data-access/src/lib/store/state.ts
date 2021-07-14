import { State, Selector, Action, StateContext, Store } from '@ngxs/store';
import { STATE_NAME, StateModel, INITIAL_STATE, CreateStatus } from './state.model';
import {
  LoadStaffs,
  LoadStaffById,
  CreateStaff,
  UpdateStaff,
  UpdateStaffManagedBy
} from './actions';
import { AccountsService } from '@shared/api';
import { tap, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ToggleActivation } from '@shared/features/account/data-access';
import { throwError } from 'rxjs';
import { update } from '@rx-angular/state';
import { LoginState } from '@shared/auth/login/data-access';

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

  constructor(private accountsService: AccountsService, private store: Store) {}

  @Action(LoadStaffs, { cancelUncompleted: true }) loadStaffs(
    { patchState }: StateContext<StateModel>,
    { params }: LoadStaffs
  ) {
    const isAdmin = this.store.selectSnapshot(LoginState.account)?.role === 'Admin';
    return this.accountsService
      .apiAccountsStaffsGet({ ...params, isAvailable: isAdmin ? undefined : true })
      .pipe(tap((listing) => patchState({ listing })));
  }
  @Action(LoadStaffById, { cancelUncompleted: true }) loadStaffById(
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
        const willUpdateStaff = listing.result.find((staff) => staff.id === id);
        const updatedStaff = { ...willUpdateStaff, isAvailable };
        if (willUpdateStaff) {
          const newResult = update(listing.result, updatedStaff, 'id');
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
        // console.warn(`[${STATE_NAME}] CreateStaff failed with error: `, error);
        let errorMessage = 'Create staff failed. Sorry, please try again later.';
        if (error.status === 409) {
          errorMessage = 'Email has already existed. Sorry, please enter another one.';
        }
        patchState({ errorMessage });
        return throwError(errorMessage);
      })
    );
  }

  @Action(UpdateStaff)
  updateStaff({ patchState }: StateContext<StateModel>, { params }: UpdateStaff) {
    return this.accountsService.apiAccountsIdPatch(params).pipe(
      catchError((error) => {
        // console.warn(`[${STATE_NAME}] UpdateStaff failed with error: `, error);
        const errorMessage = 'Update staff failed. Sorry, please try again later.';
        patchState({ errorMessage });
        return throwError(errorMessage);
      })
    );
  }

  @Action(UpdateStaffManagedBy)
  updateStaffManagedBy({ patchState }: StateContext<StateModel>, { params }: UpdateStaffManagedBy) {
    return this.accountsService.apiAccountsManagedbyPut(params).pipe(
      catchError((error) => {
        // console.warn(`[${STATE_NAME}] UpdateStaffManagedBy failed with error: `, error);
        const errorMessage = 'Update staff failed. Sorry, please try again later.';
        patchState({ errorMessage });
        return throwError(errorMessage);
      })
    );
  }
}
