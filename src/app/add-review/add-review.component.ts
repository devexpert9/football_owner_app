import { Component, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular'
@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.scss'],
})
export class AddReviewComponent implements OnInit {

 constructor(private modalController: ModalController) { }

  ngOnInit() {}
async myDismiss() {
    const result: Date = new Date();
    
    await this.modalController.dismiss(result);
  }
}
