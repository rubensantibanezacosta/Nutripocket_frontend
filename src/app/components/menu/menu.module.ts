import { ComponentModule } from 'src/app/components/component/component.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: '',
    component: MenuPage,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('../../pages/home/home.module').then((m) => m.HomePageModule),
      },
      {
        path: 'config',
        loadChildren: () =>
          import('../../pages/config/config.module').then(
            (m) => m.ConfigPageModule
          ),
      },
      {
        path: 'admin',
        loadChildren: () =>
          import('../../pages/admin/admin.module').then(
            (m) => m.AdminPageModule
          ),
      },
      {
        path: 'cart',
        loadChildren: () =>
          import('../../pages/cart/cart.module').then((m) => m.CartPageModule),
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentModule,
  ],
  declarations: [MenuPage],
})
export class MenuPageModule {}
