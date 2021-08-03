import { Routes } from '@angular/router';

export const issueRoutes: Routes = [
  {
    path: '',
    loadChildren: () => import('./listing.module').then((m) => m.ListingModule)
  },
  {
    path: ':id',
    loadChildren: () => import('./detail.module').then((m) => m.DetailModule)
  }
];
