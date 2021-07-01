import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { loader } from './transloco.loader';
import { Observable } from 'rxjs';
import { LoginState, LoginStateModel } from '@shared/auth/login/data-access';
import { Select } from '@ngxs/store';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map, startWith } from 'rxjs/operators';
import { tuiPure } from '@taiga-ui/cdk';

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
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: 'assets/taiga-ui/icons/bar-chart-outline.svg#bar-chart-outline'
    },
    {
      label: 'Manage Cars',
      path: '/car',
      icon: 'assets/taiga-ui/icons/car-sport-outline.svg#car-sport-outline'
    },
    {
      label: 'Manage Managers',
      path: '/manager',
      icon: 'assets/taiga-ui/icons/ribbon-outline.svg#ribbon-outline'
    },
    {
      label: 'Manage Staffs',
      path: '/staff',
      icon: 'assets/taiga-ui/icons/people-outline.svg#people-outline'
    },
    {
      label: 'Issue History',
      path: '/issue',
      icon: 'assets/taiga-ui/icons/warning-outline.svg#warning-outline'
    },
    {
      label: 'Training Model',
      path: '/training',
      icon: 'assets/taiga-ui/icons/library-outline.svg#library-outline'
    }
  ];
  currentUrl$ = this.router.events.pipe(
    filter((event) => event instanceof NavigationEnd),
    map((event) => (event as NavigationEnd).url),
    startWith(this.router.url)
  );

  constructor(private router: Router) {}

  @tuiPure
  getFilledIcon(iconSrc: string) {
    return iconSrc.replace(/-outline/gi, '');
  }
}
