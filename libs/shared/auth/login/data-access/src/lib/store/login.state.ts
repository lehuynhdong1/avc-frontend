import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { AuthenticationService } from '@shared/api';
import { LOGIN_STATE_NAME, INITIAL_STATE, LoginStateModel } from './login-state.model';
import { Login } from './login.actions';
import { tap } from 'rxjs/operators';

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
  login({ patchState }: StateContext<LoginStateModel>, { payload }: Login) {
    return this.authService.apiAuthenticationPost(payload).pipe(
      tap((response) => {
        if (!response.token) throw new Error('Login failed');
        else patchState(response);
      })
    );
  }
}
