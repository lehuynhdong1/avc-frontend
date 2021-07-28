import { RxState } from '@rx-angular/state';
import { Component, ChangeDetectionStrategy, Injector } from '@angular/core';
import { TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { loader } from './transloco.loader';
import { Subject } from 'rxjs';
import { LoginState } from '@shared/auth/login/data-access';
import { Store } from '@ngxs/store';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map, startWith, switchMap, withLatestFrom } from 'rxjs/operators';
import { tuiPure } from '@taiga-ui/cdk';
import { SidebarService, getNavItems } from './sidebar.service';
import { Empty, hasValue, UtilState, LoadNotifications, LoadUnreadCount } from '@shared/util';
import { TuiAppearance, TuiDialogService } from '@taiga-ui/core';
import { ConfirmDialogService, ConfirmDialogComponentParams } from '@shared/ui/confirm-dialog';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { ViewProfilePage } from '@admin/manage-profile/ui';
import { Logout } from '@shared/auth/logout/data-access';

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
  notifications$ = this.store.select(UtilState.notifications);
  unreadCount$ = this.store.select(UtilState.unreadCount);

  currentItem$ = this.router.events.pipe(
    filter((event) => event instanceof NavigationEnd),
    map((event) => (event as NavigationEnd).url),
    startWith(this.router.url),
    withLatestFrom(this.navItems$),
    map(([currentUrl, navItems]) => navItems.find((item) => currentUrl.includes(item.path)))
  );

  opened = false;

  toggleSidebar$ = new Subject<void>();
  readonly clickProfile$ = new Subject();
  readonly clickLogout$ = new Subject();

  private readonly my = this.store.selectSnapshot(LoginState.account);

  constructor(
    private store: Store,
    private router: Router,
    private sidebarService: SidebarService,
    private state: RxState<Empty>,
    private confirmDialog: ConfirmDialogService,
    private dialogService: TuiDialogService,
    private injector: Injector
  ) {
    this.state.hold(this.toggleSidebar$.pipe(withLatestFrom(this.collapse$)), ([, isCollapse]) => {
      if (isCollapse) return this.sidebarService.expand();
      this.sidebarService.collapse();
    });
    const whenClickLogout$ = this.clickLogout$.pipe(
      switchMap(() =>
        this.confirmDialog
          .open('Log out confirmation', confirmDialogParams)
          .pipe(filter((response) => response === 1))
      )
    );
    this.state.hold(whenClickLogout$, () => this.store.dispatch(new Logout()));

    const whenClickProfile$ = this.clickProfile$.pipe(
      switchMap(() =>
        this.dialogService.open<number>(new PolymorpheusComponent(ViewProfilePage, this.injector), {
          label: 'My Profile',
          size: 's'
        })
      )
    );
    this.state.hold(whenClickProfile$);
  }

  @tuiPure
  getFilledIcon(iconSrc: string) {
    return iconSrc.replace(/-outline/gi, '');
  }

  toggleNotifications() {
    if (!this.my) return;
    this.store.dispatch(
      this.opened
        ? new LoadUnreadCount({ receiverId: this.my.id || 0 })
        : new LoadNotifications({ receiverId: this.my.id || 0, limit: 10 })
    );
    this.opened = !this.opened;
  }

  handler(index: number) {
    const notifications = this.store.selectSnapshot(UtilState.notifications);
    if (!this.my || !notifications) return;
    const { result, nextPageNumber } = notifications;

    if (result?.length && result.length - 3 === index && nextPageNumber) {
      this.store.dispatch(
        new LoadNotifications(
          { receiverId: this.my.id || 0, limit: 10, page: nextPageNumber },
          true
        )
      );
    }
  }
}

const confirmDialogParams: ConfirmDialogComponentParams = {
  content: 'Do you really want to log out?',
  buttons: [
    {
      id: 1,
      label: 'Logout'
    },
    {
      id: 2,
      label: 'Cancel',
      uiOptions: {
        appearance: TuiAppearance.Outline
      }
    }
  ]
};
