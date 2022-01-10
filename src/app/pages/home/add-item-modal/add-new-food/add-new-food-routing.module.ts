import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddNewFoodPage } from './add-new-food.page';

const routes: Routes = [
  {
    path: '',
    component: AddNewFoodPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddNewFoodPageRoutingModule {}
