import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
    selector: 'botao-alterar',
    template: `<button class="btn botao-formulario btn-primary btn-block" type="button" [style.marginTop.px]="marginTop"><span class="btn-label"><i class="fa fa-edit"></i></span> {{ text }}</button>`
})
export class BotaoAlterarComponent implements OnInit {

    @Input() text: string = "Alterar";

    @Input() marginTop: number = 0;

    constructor() { }

    ngOnInit() {
    }
}
