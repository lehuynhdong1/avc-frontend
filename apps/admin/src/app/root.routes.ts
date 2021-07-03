import { Routes } from '@angular/router';
import { LayoutComponent } from '@admin/core/ui';
import { trainModelRoutes } from '@admin/train-model/routes';
import { authRoutes } from '@admin/auth/routes';
import { carRoutes } from '@admin/car/routes';
import { staffRoutes } from '@admin/staff/routes';
import { issueRoutes } from '@admin/issue/routes';
import { manageProfileRoutes } from '@admin/manage-profile/routes';
import { managerRoutes } from '@admin/manager/routes';
import { IsLoggedInGuard } from '@shared/auth/util';
import { dashboardRoutes } from '@admin/dashboard/routes';

export const routes: Routes = [
  ...authRoutes,
  {
    path: '',
    component: LayoutComponent,
    data: { title: 'Dashboard' },
    children: [
      {
        path: 'car',
        children: carRoutes,
        canActivate: [IsLoggedInGuard]
      },
      {
        path: 'staff',
        children: staffRoutes,
        canActivate: [IsLoggedInGuard]
      },
      {
        path: 'manager',
        children: managerRoutes,
        canActivate: [IsLoggedInGuard]
      },
      {
        path: 'training',
        children: trainModelRoutes,
        canActivate: [IsLoggedInGuard]
      },
      {
        path: 'issue',
        children: issueRoutes,
        canActivate: [IsLoggedInGuard]
      },
      {
        path: 'profile',
        children: manageProfileRoutes,
        canActivate: [IsLoggedInGuard]
      },
      {
        path: 'dashboard',
        children: dashboardRoutes,
        canActivate: [IsLoggedInGuard]
      },
      { path: '', pathMatch: 'full', redirectTo: 'training' }
    ]
    // canActivate: [IsLoggedInGuard]
  }
];
