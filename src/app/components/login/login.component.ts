import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ConfigService} from '../../services/config.service';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public formLogin: FormGroup;
  public showLoginError: boolean;

  constructor(private fb: FormBuilder,
              private _authService: AuthService,
              public _configService: ConfigService,
              private router: Router) {
    this.formLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    this.showLoginError = false;
  }

  ngOnInit() {
  }

  checkLogin() {
    this.showLoginError = false;
    const email = this.formLogin.get('email').value;
    const password = this.formLogin.get('password').value;

    this._authService.login(email, password).then(
      (result) => {
        console.log('result iniciar secion', result);
        this.router.navigate(['/resume']);
      }, (error) => {
        console.log('Error al iniciar sesion', error);
        this.showLoginError = true;
      }
    );
  }
}
