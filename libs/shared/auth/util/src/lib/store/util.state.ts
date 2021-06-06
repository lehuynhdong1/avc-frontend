import { State, Action, StateContext, Store, Selector } from '@ngxs/store';
import { TuiNotificationsService } from '@taiga-ui/core';
import { ShowNotification } from './util.actions';
import { STATE_NAME, StateModel, INITIAL_STATE } from './util-state.model';
import { Injectable } from '@angular/core';

@State<StateModel>({
  name: STATE_NAME,
  defaults: INITIAL_STATE
})
@Injectable()
export class UtilState {
  @Selector()
  notiItems() {
    return this.notifyService.items$.value;
  }

  constructor(private notifyService: TuiNotificationsService, private store: Store) {}

  @Action(ShowNotification)
  showNotification(_: StateContext<StateModel>, { payload }: ShowNotification) {
    const { message, options } = payload;
    this.notifyService.show(message, options).subscribe();
  }
}
