import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RequestMatchPage } from './request-match.page';

const routes: Routes = [
  {
    path: '',
    component: RequestMatchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequestMatchPageRoutingModule {}
