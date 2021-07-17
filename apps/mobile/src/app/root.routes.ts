import { Routes } from '@angular/router';
import { LayoutComponent } from '@mobile/core/ui';
import { authRoutes } from '@mobile/auth/feature';
import { carRoutes } from '@mobile/car/feature';
import { manageProfileRoutes } from '@mobile/manage-profile/feature';
import { IsLoggedInGuard } from '@shared/auth/util';
import { issueRoutes } from '@mobile/issue/feature';
import { notificationRoutes } from '@mobile/notification/feature';

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
        path: 'notification',
        children: notificationRoutes,
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
      // {
      //   path: 'dashboard',
      //   children: dashboardRoutes,
      //   canActivate: [IsLoggedInGuard]
      // },
      { path: '', pathMatch: 'full', redirectTo: 'car' }
    ]
  }
];
