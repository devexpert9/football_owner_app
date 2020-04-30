import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlayerPreviousPage } from './player-previous.page';

const routes: Routes = [
  {
    path: '',
    component: PlayerPreviousPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlayerPreviousPageRoutingModule {}
