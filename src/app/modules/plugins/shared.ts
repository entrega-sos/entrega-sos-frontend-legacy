import { SelectGroupOption } from './forms/select-group/select-group-option';

declare var $: any;

export class Utils {
  
  static getRandomNumber() {
    return Math.floor(Math.random() * (1000 - 1 + 1)) + 1;
  }

  static buildErrorMessage<T>(response: any): string {

    let msg = (response.error && response.error.message) ? response.error.message : response.message;

    if (response.errors) {

      msg += '<div class="text-left">';
      msg += '<ul>';

      Object.keys(response.errors).forEach((m) => {
        msg += '<li>';
        msg += response.errors[m];
        msg += '</li>';
      });

      msg += '</ul>';
      msg += '</div>';
    }

    return msg;
  }

  static getFirstFieldError<T>(response: any): string {
    let field = '';

    if (response.messages && Object.keys(response.messages).length > 0) {
      field = Object.keys(response.messages)[0];
    }

    return field;
  }

  static genericSpringResourceComparator(item1: any, item2: any) {
    if (!item1 || !item2) {
      return false;
    }
    if (!item1._links || !item2._links) {
      return false;
    }

    return Utils.selfLinkComparator(item1._links.self, item2._links.self);

  }

  static simpleIdResourceComparator(item1: any, item2: any) {
    if (!item1 || !item2) {
      return false;
    }
    if (!item1.id || !item2.id) {
      return false;
    }

    return item1.id == item2.id;
  }

  static selfLinkComparator(link1: any, link2: any): boolean {
    let linkString1: string;
    let linkString2: string;

    if (!link1 || !link2) {
      return false;
    }

    linkString1 = Utils.cleanLink(link1)
    linkString2 = Utils.cleanLink(link2)

    return linkString1 === linkString2;
  }

  /**
   * Recebe um link e devolve a URl limpa, sem template
   **/
  static cleanLink(link: any): string {
    if (link.templated) {
      return link.href.substring(0, link.href.indexOf('{'));
    } else {
      return link.href;
    }
  }

  static parseNumber(value: any) {
    if (!value) {
      return 0.0;
    }

    let v: string = value.toString();

    if (v.indexOf('R$') >= 0) {
      v = v.replace('R$', '');
      v = v.replace('.', '');
      v = v.replace(',', '.');
    }

    let f = parseFloat(v);

    return f;
  }

  static formatDate(data: Date): string {
    let dd = data.getDate().toString();
    let mm = new String(data.getMonth() + 1); //January is 0!
    var yyyy = data.getFullYear();

    if (data.getDate() < 10) {
      dd = '0' + dd
    }

    if (data.getMonth() < 10) {
      mm = '0' + mm
    }

    let retorno = dd + '/' + mm + '/' + yyyy;

    return retorno;

  }

  static debounce(func: any, wait: number, immediate: boolean = false) {
    var timeout;

    return function () {
      var context = this, args = arguments;

      clearTimeout(timeout);

      timeout = setTimeout(function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      }, wait);
      if (immediate && !timeout) func.apply(context, args);
    };
  }

  static clearToolTips() {
    $('div.tooltip').remove();
  }

  static tooltips() {

    $('[data-toggle="tooltip-primary"]').tooltip({
      template: '<div class="tooltip tooltip-primary" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',
      trigger: 'hover'
    });

    $('[data-toggle="tooltip-success"]').tooltip({
      template: '<div class="tooltip tooltip-success" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',
      trigger: 'hover'
    });

    $('[data-toggle="tooltip-warning"]').tooltip({
      template: '<div class="tooltip tooltip-warning" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',
      trigger: 'hover'
    });

    $('[data-toggle="tooltip-danger"]').tooltip({
      template: '<div class="tooltip tooltip-danger" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',
      trigger: 'hover'
    });

    $('[data-toggle="tooltip-info"]').tooltip({
      template: '<div class="tooltip tooltip-info" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',
      trigger: 'hover'
    });

    $('[data-toggle="tooltip-indigo"]').tooltip({
      template: '<div class="tooltip tooltip-indigo" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',
      trigger: 'hover'
    });

    $('[data-toggle="tooltip-purple"]').tooltip({
      template: '<div class="tooltip tooltip-purple" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',
      trigger: 'hover'
    });

    $('[data-toggle="tooltip-teal"]').tooltip({
      template: '<div class="tooltip tooltip-teal" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',
      trigger: 'hover'
    });

    $('[data-toggle="tooltip-orange"]').tooltip({
      template: '<div class="tooltip tooltip-orange" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',
      trigger: 'hover'
    });

    $('[data-toggle="tooltip-pink"]').tooltip({
      template: '<div class="tooltip tooltip-pink" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',
      trigger: 'hover'
    });
  }

  static clearTooltips() {
    $('div:contains("Tooltiptext")').remove();
  }
}

export class EnumUtils {

  /**
   * Retorna lista de options para combo Ativo / Inativo
   */
  static getOptionsAtivo(opcaoVazia: string = null): SelectGroupOption[] {
    const lista: SelectGroupOption[] = [];

    if (opcaoVazia) {
      lista.push({ label: opcaoVazia, value: '' });
    }

    lista.push({ label: 'Ativo', value: 'Ativo' });
    lista.push({ label: 'Inativo', value: 'Inativo' });
    lista.push({ label: 'Rascunho', value: 'Rascunho' });

    return lista;
  }

  /**
   * Retorna lista de options para combo Sim/Não
   */
  static getOptionsSimNao(opcaoVazia: string = null): SelectGroupOption[] {
    const lista: SelectGroupOption[] = [];

    if (opcaoVazia) {
      lista.push({ label: opcaoVazia, value: '' });
    }

    lista.push({ label: 'Sim', value: 'Sim' });
    lista.push({ label: 'Não', value: 'Não' });

    return lista;
  }


  /**
   * Retorna lista de options para combo Tipo de fonte de dados
   */
  static getOptionsTipoFonteDados(opcaoVazia: string = null): SelectGroupOption[] {
    const lista: SelectGroupOption[] = [];

    if (opcaoVazia) {
      lista.push({ label: opcaoVazia, value: '' });
    }

    lista.push({ label: 'Primária', value: 'Primária' });
    lista.push({ label: 'Secundária', value: 'Secundária' });

    return lista;
  }

  static getOptionsTipoOrigem(opcaoVazia: string = null): SelectGroupOption[] {
    const lista: SelectGroupOption[] = [];

    if (opcaoVazia) {
      lista.push({ label: opcaoVazia, value: '' });
    }

    lista.push({ label: 'Serviço Rest', value: 'Serviço Rest' });
    lista.push({ label: 'Banco de dados', value: 'Banco de dados' });

    return lista;
  }

  static getOptionsTipoRegra(opcaoVazia: string = null): SelectGroupOption[] {
    const lista: SelectGroupOption[] = [];

    if (opcaoVazia) {
      lista.push({ label: opcaoVazia, value: '' });
    }

    lista.push({ label: 'Query Elastic', value: 'Query Elastic' });
    lista.push({ label: 'Fórmula SQL', value: 'Fórmula SQL' });

    return lista;
  }

  static getOptionsTipoAvaliacaoGatilho(opcaoVazia: string = null): SelectGroupOption[] {
    const lista: SelectGroupOption[] = [];

    if (opcaoVazia) {
      lista.push({ label: opcaoVazia, value: '' });
    }

    lista.push({ label: 'Tipologia', value: 'TIPOLOGIA' });
    lista.push({ label: 'Objeto', value: 'OBJETO' });

    return lista;
  }

