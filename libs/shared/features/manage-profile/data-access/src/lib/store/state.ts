import { State, Selector, Action, StateContext } from '@ngxs/store';
import { STATE_NAME, StateModel, INITIAL_STATE } from './state.model';
import { tap, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { ProfileService } from '@shared/api';
import { ChangePassword, ViewProfile, UpdateProfile } from './actions';
import { UpdateProfile as LoginUpdateProfile } from '@shared/auth/login/data-access';

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
      .pipe(tap((profile) => dispatch(new LoginUpdateProfile(profile))));
  }

  @Action(ChangePassword)
  changePassword({ patchState }: StateContext<StateModel>, { params }: ChangePassword) {
    return this.profileService.apiProfilePasswordPut(params).pipe(
      catchError((error) => {
        console.warn(`[${STATE_NAME}] ChangePassword with error: `, error);
        const errorMessage = "Your current password seem to be incorrect. Let's try again.";
        patchState({ errorMessage });
        return throwError(errorMessage);
      })
    );
  }

  @Action(UpdateProfile)
  updateProfile({ dispatch, patchState }: StateContext<StateModel>, { params }: UpdateProfile) {
    return this.profileService.apiProfilePut(params).pipe(
      tap(() => dispatch(new ViewProfile())),
      catchError((error) => {
        console.warn(`[${STATE_NAME}] UpdateProfile with error: `, error);
        const errorMessage = 'We missed something. Update profile failed, please try again later.';
        patchState({ errorMessage });
        return throwError(errorMessage);
      })
    );
  }
}
