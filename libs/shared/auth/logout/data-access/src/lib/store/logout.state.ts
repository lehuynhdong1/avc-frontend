import { Injectable } from '@angular/core';
import { Action, State } from '@ngxs/store';
import { STATE_NAME, INITIAL_STATE, StateModel } from './logout-state.model';
import { Logout } from './logout.actions';

@State<StateModel>({
  name: STATE_NAME,
  defaults: INITIAL_STATE
})
@Injectable()
export class LogoutState {
  @Action(Logout)
  logout() {
    localStorage.clear();
  }
}
