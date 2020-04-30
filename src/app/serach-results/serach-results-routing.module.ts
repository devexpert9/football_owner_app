import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SerachResultsPage } from './serach-results.page';

const routes: Routes = [
  {
    path: '',
    component: SerachResultsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SerachResultsPageRoutingModule {}
