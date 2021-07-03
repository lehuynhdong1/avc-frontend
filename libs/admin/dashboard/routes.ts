import { Routes } from '@angular/router';
export const dashboardRoutes: Routes = [
  {
    path: '',
    loadChildren: () => import('@admin/dashboard/feature').then((m) => m.FeatureModule)
  }
];
