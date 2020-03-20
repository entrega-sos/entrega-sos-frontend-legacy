import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
    selector: 'botao-excluir',
    template: `<button class="btn m-btn--air btn-danger btn-block" type="button" [style.marginTop.px]="marginTop"><span class="btn-label"><i class="fa fa-trash"></i></span> {{ text }}</button>`
})
export class BotaoExcluirComponent implements OnInit {

    @Input() text: string = "Excluir";

    @Input() marginTop: number = 0;

    constructor() { }

    ngOnInit() {
    }
}
