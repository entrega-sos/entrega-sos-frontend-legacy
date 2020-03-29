import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lista-comerciantes-por-bairro',
  templateUrl: './lista-comerciantes-por-bairro.component.html',
  styleUrls: ['./lista-comerciantes-por-bairro.component.scss']
})
export class ListaComerciantesPorBairroComponent implements OnInit {


  public bairro : string = '';

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(data => 
      this.bairro = data['bairro'])    
  }

}
