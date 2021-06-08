import { Routes } from '@angular/router';
import { LayoutComponent } from '@admin/core/ui';
import { IsLoggedInGuard, IsNotLoggedInGuard } from '@shared/auth/util';

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('@admin/auth/login/feature').then((m) => m.FeatureModule),
    canActivate: [IsNotLoggedInGuard]
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('@admin/auth/forgot-password/feature').then((m) => m.FeatureModule)
    // canActivate: [IsNotLoggedInGuard]
  },
  {
    path: 'reset-password',
    loadChildren: () => import('@admin/auth/reset-password/feature').then((m) => m.FeatureModule)
    // canActivate: [IsNotLoggedInGuard]
  },
  {
    path: '',
    component: LayoutComponent,
    data: { title: 'Dashboard' },
    children: [
      {
        path: 'staff',
        loadChildren: () => import('@admin/staff/feature').then((m) => m.FeatureModule)
      },
      {
        path: 'train-model',
        children: [
          {
            path: 'label-image',
            loadChildren: () =>
              import('@admin/train-model/label-image/feature').then((m) => m.FeatureModule)
          },
          { path: '', pathMatch: 'full', redirectTo: 'label-image' }
        ]
      },
      { path: '', pathMatch: 'full', redirectTo: 'train-model' }
    ]
    // canActivate: [IsLoggedInGuard]
  }
];
