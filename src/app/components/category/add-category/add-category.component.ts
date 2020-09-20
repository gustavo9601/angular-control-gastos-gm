import {Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CategoryService} from '../../../services/category.service';
import {Category} from '../../../models/category';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DetailComponent} from '../../../shared/components/detail/detail.component';
import {categoryExists} from '../../../validators/validators';


@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  @ViewChild('modal_success', {static: false}) modal_success: TemplateRef<any>;
  @ViewChild('modal_error', {static: false}) modal_error: TemplateRef<any>;
  // Seleccionando un componente padre, ya que se esta llamando desde este componente
  @ViewChild(DetailComponent, {static: false}) parentDetail: DetailComponent;


  @Output() close: EventEmitter<boolean>;
  @Input() categoryEdit: Category;
  @Input() listCategories: Category[];

  public formCategory: FormGroup;

  constructor(private fb: FormBuilder,
              private _categoryService: CategoryService,
              private serviceNgbModal: NgbModal) {
    this.close = new EventEmitter<boolean>();
  }

  ngOnInit() {
    // Si se envia una categoria, se entiende que se va a editar
    if (this.categoryEdit) {
      this.formCategory = this.fb.group({
        // categoryExists => validacion personalizada
        name: [this.categoryEdit.name, [Validators.required, categoryExists(this.listCategories)]],
        id: [this.categoryEdit.id],
      });

    } else {

      this.formCategory = this.fb.group({
        // categoryExists => validacion personalizada
        name: ['', [Validators.required, categoryExists(this.listCategories)]]
      });

    }
  }

  closeDetail($event) {
    console.log('Event close en app-add-category');
    this.close.emit($event);
  }

  addCategory() {

    const category = new Category(this.formCategory.value);

    if (this.categoryEdit) {
      this._categoryService.editCategory(category).then(
        () => {
          console.log('Se ha editado correctamente la categoria');
          this.serviceNgbModal.open(this.modal_success)
            .result.then(
            () => {
              // Evento que se dispara cuando se abra este mmodal
              this.parentDetail.closeDetail();  // Cerramos el modal de add-category

            }
          );
        }, (error) => {
          console.log('Error editCategory', error);
          this.serviceNgbModal.open(this.modal_error);
        }
      );
    } else {

      this._categoryService.addCategory(category).then(
        () => {
          console.log('Se ha agedado correctamente la categoria');
          this.serviceNgbModal.open(this.modal_success)
            .result.then(
            () => {
              // Evento que se dispara cuando se abra este mmodal
              this.parentDetail.closeDetail();  // Cerramos el modal de add-category

            }
          );

        },
        (error) => {
          console.log('Error addCategory', error);
          this.serviceNgbModal.open(this.modal_error);
        }
      );

    }
  }

  get name() {
    return this.formCategory.get('name');
  }
}
