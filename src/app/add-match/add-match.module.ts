import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddMatchPageRoutingModule } from './add-match-routing.module';

import { AddMatchPage } from './add-match.page';
//import { SelectFavComponent } from "../select-fav/select-fav.component";
import { SharedModule } from "../shared/shared.module";
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    IonicModule,
    AddMatchPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AddMatchPage],
  entryComponents: []
})
export class AddMatchPageModule {}
