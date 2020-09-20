import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private _data: any;
  private _locale: any;

  constructor(private http: HttpClient) {
  }

  public getData() {
    return new Promise((resolve, reject) => {
      this.http.get('assets/config/app-config.json')
        .subscribe(data => {
          this._data = data;
          resolve(true);
        }, error => {
          console.log('Error al obtener la configuracion: ' + error);
          reject(true);
        });
    });
  }

  get logoLogin() {
    return _.get(this._data, 'logoLogin');
  }

  get itemsCategoriesPage() {
    return _.get(this._data, 'itemsCategoriesPage');
  }

  get itemsRegistriesPage() {
    return _.get(this._data, 'itemsRegistriesPage');
  }

  get yearStart() {
    return _.get(this._data, 'yearStart');
  }

  get yearEnd() {
    return _.get(this._data, 'yearEnd');
  }


  public getDateConfig() {
    return new Promise((resolve, reject) => {
      this.http.get('assets/config/date-' + navigator.language + '.json')
        .subscribe(data => {
          this._locale = data;
          resolve(true);
        }, error => {
          console.log('Error al obtener la configuracion: ' + error);
          reject(true);
        });
    });
  }

  get locale() {
    return this._locale;
  }

  set locale(value: any) {
    this._locale = value;
  }

}
