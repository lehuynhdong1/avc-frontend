import { LoadLanguage } from '@shared/language';
import { Store, Actions, ofActionSuccessful } from '@ngxs/store';
import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { LanguageCode } from '@shared/language';

import { TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { loader } from './transloco.loader';
import { AccountsService } from '@shared/api';
import { Logout } from '@shared/auth/logout/data-access';
import { Observable } from 'rxjs';
import { LoginStateModel, LoginState } from '@shared/auth/login/data-access';
import { shareReplay, takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { TuiDestroyService } from '@taiga-ui/cdk';

@Component({
  selector: 'adca-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    TuiDestroyService,
    { provide: TRANSLOCO_SCOPE, useValue: { scope: 'navbar', loader } }
  ]
})
export class NavbarComponent implements OnInit {
  me$: Observable<LoginStateModel['account']>;

  constructor(
    private store: Store,
    private actions: Actions,
    private accountsService: AccountsService,
    private router: Router,
    private destroy$: TuiDestroyService
  ) {
    this.me$ = this.store.select(LoginState.account).pipe(shareReplay());
  }

  ngOnInit() {
    this.actions
      .pipe(ofActionSuccessful(Logout))
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.router.navigateByUrl('/login');
      });
  }

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
