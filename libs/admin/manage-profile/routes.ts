import { Routes } from '@angular/router';

export const manageProfileRoutes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('@admin/manage-profile/view-profile/feature').then((m) => m.FeatureModule)
  },
  {
    path: 'change-password',
    loadChildren: () =>
      import('@admin/manage-profile/change-password/feature').then((m) => m.FeatureModule)
  }
];
