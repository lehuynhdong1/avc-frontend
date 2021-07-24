import { LoadLanguage } from '@shared/language';
import { Store } from '@ngxs/store';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { LanguageCode } from '@shared/language';

import { TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { loader } from './transloco.loader';
import { LoginState } from '@shared/auth/login/data-access';
import { LoadNotifications, LoadUnreadCount, UtilState } from '@shared/util';

// export interface UserNotificationReadDto {
//   id?: number;
//   receiverId?: number | null;
//   message?: string | null;
//   type?: string | null;
//   createdAt?: string;
//   isRead?: boolean;
// }

@Component({
  selector: 'adca-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: TRANSLOCO_SCOPE, useValue: { scope: 'navbar', loader } }]
})
export class NavbarComponent {
  me$ = this.store.select(LoginState.account);
  notifications$ = this.store.select(UtilState.notifications);
  unreadCount$ = this.store.select(UtilState.unreadCount);

  opened = false;

  private readonly my = this.store.selectSnapshot(LoginState.account);

  constructor(private store: Store) {
    if (!this.my) return;
    this.store.dispatch(new LoadUnreadCount({ receiverId: this.my.id || 0 }));
  }

  changeLanguage(language: LanguageCode) {
    // this.transloco.setActiveLang(language);
    this.store.dispatch(new LoadLanguage(language));
  }

  toggleNotifications() {
    if (!this.my) return;
    this.store.dispatch(
      this.opened
        ? new LoadUnreadCount({ receiverId: this.my.id || 0 })
        : new LoadNotifications({ receiverId: this.my.id || 0, limit: 10 })
    );
    this.opened = !this.opened;
  }

  handler(index: number) {
    const notifications = this.store.selectSnapshot(UtilState.notifications);
    if (!this.my || !notifications) return;
    const { result, nextPageNumber } = notifications;

    if (result?.length && result.length - 3 === index && nextPageNumber) {
      this.store.dispatch(
        new LoadNotifications(
          { receiverId: this.my.id || 0, limit: 10, page: nextPageNumber },
          true
        )
      );
    }
  }
}
