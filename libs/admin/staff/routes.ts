import { Routes } from '@angular/router';

export const staffRoutes: Routes = [
  {
    path: '',
    loadChildren: () => import('@admin/staff/listing/feature').then((m) => m.FeatureModule)
  },
  {
    path: 'detail/:id',
    loadChildren: () => import('@admin/staff/detail/feature').then((m) => m.FeatureModule),
    data: { fullPage: true }
  }
];
