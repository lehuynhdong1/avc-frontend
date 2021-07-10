import { Routes } from '@angular/router';

export const trainModelRoutes: Routes = [
  {
    path: 'history',
    loadChildren: () => import('@admin/train-model/history/feature').then((m) => m.FeatureModule)
  },
  {
    path: 'zip',
    loadChildren: () =>
      import('@admin/train-model/train-by-zip/feature').then((m) => m.UploadZipModule)
  },
  {
    path: 'images',
    children: [
      {
        path: 'upload-image',
        loadChildren: () =>
          import('@admin/train-model/train-by-images/feature').then((m) => m.UploadImageModule)
      },
      {
        path: 'label-image',
        loadChildren: () =>
          import('@admin/train-model/train-by-images/feature').then((m) => m.LabelImageModule)
      },
      { path: '', pathMatch: 'full', redirectTo: 'upload-image' }
    ]
  },
  { path: '', pathMatch: 'full', redirectTo: 'history' }
];
