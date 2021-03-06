// Angular
import {BrowserModule} from '@angular/platform-browser';
import {NgModule, APP_INITIALIZER} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

// Modules
import {AppRoutingModule} from './app-routing.module';
import {AngularFireModule} from '@angular/fire';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFireAuthModule} from '@angular/fire/auth';

// Pipes
import {TranslatePipe} from './pipes/translate.pipe';

// Services
import {TranslateService} from './services/translate.service';
import {ConfigService} from './services/config.service';

// Components
import {AppComponent} from './app.component';
import {HeaderComponent} from './components/header/header.component';
import {SharedModule} from './shared/shared.module';
import {CategoryComponent} from './components/category/category.component';
import {AddCategoryComponent} from './components/category/add-category/add-category.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgxPaginationModule} from 'ngx-pagination';
import {AddRegisterComponent} from './components/header/add-register/add-register.component';
import {CalendarModule} from 'primeng/calendar';
import {ResumeComponent} from './components/resume/resume.component';
import {GraphicsComponent} from './components/graphics/graphics.component';
import {ChartModule} from 'primeng/chart';
import { LoginComponent } from './components/login/login.component';
import { CreateAccountComponent } from './components/create-account/create-account.component';

// Firebase
// import {AngularFireModule} from '@'

const firebaseConfig = {
  apiKey: 'AIzaSyBtxZ2ikksvG3BYsIOOzrcwy0GVXwuDGTY',
  authDomain: 'gm-control-gastos.firebaseapp.com',
  databaseURL: 'https://gm-control-gastos.firebaseio.com',
  projectId: 'gm-control-gastos',
  storageBucket: 'gm-control-gastos.appspot.com',
  messagingSenderId: '296944224842',
  appId: '1:296944224842:web:d22f9fc130d40fcd9474b3'
};


export function translateFactory(provider: TranslateService) {
  return () => provider.getData();
}

export function configFactory(provider: ConfigService) {
  return () => provider.getData();
}

export function configDate(provider: ConfigService) {
  return () => provider.getDateConfig();
}


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CategoryComponent,
    AddCategoryComponent,
    AddRegisterComponent,
    ResumeComponent,
    GraphicsComponent,
    LoginComponent,
    CreateAccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule,
    NgxPaginationModule,
    CalendarModule,
    ChartModule
  ],
  providers: [
    TranslateService,
    {
      provide: APP_INITIALIZER,
      useFactory: translateFactory,
      deps: [TranslateService],
      multi: true
    },
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: configFactory,
      deps: [ConfigService],
      multi: true
    }
    ,
    {
      provide: APP_INITIALIZER,
      useFactory: configDate,
      deps: [ConfigService],
      multi: true
    }
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
