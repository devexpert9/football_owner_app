import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


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
    ReactiveFormsModule
  ],
  declarations: [MyProfilePage]
})
export class MyProfilePageModule {}
