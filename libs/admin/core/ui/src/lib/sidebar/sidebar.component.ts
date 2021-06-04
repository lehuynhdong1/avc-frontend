import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { loader } from './transloco.loader';
import { Observable } from 'rxjs';
import { LoginState, LoginStateModel } from '@shared/auth/login/data-access';
import { Select } from '@ngxs/store';

@Component({
  selector: 'adca-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: TRANSLOCO_SCOPE, useValue: { scope: 'sidebar', loader } }]
})
export class SidebarComponent {
  @Select(LoginState.account) me$: Observable<LoginStateModel['account']>;
}
