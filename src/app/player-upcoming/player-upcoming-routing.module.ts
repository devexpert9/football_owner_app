import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlayerUpcomingPage } from './player-upcoming.page';

const routes: Routes = [
  {
    path: '',
    component: PlayerUpcomingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlayerUpcomingPageRoutingModule {}
