import {Injectable} from '@angular/core';

import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isLoggued: boolean;

  constructor(private afAuth: AngularFireAuth,
              private router: Router) {
    this._isLoggued = false;

    this.afAuth.authState.subscribe(
      (userAuthenticated) => {
        if (userAuthenticated) {
          this._isLoggued = true;
          this.router.navigate(['/resume']);
        } else {
          this._isLoggued = false;
        }
      }
    );
  }

  set isLogged(value: boolean) {
    this._isLoggued = value;
  }

  isAuthenticated() {
    return this._isLoggued;
  }

  checkAccount(email): boolean {
    // Devuelve boolean si existe o no el email crado
    return this.afAuth.auth.isSignInWithEmailLink(email);
  }

  createAccount(email: string, password: string) {
    if (this.checkAccount(email)) {
      return new Promise((resolve, reject) => {
        reject('El usuario ya existe');
      });
    } else {
      // Creo la cuenta y devuelvo una promesa con el estado
      return this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(authState => {
        return authState;
      }).catch(error => {
        throw error;
      });
    }

  }

  login(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }


  logout() {
    this.afAuth.auth.signOut();
    this._isLoggued = false;
    this.router.navigate(['/login']);
  }

  currentUser() {
    if (this.afAuth.auth.currentUser) {
      return this.afAuth.auth.currentUser.email;
    }
    return '';
  }

}
