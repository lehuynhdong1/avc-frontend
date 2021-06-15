import { State, Selector, Action, StateContext } from '@ngxs/store';
import { STATE_NAME, StateModel, INITIAL_STATE } from './listing-state.model';
import { LoadStaffs, LoadStaffById } from './listing.actions';
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
  static staffs({ listing }: StateModel) {
    return listing;
  }
  @Selector()
  static selectedStaff({ detail }: StateModel) {
    return detail;
  }

  constructor(private accountsService: AccountsService) {}

  @Action(LoadStaffs) loadStaffs({ patchState }: StateContext<StateModel>, { params }: LoadStaffs) {
    return this.accountsService
      .apiAccountsStaffsGet(params)
      .pipe(tap((response) => patchState({ listing: response })));
  }
}
