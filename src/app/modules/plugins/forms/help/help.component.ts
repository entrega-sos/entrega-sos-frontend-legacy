import { Component, OnInit, AfterViewInit, Input } from "@angular/core";

declare var $: any;

@Component({
  selector: "help-info",
  templateUrl: "./help.component.html",
  styleUrls: ["./help.component.scss"]
})
export class HelpComponent implements OnInit, AfterViewInit {

  @Input() tituloTextoAjuda: string;
  @Input() textoAjuda: string;
  @Input() iconeAjuda: string;
  @Input() posicaoAbsoluta: boolean;
  
  ngOnInit(){

  }

  ngAfterViewInit() {
    
    $(function () {

      $('[data-toggle="popover"]').popover({
        html: true,
        trigger: "hover click"
      });

      $('[data-toggle="popoverl"]').popover({
        html: true,
        trigger: "hover click",
        template: '<div class="popover popover-large" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
      });

      $('[data-toggle="tooltip"]').tooltip({
        trigger: "hover"
      });

      $(document).on('click', function (e) {
        $('[data-toggle="popover"],[data-original-title]').each(function () {
          //the 'is' for buttons that trigger popups
          //the 'has' for icons within a button that triggers a popup
          if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
            (($(this).popover('hide').data('bs.popover') || {}).inState || {}).click = false  // fix for BS 3.3.6
          }
        });
      });

      $('div.popover').each((item, element) => element.remove());

    });
  }

}
