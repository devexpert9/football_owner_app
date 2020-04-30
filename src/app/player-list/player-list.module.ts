import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlayerListPageRoutingModule } from './player-list-routing.module';

import { PlayerListPage } from './player-list.page';
import { InvitePlayerComponent } from "../invite-player/invite-player.component";
import { SharedModule } from "../shared/shared.module";
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    PlayerListPageRoutingModule
  ],
  declarations: [PlayerListPage,InvitePlayerComponent],
  entryComponents: [InvitePlayerComponent]
})
export class PlayerListPageModule {}
