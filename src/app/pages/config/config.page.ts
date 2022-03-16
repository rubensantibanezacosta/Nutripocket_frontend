import { DarkthemeService } from './../../services/darktheme.service';
import { Component } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.page.html',
  styleUrls: ['./config.page.scss'],
})
export class ConfigPage {
  darktheme = 'device';
  constructor(
    private darkThemeService: DarkthemeService,
    private tokenService: TokenService
  ) {}
  ionViewDidEnter() {
    this.getDarkTheme();
  }
  setDarkTheme(value) {
    this.darkThemeService.setDarkMode(value).then(() => {
      this.darkThemeService.checkDarkMode();
    });
  }

  async getDarkTheme() {
    const darkmode = await this.darkThemeService.getDarkMode();
    darkmode ? (this.darktheme = darkmode) : null;
  }
}
