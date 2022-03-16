import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
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
  passwordFormat: string = 'password';
  loginForm: FormGroup;
  validationMessages = {
    email: [
      { type: 'required', message: 'Campo requerido' },
      { type: 'pattern', message: 'Introducir un email válido' },
      { type: 'maxlength', message: 'Máximo 50 caracteres' },
    ],
    password: [
      { type: 'required', message: 'Campo requerido' },
      { type: 'minlength', message: 'Mínimo 4 caracteres' },
      { type: 'maxlength', message: 'Máximo 50 caracteres' },
    ],
  };

  constructor(
    private loginService: LoginService,
    private storage: Storage,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.loginForm = this.formBuilder.group({
      email: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
          Validators.minLength(3),
          Validators.maxLength(50),
        ])
      ),
      password: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(50),
        ])
      ),
    });
  }

  async ngOnInit() {
    await this.storage.create();
  }

  passwordToggle() {
    this.passwordFormat == 'text'
      ? (this.passwordFormat = 'password')
      : (this.passwordFormat = 'text');
  }

  login(loginForm: FormGroup) {
    const formValue: any = loginForm;
    this.loginService
      .login(formValue.email, formValue.password)
      .subscribe((data) => {
        if (!data.token) {
          return;
        }
        this.storage.set('NP_token', data.token).then(() => {
          this.router.navigateByUrl('/menu/home');
        });
      });
  }
}
