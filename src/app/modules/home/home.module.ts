import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { PluginsModule } from '../plugins/plugins.module';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    PluginsModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
