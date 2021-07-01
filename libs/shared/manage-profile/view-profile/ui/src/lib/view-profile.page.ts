import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngxs/store';
import { LoginState } from '@shared/auth/login/data-access';

@Component({
  templateUrl: './view-profile.page.html',
  styleUrls: ['./view-profile.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewProfilePage {
  me$ = this.store.select(LoginState.account);

  constructor(private store: Store) {}
}
