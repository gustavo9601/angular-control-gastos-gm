import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Register} from '../../models/register';
import {CategoryService} from '../../services/category.service';
import {ConfigService} from '../../services/config.service';
import {IFilter} from '../../interfaces/ifiler';
import {Category} from '../../models/category';

import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  @Input() listOriginal: Register[];

  @Output() filter: EventEmitter<Register[]>;

  public filterForm: IFilter;
  public locale: any;
  public listCategories: Category[];
  public listFiltered: Register[];

  constructor(
    private _categoryService: CategoryService,
    private _configService: ConfigService,
  ) {
    this.filter = new EventEmitter<Register[]>();
    this.filterForm = {
      'dateStart': null,
      'dateEnd': null,
      'year': null,
      'idCategory': null,
      'quantityMin': null,
      'quantityMax': null
    };
    this.locale = this._configService.locale;
    this.listCategories = [];
  }

  ngOnInit() {
    this._categoryService.getCategories().subscribe(
      (categories) => {
        this.listCategories = categories;
      }, (error) => {
        console.log('Error al obtener categorias', error);
      }
    );
  }

  filterData() {
    this.listFiltered = this.listOriginal;

    // Filtrado por los campos de cantidades
    if (this.filterForm.quantityMin && this.filterForm.quantityMax) {
      this.listFiltered = _.filter(this.listFiltered, register => {
        let quantity = _.toNumber(register.quantity);

        if (register.type === 'expense') {
          quantity = quantity * -1;
        }

        // Retornara solo los que cumplan esta condicion
        return quantity >= _.toNumber(this.filterForm.quantityMin) && quantity <= _.toNumber(this.filterForm.quantityMax);
      });
    } else if (this.filterForm.quantityMin) {
      this.listFiltered = _.filter(this.listFiltered, register => {
        let quantity = _.toNumber(register.quantity);

        if (register.type === 'expense') {
          quantity = quantity * -1;
        }

        // Retornara solo los que cumplan esta condicion
        return quantity >= _.toNumber(this.filterForm.quantityMin);
      });
    } else if (this.filterForm.quantityMax) {
      this.listFiltered = _.filter(this.listFiltered, register => {
        let quantity = _.toNumber(register.quantity);

        if (register.type === 'expense') {
          quantity = quantity * -1;
        }

        // Retornara solo los que cumplan esta condicion
        return quantity <= _.toNumber(this.filterForm.quantityMax);
      });
    }


    // Filtrado por las fechas
    if (this.filterForm.dateStart && this.filterForm.dateEnd) {
      this.listFiltered = _.filter(this.listFiltered, register => {

        // Retornara solo los registros con fechas entre el rango filtrado
        return moment(register.date, 'YYYY-MM-DD').isSameOrBefore(moment(this.filterForm.dateEnd, 'YYYY-MM-DD')) &&
          moment(register.date, 'YYYY-MM-DD').isSameOrAfter(moment(this.filterForm.dateStart, 'YYYY-MM-DD'));
      });
    } else if (this.filterForm.dateStart) {
      this.listFiltered = _.filter(this.listFiltered, register => {

        return moment(register.date, 'YYYY-MM-DD').isSameOrAfter(moment(this.filterForm.dateStart, 'YYYY-MM-DD'));
      });
    } else if (this.filterForm.dateEnd) {
      this.listFiltered = _.filter(this.listFiltered, register => {

        return moment(register.date, 'YYYY-MM-DD').isSameOrBefore(moment(this.filterForm.dateEnd, 'YYYY-MM-DD'));
      });
    }


    // Filtrar por id de categoria
    if (this.filterForm.idCategory) {
      this.listFiltered = _.filter(this.listFiltered, register => {
        return register.idCategory === this.filterForm.idCategory;
      });
    }

    this.filter.emit(this.listFiltered);


  }
}
