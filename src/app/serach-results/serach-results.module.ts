import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SerachResultsPageRoutingModule } from './serach-results-routing.module';

import { SerachResultsPage } from './serach-results.page';
import { SharedModule } from "../shared/shared.module";
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    IonicModule,
    SerachResultsPageRoutingModule
  ],
  declarations: [SerachResultsPage]
})
export class SerachResultsPageModule {}
