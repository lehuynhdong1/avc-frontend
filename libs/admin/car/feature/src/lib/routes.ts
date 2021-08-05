import { Routes } from '@angular/router';

export const carRoutes: Routes = [
  {
    path: 'edit-default-config',
    loadChildren: () =>
      import('./edit-default-config.module').then((m) => m.EditDefaultConfigModule)
  },
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
  },
  {
    path: 'detail/:id/edit-config',
    pathMatch: 'full',
    redirectTo: ':id/edit-config'
  }
];
