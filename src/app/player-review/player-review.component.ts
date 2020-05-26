import { Component, OnInit } from '@angular/core';
import {ModalController, NavParams} from '@ionic/angular';

@Component({
  selector: 'app-player-review',
  templateUrl: './player-review.component.html',
  styleUrls: ['./player-review.component.scss'],
})
export class PlayerReviewComponent implements OnInit {
  rate:any;
  onRateChange:any;
  constructor(private modalController: ModalController,
    private navParams: NavParams) {
  }

  ngOnInit() {}
  async myDismiss() {
    const result: Date = new Date();
    
    await this.modalController.dismiss(result);
  }

}
