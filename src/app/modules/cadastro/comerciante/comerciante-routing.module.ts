import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastroComercianteComponent } from './cadastro-comerciante/cadastro-comerciante.component';

const routes: Routes = [{
  path: 'comerciante', children: [
    { path: 'novo', component: CadastroComercianteComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComercianteRoutingModule { }
