import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngxs/store';
import { ShowNotification } from '@shared/util';
import { TuiNotification } from '@taiga-ui/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPage {
  constructor(private store: Store, private router: Router) {}

  whenFailed(error: string): void {
    this.store.dispatch(
      new ShowNotification({
        message: error || '',
        options: { label: 'Login', status: TuiNotification.Error }
      })
    );
  }

  whenSuccess(): void {
    this.store.dispatch(
      new ShowNotification({
        message: 'Have a good time',
        options: { label: "You're logged in", status: TuiNotification.Success }
      })
    );
    this.router.navigateByUrl('/');
  }
}
