import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public typeRegister: string;
  public showDetail: boolean;

  constructor() {
    this.showDetail = false;
    this.typeRegister = '';
  }

  ngOnInit() {
  }

  openDetail(type: string) {
    this.showDetail = true;
    this.typeRegister = type;
  }

  closeDetail($event) {
    this.showDetail = $event;
  }
}
