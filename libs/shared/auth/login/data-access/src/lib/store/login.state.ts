import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { AuthenticationService } from '@shared/api';
import { LOGIN_STATE_NAME, INITIAL_STATE, LoginStateModel, ERROR_CODES } from './login-state.model';
import { Login, LoginError, LoginSuccess } from './login.actions';
import { catchError, tap } from 'rxjs/operators';
import { merge, of, partition, throwError } from 'rxjs';

@State<LoginStateModel>({
  name: LOGIN_STATE_NAME,
  defaults: INITIAL_STATE
})
@Injectable()
export class LoginState {
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

  constructor(private authService: AuthenticationService) {}

  @Action(Login)
  login({ dispatch }: StateContext<LoginStateModel>, { payload }: Login) {
    const [success, error] = partition(
      this.authService.apiAuthenticationPost(payload, 'response'),
      (response) => response.ok
    );
    return merge(
      success.pipe(
        tap((response) => {
          if (response.body) dispatch(new LoginSuccess(response.body));
        })
      ),
      error.pipe(
        tap(() => {
          dispatch(new LoginError(ERROR_CODES.WRONG_USERNAME_OR_PASSWORD));
        })
      )
    );
  }
}
