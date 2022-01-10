import { PopoverPageModule } from './components/popover/popover.module';


import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ComponentModule } from './components/component/component.module';
import { IonicStorageModule } from '@ionic/storage-angular';
import { AddItemModalPageModule } from './pages/home/add-item-modal/add-item-modal.module';
import { AddItemPopoverPageModule } from './pages/home/add-item-modal/add-item-popover/add-item-popover.module';
import { AddNewFoodPageRoutingModule } from './pages/home/add-item-modal/add-new-food/add-new-food-routing.module';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    HttpClientModule, 
    ComponentModule, 
    HammerModule, 
    IonicStorageModule.forRoot(),
    FormsModule, 
    ReactiveFormsModule, 
    AddItemModalPageModule,
    AddItemPopoverPageModule,
    AddNewFoodPageRoutingModule,
    PopoverPageModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule { }
