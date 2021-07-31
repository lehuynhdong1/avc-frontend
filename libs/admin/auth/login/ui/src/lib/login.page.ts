import { TuiNotification } from '@taiga-ui/core';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Login } from '@shared/auth/login/data-access';
import { Store } from '@ngxs/store';
import { Router } from '@angular/router';
import { ShowNotification } from '@shared/util';

@Component({
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPage {
  // defaultInfo: Login['payload']['params'] = { email: 'minhhuy499@gmail.com', password: '123123' };
  defaultInfo: Login['payload']['params'] = { email: '', password: '' };

  constructor(private store: Store, private router: Router) {}

  login(params: Login['payload']['params']) {
    this.store.dispatch(new Login({ params, acceptedRoles: ['Admin', 'Manager'] }));
  }

  whenLoginSuccess() {
    this.store.dispatch(
      new ShowNotification({
        message: 'Have a good time',
        options: { label: "You're logged in", status: TuiNotification.Success }
      })
    );
    this.router.navigateByUrl('/');
  }

  whenLoginFailed(errorMessage: string) {
    this.store.dispatch(
      new ShowNotification({
        message: errorMessage || '',
        options: { label: 'Login failed', status: TuiNotification.Error }
      })
    );
  }
}
