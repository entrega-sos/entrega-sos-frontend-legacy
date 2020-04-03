import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomeRoutingModule} from './home-routing.module';
import {HomeComponent} from './home/home.component';
import {PluginsModule} from '../plugins/plugins.module';
import {ListaComerciantesComponent} from './lista-comerciantes/lista-comerciantes.component';
import {ListaComerciantesPorBairroComponent} from './lista-comerciantes-por-bairro/lista-comerciantes-por-bairro.component';
import {DetalharComercianteComponent} from './detalhar-comerciante/detalhar-comerciante.component';
import {ListaBairrosComponent} from './lista-bairros/lista-bairros.component';
import {PaginaInicialComponent} from './pagina-inicial/pagina-inicial.component';
import {ListaTipoComercioComponent} from './lista-tipo-comercio/lista-tipo-comercio.component';
import { VoluntariosComponent } from './voluntarios/voluntarios.component';


@NgModule({
  declarations: [
    HomeComponent,
    ListaComerciantesComponent,
    ListaComerciantesPorBairroComponent,
    DetalharComercianteComponent,
    ListaBairrosComponent,
    PaginaInicialComponent,
    ListaTipoComercioComponent,
    VoluntariosComponent
  ],
  imports: [
    CommonModule,
    PluginsModule,
    HomeRoutingModule
  ]
})
export class HomeModule {
}
