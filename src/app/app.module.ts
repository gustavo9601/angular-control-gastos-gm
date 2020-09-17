// Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

// Modules
import { AppRoutingModule } from './app-routing.module';

// Pipes
import { TranslatePipe } from './pipes/translate.pipe';

// Services
import { TranslateService } from './services/translate.service';
import { ConfigService } from './services/config.service';

// Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import {SharedModule} from './shared/shared.module';
import { CategoryComponent } from './components/category/category.component';


export function translateFactory(provider: TranslateService) {
  return () => provider.getData();
}

export function configFactory(provider: ConfigService) {
  return () => provider.getData();
}

@NgModule({
  declarations: [
    AppComponent,
    TranslatePipe,
    HeaderComponent,
    CategoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule
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
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
