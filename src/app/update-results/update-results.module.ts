import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
 

import { IonicModule } from '@ionic/angular';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { UpdateResultsPageRoutingModule } from './update-results-routing.module';

import { UpdateResultsPage } from './update-results.page';
import { SharedModule } from "../shared/shared.module";
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    IonicModule,
    UpdateResultsPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [UpdateResultsPage]
})
export class UpdateResultsPageModule {}
