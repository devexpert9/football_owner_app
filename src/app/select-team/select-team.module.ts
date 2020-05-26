import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectTeamPageRoutingModule } from './select-team-routing.module';

import { SelectTeamPage } from './select-team.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectTeamPageRoutingModule,

  ],
  declarations: []
})
export class SelectTeamPageModule {}
