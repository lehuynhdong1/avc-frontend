import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { TuiNotificationsService } from '@taiga-ui/core';
import { INITIAL_STATE, StateModel, STATE_NAME } from './util-state.model';
import { ShowNotification } from './util.actions';

@State<StateModel>({
  name: STATE_NAME,
  defaults: INITIAL_STATE
})
@Injectable()
export class UtilState {
  constructor(private notifyService: TuiNotificationsService) {}

  @Action(ShowNotification)
  showNotification(_: StateContext<StateModel>, { payload }: ShowNotification) {
    const { message, options } = payload;
    this.notifyService.show(message, options).subscribe();
  }
}
