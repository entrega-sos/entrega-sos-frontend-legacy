import { Component, OnInit, ElementRef } from '@angular/core';

declare var $: any;

@Component({
    selector: 'app-tirar-foto',
    templateUrl: './tirar-foto.component.html',
    styleUrls: ['./tirar-foto.component.css']
})
export class TirarFotoComponent implements OnInit {

    constructor(private el: ElementRef) { }

    ngOnInit() {
    }

    show() {
        // Mostra o alert
        $(this.el.nativeElement).modal();
    }

}
