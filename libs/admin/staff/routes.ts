import { Routes } from '@angular/router';

export const staffRoutes: Routes = [
  {
    path: '',
    loadChildren: () => import('@admin/staff/listing/feature').then((m) => m.FeatureModule)
  }
];
