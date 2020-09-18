import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  @Output() close: EventEmitter<boolean>;

  public formCategory: FormGroup;

  constructor(private fb: FormBuilder) {
    this.close = new EventEmitter<boolean>();
  }

  ngOnInit() {
    this.formCategory = this.fb.group({
      name: ['', [Validators.required]]
    });
  }

  closeDetail($event) {
    console.log('Event close en app-add-category');
    this.close.emit($event);
  }

  addCategory() {

  }

  get name() {
    return this.formCategory.get('name');
  }
}
