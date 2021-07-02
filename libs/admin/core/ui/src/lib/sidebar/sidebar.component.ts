import { RxState } from '@rx-angular/state';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { loader } from './transloco.loader';
import { Observable, Subject } from 'rxjs';
import { LoginState, LoginStateModel } from '@shared/auth/login/data-access';
import { Select } from '@ngxs/store';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map, startWith, withLatestFrom } from 'rxjs/operators';
import { tuiPure } from '@taiga-ui/cdk';
import { SidebarService } from './sidebar.service';

export interface NavItem {
  label: string;
  path: string;
  icon: string;
}

const NAV_ITEMS: Array<NavItem> = [
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
@Component({
  selector: 'adca-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState, { provide: TRANSLOCO_SCOPE, useValue: { scope: 'sidebar', loader } }]
})
export class SidebarComponent {
  readonly navItems = NAV_ITEMS;
  @Select(LoginState.account) me$: Observable<LoginStateModel['account']>;
  collapse$ = this.sidebarService.collapse$;
  currentUrl$ = this.router.events.pipe(
    filter((event) => event instanceof NavigationEnd),
    map((event) => (event as NavigationEnd).url),
    startWith(this.router.url)
  );

  toggleSidebar$ = new Subject<void>();

  constructor(
    private router: Router,
    private sidebarService: SidebarService,
    private state: RxState<Record<never, never>>
  ) {
    this.state.hold(this.toggleSidebar$.pipe(withLatestFrom(this.collapse$)), ([, isCollapse]) => {
      if (isCollapse) return this.sidebarService.expand();
      this.sidebarService.collapse();
    });
  }

  @tuiPure
  getFilledIcon(iconSrc: string) {
    return iconSrc.replace(/-outline/gi, '');
  }
}
