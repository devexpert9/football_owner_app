import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SelectFavComponent } from "../select-fav/select-fav.component";
import { CancelmatchComponent } from '../cancelmatch/cancelmatch.component';
@Component({
  selector: 'app-player-upcoming',
  templateUrl: './player-upcoming.page.html',
  styleUrls: ['./player-upcoming.page.scss'],
})
export class PlayerUpcomingPage implements OnInit {
	title="Club 1 Vs Club 2";
    constructor(public modalController: ModalController) {      
    
  }

  ngOnInit() {
  }
   async presentModal2() {
    const modal = await this.modalController.create({
      component: CancelmatchComponent
    });
    return await modal.present();
  }
 async presentModal() {
    const modal = await this.modalController.create({
      component: SelectFavComponent
    });
    return await modal.present();
  }
}
