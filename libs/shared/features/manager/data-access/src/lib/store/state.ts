import { State, Selector, Action, StateContext } from '@ngxs/store';
import { STATE_NAME, StateModel, INITIAL_STATE } from './state.model';
import { LoadManagers, LoadManagerById } from './actions';
import { AccountsService } from '@shared/api';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@State<StateModel>({
  name: STATE_NAME,
  defaults: INITIAL_STATE
})
@Injectable()
export class ManagerState {
  @Selector()
  static managers({ listing }: StateModel) {
    return listing;
  }
  @Selector()
  static selectedManager({ detail }: StateModel) {
    return detail;
  }

  constructor(private accountsService: AccountsService) {}

  @Action(LoadManagers) loadManagers(
    { patchState }: StateContext<StateModel>,
    { params }: LoadManagers
  ) {
    return this.accountsService
      .apiAccountsManagersGet(params)
      .pipe(tap((listing) => patchState({ listing })));
  }
  @Action(LoadManagerById) loadManagerById(
    { patchState }: StateContext<StateModel>,
    { params }: LoadManagerById
  ) {
    return this.accountsService
      .apiAccountsManagerIdGet(params)
      .pipe(tap((detail) => patchState({ detail })));
  }
}
