import { Injectable } from '@angular/core';
import { Action, State, StateContext, Selector } from '@ngxs/store';
import { STATE_NAME, INITIAL_STATE, StateModel } from './state.model';
import { CreateNewPassword } from './actions';
import { AuthenticationService } from '@shared/api';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@State<StateModel>({ name: STATE_NAME, defaults: INITIAL_STATE })
@Injectable()
export class ResetPasswordState {
  @Selector()
  static errorMessage({ errorMessage }: StateModel) {
    return errorMessage;
  }

  constructor(private authService: AuthenticationService) {}

  @Action(CreateNewPassword)
  sendRecoveryLink({ patchState }: StateContext<StateModel>, { params }: CreateNewPassword) {
    return this.authService.apiAuthenticationNewPasswordPost(params).pipe(
      catchError((error) => {
        // console.warn(`[${STATE_NAME}] Reset Password with error: `, error);
        const errorMessage = 'Reset Password failed. Sorry, please try again later.';
        patchState({ errorMessage });
        return throwError(errorMessage);
      })
    );
  }
}
