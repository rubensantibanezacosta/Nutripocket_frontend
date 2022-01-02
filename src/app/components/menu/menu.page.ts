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
      name: "Diario",
      icon: "calendar-clear-outline",
      url: "/home"
    },
    {
      name: "Configuración",
      icon: "cog-outline",
      url: "",
    },
  ]
  constructor(private menuController: MenuController, private router: Router, private loginService:LoginService) { }



  closeMenu() {
    this.menuController.close();
  }


  logout() {
    this.loginService.logout();
  }
}
