import { ColumnComponent } from './../column/column.component';
import { Component, OnInit, Input, ViewContainerRef } from '@angular/core';

@Component({
    selector: 'column-template',
    template: ``
})
export class ColumnTemplateComponent implements OnInit {

    @Input() column: ColumnComponent;

    @Input() data: any;

    @Input() index: number;

    constructor(public viewContainer: ViewContainerRef) { }

    ngOnInit() {

        let view = this.viewContainer.createEmbeddedView(this.column.template, {
            'column': this.column,
            'data': this.data,
            'index': this.index
        });
    }
}
