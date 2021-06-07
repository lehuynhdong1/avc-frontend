import { ChangeDetectionStrategy, Component, Injector } from '@angular/core';
import { loader } from './transloco.loader';
import { TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { Store, Select } from '@ngxs/store';
import { TuiAppearance, TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { filter } from 'rxjs/operators';
import { Logout } from '@shared/auth/logout/data-access';
import { LoginState, LoginStateModel } from '@shared/auth/login/data-access';
import { Observable } from 'rxjs';
import {
  ConfirmDialogComponent,
  ConfirmDialogComponentParams
} from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'adca-navbar-avatar-dropdown',
  templateUrl: './navbar-avatar-dropdown.component.html',
  styleUrls: ['./navbar-avatar-dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: TRANSLOCO_SCOPE, useValue: { scope: 'navbar', loader } }]
})
export class NavbarAvatarDropdownComponent {
  @Select(LoginState.account) me$: Observable<LoginStateModel['account']>;
  readonly items = ['Profile'];

  constructor(
    private readonly dialogService: TuiDialogService,
    private injector: Injector,
    private store: Store
  ) {}

  logout() {
    const confirmDialogParams: ConfirmDialogComponentParams = {
      content: 'Do you really want to log out?',
      buttons: [
        {
          id: 1,
          label: 'Logout'
        },
        {
          id: 2,
          label: 'Cancel',
          uiOptions: {
            appearance: TuiAppearance.Outline
          }
        }
      ]
    };
    this.dialogService
      .open<number>(new PolymorpheusComponent(ConfirmDialogComponent, this.injector), {
        label: 'Log out confirmation',
        data: confirmDialogParams
      })
      .pipe(filter((response) => response === 1))
      .subscribe(() => {
        this.store.dispatch(new Logout());
      });
  }
}
