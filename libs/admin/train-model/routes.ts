import { Routes } from '@angular/router';

export const trainModelRoutes: Routes = [
  {
    path: 'history',
    loadChildren: () => import('@admin/train-model/history/feature').then((m) => m.FeatureModule)
  },
  {
    path: 'history-detail',
    loadChildren: () =>
      import('@admin/train-model/history-detail/feature').then((m) => m.FeatureModule)
  },
  {
    path: 'label-image',
    loadChildren: () =>
      import('@admin/train-model/label-image/feature').then((m) => m.FeatureModule)
  },
  {
    path: 'progress',
    loadChildren: () => import('@admin/train-model/progress/feature').then((m) => m.FeatureModule)
  },
  {
    path: 'upload-image',
    loadChildren: () =>
      import('@admin/train-model/upload-image/feature').then((m) => m.FeatureModule)
  },
  { path: '', pathMatch: 'full', redirectTo: 'upload-image' }
];
