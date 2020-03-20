import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'input-disabled',
    templateUrl: 'input-disabled.component.html'
})

export class InputDisabledComponent implements OnInit {

    @Input() width: number = 3;
    @Input() label: string;
    @Input('id') componentId: string;
    @Input() text: string;

    // Texto de ajuda, exibido abaixo do input
    @Input() help: string;

    @Input() classLabel: string;

    constructor() { }

    ngOnInit() { }

    getInternalComponentId(): string {
        return "internal_" + this.componentId;
    }
}
