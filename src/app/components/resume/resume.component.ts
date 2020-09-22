import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Register} from '../../models/register';
import {RegisterService} from '../../services/register.service';
import {CategoryService} from '../../services/category.service';

import * as _ from 'lodash';
import {ConfigService} from '../../services/config.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css']
})
export class ResumeComponent implements OnInit {

  public listRegistresOriginal: Register[];
  public listRegistresFiltered: Register[];
  public showResume: boolean;
  public total: number;
  public page: number;
  public itemsRegistres: number;


  @ViewChild('modal_confirm_delete', {static: false}) modal_confirm_delete: TemplateRef<any>;
  @ViewChild('modal_success_delete', {static: false}) modal_success_delete: TemplateRef<any>;

  constructor(private _registerService: RegisterService,
              private _categoryService: CategoryService,
              private _configService: ConfigService,
              private modalService: NgbModal) {
    this.listRegistresOriginal = [];
    this.listRegistresFiltered = [];
    this.showResume = false;
    this.total = 0;
    this.page = 1;
    this.itemsRegistres = this._configService.itemsRegistriesPage;
  }

  ngOnInit() {
    this._registerService.getRegisters().subscribe(
      (registers) => {
        // Se clona la variable, se organiza y se inveirte el orden
        this.listRegistresFiltered = _.cloneDeep(_.orderBy(registers, register => register.date).reverse());
        this.listRegistresOriginal = _.cloneDeep(this.listRegistresFiltered);
        this.showResume = true;

        this.completeCategories();
        this.sumTotal();


      }, (error) => {
        console.log('Errot al obtener los registros', error);
      }
    );
  }

  // Agraga al objeto de existir la categoria por id, como un nuevo oindice
  completeCategories() {
    this._categoryService.getCategories().subscribe(
      (categories) => {
        _.forEach(this.listRegistresFiltered, register => {
          const category = _.find(categories, cat => cat.id === register.idCategory);
          if (category) {
            register.category = category;
          }
        });
        this.listRegistresOriginal = _.cloneDeep(this.listRegistresFiltered);

        console.log('this.listRegistresFiltered', this.listRegistresFiltered);

      }, (error) => {
        console.log('Errot al obtener las categorias', error);
      }
    );
  }

  sumTotal() {
    this.total = _.sumBy(this.listRegistresFiltered, register => {
      let quantity = _.toNumber(register.quantity);
      if (register.type === 'expense') {
        // Retornando el valor como negativo
        quantity = quantity * -1;
      }
      return quantity;
    });

    console.log('this.total', this.total);
  }

  removeRegister(register: Register) {
    this.modalService.open(this.modal_confirm_delete).result.then(
      (result) => {
        console.log('result modal', result);
        if (result === 'yes') {
          this._registerService.removeCategory(register).then(
            () => {
              this.modalService.open(this.modal_success_delete);
            }, (error) => {
              console.log('error al eliminar el register', error);
            }
          );
        }
      }
    );
  }

  openEditDetail(register: Register) {
    this._registerService.selectRegister(register);
  }

  // Funcion que rcibira la emision del componente filter, cuando se filtre algo
  listRegisterFiltered($event: Register[]) {
    console.log('$event list filtered', $event);
    this.listRegistresFiltered = $event;

    // Recalculado el sumTotal();
    this.sumTotal();
  }

}
