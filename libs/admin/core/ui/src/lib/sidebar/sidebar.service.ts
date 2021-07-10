import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SidebarService {
  private collapseSubject = new BehaviorSubject(false);
  collapse$ = this.collapseSubject.asObservable();

  collapse() {
    this.collapseSubject.next(true);
  }

  expand() {
    this.collapseSubject.next(false);
  }
}

export interface NavItem {
  label: string;
  path: string;
  icon: string;
  description: string;
  children?: Array<NavItem>;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: 'Dashboard',
    path: '/dashboard',
    icon: 'assets/adc/icons/bar-chart-outline.svg#bar-chart-outline',
    description: 'Keep track your working process'
  },
  {
    label: 'Manage Cars',
    path: '/car',
    icon: 'assets/adc/icons/car-sport-outline.svg#car-sport-outline',
    description: 'Follow any device changes'
  },
  {
    label: 'Manage Managers',
    path: '/manager',
    icon: 'assets/adc/icons/ribbon-outline.svg#ribbon-outline',
    description: 'Empower taks through managers'
  },
  {
    label: 'Manage Staffs',
    path: '/staff',
    icon: 'assets/adc/icons/people-outline.svg#people-outline',
    description: 'Up to date with your staffs'
  },
  {
    label: 'Issue History',
    path: '/issue',
    icon: 'assets/adc/icons/warning-outline.svg#warning-outline',
    description: 'Quickly access any system issues'
  },
  {
    label: 'Training Model',
    path: '/training',
    icon: 'assets/adc/icons/library-outline.svg#library-outline',
    description: 'Enhance your detection algorithm',
    children: [
      {
        label: 'History',
        path: '/training/history',
        icon: 'assets/adc/icons/newspaper-outline.svg#newspaper-outline',
        description: 'Enhance your detection algorithm'
      },
      {
        label: 'Train by ZIP',
        path: '/training/zip',
        icon: 'assets/adc/icons/document-attach-outline.svg#document-attach-outline',
        description: 'Enhance your detection algorithm'
      },
      {
        label: 'Train by images',
        path: '/training/images',
        icon: 'assets/adc/icons/images-outline.svg#images-outline',
        description: 'Enhance your detection algorithm'
      }
    ]
  }
];

const ROLE_MAPPER = {
  Manager: [1, 3, 4]
};

export const getNavItems = (role: string | null | undefined) => {
  if (role === 'Admin') return NAV_ITEMS;
  if (role === 'Manager') return NAV_ITEMS.filter((_, index) => ROLE_MAPPER[role].includes(index));
  throw new Error('Role is not appropriate!');
};
