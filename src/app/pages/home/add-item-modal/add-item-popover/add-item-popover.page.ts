import { ItemService } from '../../../../services/item.service';
import { FoodService } from 'src/app/services/food.service';
import { Component } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { Item } from 'src/app/models/item';
import { Food } from 'src/app/models/food';

@Component({
  selector: 'app-add-item-popover',
  templateUrl: './add-item-popover.page.html',
  styleUrls: ['./add-item-popover.page.scss'],
})
export class AddItemPopoverPage {
  dayfood: number;
  dishid: number;
  foodid: number;
  food: Food;
  dose: number = 0;
  dosex: number;
  constructor(
    private modalController: ModalController,
    private foodService: FoodService,
    private itemService: ItemService,
    private navParams: NavParams) {
    
    this.dayfood = this.navParams.data.dayfood;
    this.dishid = this.navParams.data.dishid;
    this.foodid = this.navParams.data.foodid;
    this.dosex = this.navParams.data.dosex;
    console.log( this.dayfood,
      this.dishid,
      this.foodid,
      this.dosex,)
    this.getFoodData()
  }

  closePopover(bool) {
    if (bool) {
      let item = new Item();
      item.food = this.food;
      item.dosex = this.dose / this.food.doseg;
      return this.modalController.dismiss(item);
    }
    return this.modalController.dismiss();

  }


  async getFoodData() {
    return this.foodService.getFoodById(this.foodid).subscribe((food) => {
      this.dosex ? this.dose = food.doseg * this.dosex || 0 : null;
      this.food = food;
    })
  }

  setDose(dose: any) {
    if (dose.value > 0) {
      this.dose = parseInt(dose.value);


    } else {
      this.dose = 0;
    }
  }

}
/* id
dosex
dishid
food */