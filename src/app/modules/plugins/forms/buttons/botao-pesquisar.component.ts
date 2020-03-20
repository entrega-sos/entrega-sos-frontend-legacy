import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'botao-pesquisar',
  template: `<button class="btn botao-formulario btn-indigo btn-block" type="button" [style.marginTop.px]="marginTop"> <span class="btn-label"><i class="fa fa-search"></i></span> {{ text }}</button>`,
  styles: [`

  `]
})
export class BotaoPesquisarComponent implements OnInit {

  @Input() text: string = "Pesquisar";

  @Input() marginTop: number = 0;

  constructor() { }

  ngOnInit() {
  }
}
