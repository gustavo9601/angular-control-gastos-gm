import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {confirmPassword} from '../../validators/validators';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  public formCreateAccount: FormGroup;
  public showCreateUserError: boolean;

  constructor(private fb: FormBuilder,
              private _authService: AuthService,
              private router: Router) {
    this.formCreateAccount = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    });
    // Validacion personalizada de confirmacion de password, se pasa directamente al formulario en general
    this.formCreateAccount.setValidators(confirmPassword);


    this.showCreateUserError = false;
  }

  ngOnInit() {
  }

  createUser() {
    this.showCreateUserError = false;
    const email = this.formCreateAccount.get('email').value;
    const password = this.formCreateAccount.get('password').value;

    this._authService.createAccount(email, password).then(
      (result) => {
        console.log('result create account', result);
        this.router.navigate(['/resume']);
      }, (error) => {
        console.log('error create account', error);
        this.showCreateUserError = true;
      }
    );
  }


  /*Getters del formulario*/
  get email() {
    return this.formCreateAccount.get('email');
  }

  get password() {
    return this.formCreateAccount.get('password');
  }

  get confirmPassword() {
    return this.formCreateAccount.get('confirmPassword');
  }
}
