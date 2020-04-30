import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { SharedModule } from "../shared/shared.module";
import { RequestMatchPageRoutingModule } from './request-match-routing.module';

import { RequestMatchPage } from './request-match.page';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RequestMatchPageRoutingModule
  ],
  declarations: [RequestMatchPage]
})
export class RequestMatchPageModule {}
