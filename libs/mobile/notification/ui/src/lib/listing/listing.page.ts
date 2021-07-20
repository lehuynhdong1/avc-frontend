import { RxState } from '@rx-angular/state';
import { UserNotificationReadDto } from '@shared/api';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngxs/store';
import { LoginState } from '@shared/auth/login/data-access';
import { Empty, LoadNotifications, LoadUnreadCount, UtilState, hasValue } from '@shared/util';
import { ViewWillEnter, ViewWillLeave } from '@ionic/angular';
import { merge } from 'rxjs';
import { SignalRState } from '@shared/features/signalr/data-access';

@Component({
  templateUrl: './listing.page.html',
  styleUrls: ['./listing.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState]
})
export class ListingPage implements ViewWillEnter, ViewWillLeave {
  notifications$ = this.store.select(UtilState.notifications);
  unreadCount$ = this.store.select(UtilState.unreadCount);

  constructor(private store: Store, private state: RxState<Empty>) {
    this.whenAnyNotify();
  }

  ionViewWillEnter() {
    const me = this.store.selectSnapshot(LoginState.account);
    if (!me) return;
    this.store.dispatch([
      new LoadNotifications({ receiverId: me.id || 0, limit: 100 }),
      new LoadUnreadCount({ receiverId: me.id || 0 })
    ]);
  }

  ionViewWillLeave() {
    const me = this.store.selectSnapshot(LoginState.account);
    if (!me) return;
    this.store.dispatch(new LoadUnreadCount({ receiverId: me.id || 0 }));
  }

  private whenAnyNotify() {
    const notificationTypes = [
      'WhenAdminChangeStaffManagedBy',
      'WhenManagerChangeAssignedCar',
      'WhenStaffDeactivated',
      'WhenManagerDeactivated',
      'WhenCarDeactivated',
      'WhenIssueCreated',
      'WhenModelStatusChanged'
    ];
    // Merge all to archive only 1 subscription for notification
    const whenAnyNotify$ = merge(
      ...notificationTypes.map((key) => {
        const typedKey = key as WhenOtherNotify;
        return this.store.select(SignalRState.get(typedKey)).pipe(hasValue());
      })
    );
    this.state.hold(whenAnyNotify$, () => {
      const me = this.store.selectSnapshot(LoginState.account);
      this.store.dispatch(new LoadNotifications({ receiverId: me?.id || 0, limit: 100 }));
    });
  }

  trackById(_: number, item: UserNotificationReadDto) {
    return item.id;
  }
}

type WhenOtherNotify =
  | 'WhenAdminChangeStaffManagedBy'
  | 'WhenManagerChangeAssignedCar'
  | 'WhenStaffDeactivated'
  | 'WhenManagerDeactivated'
  | 'WhenCarDeactivated'
  | 'WhenIssueCreated'
  | 'WhenModelStatusChanged';
