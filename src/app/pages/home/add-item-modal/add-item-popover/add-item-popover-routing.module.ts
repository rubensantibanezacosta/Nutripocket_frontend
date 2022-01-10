import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddItemPopoverPage } from './add-item-popover.page';

const routes: Routes = [
  {
    path: '',
    component: AddItemPopoverPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddItemPopoverPageRoutingModule {}
