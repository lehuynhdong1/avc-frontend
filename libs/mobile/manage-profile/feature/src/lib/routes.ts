import { Routes } from '@angular/router';

export const manageProfileRoutes: Routes = [
  {
    path: '',
    loadChildren: () => import('./view-profile.module').then((m) => m.ViewProfileModule)
  },
  {
    path: 'change-password',
    loadChildren: () => import('./change-password.module').then((m) => m.ChangePasswordModule)
  }
];
