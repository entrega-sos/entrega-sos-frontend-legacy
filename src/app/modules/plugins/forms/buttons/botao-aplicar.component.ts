import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
    selector: 'botao-aplicar',
    template: `<button class="btn m-btn--air btn-success btn-block" type="button"><i class="fa fa-check"></i> {{ text }}</button>`
})
export class BotaoAplicarComponent implements OnInit {

    @Input() text: string = "Aplicar";

    constructor() { }

    ngOnInit() {
    }
}
