import { Routes } from '@angular/router';
import { LayoutComponent } from '@admin/core/ui';
import { trainModelRoutes } from '@admin/train-model/routes';
import { authRoutes } from '@admin/auth/routes';
import { staffRoutes } from '@admin/staff/routes';
import { IsLoggedInGuard } from '@shared/auth/util';

export const routes: Routes = [
  ...authRoutes,
  {
    path: '',
    component: LayoutComponent,
    data: { title: 'Dashboard' },
    children: [
      {
        path: 'staff',
        children: staffRoutes,
        canActivate: [IsLoggedInGuard]
      },
      {
        path: 'training',
        children: trainModelRoutes,
        canActivate: [IsLoggedInGuard]
      },
      { path: '', pathMatch: 'full', redirectTo: 'training' }
    ]
    // canActivate: [IsLoggedInGuard]
  }
];
