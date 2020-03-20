import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'paginator',
    templateUrl: './paginator.component.html',
    styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {

    _totalItens: number = 0;

    // Total de itens no paginador
    @Input() set totalItens(v: number) {
        this._totalItens = v;

        this.atualizarPaginador();
    }

    get totalItens() {
        return this._totalItens;
    }

    // Número de itens de página que será exibido (deve ser sempre ímpar)
    @Input() size: number = 5;

    // Evento disparado ao mudar de página
    @Output() onPageChange: EventEmitter<number> = new EventEmitter();

    @Input() totalPages: number = 1;

    @Input() totalRecords: number = 0;

    @Input() showPagerInfo = true;

    // Item corrente
    @Input() current: number = 1;

    private itens: number[] = [];

    constructor() { }

    ngOnInit() {
    }

    setCurrent(i: number, emitPageChange: boolean = true) {
        this.current = i;

        this.atualizarPaginador();

        if (emitPageChange) {
            this.onPageChange.emit(this.current);
        }
    }

    isCurrent(i: number) {
        return this.current == i;
    }

    previous() {
        if (this.current > 1) {
            this.setCurrent(this.current - 1);
        }
    }

    next() {
        if (this.current < this.totalItens) {
            this.setCurrent(this.current + 1);
        }
    }

    first() {
        if (this.current > 1) {
            this.setCurrent(1);
        }
    }

    last() {
        if (this.current <= this.totalItens) {
            this.setCurrent(this.totalItens);
        }
    }

    getCurrentPage() {
        return this.current;
    }

    getTotalPages() {
        return this.totalPages;
    }

    getTotalRecords() {
        return this.totalRecords;
    }

    // Monta a lista do paginador
    montaListaItensPaginador() {
        let numberOfPages = this.totalItens;
        let visiblePages = Math.min(this.size, numberOfPages);

        //calculate range, keep current in middle if necessary
        let start = Math.max(0, Math.ceil((this.current - 1) - ((visiblePages) / 2)));
        let end = Math.min(numberOfPages - 1, start + visiblePages - 1);

        // check when approaching to last page
        var delta = this.size - (end - start + 1);
        start = Math.max(0, start - delta);

        return [start + 1, end + 1];
    }

    // Atualiza o paginador na tela
    atualizarPaginador() {
        this.itens = [];

        let boundaries = this.montaListaItensPaginador(),
            start = boundaries[0],
            end = boundaries[1];

        for (let i = start; i <= end; i++) {
            this.itens.push(i);
        }
    }

    getItens() {
        return this.itens;
    }
}
