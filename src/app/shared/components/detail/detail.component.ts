import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  animations: [
    trigger('slide', [
      transition(':enter', [
        style({transform: 'translateX(100%)'}),
        animate('600ms ease-in', style({transform: 'translateX(0%)'}))
      ]),
      transition(':leave', [
        animate('600ms ease-in', style({transform: 'translateX(100%)'}))
      ])
    ])
  ],
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  @Output() close: EventEmitter<boolean>;

  public showDetail: boolean;

  constructor() {
    this.close = new EventEmitter<boolean>();
    this.showDetail = true;
  }

  ngOnInit() {
  }

  closeDetail() {
    console.log('Close detail click');

    // Truco para que la animacion de salida no se ejecute de golpe
    this.showDetail = false;
    setTimeout(() => {
      this.close.emit(false);
    }, 600);

  }
}
