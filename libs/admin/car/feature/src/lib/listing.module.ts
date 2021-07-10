import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DataAccessModule } from '@shared/features/car/data-access';
import { ListingPage, ListingUiModule } from '@admin/car/ui';
import { CollapseSidebarResolver } from '@admin/core/ui';

@NgModule({
  imports: [
    ListingUiModule,
    DataAccessModule,
    RouterModule.forChild([
      {
        path: '',
        data: { title: 'Cars' },
        component: ListingPage,
        children: [
          {
            path: 'unapproved',
            loadChildren: () =>
              import('./unapproved-listing.module').then((m) => m.UnapprovedListingModule),
            resolve: [CollapseSidebarResolver]
          },
          {
            path: 'approve',
            loadChildren: () => import('./approve.module').then((m) => m.ApproveModule),
            resolve: [CollapseSidebarResolver]
          },
          {
            path: ':id',
            loadChildren: () => import('./detail.module').then((m) => m.DetailModule),
            resolve: [CollapseSidebarResolver]
          },
          {
            path: 'update/:id',
            loadChildren: () => import('./update.module').then((m) => m.UpdateModule),
            resolve: [CollapseSidebarResolver]
          }
        ]
      }
    ])
  ]
})
export class ListingModule {}
