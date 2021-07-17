export const notificationRoutes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('@mobile/notification/feature').then((m) => m.FeatureModule)
  }
];
