import { UserNotificationReadDto } from '@shared/api';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngxs/store';
import { LoginState } from '@shared/auth/login/data-access';
import { LoadNotifications, LoadUnreadCount, UtilState } from '@shared/util';

@Component({
  selector: 'adcm-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListingComponent {
  notifications$ = this.store.select(UtilState.notifications);
  unreadCount$ = this.store.select(UtilState.unreadCount);

  constructor(private store: Store) {
    const me = this.store.selectSnapshot(LoginState.account);
    if (!me) return;
    this.store.dispatch([
      new LoadNotifications({ receiverId: me.id || 0 }),
      new LoadUnreadCount({ receiverId: me.id || 0 })
    ]);
  }
  trackById(_: number, item: UserNotificationReadDto) {
    return item.id;
  }
}
