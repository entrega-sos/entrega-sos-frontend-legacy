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
  showLoad = false;
  subscriptions: Subscription[] = [];
  comerciantes: Partial<Comerciante>[] = [];

  constructor(
    private route: ActivatedRoute,
    private comercianteService: ComercianteService
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.tipoComercio = tiposComercio.find(t => t.id === params['tipo-comercio']);
      this.bairro = params['bairro'];
      this.loadComerciantes();
    });
    /*this.subscriptions.push(this.route.params.subscribe((data: any) => {
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
    }));*/
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  private loadComerciantes() {
    this.showLoad = true;
    this.subscriptions.push(
      this.comercianteService.list(1, 20000).subscribe(result => {
        this.showLoad = false;
        if (result.items instanceof Array) {
          this.comerciantes = result.items.filter(com => com.bairro === this.bairro && (com.tipo_negocio === this.tipoComercio.id || com.tipo_negocio === this.tipoComercio.nome));
        }
      }, er => this.showLoad = false)
    );
  }

  voltar() {
    window.history.back();
  }
}
