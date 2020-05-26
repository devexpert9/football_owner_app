import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginauthService } from './services/loginauth/loginauth.service';
import { TabsauthService } from './services/tabsauth/tabsauth.service';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),canActivate: [TabsauthService]
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then(m => m.ListPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),canActivate: [LoginauthService]
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'my-profile',
    loadChildren: () => import('./my-profile/my-profile.module').then( m => m.MyProfilePageModule)
  },
  {
    path: 'notifications',
    loadChildren: () => import('./notifications/notifications.module').then( m => m.NotificationsPageModule)
  },
  {
    path: 'player-detail/:_id',
    loadChildren: () => import('./player-detail/player-detail.module').then( m => m.PlayerDetailPageModule)
  },
  {
    path: 'match-details/:_id',
    loadChildren: () => import('./match-details/match-details.module').then( m => m.MatchDetailsPageModule)
  },

  {
    path: 'player-list',
    loadChildren: () => import('./player-list/player-list.module').then( m => m.PlayerListPageModule)
  },
  {
    path: 'add-match',
    loadChildren: () => import('./add-match/add-match.module').then( m => m.AddMatchPageModule)
  },
  {
    path: 'add-property',
    loadChildren: () => import('./add-property/add-property.module').then( m => m.AddPropertyPageModule)
  },
  {
    path: 'favourite-properties',
    loadChildren: () => import('./favourite-properties/favourite-properties.module').then( m => m.FavouritePropertiesPageModule)
  },
  {
    path: 'match-results',
    loadChildren: () => import('./match-results/match-results.module').then( m => m.MatchResultsPageModule)
  },
  {
    path: 'recieved-fee',
    loadChildren: () => import('./recieved-fee/recieved-fee.module').then( m => m.RecievedFeePageModule)
  },
  {
    path: 'update-results/:id',
    loadChildren: () => import('./update-results/update-results.module').then( m => m.UpdateResultsPageModule)
  },
  {
    path: 'serach-results',
    loadChildren: () => import('./serach-results/serach-results.module').then( m => m.SerachResultsPageModule)
  },
  {
    path: 'matches-list',
    loadChildren: () => import('./matches-list/matches-list.module').then( m => m.MatchesListPageModule)
  },
  {
    path: 'header',
    loadChildren: () => import('./header/header.module').then( m => m.HeaderPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'upcoming-matchdetails/:_id',
    loadChildren: () => import('./upcoming-matchdetails/upcoming-matchdetails.module').then( m => m.UpcomingMatchdetailsPageModule)
  },
  {
    path: 'previousmatch-matchdetails/:_id',
    loadChildren: () => import('./previous-matchdetails/previous-matchdetails.module').then( m => m.PreviousMatchdetailsPageModule)
  },
  {
    path: 'field-requests',
    loadChildren: () => import('./field-requests/field-requests.module').then( m => m.FieldRequestsPageModule)
  },
  {
    path: 'transactions',
    loadChildren: () => import('./transactions/transactions.module').then( m => m.TransactionsPageModule)
  },
  {
    path: 'player-upcoming',
    loadChildren: () => import('./player-upcoming/player-upcoming.module').then( m => m.PlayerUpcomingPageModule)
  },
  {
    path: 'player-previous',
    loadChildren: () => import('./player-previous/player-previous.module').then( m => m.PlayerPreviousPageModule)
  },
  {
    path: 'otp/:email',
    loadChildren: () => import('./otp/otp.module').then( m => m.OtpPageModule)
  },
  {
    path: 'request-match',
    loadChildren: () => import('./request-match/request-match.module').then( m => m.RequestMatchPageModule)
  },
  // {
  //   path: 'select-team',
  //   loadChildren: () => import('./select-team/select-team.module').then( m => m.SelectTeamPageModule)
  // }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
