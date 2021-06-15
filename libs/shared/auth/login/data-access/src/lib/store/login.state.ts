import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { AuthenticationService } from '@shared/api';
import { STATE_NAME, INITIAL_STATE, LoginStateModel, ERROR_CODES } from './login-state.model';
import { Login, } from './login.actions';
import { catchError, tap } from 'rxjs/operators';
import { LogoutState } from '@shared/auth/logout/data-access';
import { throwError } from 'rxjs';

@State<LoginStateModel>({
  name: STATE_NAME,
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

  @Action(Login, { cancelUncompleted: true })
  login({ patchState }: StateContext<LoginStateModel>, { payload }: Login) {
    return this.authService.apiAuthenticationPost({ authenticationPostDto: payload }).pipe(
      tap((response) => {
        patchState(response);
      }),
      catchError((error) => {
        console.warn(error);

        patchState({ error: ERROR_CODES.WRONG_USERNAME_OR_PASSWORD });
        return throwError({ error: ERROR_CODES.WRONG_USERNAME_OR_PASSWORD })
      })
    );
  }
}
