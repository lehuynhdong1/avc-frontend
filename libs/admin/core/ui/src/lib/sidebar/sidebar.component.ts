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
    { label: 'Home', path: '/', icon: 'tuiIconChartLarge' },
    { label: 'Cars', path: '/cars', icon: 'tuiIconLinkLarge' },
    { label: 'Managers', path: '/managers', icon: 'tuiIconStructureLarge' },
    { label: 'Staffs', path: '/staffs', icon: 'tuiIconStructureLarge' }
  ];

  ngOnInit() {
    this.me$.subscribe(console.warn);
  }
}
