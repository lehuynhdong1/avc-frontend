import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { AuthenticationService } from '@shared/api';
import { LOGIN_STATE_NAME, INITIAL_STATE, LoginStateModel, ERROR_CODES } from './login-state.model';
import { Login, LoginError, LoginSuccess } from './login.actions';
import { catchError, tap } from 'rxjs/operators';
import { LogoutState } from '@shared/auth/logout/data-access';

@State<LoginStateModel>({
  name: LOGIN_STATE_NAME,
  defaults: INITIAL_STATE
})
@Injectable()
export class LoginState extends LogoutState {
  @Selector()
  static token({ token }: LoginStateModel) {
    return token;
  }
  @Selector()
  static account({ account }: LoginStateModel) {
    return account;
  }
  @Selector()
  static error({ error }: LoginStateModel) {
    return error;
  }

  constructor(private authService: AuthenticationService) {
    super();
  }

  @Action(Login)
  login({ dispatch }: StateContext<LoginStateModel>, { payload }: Login) {
    return this.authService.apiAuthenticationPost(payload).pipe(
      tap((response) => {
        dispatch(new LoginSuccess(response));
      }),
      catchError(() => {
        return dispatch(new LoginError(ERROR_CODES.WRONG_USERNAME_OR_PASSWORD));
      })
    );
  }

  @Action(LoginSuccess)
  loginSuccess({ patchState }: StateContext<LoginStateModel>, { payload }: LoginSuccess) {
    patchState(payload);
  }

  @Action(LoginError)
  loginError({ patchState }: StateContext<LoginStateModel>, { payload }: LoginError) {
    patchState({ error: payload });
  }
}
