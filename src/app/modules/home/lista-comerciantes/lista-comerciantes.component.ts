import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {ActivatedRoute, RouteConfigLoadEnd} from '@angular/router';
import {Subscription} from 'rxjs';
import {tiposComercio, TipoComercio} from '../../models/tipo-comercio.model';
import {ComercianteService} from 'src/app/services/comerciante.service';
import {Comerciante} from '../../models/comerciante.model';

@Component({
  selector: 'app-lista-comerciantes',
  templateUrl: './lista-comerciantes.component.html',
  styleUrls: ['./lista-comerciantes.component.scss']
})
export class ListaComerciantesComponent implements OnInit, OnDestroy {

  bairro = '';
  tipoComercio: Partial<TipoComercio> = {};

  subscriptions: Subscription[] = [];
  comerciantes: Comerciante[] = [];

  constructor(
    private route: ActivatedRoute,
    private comercianteService: ComercianteService
  ) {
  }

  ngOnInit(): void {

    this.subscriptions.push(this.route.params.subscribe((data: any) => {
      this.bairro = data.bairro || '';
      this.tipoComercio = tiposComercio.find(t => t.id === data['tipo-comercio']);

      this.comerciantes = this.comercianteService
        .loadFromCache()
        .filter(c => c.bairro === this.bairro && c.tipo_negocio.toUpperCase() === this.tipoComercio.nome.toUpperCase())
        .sort((a, b) => a.descricao > b.descricao ? 1 : (a.descricao < b.descricao ? -1 : 0));

      this.comercianteService.loadAndSave()
        .then((data: any[]) => {
          this.comerciantes = data.filter(c => c.bairro === this.bairro);
        }).catch(error => console.log(error));
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  voltar() {
    window.history.back();
  }
}
