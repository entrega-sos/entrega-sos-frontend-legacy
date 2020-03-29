import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PedidoRoutingModule } from './pedido-routing.module';
import { SelecaoComercianteComponent } from './selecao-comerciante/selecao-comerciante.component';
import { PluginsModule } from '../../plugins/plugins.module';


@NgModule({
  declarations: [SelecaoComercianteComponent],
  imports: [
    CommonModule,
    PluginsModule,
    PedidoRoutingModule
  ]
})
export class PedidoModule { }
