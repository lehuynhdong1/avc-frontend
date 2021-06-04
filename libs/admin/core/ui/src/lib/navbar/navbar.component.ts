import { LoadLanguage } from '@shared/language';
import { Store } from '@ngxs/store';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { LanguageCode } from '@shared/language';

import { TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { loader } from './transloco.loader';
import { AccountsService } from '@shared/api';
import { Logout } from '@shared/auth/logout/data-access';

@Component({
  selector: 'adca-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: TRANSLOCO_SCOPE, useValue: { scope: 'navbar', loader } }]
})
export class NavbarComponent {
  constructor(private store: Store, private accountsService: AccountsService) {}
  changeLanguage(language: LanguageCode) {
    // this.transloco.setActiveLang(language);
    this.store.dispatch(new LoadLanguage(language));
  }

  loadData() {
    this.accountsService.apiAccountsManagersGet().subscribe(console.log);
  }
  logout() {
    this.store.dispatch(new Logout());
  }
}
