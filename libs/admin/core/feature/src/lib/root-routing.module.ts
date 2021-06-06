import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutModule, LayoutComponent } from '@admin/core/ui';
import { IsLoggedInGuard, IsNotLoggedInGuard } from '@shared/auth/util';

const routes: Routes = [
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
    children: []
    // canActivate: [IsLoggedInGuard]
  }
];
@NgModule({
  imports: [
    LayoutModule,
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top'
    })
  ],
  exports: [RouterModule]
})
export class RootRoutingModule {}
