import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectTeamPage } from './select-team.page';

const routes: Routes = [
  {
    path: '',
    component: SelectTeamPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectTeamPageRoutingModule {}
