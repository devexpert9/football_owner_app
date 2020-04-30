import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PlayerReviewComponent } from "../player-review/player-review.component";
@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.page.html',
  styleUrls: ['./player-detail.page.scss'],
})
export class PlayerDetailPage implements OnInit {
  title="Player Details";
  player_detail:any;
  Property:any;
  matches:any;
  
  constructor(public modalController: ModalController) {      
    this.player_detail = "profile";
  }

  ngOnInit() {
  }
  async presentModal() {
    const modal = await this.modalController.create({
      component: PlayerReviewComponent
    });
    return await modal.present();
  }

}