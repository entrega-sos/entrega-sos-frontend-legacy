import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
    selector: 'botao',
    template: `<button class="btn btn-wd {{ class }} btn-fill btn-block" type="button" [style.marginTop.px]="marginTop"><span class="btn-label"><i class="{{ icon }}"></i></span> {{ text }}</button>`
})

export class BotaoComponent implements OnInit {
    @Input() text: string = "Alterar";

    @Input() marginTop: number = 0;

    @Input() class: string = "btn-primary";

    @Input() icon: string = "";

    constructor() { }

    ngOnInit() { }
}
