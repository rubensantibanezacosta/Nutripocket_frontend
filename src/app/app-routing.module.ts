import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'menu',
    loadChildren: () =>
      import('./components/menu/menu.module').then((m) => m.MenuPageModule),
  },
  {
    path: 'add-item-modal',
    loadChildren: () =>
      import('./pages/home/add-item-modal/add-item-modal.module').then(
        (m) => m.AddItemModalPageModule
      ),
  },
  {
    path: 'add-item-popover',
    loadChildren: () =>
      import(
        './pages/home/add-item-modal/add-item-popover/add-item-popover.module'
      ).then((m) => m.AddItemPopoverPageModule),
  },
  {
    path: 'add-new-food',
    loadChildren: () =>
      import(
        './pages/home/add-item-modal/add-new-food/add-new-food.module'
      ).then((m) => m.AddNewFoodPageModule),
  },

  {
    path: 'popover',
    loadChildren: () =>
      import('./components/popover/popover.module').then(
        (m) => m.PopoverPageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
