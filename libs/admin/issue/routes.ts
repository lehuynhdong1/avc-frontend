import { Routes } from '@angular/router';

export const issueRoutes: Routes = [
  {
    path: '',
    loadChildren: () => import('@admin/issue/listing/feature').then((m) => m.FeatureModule)
  }
];
