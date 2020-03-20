import { Injectable } from '@angular/core';

declare var $: any;

@Injectable()
export class BlockUiService {

    constructor() { }

    // 
    private loader3 = '<div class="m-blockui"><span>Aguarde, carregando...</span><span><div class="m-loader m-loader--brand"></div></span></div>';
    private loader2 = '<div class="cssload-loader"><div class="cssload-inner cssload-one"></div><div class="cssload-inner cssload-two"></div><div class="cssload-inner cssload-three"></div></div>';
    private loader = '<div class="card card-body"><div class="lds-ripple"><div></div><div></div></div><p class="card-text"> Aguarde, carregando...</p></div>';

    /**
     * Bloqueia a tela ou um unico elemento seletor
     * @param element Elemento a ser bloqueado
     */
    block(element: string = undefined): void {
        if (element) {
            // Bloqueia elemento
            $(element).block({ message: this.loader, css: { backgroundColor: 'transparent', borderColor: 'transparent', borderStyle: 'none', width: '50%' } });
        } else {
            // Bloqueia pagina
            $.blockUI({ message: this.loader, css: { backgroundColor: 'transparent', borderColor: 'transparent', borderStyle: 'none', width: '50%'  } });
        }
    }

    /**
     * Desbloqueia a tela ou um único elemento seletor
     * @param element Elemento a ser desbloqueado
     */
    unBlock(element: string = undefined): void {
        if (element) {
            // Debloqueia elemento
            $(element).unblock();
        } else {
            // Desbloqueia pagina
            $.unblockUI();
        }
    }
}
