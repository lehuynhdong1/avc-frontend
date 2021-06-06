import { ChangeDetectionStrategy, Component } from '@angular/core';
import { loader } from './transloco.loader';
import { TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { BehaviorSubject } from 'rxjs';
import { Store } from '@ngxs/store';
import { Logout } from '@shared/auth/logout/data-access';

@Component({
  selector: 'adca-navbar-avatar-dropdown',
  templateUrl: './navbar-avatar-dropdown.component.html',
  styleUrls: ['./navbar-avatar-dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: TRANSLOCO_SCOPE, useValue: { scope: 'navbar', loader } }]
})
export class NavbarAvatarDropdownComponent {
  open$ = new BehaviorSubject(false);
  open = false;
  readonly items = ['Profile'];
  constructor(private store: Store) {}

  logout() {
    this.store.dispatch(new Logout());
  }
}
