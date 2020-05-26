import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecievedFeePageRoutingModule } from './recieved-fee-routing.module';

import { RecievedFeePage } from './recieved-fee.page';
import { SharedModule } from "../shared/shared.module";
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    IonicModule,
    RecievedFeePageRoutingModule
  ],
  declarations: [RecievedFeePage]
})
export class RecievedFeePageModule {}
