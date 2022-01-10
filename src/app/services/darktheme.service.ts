import { Injectable } from '@angular/core';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class DarkthemeService {
  darkmode;
  constructor(private tokenservice: TokenService) {
    this.checkDarkMode();
  }

  async setDarkMode(mode: string) {
    return await this.tokenservice.addData("NP_darkmode", mode);
  }

async getDarkMode(){
  return await this.tokenservice.getData("NP_darkmode");
}

  async checkDarkMode() {
    this.darkmode = await this.tokenservice.getData("NP_darkmode");
    if (this.darkmode && this.darkmode == "dark") {
      document.body.classList.add("dark");
    }
    else if (this.darkmode && this.darkmode == "light") {
      document.body.classList.remove("dark");
    }
    else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
      console.log(prefersDark);
      if (prefersDark.matches) {
        document.body.classList.toggle("dark");
      }
    }
  }
}
