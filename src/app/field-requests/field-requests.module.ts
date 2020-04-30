import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FieldRequestsPageRoutingModule } from './field-requests-routing.module';
import { SharedModule } from "../shared/shared.module";
import { FieldRequestsPage } from './field-requests.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
	SharedModule,
    FieldRequestsPageRoutingModule
  ],
  declarations: [FieldRequestsPage]
})
export class FieldRequestsPageModule {}
