import { Component, OnInit } from '@angular/core';
import {ModalController, NavParams} from '@ionic/angular'
@Component({
  selector: 'app-invite-player',
  templateUrl: './invite-player.component.html',
  styleUrls: ['./invite-player.component.scss'],
})
export class InvitePlayerComponent implements OnInit {

  constructor(private modalController: ModalController,
    private navParams: NavParams) {
}

  ngOnInit() {}
  async myDismiss() {
    const result: Date = new Date();
    await this.modalController.dismiss(result);
  }
}
