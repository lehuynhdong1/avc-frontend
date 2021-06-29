import { Injectable } from '@angular/core';
import { Action, NgxsOnInit, Selector, State, StateContext } from '@ngxs/store';
import { AuthenticationService, RolesService } from '@shared/api';
import { STATE_NAME, INITIAL_STATE, LoginStateModel, ERROR_CODES } from './login-state.model';
import { Login, LoadRoles } from './login.actions';
import { catchError, tap } from 'rxjs/operators';
import { LogoutState } from '@shared/auth/logout/data-access';
import { throwError } from 'rxjs';

@State<LoginStateModel>({
  name: STATE_NAME,
  defaults: INITIAL_STATE
})
@Injectable()
export class LoginState extends LogoutState implements NgxsOnInit {
  @Selector()
  static token({ token }: LoginStateModel) {
    return token;
  }
  @Selector()
  static account({ account }: LoginStateModel) {
    return account;
  }
  @Selector()
  static roles({ roles }: LoginStateModel) {
    return roles.result;
  }
  @Selector()
  static error({ error }: LoginStateModel) {
    return error;
  }

  constructor(private authService: AuthenticationService, private rolesService: RolesService) {
    super();
  }

  ngxsOnInit({ dispatch }: StateContext<LoginStateModel>) {
    dispatch(new LoadRoles());
  }

  @Action(Login, { cancelUncompleted: true })
  login({ patchState }: StateContext<LoginStateModel>, { payload }: Login) {
    return this.authService.apiAuthenticationPost({ authenticationPostDto: payload }).pipe(
      tap((response) => patchState(response)),
      catchError((error) => {
        console.warn(`[${STATE_NAME}] Login with error: ${error}`);

        patchState({ error: ERROR_CODES.WRONG_USERNAME_OR_PASSWORD });
        return throwError({ error: ERROR_CODES.WRONG_USERNAME_OR_PASSWORD });
      })
    );
  }

  @Action(LoadRoles)
  loadRoles({ patchState }: StateContext<LoginStateModel>) {
    return this.rolesService.apiRolesGet().pipe(
      tap((roles: unknown) => patchState({ roles: roles as LoginStateModel['roles'] })),
      catchError((error) => {
        console.warn(`[${STATE_NAME}] Login with error: ${error}`);
        return throwError({ error: ERROR_CODES.LOAD_ROLES_FAILED });
      })
    );
  }
}
