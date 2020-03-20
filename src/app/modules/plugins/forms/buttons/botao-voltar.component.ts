import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
    selector: 'botao-voltar',
    template: `<button class="btn m-btn--air btn-info btn-block" type="button" [style.marginTop.px]="marginTop"><i class="fa fa-history"></i> {{ text }}</button>`
})
export class BotaoVoltarComponent implements OnInit {

    @Input() text: string = "Sair";

    @Input() marginTop: number = 0;

    constructor() { }

    ngOnInit() {
    }
}
