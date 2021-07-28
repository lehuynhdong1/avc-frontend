import { withLatestFrom, switchMap } from 'rxjs/operators';
import { TuiDialogService } from '@taiga-ui/core';
import { Component, ChangeDetectionStrategy, Injector } from '@angular/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { ChangePasswordComponent } from '@shared/features/manage-profile/ui';
import { Actions, ofActionSuccessful } from '@ngxs/store';
import { RxState } from '@rx-angular/state';
import { ChangePassword } from '@shared/features/manage-profile/data-access';
import { Subject } from 'rxjs';

@Component({
  templateUrl: './view-profile.page.html',
  styleUrls: ['./view-profile.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState]
})
export class ViewProfilePage {
  clickChangePassword$ = new Subject<void>();

  constructor(
    private dialogService: TuiDialogService,
    private injector: Injector,
    state: RxState<never>,
    actions: Actions
  ) {
    const whenChangePasswordSuccess$ = actions.pipe(ofActionSuccessful(ChangePassword));
    state.hold(
      whenChangePasswordSuccess$.pipe(withLatestFrom(this.dialogService)),
      ([, dialog]) => {
        if (dialog.length) {
          const topDialog = dialog[dialog.length - 1];
          topDialog.completeWith(1);
        }
      }
    );

    const openDialog$ = this.dialogService.open<void>(
      new PolymorpheusComponent(ChangePasswordComponent, this.injector),
      {
        label: 'Change Password',
        size: 's'
      }
    );
    state.hold(this.clickChangePassword$.pipe(switchMap(() => openDialog$)));
  }
}
