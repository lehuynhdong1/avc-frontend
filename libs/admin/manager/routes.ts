import { Routes } from '@angular/router';

export const managerRoutes: Routes = [
  {
    path: '',
    loadChildren: () => import('@admin/manager/listing/feature').then((m) => m.FeatureModule)
  }
];
