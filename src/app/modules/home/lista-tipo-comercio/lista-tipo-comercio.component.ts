import { Component, OnInit } from '@angular/core';
import { TipoComercio, tiposComercio } from '../../models/tipo-comercio.model';
import {ComercianteService} from '../../../services/comerciante.service';

@Component({
  selector: 'app-lista-tipo-comercio',
  templateUrl: './lista-tipo-comercio.component.html',
  styleUrls: ['./lista-tipo-comercio.component.scss']
})
export class ListaTipoComercioComponent implements OnInit {

  tipos: any[] = [];
  rawTipos = tiposComercio;
  showLoad = false;

  constructor(private comercianteService: ComercianteService) { }

  ngOnInit(): void {
    this.showLoad = true;
    this.comercianteService.listWithQuery('group=tipo_negocio').subscribe((tipos: any) => {
      this.showLoad = false;
      for (const tipo of tipos.tipo_negocio) {
        this.tipos.push(this.rawTipos.find(t => t.nome === tipo || t.id === tipo));
      }
    }, er => this.showLoad = false);
  }
}
