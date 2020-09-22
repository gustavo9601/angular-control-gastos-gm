import {AbstractControl, FormGroup} from '@angular/forms';
import {Category} from '../models/category';


import * as _ from 'lodash';

export function categoryExists(listCategories: Category[]) {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const category = _.find(listCategories, c => c.name.trim().toLowerCase() === control.value.trim().toLowerCase());

    // De encontrar el valor en la lista, retornara el objeto para que se pusehea al objeto indice de errors
    if (category) {
      return {
        'existsCategory': true
      };
    }
    return null;
  };
}

export function quantityValid(control: AbstractControl) {

  const errors: any = {};

  if (isNaN(control.value)) {
    errors.isNotNumber = true;
  }

  if (control.value === '0' || control.value === 0) {
    errors.isZero = true;
  }

  // Si no hay errores retornamos null
  if (_.isEmpty(errors)) {
    return null;
  } else {
    return errors;
  }
}


// Como recibe dos parametros del formulario, le enviamos toda la agrupacion
export function confirmPassword(controls: FormGroup): { [key: string]: any } | null {
  const password = controls.get('password').value;
  const confirmPassword = controls.get('confirmPassword').value;

  if (password !== confirmPassword) {
    return {
      'confirmPassword': true
    };
  }

  return null;
}
