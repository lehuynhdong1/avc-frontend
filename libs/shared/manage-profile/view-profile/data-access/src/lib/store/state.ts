import { State, Selector, Action, StateContext } from '@ngxs/store';
import { STATE_NAME, StateModel, INITIAL_STATE } from './state.model';
import { tap, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { ProfileService } from '@shared/api';
import { ChangePassword, ViewProfile } from './actions';
import { UpdateProfile } from '@shared/auth/login/data-access';

@State<StateModel>({
  name: STATE_NAME,
  defaults: INITIAL_STATE
})
@Injectable()
export class ManageProfileState {
  @Selector()
  static errorMessage({ errorMessage }: StateModel) {
    return errorMessage;
  }

  constructor(private profileService: ProfileService) {}

  @Action(ViewProfile)
  viewProfile({ dispatch }: StateContext<StateModel>) {
    return this.profileService
      .apiProfileGet()
      .pipe(tap((profile) => dispatch(new UpdateProfile(profile))));
  }

  @Action(ChangePassword)
  changePassword(_: StateContext<StateModel>, { params }: ChangePassword) {
    return this.profileService.apiProfilePasswordPut(params).pipe(
      catchError((error) => {
        console.warn(`[${STATE_NAME}] ChangePassword with error: `, error);
        return throwError({
          error: 'We missed something. Change password failed, please try again later.'
        });
      })
    );
  }
}
