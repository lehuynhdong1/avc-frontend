import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngxs/store';
import { ShowNotification } from '@shared/util';
import { TuiNotification } from '@taiga-ui/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ForgotPasswordState } from '@shared/auth/forgot-password/data-access';
@Component({
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForgotPasswordPage {
  constructor(
    private store: Store,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  whenFailed(error: string): void {
    this.store.dispatch(
      new ShowNotification({
        message: error || '',
        options: { label: 'Send recovery link', status: TuiNotification.Error }
      })
    );
  }

  whenSuccess(): void {
    this.store.dispatch(
      new ShowNotification({
        message: 'We sent recovery link to your mailbox. Please check to receive the token.',
        options: { label: 'Send recovery link', status: TuiNotification.Success }
      })
    );
    const email = this.store.selectSnapshot(ForgotPasswordState.email);
    this.router.navigate(['..', 'reset-password'], {
      relativeTo: this.activatedRoute,
      queryParams: { email }
    });
  }
}
