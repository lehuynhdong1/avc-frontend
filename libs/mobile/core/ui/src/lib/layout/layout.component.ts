import { Component, ChangeDetectionStrategy } from '@angular/core';

import { TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { loader } from './transloco.loader';
import { tuiPure } from '@taiga-ui/cdk';
import { Router, NavigationEnd } from '@angular/router';
import { filter, map, startWith } from 'rxjs/operators';
import { BottomBarVisibilityService } from './bottom-bar-visibility.service';

interface NavItem {
  label: string;
  path: string;
  icon: string;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: 'Cars',
    path: 'car',
    icon: 'car-sport-outline'
  },
  {
    label: 'Issues',
    path: 'issue',
    icon: 'warning-outline'
  },
  {
    label: 'Profile',
    path: 'profile',
    icon: 'person-circle-outline'
  }
];
@Component({
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: TRANSLOCO_SCOPE, useValue: { scope: 'layout', loader } }]
})
export class LayoutComponent {
  navItems = NAV_ITEMS;
  activeItemIndex = 0;

  currentItem$ = this.router.events.pipe(
    filter((event) => event instanceof NavigationEnd),
    map((event) => (event as NavigationEnd).url),
    startWith(this.router.url),
    map((currentUrl) => NAV_ITEMS.find((item) => currentUrl.includes(item.path)))
  );

  constructor(private router: Router, public bottomBar: BottomBarVisibilityService) {}

  @tuiPure
  getFilledIcon(iconSrc: string) {
    return iconSrc.replace(/-outline/gi, '');
  }
}
