import { Routes } from '@angular/router';
import { IsNotLoggedInGuard } from '@shared/auth/util';

export const authRoutes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login.module').then((m) => m.LoginModule),
    canActivate: [IsNotLoggedInGuard]
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password.module').then((m) => m.ForgotPasswordModule),
    canActivate: [IsNotLoggedInGuard]
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./reset-password.module').then((m) => m.ResetPasswordModule),
    canActivate: [IsNotLoggedInGuard]
  }
];
