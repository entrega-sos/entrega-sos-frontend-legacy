import { Directive, HostBinding, Renderer2, ElementRef } from '@angular/core';

@Directive({
    selector: '[noPadding]'
})
export class NoPaddingDirective {

    constructor(private renderer: Renderer2, private hostElement: ElementRef) {

    }

    ngOnInit() {
        this.renderer.addClass(this.hostElement.nativeElement.querySelector('div'), 'no-padding');
    }
}
