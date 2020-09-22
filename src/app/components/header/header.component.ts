import {Component, OnInit} from '@angular/core';
import {RegisterService} from '../../services/register.service';
import {Register} from '../../models/register';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public typeRegister: string;
  public showDetail: boolean;
  public registerSelected: Register;

  constructor(private _registerService: RegisterService,
              private _authService: AuthService) {
    this.showDetail = false;
    this.typeRegister = '';
  }

  ngOnInit() {
    this._registerService.currentRegister.subscribe(
      (registerToEdit) => {
        console.log('registerToEdit', registerToEdit);

        this.openEditDetail(registerToEdit);
      }
    );
  }

  openDetail(type: string) {
    this.showDetail = true;
    this.typeRegister = type;
  }


  openEditDetail(registerToEdit: Register) {
    this.registerSelected = registerToEdit;
    this.showDetail = true;
  }

  closeDetail($event) {
    this.showDetail = $event;
  }

  logOut() {
    this._authService.logout();
  }
}
