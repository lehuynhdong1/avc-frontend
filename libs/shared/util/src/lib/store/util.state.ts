import { Injectable } from '@angular/core';
import { Action, State, StateContext, Selector } from '@ngxs/store';
import { UserNotificationsService, UserNotificationReadDtoPagingResponseDto } from '@shared/api';
import { TuiNotificationsService } from '@taiga-ui/core';
import { INITIAL_STATE, StateModel, STATE_NAME } from './util-state.model';
import { LoadNotifications, ShowNotification, LoadUnreadCount } from './util.actions';
import { tap } from 'rxjs/operators';

@State<StateModel>({
  name: STATE_NAME,
  defaults: INITIAL_STATE
})
@Injectable()
export class UtilState {
  @Selector()
  static notifications({ notifications }: StateModel) {
    return notifications;
  }

  @Selector()
  static unreadCount({ unreadCount }: StateModel) {
    return unreadCount;
  }

  constructor(
    private notifyService: TuiNotificationsService,
    private notificationsApiService: UserNotificationsService
  ) {}

  @Action(ShowNotification)
  showNotification(_: StateContext<StateModel>, { payload }: ShowNotification) {
    const { message, options } = payload;
    this.notifyService.show(message, options).subscribe();
  }

  @Action(LoadNotifications)
  LoadNotifications(
    { patchState, getState }: StateContext<StateModel>,
    { params, isLoadMore = false }: LoadNotifications
  ) {
    return this.notificationsApiService.apiUsernotificationsGet(params).pipe(
      tap((notifications) => {
        if (!isLoadMore) return patchState({ notifications });
        const previousResult = getState().notifications?.result;
        const combinedNotifications: UserNotificationReadDtoPagingResponseDto = {
          ...notifications,
          result: [...(previousResult || []), ...(notifications.result || [])]
        };
        return patchState({ notifications: combinedNotifications });
      })
    );
  }

  @Action(LoadUnreadCount)
  LoadUnreadCount({ patchState }: StateContext<StateModel>, { params }: LoadUnreadCount) {
    return this.notificationsApiService
      .apiUsernotificationsReceiverIdCountGet(params)
      .pipe(tap((response) => patchState({ unreadCount: response.message })));
  }
}
