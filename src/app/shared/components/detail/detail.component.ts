import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  @Output() close: EventEmitter<boolean>;

  constructor() {
    this.close = new EventEmitter<boolean>();
  }

  ngOnInit() {
  }

  closeDetail() {
    console.log('Close detail click');
    this.close.emit(true);
  }
}
