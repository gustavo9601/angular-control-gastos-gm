import * as _ from 'lodash';
import {IRegister} from '../interfaces/iregister';
import {Category} from './category';

export class Register implements IRegister {

  constructor(data) {
    _.set(this, 'data', data);
  }

  get id() {
    return _.get(this, 'data.id');
  }

  get description() {
    return _.get(this, 'data.description');
  }

  get idCategory() {
    return _.get(this, 'data.idCategory');
  }

  get categpry() {
    return _.get(this, 'data.categpry');
  }

  get type() {
    return _.get(this, 'data.type');
  }

  get date() {
    return _.get(this, 'data.date');
  }

  get quantity() {
    return _.get(this, 'data.quantity');
  }

  get user() {
    return _.get(this, 'data.user');
  }


  set id(value) {
    _.set(this, 'data.id', value);
  }

  set description(value) {
    _.set(this, 'data.description', value);
  }

  set idCategory(value) {
    _.set(this, 'data.idCategory', value);
  }

  set categpry(value) {
    _.set(this, 'data.categpry', value);
  }

  set type(value) {
    _.set(this, 'data.type', value);
  }

  set date(value) {
    _.set(this, 'data.date', value);
  }

  set quantity(value) {
    _.set(this, 'data.quantity', value);
  }

  set user(value) {
    _.set(this, 'data.user', value);
  }


  getData() {
    return _.get(this, 'data');
  }
}
