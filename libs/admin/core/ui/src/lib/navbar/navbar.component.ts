import { LoadLanguage } from '@shared/language';
import { Store } from '@ngxs/store';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { LanguageCode } from '@shared/language';

import { TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { loader } from './transloco.loader';
import { Observable } from 'rxjs';
import { LoginStateModel, LoginState } from '@shared/auth/login/data-access';
import { shareReplay } from 'rxjs/operators';

@Component({
  selector: 'adca-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: TRANSLOCO_SCOPE, useValue: { scope: 'navbar', loader } }]
})
export class NavbarComponent {
  me$: Observable<LoginStateModel['account']>;

  constructor(private store: Store) {
    this.me$ = this.store.select(LoginState.account).pipe(shareReplay());
  }

  changeLanguage(language: LanguageCode) {
    // this.transloco.setActiveLang(language);
    this.store.dispatch(new LoadLanguage(language));
  }
}
