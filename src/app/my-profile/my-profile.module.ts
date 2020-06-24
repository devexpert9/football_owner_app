import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng4GeoautocompleteModule } from 'ng4-geoautocomplete';
import { IonicModule } from '@ionic/angular';
import { MyProfilePageRoutingModule } from './my-profile-routing.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MyProfilePage } from './my-profile.page';
import { SharedModule } from "../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    IonicModule,
    MyProfilePageRoutingModule,
    ReactiveFormsModule,
    Ng4GeoautocompleteModule
  ],
  declarations: [MyProfilePage]
})
export class MyProfilePageModule {}
