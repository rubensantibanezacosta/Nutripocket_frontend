import { ItemService } from '../../../services/item.service';
import { Component } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { AddItemPopoverPage } from 'src/app/pages/home/add-item-modal/add-item-popover/add-item-popover.page';
import { Food } from 'src/app/models/food';
import { FoodService } from 'src/app/services/food.service';
import { Item } from 'src/app/models/item';
import { AddNewFoodPage } from 'src/app/pages/home/add-item-modal/add-new-food/add-new-food.page';


@Component({
  selector: 'app-add-item-modal',
  templateUrl: './add-item-modal.page.html',
  styleUrls: ['./add-item-modal.page.scss'],
})
export class AddItemModalPage {

  dayfood: number;
  dayid: number;
  dayfoodName:string="";
  searchWord:string=undefined;
  foods:Food[]=[];
  visualize:string="search";
  items:Item[]=[];
  dishid;
  


  constructor(private navParams: NavParams, 
    private modalController:ModalController,
    private foodService:FoodService,
    private itemService:ItemService) {

    this.dayfood = this.navParams.data.dayfood;
    this.dayid = this.navParams.data.dayid;
    this.dayfoodName = this.navParams.data.dayfoodName;
    this.dishid=this.navParams.data.dishid;

    

  }

  ionViewDidEnter(){
    document.getElementById("searchTag").click();
  }

  search(word){
    this.searchWord=word;
    if(word=="" || word==null || word==undefined){
      return;
    }
    this.foodService.getFoods(word).subscribe((foods)=>{
      
      return this.foods=foods,
      (error)=>console.error(error)
    })   
  }



  async saveItems(bool){

    if(bool){
      this.itemService.createItems(this.items,this.dishid).subscribe(async (res)=>{
        return await this.modalController.dismiss();
      })}else{
        return await this.modalController.dismiss();
      }
  
  }


  async editFoodWeight(food:Food) {
    const popover = await this.modalController.create({
      component: AddItemPopoverPage,
      componentProps: {
        dayfood:this.dayfood,
        dayid:this.dayid,
        foodid:food.id,
      },
      showBackdrop:true,
    })

    popover.onDidDismiss().then((itemReturned)=>{
      itemReturned.data?this.items.push(<Item>itemReturned.data):null;
    })
    return await popover.present();
}

async editFoodWeightofSavedItem(item:Item, index:number) {
  const popover = await this.modalController.create({
    component: AddItemPopoverPage,
    componentProps: {
      dayfood:this.dayfood,
      dayid:this.dayid,
      foodid:item.food.id,
      dosex:item.dosex,
    },
    showBackdrop:true,
  })

  popover.onDidDismiss().then((itemReturned)=>{
    if(itemReturned.data){
      
      this.items.splice(index);
      this.items.splice(index,0,<Item>itemReturned.data);
    } 
  })
  return await popover.present();
}


slide(event){
  this.visualize=event.detail.value;
}


round(number:number){
  return Math.round(number);
}




//CSS Animations
PushToDeleteById(id, target, index) {
  document.getElementById(id).style.animationDuration = "2.5s";
  document.getElementById(id).style.animationFillMode = "forwards";
  document.getElementById(id).style.animationName = "deleteToLeft";
  target.style.animationDuration = "2.5s";
  target.style.animationFillMode = "forwards";
  target.style.animationName = "deleteToLeft";
  target.parentNode.style.animationDuration = "2.5s";
  target.parentNode.style.animationFillMode = "forwards";
  target.parentNode.style.animationName = "deleteToLeft";
  setTimeout(()=>{this.items.splice(index)}, 2500)
}

async createFood() {
  const newFood = await this.modalController.create({
    component: AddNewFoodPage,
    showBackdrop:true,
  })
  newFood.onDidDismiss().then((itemReturned)=>{
    itemReturned.data?this.items.push(<Item>itemReturned.data):null;
  })
  return await newFood.present();
}
}

