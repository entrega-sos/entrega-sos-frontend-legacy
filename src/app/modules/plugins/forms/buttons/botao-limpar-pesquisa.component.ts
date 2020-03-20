import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
    selector: 'botao-limpar-pesquisa',
    template: `<button class="btn m-btn--air btn-danger btn-block" type="button" [style.marginTop.px]="marginTop"><i class="fa fa-eraser"></i> {{ text }}</button>`
})
export class BotaoLimparPesquisaComponent implements OnInit {

    @Input() text: string = "Limpar pesquisa";

    @Input() marginTop: number = 0;

    constructor() { }

    ngOnInit() {
    }
}
