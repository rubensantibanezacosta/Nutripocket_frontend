import { PopoverController, NavParams } from '@ionic/angular';
import { Component } from '@angular/core';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.page.html',
  styleUrls: ['./popover.page.scss'],
})
export class PopoverPage {
  message:string;
  constructor(private popoverController:PopoverController, private navParams:NavParams) {
    this.message=this.navParams.data.message;
}

closePopover(option:boolean){
    option?this.popoverController.dismiss(true):this.popoverController.dismiss(false);
}
}
