import { Component, OnInit } from '@angular/core';
import { Comerciante } from 'src/app/modules/models/comerciante.model';

@Component({
  selector: 'app-cadastro-comerciante',
  templateUrl: './cadastro-comerciante.component.html',
  styleUrls: ['./cadastro-comerciante.component.scss']
})
export class CadastroComercianteComponent implements OnInit {

  comerciante: Comerciante = {}

  constructor() { }

  ngOnInit(): void {
  }
}
