import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { loader } from './transloco.loader';
import { Observable } from 'rxjs';
import { LoginState, LoginStateModel } from '@shared/auth/login/data-access';
import { Select } from '@ngxs/store';

export interface NavItem {
  label: string;
  path: string;
  icon: string;
}
@Component({
  selector: 'adca-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: TRANSLOCO_SCOPE, useValue: { scope: 'sidebar', loader } }]
})
export class SidebarComponent {
  @Select(LoginState.account) me$: Observable<LoginStateModel['account']>;
  navItems: Array<NavItem> = [
    { label: 'Dashboard', path: '/dashboard', icon: 'tuiIconStarLarge' },
    { label: 'Manage Cars', path: '/cars', icon: 'tuiIconLinkLarge' },
    { label: 'Manage Managers', path: '/manager', icon: 'tuiIconLinkLarge' },
    { label: 'Manage Staffs', path: '/staff', icon: 'tuiIconLinkLarge' },
    { label: 'Training Model', path: '/training', icon: 'tuiIconTransparentLarge' }
  ];
}
