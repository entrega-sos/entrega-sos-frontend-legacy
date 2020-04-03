import {Component, OnInit, OnDestroy, AfterViewInit} from '@angular/core';
import {Comerciante} from 'src/app/modules/models/comerciante.model';
import {ComercianteService} from 'src/app/services/comerciante.service';
import {Subscription} from 'rxjs';
import {Location} from '@angular/common';
import {tiposComercio} from '../../../models/tipo-comercio.model';

declare var $: any;

@Component({
  selector: 'app-cadastro-comerciante',
  templateUrl: './cadastro-comerciante.component.html',
  styleUrls: ['./cadastro-comerciante.component.scss']
})
export class CadastroComercianteComponent implements OnInit, OnDestroy {

  comerciante: Partial<Comerciante> = {
    delivery: true
  };

  subscriptions: Subscription[] = [];
  pagamentos = [
    {id: 'dinheiro', name: 'Dinheiro', check: false},
    {id: 'credito', name: 'Crédito', check: false},
    {id: 'debito', name: 'Débito', check: false}
  ];
  tipos = tiposComercio;
  showLoading = false;

  constructor(private comercianteService: ComercianteService, public location: Location) {
  }

  ngOnInit(): void {
  }

  buscarEndereco() {
    // Se não tiver os 9 digitos (traço incluido) não tenta fazer a requisição
    const comerciante = {...this.comerciante, cep: this.comerciante.cep.replace(/[^0-9]/g, '')};
    if (this.comerciante.cep && comerciante.cep.length >= 8) {
      this.comercianteService.endereco(this.comerciante.cep)
        .subscribe(endereco => {
          console.log(endereco);
          this.comerciante.endereco = `${endereco.logradouro} ${endereco.complemento}`;
          this.comerciante.cidade = endereco.localidade;
          this.comerciante.bairro = endereco.bairro;
          this.comerciante.uf = endereco.uf;
        }, error => console.error);
    }
  }

  onSubmit() {
    const comerciante = {
      ...this.comerciante,
      cep: this.comerciante.cep.replace(/[^0-9]/g, ''),
      meio_pagamento: this.pagamentos.filter(p => p.check).map(p => p.id)
    };
    this.showLoading = true;
    this.comercianteService.create(comerciante).subscribe(data => {
      this.showLoading = false;
      if (!data) {
        console.log('deu erro');
      } else {
        this.location.back();
      }
    }, err => {
      this.showLoading = false;
      console.log(err.message);
    });

  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
}
