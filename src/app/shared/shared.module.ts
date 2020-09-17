// Angular
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

// Components
import {SpinnerComponent} from './components/spinner/spinner.component';
import { DetailComponent } from './components/detail/detail.component';

@NgModule({
  declarations: [
    SpinnerComponent,
    DetailComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SpinnerComponent,
    DetailComponent
  ]
})
export class SharedModule {
}
