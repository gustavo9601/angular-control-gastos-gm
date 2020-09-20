import {Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Category} from '../../../models/category';
import {CategoryService} from '../../../services/category.service';
import {ConfigService} from '../../../services/config.service';
import {RegisterService} from '../../../services/register.service';
import {Register} from '../../../models/register';

@Component({
  selector: 'app-add-register',
  templateUrl: './add-register.component.html',
  styleUrls: ['./add-register.component.css']
})
export class AddRegisterComponent implements OnInit {
  @Input('typeRegister') typeRegister: string;
  @Output() close: EventEmitter<boolean>;

  public formAddRegister: FormGroup;
  public listCategories: Category[];
  public loadCategories: boolean;
  public locale: any;

  constructor(private fb: FormBuilder,
              private _categoryService: CategoryService,
              private _configService: ConfigService,
              private _registerService: RegisterService) {
    this.close = new EventEmitter<boolean>();

    this.listCategories = [];
    this.loadCategories = false;
  }

  ngOnInit() {
    this.formAddRegister = this.fb.group({
      description: ['', Validators.required],
      date: [new Date(), Validators.required],
      type: [this.typeRegister, Validators.required],
      idCategory: ['', Validators.required],
      quantity: [0, Validators.required],
    });

    this.getCategories();

    this.locale = this._configService.locale;
  }


  closeDetail($event) {
    this.close.emit($event);
  }

  addRegister() {
    const register = new Register(this.formAddRegister.value);

    this._registerService.addRegister(register).then(
      () => {
        console.log('Registro insertado ok');
      }, (error) => {
        console.log('Error al insertar el registro', error);
      }
    );
  }

  getCategories() {
    this._categoryService.getCategories().subscribe(
      (listCategories) => {
        this.listCategories = listCategories;
        this.loadCategories = true;
        console.log('listCategories', this.listCategories);
      }, (error) => {
        console.log('Error al obtener categories', error);
        this.loadCategories = true;
      }
    );
  }
}