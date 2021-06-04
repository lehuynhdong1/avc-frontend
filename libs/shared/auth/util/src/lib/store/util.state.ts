import { State, Action, StateContext, NgxsOnInit, Store } from '@ngxs/store';
import { TuiNotificationsService } from '@taiga-ui/core';
import { ShowNotification, UpdateNotificationItems } from './util.actions';
import { STATE_NAME, StateModel, INITIAL_STATE } from './util-state.model';
import { Injectable } from '@angular/core';

@State<StateModel>({
  name: STATE_NAME,
  defaults: INITIAL_STATE
})
@Injectable()
export class UtilState implements NgxsOnInit {
  constructor(private notifyService: TuiNotificationsService, private store: Store) {}

  ngxsOnInit() {
    this.notifyService.items$.subscribe((items) =>
      this.store.dispatch(new UpdateNotificationItems(items))
    );
  }

  @Action(ShowNotification)
  showNotification(_: StateContext<StateModel>, { payload }: ShowNotification) {
    const { message, options } = payload;
    this.notifyService.show(message, options).subscribe();
  }

  @Action(UpdateNotificationItems)
  updateNotificationItems(
    { patchState }: StateContext<StateModel>,
    { payload }: UpdateNotificationItems
  ) {
    patchState({ notiItems: payload });
  }
}
