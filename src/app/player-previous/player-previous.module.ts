import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlayerPreviousPageRoutingModule } from './player-previous-routing.module';
import { SharedModule } from "../shared/shared.module";
import { PlayerPreviousPage } from './player-previous.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
	SharedModule,
    IonicModule,
    PlayerPreviousPageRoutingModule
  ],
  declarations: [PlayerPreviousPage]
})
export class PlayerPreviousPageModule {}
