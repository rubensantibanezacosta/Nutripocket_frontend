import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddItemPopoverPageRoutingModule } from './add-item-popover-routing.module';

import { AddItemPopoverPage } from './add-item-popover.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddItemPopoverPageRoutingModule
  ],
  declarations: [AddItemPopoverPage]
})
export class AddItemPopoverPageModule {}
