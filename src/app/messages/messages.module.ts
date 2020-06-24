import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MessagesPageRoutingModule } from './messages-routing.module';
import { SharedModule } from "../shared/shared.module";
import { MessagesPage } from './messages.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MessagesPageRoutingModule,
    SharedModule
  ],
  declarations: [MessagesPage]
})
export class MessagesPageModule {}
