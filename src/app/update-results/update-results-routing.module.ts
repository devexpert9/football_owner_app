import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateResultsPage } from './update-results.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateResultsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateResultsPageRoutingModule {}
