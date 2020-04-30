import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlayerDetailPageRoutingModule } from './player-detail-routing.module';

import { PlayerDetailPage } from './player-detail.page';
import { PlayerReviewComponent } from "../player-review/player-review.component";
import { IonicRatingModule } from 'ionic-rating';
import { SharedModule } from "../shared/shared.module";
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    IonicModule,
    PlayerDetailPageRoutingModule,
    IonicRatingModule
  ],
  declarations: [PlayerDetailPage,PlayerReviewComponent],
  entryComponents: [PlayerReviewComponent]
})
export class PlayerDetailPageModule {}
