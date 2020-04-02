import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListaBairrosComponent } from './lista-bairros/lista-bairros.component';
import { ListaComerciantesComponent } from './lista-comerciantes/lista-comerciantes.component';
import { DetalharComercianteComponent } from './detalhar-comerciante/detalhar-comerciante.component';
import { PaginaInicialComponent } from './pagina-inicial/pagina-inicial.component';

const routes: Routes = [{
  path: 'home', component: HomeComponent, children: [
    { path: '', component: PaginaInicialComponent },
    { path: 'bairros', component: ListaBairrosComponent },
    { path: 'bairro/:bairro', component: ListaComerciantesComponent },
    { path: 'comerciante/:comerciante', component: DetalharComercianteComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