  static getOptionsNaturezaTipologia(opcaoVazia: string = null): SelectGroupOption[] {
    const lista: SelectGroupOption[] = [];

    if (opcaoVazia) {
      lista.push({ label: opcaoVazia, value: '' });
    }

    lista.push({ label: 'Moderada', value: 'MODERADA' });
    lista.push({ label: 'Grave', value: 'GRAVE' });
    lista.push({ label: 'Gravíssima', value: 'GRAVISSIMA' });

    return lista;
  }

  static getOptionsOperadorLogico(opcaoVazia: string = null): SelectGroupOption[] {
    const lista: SelectGroupOption[] = [];

    if (opcaoVazia) {
      lista.push({ label: opcaoVazia, value: '' });
    }

    lista.push({ label: 'E', value: 'E' });
    lista.push({ label: 'OU', value: 'OU' });

    return lista;
  }


  static getOptionsVerboHttp(opcaoVazia: string = null): SelectGroupOption[] {

    const lista: SelectGroupOption[] = [];

    if (opcaoVazia) {
      lista.push({ label: opcaoVazia, value: '' });
    }

    lista.push({ label: 'Get', value: 'Get' });
    lista.push({ label: 'Post', value: 'Post' });
    lista.push({ label: 'Put', value: 'Put' });
    lista.push({ label: 'Delete', value: 'Delete' });
    lista.push({ label: 'Head', value: 'Head' });
    lista.push({ label: 'Trace', value: 'Trace' });
    lista.push({ label: 'Connect', value: 'Connect' });
    lista.push({ label: 'Options', value: 'Options' });

    return lista;
  }

  static getOptionsTipoTipologia(opcaoVazia: string = null): SelectGroupOption[] {

    const lista: SelectGroupOption[] = [];

    if (opcaoVazia) {
      lista.push({ label: opcaoVazia, value: '' });
    }

    lista.push({ label: 'Auditoria', value: 'Auditoria' });
    lista.push({ label: 'Qualidade dos dados', value: 'Qualidade dos dados' });

    return lista;
  }

  static getOptionsOrigemFonteDados(opcaoVazia: string = null): SelectGroupOption[] {
    const lista: SelectGroupOption[] = [];

    if (opcaoVazia) {
      lista.push({ label: opcaoVazia, value: '' });
    }

    lista.push({ label: 'Fórmula SQL', value: 'Fórmula SQL' });
    lista.push({ label: 'Índice Elastic Search', value: 'Índice Elastic Search' });

    return lista;
  }

  static getOptionsTipoDado(opcaoVazia: string = null): SelectGroupOption[] {
    const lista: SelectGroupOption[] = [];

    if (opcaoVazia) {
      lista.push({ label: opcaoVazia, value: '' });
    }

    lista.push({ label: 'Numérico', value: 'Numérico' });
    lista.push({ label: 'Texto', value: 'Texto' });
    lista.push({ label: 'Data / Hora', value: 'Data / Hora' });
    lista.push({ label: 'Booleano', value: 'Booleano' });
    lista.push({ label: 'Blob (PDF)', value: 'Blob (PDF)' });
    lista.push({ label: 'Clob (RTF)', value: 'Clob (RTF)' });

    return lista;
  }

  static getOptionsTipoDadoElastic(opcaoVazia: string = null): SelectGroupOption[] {
    const lista: SelectGroupOption[] = [];

    if (opcaoVazia) {
      lista.push({ label: opcaoVazia, value: '' });
    }

    lista.push({ label: 'text', value: 'text' });
    lista.push({ label: 'date', value: 'date' });
    lista.push({ label: 'integer', value: 'integer' });

    return lista;
  }

  static getOptionsTipoCondition(opcaoVazia: string = null): SelectGroupOption[] {
    const lista: SelectGroupOption[] = [];

    if (opcaoVazia) {
      lista.push({ label: opcaoVazia, value: '' });
    }

    lista.push({ label: 'Combinação de palavras próximas', value: 'near' });
    lista.push({ label: 'Combinação OU', value: 'or' });
    lista.push({ label: 'Palavra / Termo', value: 'term' });

    return lista;
  }
}
