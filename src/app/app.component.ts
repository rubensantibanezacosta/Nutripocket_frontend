import { DarkthemeService } from './services/darktheme.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private darkThemeService: DarkthemeService) {}
}
