import {Injectable} from '@angular/core';

import {AngularFireDatabase} from '@angular/fire/database';
import {Category} from '../models/category';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private afd: AngularFireDatabase,
    private _authService:AuthService
  ) {


  }

  addCategory(category: Category): Promise<boolean> {
    return new Promise((resolve, reject) => {

      try {
        const categoryRef = this.afd.database.ref('categories');

        const newCategory = categoryRef.push();

        category.id = newCategory.key;
        category.user = this._authService.currentUser();

        const categoryRefId = this.afd.database.ref('categories/' + category.id);

        categoryRefId.set(category.getData());

        resolve(true);
      } catch (error) {
        reject('Error al añadir una categoria');
      }

    });
  }


  editCategory(category: Category): Promise<void> {
    // Se envia el path + el id del registro, y se setea por el nuevo objeto pasado
    return this.afd.object('/categories/' + category.id).set(category.getData());
  }

  getCategories(): Observable<Category[]> {
    const currentUser = this._authService.currentUser();
    return this.afd.list<Category>('categories', ref => ref.orderByChild('user').equalTo(currentUser)).valueChanges();
  }

  removeCategory(category: Category): Promise<void> {
    return this.afd.object('/categories/' + category.id).remove();
  }

}
