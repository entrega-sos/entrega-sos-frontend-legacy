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


  public tipoComercio: Partial<TipoComercio> = {};

  public bairros = [];

  private subscriptions: Subscription[] = [];

  filtroTipoNegocio: (value: any, index: number, array: any[]) => unknown = c => c.tipo_negocio.toUpperCase() === this.tipoComercio.nome.toUpperCase() || c.tipo_negocio.toUpperCase() === this.tipoComercio.id.toUpperCase();

  sortBairros: (a: any, b: any) => number = (a, b) => a > b ? 1 : (a < b ? -1 : 0);

  constructor(
    private bairrosService: BairrosService,
    private comercianteService: ComercianteService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.tipoComercio = tiposComercio.find(t => t.id === params['tipo-comercio'])
    });

    this.bairros = this.comercianteService
      .loadFromCache()
      .filter(this.filtroTipoNegocio)
      .map(c => c.bairro)
      .sort(this.sortBairros)

    this.comercianteService.loadAndSave()
      .then(data => this.bairros = data
        .filter(this.filtroTipoNegocio)
        .map(c => c.bairro)
        .sort(this.sortBairros)
      ).catch(error => console.log(error));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  voltar() {
    window.history.back();
  }

}
