import {Injectable} from '@angular/core';
import {Register} from '../models/register';
import {AngularFireDatabase} from '@angular/fire/database';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(
    private afd: AngularFireDatabase
  ) {
  }

  addRegister(register: Register) {
    return new Promise((resolve, reject) => {

      try {
        const registerRef = this.afd.database.ref('registers');

        const newRegister = registerRef.push();

        register.id = newRegister.key;

        register.date = moment(register.date).format('YYYY-MM-DD');

        const registerRefId = this.afd.database.ref('registers/' + register.id);

        registerRefId.set(register.getData());

        resolve(true);
      } catch (error) {
        reject('Error al añadir un registro');
      }
    });
  }
}
