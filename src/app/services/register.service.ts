import {Injectable} from '@angular/core';
import {Register} from '../models/register';
import {AngularFireDatabase} from '@angular/fire/database';
import * as moment from 'moment';
import {Observable, Subject} from 'rxjs';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private registreSubject: Subject<Register>;
  public currentRegister: Observable<Register>;

  constructor(
    private afd: AngularFireDatabase,
    private _authService:AuthService
  ) {


    this.registreSubject = new Subject<Register>();
    this.currentRegister = this.registreSubject.asObservable();

  }

  // Patron observer, para emitir un mismo valor a todas las subscripciones
  selectRegister(register: Register) {
    this.registreSubject.next(register);
  }

  addRegister(register: Register) {
    return new Promise((resolve, reject) => {

      try {
        const registerRef = this.afd.database.ref('registers');

        const newRegister = registerRef.push();

        register.id = newRegister.key;
        register.date = moment(register.date).format('YYYY-MM-DD');
        register.user = this._authService.currentUser();

        const registerRefId = this.afd.database.ref('registers/' + register.id);

        registerRefId.set(register.getData());

        resolve(true);
      } catch (error) {
        reject('Error al añadir un registro');
      }
    });
  }


  editRegister(register: Register): Promise<boolean> {

    // Devuelvo una promesa
    return new Promise((resolve, reject) => {

      try {
        // Formateo la fecha de nuevo
        register.date = moment(register.date).format('YYYY-MM-DD');

        // Obtengo la referencia del registro con su id y seteo el nuevo valor
        this.afd.object('/registers/' + register.id).set(register.getData());
        // Todo bien
        resolve(true);
      } catch (error) {
        // Hubo un error
        reject('Error al editar el registro');
      }
    });

  }

  getRegisters(): Observable<Register[]> {
    const currentUser = this._authService.currentUser();
    // En la peticion se le indica cual es el correo del usuario que necesitamos que nos traiga la info
    return this.afd.list<Register>('registers', ref => ref.orderByChild('user').equalTo(currentUser)).valueChanges();
  }

  removeCategory(register: Register): Promise<void> {
    return this.afd.object('/registers/' + register.id).remove();
  }

}
