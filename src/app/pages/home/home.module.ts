import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { HammerModule } from '@angular/platform-browser';
import { ComponentModule } from 'src/app/components/component/component.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ComponentModule,
    HammerModule,
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
