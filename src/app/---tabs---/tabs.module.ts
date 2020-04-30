import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TabsPageRoutingModule } from './tabs-routing.module';
import { TabsPage } from './tabs.page';
const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children:[
        { path: 'home', loadChildren: '../home/home.module#HomePageModule' },
        { path: 'matches-list', loadChildren: '../matches-list/matches-list.module#MatchesListPageModule' },
        { path: 'favourite-properties', loadChildren: '../favourite-properties/favourite-properties.module#FavouritePropertiesPageModule' },
        { path: 'notifications', loadChildren: '../notifications/notifications.module#NotificationsPageModule' },
        { path: 'settings', loadChildren: '../settings/settings.module#SettingsPageModule' },
        { path: 'my-profile', loadChildren: '../my-profile/my-profile.module#MyProfilePageModule' },
        { path: 'transactions', loadChildren: '../transactions/transactions.module#TransactionsPageModule' },
        { path: 'match-details', loadChildren: '../match-details/match-details.module#MatchDetailsPageModule' },
        { path: 'match-results', loadChildren: '../match-results/match-results.module#MatchResultsPageModule' },       
        { path: 'player-list', loadChildren: '../player-list/player-list.module#PlayerListPageModule' },
        { path: 'add-match', loadChildren: '../add-match/add-match.module#AddMatchPageModule' },
    ]
  },
  {
    path:'',
    redirectTo:'/tabs/',
    pathMatch:'full'
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
