import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FieldRequestsPage } from './field-requests.page';

const routes: Routes = [
  {
    path: '',
    component: FieldRequestsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FieldRequestsPageRoutingModule {}
