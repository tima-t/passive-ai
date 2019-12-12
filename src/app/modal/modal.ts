import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Tab1Page } from '../wallet/tab1.page';

@Component({
  selector: 'modal-example',
  templateUrl: 'modal-example.html',
  styleUrls: ['./modal-example.css']
})
export class ModalExample {
  constructor(public modalController: ModalController) {

  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: Tab1Page
    });
    return await modal.present();
  }
}