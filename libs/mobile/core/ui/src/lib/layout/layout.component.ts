import { Component, ChangeDetectionStrategy } from '@angular/core';

import { TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { loader } from './transloco.loader';
import { tuiPure } from '@taiga-ui/cdk';
import { Router, NavigationEnd } from '@angular/router';
import { filter, map, startWith } from 'rxjs/operators';

interface NavItem {
  label: string;
  path: string;
  icon: string;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: 'Cars',
    path: '/car',
    icon: 'assets/adc/icons/car-sport-outline.svg#car-sport-outline'
  },
  {
    label: 'Issues',
    path: '/issue',
    icon: 'assets/adc/icons/warning-outline.svg#warning-outline'
  },
  {
    label: 'Profile',
    path: '/profile',
    icon: 'assets/adc/icons/library-outline.svg#library-outline'
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

  constructor(private router: Router) {}
  @tuiPure
  getFilledIcon(iconSrc: string) {
    return iconSrc.replace(/-outline/gi, '');
  }
}
