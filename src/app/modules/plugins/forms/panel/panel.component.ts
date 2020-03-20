import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'panel',
    templateUrl: './panel.component.html',
    styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {

    @Input() titulo: string;

    @Input() title: string;

    @Input('sub-titulo') subTitulo: string;

    @Input('subTitle') subTitle: string;

    @Input('icon') classIcon: string;

    @Input('id') componentId: string;

    @Input() color: string = 'brand';

    @Input() maxHeight: number;

    @Input() minHeight: number;

    constructor() { }

    ngOnInit() {
    }

    getTitulo() {
        return this.title || this.titulo;
    }

    getSubTitulo() {
        return this.subTitle || this.subTitulo;
    }

    getClassColor() {
        return 'm-portlet--' + this.color;
    }

    hasMaxHeight() {
        return this.maxHeight != undefined;
    }
}
