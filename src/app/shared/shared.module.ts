// Angular
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

// Components
import {SpinnerComponent} from './components/spinner/spinner.component';
import { DetailComponent } from './components/detail/detail.component';
import { FilterComponent } from './filter/filter.component';
import {FormsModule} from '@angular/forms';
import {CalendarModule} from 'primeng/calendar';
import {TranslatePipe} from '../pipes/translate.pipe';



@NgModule({
  declarations: [
    SpinnerComponent,
    DetailComponent,
    FilterComponent,
    TranslatePipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    CalendarModule,
  ],
  exports: [
    SpinnerComponent,
    DetailComponent,
    FilterComponent,
    TranslatePipe
  ]
})
export class SharedModule {
}
