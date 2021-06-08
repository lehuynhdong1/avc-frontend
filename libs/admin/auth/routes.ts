import { Routes } from '@angular/router';
import { IsNotLoggedInGuard } from '@shared/auth/util';

export const authRoutes: Routes = [
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
  }
];
