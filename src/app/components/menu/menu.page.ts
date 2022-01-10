import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage {
  menuItems = [
    
    {
      name: "Configuración",
      icon: "settings",
      url: "menu/config",
    },
    {
      name: "Diario",
      icon: "calendar-number",
      url: "menu/home"
    },
    {
      name: "Cesta de la compra",
      icon: "cart",
      url: "menu/cart"
    },
    {
      name: "Administración",
      icon: "shield",
      url: "menu/admin",
    },
  ]
  constructor(private menuController: MenuController, private router: Router, private loginService: LoginService) {
    this.menuController.close();
  }



  closeMenu() {
    this.menuController.close();
  }


  logout() {
    this.loginService.logout().then(() => {
      this.router.navigateByUrl("login");
    });
  }
}
