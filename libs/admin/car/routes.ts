import { Routes } from '@angular/router';

export const carRoutes: Routes = [
  {
    path: '',
    loadChildren: () => import('@admin/car/listing/feature').then((m) => m.FeatureModule)
  },
  {
    path: 'detail/:id',
    loadChildren: () => import('@admin/car/detail/feature').then((m) => m.FeatureModule),
    data: { fullPage: true }
  }
];
