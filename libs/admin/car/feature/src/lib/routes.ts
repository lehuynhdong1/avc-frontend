import { Routes } from '@angular/router';

export const carRoutes: Routes = [
  {
    path: '',
    loadChildren: () => import('./listing.module').then((m) => m.ListingModule)
  },
  {
    path: 'detail/:id',
    loadChildren: () => import('./detail.module').then((m) => m.DetailModule),
    data: { fullPage: true }
  },
  {
    path: ':id/edit-config',
    loadChildren: () => import('./edit-config.module').then((m) => m.EditConfigModule)
  }
];
