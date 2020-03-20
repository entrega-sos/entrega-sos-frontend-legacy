import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComercianteRoutingModule } from './comerciante-routing.module';
import { CadastroComercianteComponent } from './cadastro-comerciante/cadastro-comerciante.component';
import { PluginsModule } from '../../plugins/plugins.module';

@NgModule({
  declarations: [CadastroComercianteComponent],
  imports: [
    CommonModule,
    PluginsModule,
    ComercianteRoutingModule
  ]
})
export class ComercianteModule { }
