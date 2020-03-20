import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';

declare var $: any;

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit, OnDestroy {

    @Input() titulo: string;

    @Input() title: string;

    @Input('sub-titulo') subTitulo: string;

    @Input('subTitle') subTitle: string;

    @Input('icon') classIcon: string;

    @Input('modal-id') componentId: string = 'modal-' + Math.random().toString().replace('.', '');

    @Input() large: boolean = false;

    @Input() modal: boolean = false;

    @Input() mostrarModalFooter: boolean = true;

    @Input() diminuirPadding: boolean = false;

    @Input() habilitarBotaoClose: boolean = true;

    @Input() width: string = '';

    @Input() height: string = '';

    @Output() onClose: EventEmitter<any> = new EventEmitter();

    constructor() { }

    ngOnInit() {

    }

    ngOnDestroy() {
        $('body>#' + this.componentId).remove();
    }

    show() {
        $('#' + this.componentId).modal({
            keyboard: !this.modal
        });
        $('#' + this.componentId).appendTo("body");

        $('#' + this.componentId).on('hidden.bs.modal', () => this.onClose.emit());
    }

    close() {
        $('#' + this.componentId).modal('hide');
    }

    getLargeClass() {
        return this.large ? 'modal-lg' : '';
    }

    getTitulo() {
        return this.title || this.titulo;
    }

    getSubTitulo() {
        return this.subTitle || this.subTitulo;
    }
}
