import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { NgxStarsModule } from 'ngx-stars';
import { MatchDetailsPageRoutingModule } from './match-details-routing.module';

import { MatchDetailsPage } from './match-details.page';

import { FeespayComponent  } from "../feespay/feespay.component";
import { SharedModule } from "../shared/shared.module";
@NgModule({
  imports: [
    NgxStarsModule,
    CommonModule,
    FormsModule,
    SharedModule,
    IonicModule,
    MatchDetailsPageRoutingModule
  ],
  declarations: [MatchDetailsPage,FeespayComponent],
  entryComponents:[FeespayComponent]
})
export class MatchDetailsPageModule {}
