import {Component, OnInit} from '@angular/core';
import {Register} from '../../models/register';
import {RegisterService} from '../../services/register.service';

import * as _ from 'lodash';
import * as moment from 'moment';
import {ConfigService} from '../../services/config.service';
import {TranslateService} from '../../services/translate.service';

@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.component.html',
  styleUrls: ['./graphics.component.css']
})
export class GraphicsComponent implements OnInit {

  public listRegisters: Register[];
  public showGraphics: boolean;
  public data: any;

  constructor(private _registerService: RegisterService,
              private _configService: ConfigService,
              private _translateService: TranslateService) {
    this.listRegisters = [];
    this.showGraphics = false;
    this.data = null;
  }

  ngOnInit() {
    this._registerService.getRegisters().subscribe(
      (registers) => {
        this.listRegisters = registers;

        this.fillData();
        this.showGraphics = true;
      }
    );
  }

  fillData($event?: Register[]) {
    console.log('$event registers', $event);
    // En caso que vengan registros filtrados, se usara ese arreglo en caso contrario solo el inicial
    const registers = $event || this.listRegisters;

    const codeLanguage = navigator.language.split('.')[0];

    // Agrupacion por meses
    const registersByMonths = _.groupBy(registers, register => moment(register.date).locale(codeLanguage).format('MMMM').toLowerCase());
    // console.log("registersByMonths", registersByMonths);
    const dataDeposit = [];
    const dataExpense = [];

    const months = this._configService.locale.monthNames;
    _.forEach(months, month => {

      // console.log('registersByMonths[month]', registersByMonths[month]);

      if (registersByMonths[month]) {
        const deposits = _.sumBy(registersByMonths[month], register => (register.type === 'deposit') ? _.toNumber(register.quantity) : 0);
        const expenses = _.sumBy(registersByMonths[month], register => (register.type === 'expense') ? _.toNumber(register.quantity) : 0);
        dataDeposit.push(deposits);
        dataExpense.push(expenses);
      } else {
        dataDeposit.push(0);
        dataExpense.push(0);
      }
    });


    // Objeto de informacion y configuracion de la grafica
    this.data = {
      labels: months,
      datasets: [
        {
          label: this._translateService.getTranslate('deposit'),
          backgroundColor: '#28a745',
          borderColor: '#1E88E5',
          data: dataDeposit
        }, {
          label: this._translateService.getTranslate('expense'),
          backgroundColor: '#dc3545',
          borderColor: '#7cb342',
          data: dataExpense
        }
      ]
    };

    console.log('this.data', this.data);
  }

}
