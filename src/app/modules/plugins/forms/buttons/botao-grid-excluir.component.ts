import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
    selector: 'botao-grid-excluir',
    template: `<button class="btn btn-xs red" type="button"><i class="fa fa-trash"></i> {{ text }}</button>`
})
export class BotaoGridExcluirComponent implements OnInit {

    @Input() text: string = "Excluir";

    constructor() { }

    ngOnInit() {
    }
}
