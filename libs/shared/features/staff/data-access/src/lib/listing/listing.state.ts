import { State, Selector, Action, StateContext } from '@ngxs/store';
import { STATE_NAME, StateModel, INITIAL_STATE, AccountTypes } from './listing-state.model';
import { LoadAccounts } from './listing.actions';
import { AccountsService } from '@shared/api';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@State<StateModel>({
  name: STATE_NAME,
  defaults: INITIAL_STATE
})
@Injectable()
export class ListingState {
  @Selector()
  static staffs({ staffs }: StateModel) {
    return staffs;
  }

  @Selector()
  static managers({ managers }: StateModel) {
    return managers;
  }

  constructor(private accountsService: AccountsService) {}

  @Action(LoadAccounts) loadAccounts(
    { patchState }: StateContext<StateModel>,
    { type, params }: LoadAccounts
  ) {
    const apiMap = {
      [AccountTypes.STAFFS]: this.accountsService.apiAccountsStaffsGet(params),
      [AccountTypes.MANAGERS]: this.accountsService.apiAccountsManagersGet(params)
    };
    return apiMap[type].pipe(tap((response) => patchState({ [type]: response })));
  }
}
