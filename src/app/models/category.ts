import {ICategory} from '../interfaces/icategory';

import * as _ from 'lodash';

export class Category implements ICategory {
  constructor(data) {
    _.set(this, 'data', data);
  }

  get id() {
    return _.get(this, 'data.id');
  }

  get name() {
    return _.get(this, 'data.name');
  }

  get user() {
    return _.get(this, 'data.user');
  }


  set id(value) {
    _.set(this, 'data.id', value);
  }

  set name(value) {
    _.set(this, 'data.name', value);
  }

  set user(value) {
    _.set(this, 'data.user', value);
  }

  getData() {
    return _.get(this, 'data');
  }
}
