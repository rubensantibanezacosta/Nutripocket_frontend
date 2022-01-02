import { ComponentModule } from 'src/app/components/component/component.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from "@angular/router";
import { IonicModule } from '@ionic/angular';
import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: "",
    component: MenuPage,
    children: [
      {
        path: "home",
        loadChildren: () =>
          import("../../pages/home/home.module").then(m => m.HomePageModule)
      }
    ]
  }
];


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentModule,
  ],
  declarations: [MenuPage]
})
export class MenuPageModule {}
