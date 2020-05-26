import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddPropertyPageRoutingModule } from './add-property-routing.module';
import { Ng4GeoautocompleteModule } from 'ng4-geoautocomplete';
import { AddPropertyPage } from './add-property.page';
import { SharedModule } from "../shared/shared.module";
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    Ng4GeoautocompleteModule,
    IonicModule,
    AddPropertyPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AddPropertyPage]
})
export class AddPropertyPageModule {}
