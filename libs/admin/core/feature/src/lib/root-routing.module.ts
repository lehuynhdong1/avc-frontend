import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutModule, LayoutComponent } from '@admin/core/ui';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('@admin/auth/login/feature').then((m) => m.FeatureModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('@admin/auth/forgot-password/feature').then((m) => m.FeatureModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('@admin/auth/reset-password/feature').then((m) => m.FeatureModule)
  },
  {
    path: '',
    component: LayoutComponent,
    data: { title: 'Dashboard' },
    children: []
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
