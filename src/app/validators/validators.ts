import {AbstractControl} from '@angular/forms';
import {Category} from '../models/category';


import * as _ from 'lodash';

export function categoryExists(listCategories: Category[]) {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const category = _.find(listCategories, c => c.name.trim().toLowerCase() === control.value.trim().toLowerCase());

    // De encontrar el valor en la lista, retornara el objeto para que se pusehea al objeto indice de errors
    if (category) {
      return {
        "existsCategory": true
      };
    }
    return null;
  };
}
