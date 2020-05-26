import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlayerUpcomingPageRoutingModule } from './player-upcoming-routing.module';
import { SharedModule } from "../shared/shared.module";
import { PlayerUpcomingPage } from './player-upcoming.page';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
	SharedModule,
    PlayerUpcomingPageRoutingModule
  ],
  declarations: [PlayerUpcomingPage],
  entryComponents: []
})
export class PlayerUpcomingPageModule {}
