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

  constructor(private store: Store) {
    const me = this.store.selectSnapshot(LoginState.account);
    if (!me) return;
    this.store.dispatch([
      new LoadNotifications({ receiverId: me.id || 0 }),
      new LoadUnreadCount({ receiverId: me.id || 0 })
    ]);
  }

  changeLanguage(language: LanguageCode) {
    // this.transloco.setActiveLang(language);
    this.store.dispatch(new LoadLanguage(language));
  }
}
