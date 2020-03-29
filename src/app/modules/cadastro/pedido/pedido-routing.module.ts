import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SelecaoComercianteComponent } from './selecao-comerciante/selecao-comerciante.component';

const routes: Routes = [
  {
    path: 'pedido', children: [
      { path: 'novo', component: SelecaoComercianteComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PedidoRoutingModule { }
