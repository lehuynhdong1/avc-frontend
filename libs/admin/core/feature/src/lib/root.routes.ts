import { Routes } from '@angular/router';
import { LayoutComponent } from '@admin/core/ui';
import { trainModelRoutes } from '@admin/train-model/routes';
import { authRoutes } from '@admin/auth/routes';
import { AccountTypes } from '@shared/features/staff/data-access';

export const routes: Routes = [
  ...authRoutes,
  {
    path: '',
    component: LayoutComponent,
    data: { title: 'Dashboard' },
    children: [
      {
        path: 'staff',
        loadChildren: () => import('@admin/staff/feature').then((m) => m.FeatureModule),
        data: { accountType: AccountTypes.STAFFS }
      },
      {
        path: 'manager',
        loadChildren: () => import('@admin/staff/feature').then((m) => m.FeatureModule),
        data: { accountType: AccountTypes.MANAGERS }
      },
      {
        path: 'training',
        children: trainModelRoutes
      },
      { path: '', pathMatch: 'full', redirectTo: 'training' }
    ]
    // canActivate: [IsLoggedInGuard]
  }
];
