import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddNewFoodPageRoutingModule } from './add-new-food-routing.module';

import { AddNewFoodPage } from './add-new-food.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddNewFoodPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [AddNewFoodPage]
})
export class AddNewFoodPageModule {}
