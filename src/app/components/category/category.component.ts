import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {CategoryService} from '../../services/category.service';
import {ConfigService} from '../../services/config.service';
import {Category} from '../../models/category';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  public showDetail: boolean;
  public listCategories: Category[];
  public showCategories: boolean;
  public page: number;
  public itemsPerPage: number;
  public categorySelected: Category;

  @ViewChild('modal_confirm_delete', {static: false}) modal_confirm_delete: TemplateRef<any>;
  @ViewChild('modal_success_delete', {static: false}) modal_success_delete: TemplateRef<any>;

  constructor(private _categoryService: CategoryService,
              private _configService: ConfigService,
              private serviceModal: NgbModal) {
    this.showDetail = false;
    this.listCategories = [];
    this.showCategories = false;
    this.page = 1;
    this.itemsPerPage = this._configService.itemsCategoriesPage;
    this.categorySelected = null;
  }

  ngOnInit() {
    this._categoryService.getCategories().subscribe(
      (listCategories) => {
        this.listCategories = listCategories;
        this.showCategories = true;
        console.log('listCategories', this.listCategories);
      }, (error) => {
        console.log('Error al obtener categories', error);
      }
    );
  }

  closeDetail($event) {
    console.log('closeDetail event');
    this.showDetail = $event;
  }

  openDetail() {
    this.showDetail = true;
  }

  openEditDetail(category: Category) {
    this.categorySelected = category;
    this.showDetail = true;
  }

  removeCategory(category: Category) {
    this.serviceModal.open(this.modal_confirm_delete).result.then(
      // Parametro que se envia al llamar esta funcion desde la vista
      (seVaAEliminar) => {
        if (seVaAEliminar === 'yes') {
          this._categoryService.removeCategory(category).then(
            () => {
              console.log('Deleted success category');

            }, (error) => {
              console.log('Error to delete category', error);
            }
          );
        }
      }
    );
  }
}
