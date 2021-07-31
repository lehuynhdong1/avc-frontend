import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { AuthenticationService, Configuration, RolesService } from '@shared/api';
import { STATE_NAME, INITIAL_STATE, LoginStateModel } from './login-state.model';
import { Login, LoadRoles, UpdateProfile, LoadToken } from './login.actions';
import { catchError, tap } from 'rxjs/operators';
import { LogoutState } from '@shared/auth/logout/data-access';
import { throwError } from 'rxjs';
import { RoleNameType } from '@shared/util';

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
  static roles({ roles }: LoginStateModel) {
    return roles.result;
  }
  @Selector()
  static errorMessage({ errorMessage }: LoginStateModel) {
    return errorMessage;
  }

  constructor(
    private authService: AuthenticationService,
    private rolesService: RolesService,
    private apiConfig: Configuration
  ) {
    super();
  }

  @Action(Login, { cancelUncompleted: true })
  login({ patchState, dispatch }: StateContext<LoginStateModel>, { payload }: Login) {
    const { params, acceptedRoles = ['Admin', 'Manager', 'Staff'] } = payload;
    return this.authService.apiAuthenticationPost({ authenticationPostDto: params }).pipe(
      tap((response) => {
        const roleName = response.account?.role as RoleNameType;
        if (!acceptedRoles.includes(roleName)) throw new Error('Role not appropriate');
        patchState(response);
        return dispatch(new LoadToken());
      }),
      catchError((error) => {
        // console.warn(`[${STATE_NAME}] Login with error: `, error);
        const errorMessage = 'Your email or password is seem to be wrong. Please try again.';

        patchState({ errorMessage });
        return throwError(errorMessage);
      })
    );
  }

  @Action(LoadRoles, { cancelUncompleted: true })
  loadRoles({ patchState }: StateContext<LoginStateModel>) {
    return this.rolesService.apiRolesGet().pipe(
      tap((roles: unknown) => patchState({ roles: roles as LoginStateModel['roles'] })),
      catchError((error) => {
        // console.warn(`[${STATE_NAME}] Load roles with error: `, error);
        const errorMessage = 'Load system roles failed.';
        patchState({ errorMessage });
        return throwError(errorMessage);
      })
    );
  }

  @Action(UpdateProfile, { cancelUncompleted: true })
  updateProfile({ patchState }: StateContext<LoginStateModel>, { payload }: UpdateProfile) {
    patchState({ account: payload });
  }

  @Action(LoadToken) loadToken({ getState }: StateContext<LoginStateModel>) {
    this.apiConfig.apiKeys = { Authorization: `Bearer ${getState().token}` };
  }
}
