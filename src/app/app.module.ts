import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './modules/home/home.module';
import { ComercianteModule } from './modules/cadastro/comerciante/comerciante.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    ComercianteModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
