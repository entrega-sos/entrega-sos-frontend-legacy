import { Component, OnInit } from '@angular/core';
import { TipoComercio, tiposComercio } from '../../models/tipo-comercio.model';

@Component({
  selector: 'app-lista-tipo-comercio',
  templateUrl: './lista-tipo-comercio.component.html',
  styleUrls: ['./lista-tipo-comercio.component.scss']
})
export class ListaTipoComercioComponent implements OnInit {

  public tipos: TipoComercio[] = []

  constructor() { }

  ngOnInit(): void {
    this.tipos = tiposComercio;
  }
}