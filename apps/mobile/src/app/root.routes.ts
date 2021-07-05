import { Routes } from '@angular/router';
import { LayoutComponent } from '@mobile/core/ui';
import { authRoutes } from '@mobile/auth/feature';
import { carRoutes } from '@shared/features/car/feature';
import { staffRoutes } from '@admin/staff/routes';
import { issueRoutes } from '@admin/issue/routes';
import { manageProfileRoutes } from '@shared/features/manage-profile/feature';
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
      // {
      //   path: 'staff',
      //   children: staffRoutes,
      //   canActivate: [IsLoggedInGuard]
      // },
      // {
      //   path: 'manager',
      //   children: managerRoutes,
      //   canActivate: [IsLoggedInGuard]
      // },
      // {
      //   path: 'issue',
      //   children: issueRoutes,
      //   canActivate: [IsLoggedInGuard]
      // },
      {
        path: 'profile',
        children: manageProfileRoutes,
        canActivate: [IsLoggedInGuard]
      },
      // {
      //   path: 'dashboard',
      //   children: dashboardRoutes,
      //   canActivate: [IsLoggedInGuard]
      // },
      { path: '', pathMatch: 'full', redirectTo: 'car' }
    ]
  }
];
