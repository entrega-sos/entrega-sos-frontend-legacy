import { OnInit } from '@angular/core';
import { Directive, Renderer2, ElementRef } from '@angular/core';

declare var $: any;

@Directive({
  selector: '[appTooltip]'
})
export class TooltipDirective implements OnInit {

  constructor(private renderer: Renderer2, private hostElement: ElementRef) { }

  ngOnInit(): void {
    const el = $(this.hostElement.nativeElement);
    var skin = el.data('skin') ? 'm-tooltip--skin-' + el.data('skin') : '';
    var width = el.data('width') == 'auto' ? 'm-tooltop--auto-width' : '';
    var triggerValue = el.data('trigger') ? el.data('trigger') : 'hover';

    let x = el.tooltip({
      trigger: triggerValue,
      template: '<div class="m-tooltip ' + skin + ' ' + width + ' tooltip" role="tooltip">\
                <div class="arrow"></div>\
                <div class="tooltip-inner"></div>\
            </div>'
    });
  }
}
