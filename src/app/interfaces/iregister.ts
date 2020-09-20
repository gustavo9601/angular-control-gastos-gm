import {Category} from '../models/category';

export interface IRegister {
  id: string,
  description: string,
  idCategory: string,
  categpry: Category,
  type: string,
  date: string,
  quantity: number,
  user: string
}
