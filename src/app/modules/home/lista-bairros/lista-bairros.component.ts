import { Component, OnInit, OnDestroy } from '@angular/core';
import { Bairros } from '../../models/bairro.model';
import { Subscription } from 'rxjs';
import { BairrosService } from 'src/app/services/bairros.service';
import { TipoComercio, tiposComercio } from '../../models/tipo-comercio.model';
import { ActivatedRoute } from '@angular/router';
import { ComercianteService } from 'src/app/services/comerciante.service';

@Component({
  selector: 'app-lista-bairros',
  templateUrl: './lista-bairros.component.html',
  styleUrls: ['./lista-bairros.component.scss']
})
export class ListaBairrosComponent implements OnInit, OnDestroy {


  tipoComercio: Partial<TipoComercio> = {};
  showLoad = false;
  bairros: Set<any> = new Set<any>();

  private subscriptions: Subscription[] = [];

  constructor(
    private bairrosService: BairrosService,
    private comercianteService: ComercianteService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.tipoComercio = tiposComercio.find(t => t.id === params['tipo-comercio']);
      this.loadBairros();
    });

    /*this.bairros = this.comercianteService
      .loadFromCache()
      .filter(c => c.tipo_negocio.toUpperCase() === this.tipoComercio.nome.toUpperCase())
      .map(c => c.bairro)
      .sort((a, b) => a > b ? 1 : (a < b ? -1 : 0))

    console.log(this.bairros.length)
    console.log(this.comercianteService.loadFromCache().length)

    this.comercianteService.loadAndSave()
      .then(data => {
        this.bairros = data
          .filter(c => c.tipo_negocio.toUpperCase() === this.tipoComercio.nome.toUpperCase())
          .map(c => c.bairro)
          .sort((a, b) => a > b ? 1 : (a < b ? -1 : 0))
      }).catch(error => console.log(error));*/
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  private loadBairros() {
    this.showLoad = true;
    this.comercianteService.list(1, 20000).subscribe(result => {
      this.showLoad = false;
      if (result.items instanceof Array) {
        for (const comerciante of result.items.filter(com => com.tipo_negocio === this.tipoComercio.id || com.tipo_negocio === this.tipoComercio.nome)) {
          this.bairros.add(comerciante.bairro);
        }
      }
    }, err => this.showLoad = false);
  }

  voltar() {
    window.history.back();
  }

}
