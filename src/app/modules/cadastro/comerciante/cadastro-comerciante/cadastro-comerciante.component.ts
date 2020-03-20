import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Comerciante } from 'src/app/modules/models/comerciante.model';
import { ComercianteService } from 'src/app/services/comerciante.service';
import { Subscription } from 'rxjs';

declare var $: any

@Component({
  selector: 'app-cadastro-comerciante',
  templateUrl: './cadastro-comerciante.component.html',
  styleUrls: ['./cadastro-comerciante.component.scss']
})
export class CadastroComercianteComponent implements OnInit, OnDestroy {

  comerciante: Comerciante = {}

  subscriptions: Subscription[] = [];

  constructor(private comercianteService: ComercianteService) { }

  ngOnInit(): void { }

  buscarEndereco() {
    // Se não tiver os 9 digitos (traço incluido) não tenta fazer a requisição
    if (this.comerciante.cep && this.comerciante.cep.length >= 9)
      this.comercianteService.endereco(this.comerciante.cep)
        .subscribe(endereco => {
          this.comerciante.endereco = `${endereco.logradouro} ${endereco.complemento}`
          this.comerciante.cidade = endereco.localidade
          this.comerciante.bairro = endereco.bairro
          this.comerciante.uf = endereco.uf
        }, error => console.error)
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe())
  }
}
