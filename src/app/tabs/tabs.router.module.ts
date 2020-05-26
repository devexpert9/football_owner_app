import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home', 
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../home/home.module').then(m => m.HomePageModule)
          }
        ]
      },
      {
        path: 'matches-list',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../add-match/add-match.module').then(m => m.AddMatchPageModule)
          }
        ]
      },
      {
        path: 'add-property',
        children: [
          {
            path: '',
            loadChildren: () =>
            import('../add-property/add-property.module').then(m => m.AddPropertyPageModule)
          }
        ]
      },
      {
        path: 'notifications',
        children: [
          {
            path: '',
            loadChildren: () =>
            import('../notifications/notifications.module').then(m => m.NotificationsPageModule)
           
          }
        ]
      },
      {
        path: 'settings',
        children: [
          {
            path: '',
            loadChildren: () =>
            import('../settings/settings.module').then(m => m.SettingsPageModule)
           
          }
        ]
      },/*
      {
        path: 'sellnewproduct',
        children: [
          {
            path: '',
            loadChildren: '../sellnewproduct/sellnewproduct.module#SellnewproductPageModule'
          }
        ]
      },
      {
        path: 'marketplace',
        children: [
          {
            path: '',
            loadChildren: '../marketplace/marketplace.module#MarketplacePageModule'
          }
        ]
      },
      {
        path: 'myorders',
        children: [
          {
            path: '',
            loadChildren: '../myorders/myorders.module#MyordersPageModule'
          }
        ]
      },*/
      {
        path: '',
        redirectTo: '/tabs/home', 
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home', 
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
