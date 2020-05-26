import { Component, OnInit } from '@angular/core';
import {ModalController, NavParams} from '@ionic/angular'

@Component({
  selector: 'app-feespay',
  templateUrl: './feespay.component.html',
  styleUrls: ['./feespay.component.scss'],
})
export class FeespayComponent implements OnInit {

  constructor(private modalController: ModalController,
    private navParams: NavParams) {
}

  ngOnInit() {}
  async myDismiss() {
    const result: Date = new Date();
    
    await this.modalController.dismiss(result);
  }
}
