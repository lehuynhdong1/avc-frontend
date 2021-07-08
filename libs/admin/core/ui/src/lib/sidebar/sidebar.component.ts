import { RxState } from '@rx-angular/state';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { loader } from './transloco.loader';
import { Subject } from 'rxjs';
import { LoginState } from '@shared/auth/login/data-access';
import { Store } from '@ngxs/store';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map, startWith, withLatestFrom } from 'rxjs/operators';
import { tuiPure } from '@taiga-ui/cdk';
import { SidebarService, getNavItems } from './sidebar.service';
import { Empty, hasValue } from '@shared/util';

@Component({
  selector: 'adca-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState, { provide: TRANSLOCO_SCOPE, useValue: { scope: 'sidebar', loader } }]
})
export class SidebarComponent {
  me$ = this.store.select(LoginState.account).pipe(hasValue());
  navItems$ = this.me$.pipe(map((me) => getNavItems(me.role)));
  collapse$ = this.sidebarService.collapse$;
  currentItem$ = this.router.events.pipe(
    filter((event) => event instanceof NavigationEnd),
    map((event) => (event as NavigationEnd).url),
    startWith(this.router.url),
    withLatestFrom(this.navItems$),
    map(([currentUrl, navItems]) => navItems.find((item) => currentUrl.includes(item.path)))
  );

  toggleSidebar$ = new Subject<void>();

  constructor(
    private store: Store,
    private router: Router,
    private sidebarService: SidebarService,
    private state: RxState<Empty>
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
