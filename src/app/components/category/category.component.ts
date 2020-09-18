import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  public showDetail: boolean;

  constructor() {
    this.showDetail = false;

  }

  ngOnInit() {
  }

  closeDetail($event) {
    console.log('closeDetail event');
    this.showDetail = $event;
  }

  openDetail() {
    this.showDetail = true;
  }
}
