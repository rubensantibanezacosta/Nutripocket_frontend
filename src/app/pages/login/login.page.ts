import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string = "";
  password: string = "";
  constructor(private loginService: LoginService, private storage: Storage, private router:Router) { }

  async ngOnInit() {

    await this.storage.create();

  }

  login() {

    this.loginService.login(this.email, this.password).subscribe((data) => {
      console.log(data.token);
      this.storage.set("NP_token", data.token).then(()=>{
        this.router.navigateByUrl("/menu/home")
      });
    })
  }
}
