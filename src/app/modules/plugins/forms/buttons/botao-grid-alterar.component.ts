import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
    selector: 'botao-grid-alterar',
    template: `<button class="btn btn-xs green" type="button"><i class="fa fa-edit"></i> {{ text }}</button>`
})
export class BotaoGridAlterarComponent implements OnInit {

    @Input() text: string = "Alterar";

    constructor() { }

    ngOnInit() {
    }
}
