import { Inject, forwardRef, Component, OnInit, Input, ViewChildren, ElementRef, TemplateRef, ContentChild, ViewContainerRef } from '@angular/core';

import { DataTableComponent } from './../data-table.component';

@Component({
    selector: 'column',
    templateUrl: './column.component.html',
    styleUrls: ['./column.component.scss']
})
export class ColumnComponent {

    // Field aonde será buscado o dado para a coluna
    @Input() field: string;

    // Cabeçalho da coluna
    @Input() header: string;

    // Indica se quer usar template para a coluna (não usa o field, mas a tag <ng-template>)
    @Input() useTemplate: boolean = false;

    // Tamanho da coluna, de 1 a 100 (percentual)
    @Input() width: number;

    // Tamanho da coluna, em percentual
    @Input() widthPercent: number;

    // Alinhamento da coluna (dados)
    @Input() alignment: string = "left";

    // Alinhamento da coluna (cabecalho)
    @Input() alignmentHeader: string = "left";

    // Classes CSS do cadastro da coluna do bloco
    @Input() cssHeader: string = '';
    @Input() cssDados: string = '';

    @ContentChild(TemplateRef, { static: true }) template: TemplateRef<any>;

    constructor() {

    }

    /**
     * Retorna a classe Css de alinhamento
     */
    getAlingmentString(alignment: string) {
        switch (alignment) {
            case ("left"): {
                return "text-left";
            }
            case ("center"): {
                return "text-center";
            }
            case ("right"): {
                return "text-right";
            }
        }
        return "";
    }

}
