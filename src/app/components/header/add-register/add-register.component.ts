import {Component, ElementRef, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Category} from '../../../models/category';
import {CategoryService} from '../../../services/category.service';
import {ConfigService} from '../../../services/config.service';
import {RegisterService} from '../../../services/register.service';
import {Register} from '../../../models/register';
import {DetailComponent} from '../../../shared/components/detail/detail.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {quantityValid} from '../../../validators/validators';

@Component({
  selector: 'app-add-register',
  templateUrl: './add-register.component.html',
  styleUrls: ['./add-register.component.css']
})
export class AddRegisterComponent implements OnInit {
  @Input('typeRegister') typeRegister: string;
  @Input('registerSelected') registerSelected: Register;

  @Output() close: EventEmitter<boolean>;

  @ViewChild('modal_success', {static: false}) modal_success: TemplateRef<any>;
  @ViewChild('modal_error', {static: false}) modal_Error: TemplateRef<any>;
  @ViewChild(DetailComponent, {static: false}) parentDetail: DetailComponent;

  public formAddRegister: FormGroup;
  public listCategories: Category[];
  public loadCategories: boolean;
  public locale: any;

  constructor(private fb: FormBuilder,
              private _categoryService: CategoryService,
              private _configService: ConfigService,
              private _registerService: RegisterService,
              private serviceModal: NgbModal) {
    this.close = new EventEmitter<boolean>();

    this.listCategories = [];
    this.loadCategories = false;
  }

  ngOnInit() {
    if (this.registerSelected) {
      this.formAddRegister = this.fb.group({
        id: [this.registerSelected.id, Validators.required],
        description: [this.registerSelected.description, Validators.required],
        date: [new Date(this.registerSelected.date), Validators.required],
        type: [this.registerSelected.type, Validators.required],
        idCategory: [this.registerSelected.idCategory, Validators.required],
        quantity: [this.registerSelected.quantity, [Validators.required, quantityValid]],
      });
    } else {
      this.formAddRegister = this.fb.group({
        description: ['', Validators.required],
        date: [new Date(), Validators.required],
        type: [this.typeRegister, Validators.required],
        idCategory: ['', Validators.required],
        quantity: [0, [Validators.required, quantityValid]],
      });
    }

    this.getCategories();

    this.locale = this._configService.locale;
  }


  closeDetail($event) {
    this.close.emit($event);
  }

  addRegister() {
    const register = new Register(this.formAddRegister.value);

    console.log('existe this.registerSelected', this.registerSelected);

    if (this.registerSelected) {

      this._registerService.editRegister(register).then(() => {

        this.serviceModal.open(this.modal_success).result.then(() => {
          this.parentDetail.closeDetail();
        });

      });

    } else {
      this._registerService.addRegister(register).then(
        () => {
          console.log('Registro insertado ok');

          this.serviceModal.open(this.modal_success).result.then(
            () => {
              this.parentDetail.closeDetail();
            }
          );

        }, (error) => {
          console.log('Error al insertar el registro', error);
          this.serviceModal.open(this.modal_Error);
        }
      );
    }


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
