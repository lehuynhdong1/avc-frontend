import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngxs/store';
import { ShowNotification } from '@shared/util';
import { TuiNotification } from '@taiga-ui/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResetPasswordPage {
  constructor(
    private store: Store,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  whenFailed(error: string): void {
    this.store.dispatch(
      new ShowNotification({
        message: error || '',
        options: { label: 'Reset Password', status: TuiNotification.Error }
      })
    );
  }

  whenSuccess(): void {
    this.store.dispatch(
      new ShowNotification({
        message: "You have reset your password. Let's log in with new password",
        options: { label: 'Reset Password', status: TuiNotification.Success }
      })
    );
    this.router.navigate(['..', 'login'], { relativeTo: this.activatedRoute });
  }
}
